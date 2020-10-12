
import { HttpRequest, HttpResponse } from '@angular/common/http';

/**
 * Returns a constant that is used in the `HttpHeaders` to do request although the request exists in cache. 
 */
export const REFRESH_X_CACHE: string = 'refresh-x-cache';

/**
 * Represents the base abstract class for all services that implement the cachable URL request. 
 * See `CachableUrl` service. 
 */
export abstract class Cachable
{
    /**
     * Returns a number greater than zero if the specified request is cachable; 
	 * that number represents the maximum cache age in milliseconds. 
	 * Return zero if the specified request is NOT cachable. 
     * @param req The outgoing request object to handle. 
     */
    public abstract isCachable(req: HttpRequest<any>): number
}

/**
 * Represents the base abstract class for all services that implement the request cache. 
 * See `RequestCacheDifferentTimeWithMap` service. 
 */
export abstract class RequestCache
{
	public abstract get(req: HttpRequest<any>): HttpResponse<any> | undefined;

	public abstract set(req: HttpRequest<any>, maxAgeInCache: number, response: HttpResponse<any>): void;
}
