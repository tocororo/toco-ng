import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

import { EnvService } from '@tocoenv/tools/env.service';

import { Response } from '@toco/tools/core';

@Injectable({
  providedIn: 'root'
})
export class UserProfileService {

  constructor(
      private env: EnvService,
      protected http: HttpClient) { }

  /**
  * gives information about an user authenticated
  */
  getUserInfo(): Observable<Response<any>> {
    return this.http.get<Response<any>>(this.env.sceibaApi + 'me');
  }
}
