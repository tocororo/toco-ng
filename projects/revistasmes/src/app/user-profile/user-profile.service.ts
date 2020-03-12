import { Injectable } from '@angular/core';
import { EnvService } from '@tocoenv/tools/env.service';
import { Observable } from 'rxjs';
import { Response } from '@toco/tools/entities';
import { HttpClient } from '@angular/common/http';

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
