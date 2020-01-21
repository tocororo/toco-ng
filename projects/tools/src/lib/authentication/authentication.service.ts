import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';

import { OAuthStorage } from 'angular-oauth2-oidc';
import { Response } from '../entities/response';
import { EnvService } from '@tocoenv/tools/env.service';

@Injectable()
/**
 * This service handles the behavior when a user authentications and
 * gives information about it.
 */
export class AuthenticationService implements CanActivate{

  constructor(
    private env: EnvService,
    private oauthStorage: OAuthStorage,
    protected http: HttpClient,
    private _router: Router) { }

  private authenticationSubject : Subject<boolean> = new Subject();
  /**
   * Observer to handles the behavior when a user authenticates
   */
  public authenticationSubjectObservable = this.authenticationSubject.asObservable();

  /**
   * notifies by an observable if the user is authenticated
   * for the knowledge of who uses it
   * @param islogged 'true' is loggued or 'false' other way
   */
  logguedChange(islogged: boolean){
    this.authenticationSubject.next(islogged);
    
  }
  /**
   * gives information about an user authenticated
   */
  getUserInfo(): Observable<Response<any>> {
    return this.http.get<Response<any>>(this.env.sceibaApi + '/me', {
      headers: {
        'Authorization': 'Bearer '+this.oauthStorage.getItem('access_token')
      }
    });
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
}
