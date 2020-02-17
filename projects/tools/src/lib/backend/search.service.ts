
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { OAuthStorage } from 'angular-oauth2-oidc';

import { SearchResponse, Response } from '@toco/tools/entities';
import { EnvService } from '@tocoenv/tools/env.service';

@Injectable()
export class SearchService {

  private prefix = 'records';

  constructor(private env: EnvService, private http: HttpClient) {
  }

  getAggregation(field, size=10): Observable<Response<any>> {
    let params = new HttpParams();
    const options = {
      params: params.set('size', size.toString())
    };
    const req = this.env.sceibaApi + this.prefix + '/aggs/' + field;
    return this.http.get<Response<any>>(req, options);
  }

}
