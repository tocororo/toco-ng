
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { OAuthStorage } from 'angular-oauth2-oidc';

import { Response } from '@toco/tools/entities';
import { EnvService } from '@tocoenv/tools/env.service';

@Injectable()
export class SourceService {

    private prefix = 'source';

    private httpOptions = {
        headers: new HttpHeaders(
            {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer '
        })
    };

    private token = '';

    constructor(private env: EnvService, private http: HttpClient, private oauthStorage: OAuthStorage) {
        this.token = this.oauthStorage.getItem('access_token');
    }

    getMySources(): Observable<Response<any>>{
        this.httpOptions.headers = this.httpOptions.headers.set('Authorization', 'Bearer ' + this.token);

        const req = this.env.sceibaApi + this.prefix + '/me/sources/all';
        return this.http.get<Response<any>>(req, this.httpOptions);
    }

    newSource(source: any): void {

    }

    editSource(source: any): void {

    }

    getSourceByUUID(uuid): Observable<Response<any>> {
        const req = this.env.sceibaApi + this.prefix + '/' + uuid;
        return this.http.get<Response<any>>(req);
    }

    getSourceByUUIDWithVersions(uuid): Observable<Response<any>> {
        this.httpOptions.headers = this.httpOptions.headers.set('Authorization', 'Bearer ' + this.token);
        const req = this.env.sceibaApi + this.prefix + '/' + uuid + '/versions';
        return this.http.get<Response<any>>(req,this.httpOptions );
    }
}
