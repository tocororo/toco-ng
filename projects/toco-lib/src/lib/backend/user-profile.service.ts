import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { Environment } from '../core/public-api';

import { Response } from '../core/public-api';

@Injectable({
  providedIn: 'root'
})
export class UserProfileService {

  constructor(
      private env: Environment,
      protected http: HttpClient) { }

  /**
   * gives information about an user authenticated
   */
  getUserInfo(): Observable<Response<any>> {
    return this.http.get<Response<any>>(this.env.sceibaApi + 'me');
  }

  getUsers(size= 10, page= 1, query= ''): Observable<Response<any>> {
    let params = new HttpParams();
    params = params.set('size', size.toString(10));
    params = params.set('page', page.toString(10));
    params = params.set('query', query);
    const options = {
      params: params
    };
    return this.http.get<Response<any>>(this.env.sceibaApi + 'profile/search', options);
  }


}
