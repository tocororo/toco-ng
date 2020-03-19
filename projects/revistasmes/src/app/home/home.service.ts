import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Response } from '@toco/tools/entities';
import { EnvService } from '@tocoenv/tools/env.service';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  constructor(private env: EnvService, protected http: HttpClient) { }

  getOrganizationInfo(organization: string): Observable<Response<any>> {
    return this.http.get<Response<any>>(this.env.sceibaApi + '/source/info/' + organization);
}
}
