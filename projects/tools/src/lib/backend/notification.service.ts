import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

import { HttpService, Response } from '../entities';
import { EnvService } from '@tocoenv/tools/env.service';
import { OAuthStorage } from 'angular-oauth2-oidc';

@Injectable()
export class NotificationService extends HttpService {

    private httpOptions = {
        headers: new HttpHeaders(
            {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer '
            }
        ),
        params: new HttpParams()
    };
    private token = '';

    constructor(private env: EnvService, protected http: HttpClient, private oauthStorage : OAuthStorage) {
        super(http);
        this.token = this.oauthStorage.getItem('access_token');
    }

    getNotificationsList(count: number, page: number): Observable<Response<any>> {
        this.httpOptions.headers = this.httpOptions.headers.set('Authorization', 'Bearer ' + this.token);
        this.httpOptions.params = this.httpOptions.params.set('count', count.toString()).set('page', (page).toString())

        return this.http.get<Response<any>>(this.env.sceibaApi + 'notification/list', this.httpOptions);
    }
    setNotificationViewed(id: number): Observable<Response<any>>{
        this.httpOptions.headers = this.httpOptions.headers.set('Authorization', 'Bearer ' + this.token);
        return this.http.get<Response<any>>(this.env.sceibaApi+'notification/viewed/'+id, this.httpOptions);
    }
}
