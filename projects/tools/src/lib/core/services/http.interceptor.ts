
import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { tap } from 'rxjs/operators';

import { REFRESH_X_CACHE, Cachable, RequestCache } from './request-cache.service';

/* Note: When you are going to use the Interceptors, make a "Barrel" of Http Interceptors. 
 * Angular applies interceptors in the order that you provide them. If you provide interceptors A, 
 * then B, then C, requests will flow in A->B->C and responses will flow out C->B->A. 
 * You cannot change the order or remove interceptors later. If you need to enable and disable 
 * an interceptor dynamically, you'll have to build that capability into the interceptor itself. */


/**
 * A service that caches certain requests and responses to improve performance. 
 * It is delegated to an interceptor without disturbing the existing data services. 
 * 
 * - If request is cachable (e.g., package search) and response is in cache, 
 * then returns the cached response as observable. 
 * - If request is cachable and has `REFRESH_X_CACHE` option header in true (or the request is not in cache), 
 * then passes request to the following `HttpHandler` and makes a cache from response. 
 * - If request is not cachable, 
 * then passes request to the following `HttpHandler`. 
 */
@Injectable({
    providedIn: 'root'
})
export class CachingInterceptor implements HttpInterceptor
{
    public constructor(private _cachable: Cachable, private _cache: RequestCache)
    { }

    /**
     * Identifies and handles a given HTTP request. 
     * @param req The outgoing request object to handle. 
     * @param next The next interceptor in the chain, or the backend if no interceptors remain in the chain. 
     * @returns An observable of the event stream. 
     */
    public intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>>
    {
        /* Continues if not cachable. */
        if (!this._cachable.isCachable(req))
        {
            return next.handle(req);
        }

        /* This option is triggered by the presence of a custom `REFRESH_X_CACHE` header with true value. */
        if (req.headers.get(REFRESH_X_CACHE))
        {
            /* fetch. */
            return this._sendRequest(req, next, true);
        }

        /* cache-or-fetch. */
        const cachedResponse: HttpResponse<any> = this._cache.get(req);
        return (cachedResponse
            ? of(cachedResponse)
            : this._sendRequest(req, next, false));
    }

    /**
     * Gets server response observable by sending request to `next` argument. 
     * It will add the response to the cache on the way out. 
     * @param req The outgoing request object to handle. 
     * @param next The next interceptor in the chain, or the backend if no interceptors remain in the chain. 
     * @param hasRefreshXCache It is true if the custom `REFRESH_X_CACHE` header is present; otherwise, false. 
     * @returns An observable of the event stream. 
     */
    private _sendRequest(req: HttpRequest<any>, next: HttpHandler, hasRefreshXCache: boolean): Observable<HttpEvent<any>>
    {
        /* Removes the `REFRESH_X_CACHE` custom option from header. */
        let reqWithoutCustomHeader: HttpRequest<any> = (hasRefreshXCache)
            ? req.clone({ headers: (req.headers.delete(REFRESH_X_CACHE)) })
            : req;

        console.log('mio2', reqWithoutCustomHeader.headers);

        return next.handle(reqWithoutCustomHeader).pipe(
            tap((event: HttpEvent<any>) => {
                /* There may be other events besides the response. */
                if (event instanceof HttpResponse)
                {
                    /* Updates the cache. */
                    this._cache.set(req, event);  /* Cached the original request `req`. */
                }
            })
        );
    }
}
