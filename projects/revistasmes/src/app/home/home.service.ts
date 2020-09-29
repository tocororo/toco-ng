
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

import { EnvService } from '@tocoenv/tools/env.service';

import { Response } from '@toco/tools/core';

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  constructor(private env: EnvService, protected http: HttpClient) { }

  getOrganizationInfo(organization: string): Observable<Response<any>> {
    return this.http.get<Response<any>>(this.env.sceibaApi + 'source/info/' + organization);
  }
  getSourcesOrgAggregation(uuid): Observable<Response<any>> {
    const req = this.env.sceibaApi + 'source/aggs/org/' + uuid;
    return this.http.get<Response<any>>(req);
  }
}
