/*
 *   Copyright (c) 2020 Universidad de Pinar del Río "Hermanos Saíz Montes de Oca"
 *   All rights reserved.
 */

import { Injectable, Optional } from '@angular/core';
import { HttpClient, HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpResponse, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, Subject, throwError } from 'rxjs';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';

import { OAuthStorage, OAuthResourceServerErrorHandler, OAuthModuleConfig, OAuthService } from 'angular-oauth2-oidc';
import { EnvService } from '@toco/backend/env.service';
import { catchError } from 'rxjs/operators';
import { Response } from '@toco/core';

/**
 * This service handles the behavior when a user authentications and
 * gives information about it.
 */
@Injectable({
    providedIn: 'root'
})
export class AuthenticationService implements CanActivate, HttpInterceptor {

    constructor(
        private env: EnvService,
        private oauthStorage: OAuthStorage,
        protected http: HttpClient,
        private _router: Router,
        private oauthService: OAuthService,
        private errorHandler: OAuthResourceServerErrorHandler,
        @Optional() private moduleConfig: OAuthModuleConfig) { }

    private authenticationSubject: Subject<boolean> = new Subject();
    /**
     * Observer to handles the behavior when a user authenticates
     */
    public authenticationSubjectObservable = this.authenticationSubject.asObservable();

    /**
     * notifies by an observable if the user is authenticated
     * for the knowledge of who uses it
     * @param islogged 'true' is loggued or 'false' other way
     */
    logguedChange(islogged: boolean) {
        this.authenticationSubject.next(islogged);
    }
    /**
     * gives information about an user authenticated
     */
    getUserInfo(): Observable<Response<any>> {
        return this.http.get<Response<any>>(this.env.sceibaApi + 'me');
    }

    canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
        const user = this.oauthStorage.getItem('email')

        if (user) {
            return true;
        }
        else{
            this._router.navigate(['/']);
            return false;
        }

        // if (user.Role === next.data.role) {
        //   return true;
        // }

        // // navigate to not found page
        // this._router.navigate(['/404']);
        // return false;
    }


    public intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        let token = this.oauthStorage.getItem('access_token');

        if (token) {
            let headers = req.headers.set('Authorization', 'Bearer ' + token);
            
            if (req.method != 'GET'){
                headers = headers.set('Content-Type', 'application/json');
                headers = headers.set('Access-Control-Allow-Origin', '*');
            }
    
            req = req.clone({ headers });
            console.log(req.url, req.headers);
        }


        
        return next.handle(req).pipe(
            catchError((err: HttpErrorResponse) => {

                /* 401 means the user is not authorized. */
                if (err.status === 401) {
                    this.oauthService.initImplicitFlow();
                    // this._router.navigateByUrl('/');
                }

                return throwError(err);
            })
        );
        // return next.handle(req).pipe(
        //     tap(
        //         // Succeeds when there is a response; ignore other events
        //         event => {
        //             console.log('eventttttt', event);
        //             event instanceof HttpResponse ? 'succeeded' : ''
        //         },
        //         // Operation failed; error is an HttpErrorResponse
        //         error => {
        //             console.log('errorrrrr', error);
        //             'failed'
        //         }
        //     ),
        //     finalize(() => console.log('finalize') )
        // );
    }
}
