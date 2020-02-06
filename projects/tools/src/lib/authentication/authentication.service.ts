import { Injectable, Optional } from '@angular/core';
import { HttpClient, HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { Observable, Subject, throwError } from 'rxjs';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';

import { OAuthStorage, OAuthResourceServerErrorHandler, OAuthModuleConfig, OAuthService } from 'angular-oauth2-oidc';
import { Response } from '../entities/response';
import { EnvService } from '@tocoenv/tools/env.service';
import { catchError } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
/**
 * This service handles the behavior when a user authentications and
 * gives information about it.
 */
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
        this._router.navigate(['/']);
        return false;
        // if (user.Role === next.data.role) {
        //   return true;
        // }

        // // navigate to not found page
        // this._router.navigate(['/404']);
        // return false;
    }


    public intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        let token = this.oauthStorage.getItem('access_token');
        let header = 'Bearer ' + token;

        let headers = req.headers.set('Authorization', header);

        req = req.clone({ headers });
        console.log(req.url);
        

        return next.handle(req).pipe(
            catchError((err: HttpErrorResponse) => {

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
