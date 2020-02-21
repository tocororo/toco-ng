
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { OAuthStorage } from 'angular-oauth2-oidc';

import { Response, SourceVersion } from '@toco/tools/entities';
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

    getMySources(): Observable<Response<any>> {
        this.httpOptions.headers = this.httpOptions.headers.set('Authorization', 'Bearer ' + this.token);

        const req = this.env.sceibaApi + this.prefix + '/me/sources/all';
        return this.http.get<Response<any>>(req, this.httpOptions);
    }

    newSource(source: any): void {

    }

    editSource(source: SourceVersion, uuid: any): Observable<Response<any>> {
        console.log(source.stringify());
        
        const req = this.env.sceibaApi + this.prefix + '/' + uuid + '/edit';
        return this.http.post<Response<any>>(req, source.stringify(), this.httpOptions);
    }

    getIssnInfo(issn): Observable<Response<any>> {
        const req = this.env.sceibaApi + this.prefix + '/journal/issn/' + issn;
        return this.http.get<Response<any>>(req);
    }

    getSourceByUUID(uuid): Observable<Response<any>> {
        const req = this.env.sceibaApi + this.prefix + '/' + uuid;
        return this.http.get<Response<any>>(req);
    }

    getSourceByUUIDWithVersions(uuid): Observable<Response<any>> {
        this.httpOptions.headers = this.httpOptions.headers.set('Authorization', 'Bearer ' + this.token);
        const req = this.env.sceibaApi + this.prefix + '/' + uuid + '/versions';
        return this.http.get<Response<any>>(req, this.httpOptions);
    }

    makeSourceAsApproved(uuid): Observable<Response<any>> {
        const req = this.env.sceibaApi + this.prefix + '/' + uuid + '/approved';
        return this.http.get<Response<any>>(req, this.httpOptions);
    }
}
