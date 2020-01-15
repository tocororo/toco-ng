import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';

import { OAuthStorage } from 'angular-oauth2-oidc';
import { Response } from '../entities/response';
import { EnvService } from '@tocoenv/tools/env.service';

@Injectable()
/**
 * This service handles the behavior when a user authentications and
 * gives information about it.
 */
export class AuthenticationService {

  constructor(
    private env: EnvService,
    private oauthStorage: OAuthStorage,
    protected http: HttpClient) { }

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
}
