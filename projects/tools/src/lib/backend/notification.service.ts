import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

import { HttpService, Response } from '../entities';
import { EnvService } from '@tocoenv/tools/env.service';
import { OAuthStorage } from 'angular-oauth2-oidc';

@Injectable()
export class NotificationService extends HttpService {


    constructor(private env: EnvService, protected http: HttpClient) {
        super(http);
    }

    getNotificationsList(count: number, page: number): Observable<Response<any>> {
        return this.http.get<Response<any>>(this.env.sceibaApi + 'notification/list');
    }


    setNotificationViewed(id: number): Observable<Response<any>>{
        return this.http.get<Response<any>>(this.env.sceibaApi+'notification/viewed/'+id);
    }
}
