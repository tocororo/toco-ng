/*
 *   Copyright (c) 2020 Universidad de Pinar del Río "Hermanos Saíz Montes de Oca"
 *   All rights reserved.
 */

import { Injectable, Optional } from '@angular/core';
import { HttpClient, HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpResponse, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, Subject, throwError } from 'rxjs';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';

import { OAuthStorage, OAuthResourceServerErrorHandler, OAuthModuleConfig, OAuthService, AuthConfig, JwksValidationHandler } from 'angular-oauth2-oidc';
import { EnvService } from '../backend/env.service';
import { catchError } from 'rxjs/operators';
import { Response } from '../core/public-api';
import { User } from '../../public-api';


/**
 * This enum handles the selected backend
 */
export enum AuthBackend{
    /**
     * `sceiba` represent the Sceiba's backend
     */
    sceiba = 'sceiba',
    /**
     * `cuor` represent the Cuor's backend, The Organizations System
     */
    cuor = 'cuor'
}
/**
 * This service handles the behavior when a user authentications and
 * gives information about it.
 */
@Injectable({
    providedIn: 'root'
})
export class OauthAuthenticationService implements CanActivate, HttpInterceptor {

    // public authBackend: AuthBackend =  AuthBackend.sceiba
    public userInfoEndpoint: string;

    constructor(
        // private env: EnvService,
        private oauthStorage: OAuthStorage,
        protected http: HttpClient,
        private _router: Router,
        private oauthService: OAuthService,
        private errorHandler: OAuthResourceServerErrorHandler,
        @Optional() private moduleConfig: OAuthModuleConfig) { }

    private authenticationSubject: Subject<User> = new Subject();
    /**
     * Observer to handles the behavior when a user authenticates
     */
    public authenticationSubjectObservable = this.authenticationSubject.asObservable();

    /**
     * notifies by an observable if the user is authenticated
     * for the knowledge of who uses it
     * @param islogged 'true' is loggued or 'false' other way
     */
    login(user: User) {
        this.authenticationSubject.next(user);
    }
    logout() {
      this.authenticationSubject.next(null);
  }
    /**
     * gives information about an user authenticated
     */
    getUserInfo(): Observable<any> {
      return this.http.get<any>(this.userInfoEndpoint);
        // if (this.authBackend == AuthBackend.sceiba) {
        //     return this.http.get<any>(this.env.sceibaApi + 'me');
        // } else if (this.authBackend == AuthBackend.cuor){
        //     return this.http.get<any>(this.env.cuorApi + 'me');
        // }
    }

    canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
        const user = this.oauthStorage.getItem('user')

        if (user) {
            return true;
        }
        else{
            this._router.navigate(['/']);
            return false;
        }

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
    }

    /**
     * Configure, this function is necessary if you will implement your own logic
     * @param authConfig: is the auth configuration.
     * you have to call `oauthService.initImplicitFlow()` in you login function
     * and `oauthService.logOut()` in you logout function
     */
    public configure(authConfig: AuthConfig): void {
        this.oauthService.configure(authConfig);
        this.oauthService.tokenValidationHandler = new JwksValidationHandler();
        this.oauthService.loadDiscoveryDocumentAndTryLogin();
    }
}

@Injectable({
    providedIn: 'root'
})
export class SimpleAuthenticationService implements CanActivate {

  public authBackend: AuthBackend =  AuthBackend.sceiba

  constructor(
      private env: EnvService,
      protected http: HttpClient,
      private _router: Router) { }

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
  getUserInfo(): Observable<any> {
      if (this.authBackend == AuthBackend.sceiba) {
          return this.http.get<any>(this.env.sceibaApi + 'me');
      } else if (this.authBackend == AuthBackend.cuor){
          return this.http.get<any>(this.env.cuorApi + 'me');
      }
  }

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    if(this.env.user != null){
      return true;
    }
    else{
        this._router.navigate(['/']);
        return false;
    }

  }




}

