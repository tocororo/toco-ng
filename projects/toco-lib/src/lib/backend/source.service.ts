/*
 *   Copyright (c) 2020 Universidad de Pinar del Río "Hermanos Saíz Montes de Oca"
 *   All rights reserved.
 */

import {
  HttpBackend, HttpClient,
  HttpHeaders,
  HttpParams
} from "@angular/common/http";
import { Injectable } from "@angular/core";
import { OAuthStorage } from "angular-oauth2-oidc";
import { Observable } from "rxjs";
import { Environment } from "../core/env";
import { Response } from '../core/public-api';
import {
  Hit, SearchResponse, Source, SourceData, SourceVersion
} from "../entities/public-api";




@Injectable()
export class SourceService {
  private prefix = "source";

  private httpOptions = {
    headers: new HttpHeaders({
      "Content-Type": "application/json",
      Authorization: "Bearer ",
    }),
  };

  private token = "";
  httpSearch: HttpClient;
  constructor(
    private env: Environment,
    private http: HttpClient,
    private handler: HttpBackend,
    private oauthStorage: OAuthStorage
  ) {
    this.token = this.oauthStorage.getItem("access_token");

    // TODO: hay una mejor manera de hacer esto, creando diferentes y propios HttpClients que
    // tengan un comportamiento especifico (eg: sin/con autenticacion)
    // ver: https://github.com/angular/angular/issues/20203#issuecomment-369754776
    // otra solucion seria pasar parametros especiales como {ignore_auth = true} y que el
    // interceptor actue en consecuencia... .
    // https://github.com/angular/angular/issues/18155#issuecomment-382438006

    this.httpSearch = new HttpClient(handler);
  }

  getMySources(size: number = 10, page: number = 1, role='manager'): Observable<Response<any>> {
    let params = new HttpParams();
    params = params.set("size", size.toString(10));
    params = params.set("page", page.toString(10));

    const options = {
      params: params,
      // headers: this.headers
    };
    // this.httpOptions.headers = this.httpOptions.headers.set('Authorization', 'Bearer ' + this.token);

    const req = this.env.sceibaApi + this.prefix + "/me/"+ role + "/ALL";
    return this.http.get<Response<any>>(req, options);
  }

  getMySourcesAllRoles(): Observable<Response<any>> {
    const req = this.env.sceibaApi + this.prefix + "/me/ALL";
    return this.http.get<Response<any>>(req);
  }


  private adhocstringgify(source: SourceVersion) {

    if(source.data.organizations.length > 0){
      let orgs: string = JSON.stringify(source.data.organizations);
      console.log("orgs: ", orgs);

      let all = source.entitystringify();
      console.log("source: ", all);

      let from = all.search('"organizations"') + 16;

      let p1 = all.substr(0, from);
      console.log("p1: ", p1);

      let p2 = all.substr(from);
      console.log("p2: ", p2);

      let len = this.count_to_len(p2);
      console.log("len: ", len);

      let p3 = all.substr(from + len);
      console.log("p3: ", p3);

      return p1 + orgs + p3;
    } else {
      return source.entitystringify();
    }

  }
  private count_to_len(p2: string) {
    if (p2[0] == "[") {
      let len = 1;
      let count = 1;
      for (let index = 1; index < p2.length; index++) {
        const element = p2[index];
        len++;
        if (p2[index] === "[") count++;
        if (p2[index] === "]") count--;
        if (count === 0) return len;
      }
    }
  }
  editSource(source: SourceVersion, uuid: any): Observable<Response<any>> {
    // this.adhocstringgify(source)
    // // console.log(source)
    // let valu = source.entitystringify();
    // // console.log("s: ", valu)

    const req = this.env.sceibaApi + this.prefix + "/" + uuid + "/edit";
    return this.http.post<Response<any>>(
      req,
      this.adhocstringgify(source),
      this.httpOptions
    );
  }

  makeSourceAsApproved(source: SourceVersion,uuid): Observable<Response<any>> {
    const req = this.env.sceibaApi + this.prefix + "/" + uuid + "/publish";
    return this.http.post<Response<any>>(
      req,
      this.adhocstringgify(source),
      this.httpOptions
    );
  }

  makeSourceAsUnApproved(source: SourceVersion,uuid): Observable<Response<any>> {
    const req = this.env.sceibaApi + this.prefix + "/" + uuid + "/unpublish";
    return this.http.post<Response<any>>(
      req,
      this.adhocstringgify(source),
      this.httpOptions
    );
  }

  newSource(source: SourceVersion, uuid, role): Observable<Response<any>> {
    let params = new HttpParams();
    params = params.set("pid", uuid.toString());
    params = params.set("role", role.toString());

    const options = {
      params: params,
      // headers: this.headers
    };

    console.log('++++++++++++++++++++++++++++++++++++++++');
    console.log(this.adhocstringgify(source));
    console.log('++++++++++++++++++++++++++++++++++++++++');


    const req = this.env.sceibaApi + this.prefix + "/new";
    return this.http.post<Response<any>>(
      req,
      this.adhocstringgify(source),
      options
    );
  }

  getIssnInfo(issn): Observable<Response<any>> {
    const req = this.env.sceibaApi + this.prefix + "/journal/issn/" + issn;
    return this.http.get<Response<any>>(req);
  }

  getSourcesByTermUUID(uuid): Observable<Response<any>> {
    const req = this.env.sceibaApi + this.prefix + "/relations/" + uuid;
    return this.http.get<Response<any>>(req);
  }

  getSourceVersions(uuid): Observable<Response<any>> {
    this.httpOptions.headers = this.httpOptions.headers.set(
      "Authorization",
      "Bearer " + this.token
    );
    const req = this.env.sceibaApi + this.prefix + "/" + uuid + "/versions";
    return this.http.get<Response<any>>(req, this.httpOptions);
  }

  countSourcesByTerm(uuid, level = 0): Observable<Response<any>> {
    let params = new HttpParams();
    const options = {
      params: params.set("level", level.toString(10)),
    };
    const req =
      this.env.sceibaApi + this.prefix + "/relations/" + uuid + "/count";
    return this.http.get<Response<any>>(req, options);
  }

  getSourceByUUID(uuid): Observable<Response<any>> {
    // const req = this.env.sceibaApi + this.prefix + "/" + uuid;
    const req = this.env.sceibaApi  + this.prefix + '/' + uuid;
    return this.http.get<Response<SourceData>>(req);
  }

  permissionGetSourceEditors(uuid): Observable<Response<any>> {
    const req = this.env.sceibaApi  + this.prefix + '/permission/editor/' + uuid +'/users';
    return this.http.get<Response<any>>(req);
  }

  permissionSetSourceEditor(uuid, user, allow= false): Observable<Response<any>> {
    const req = this.env.sceibaApi  + this.prefix + '/permission/' + user + '/editor/' + uuid + ((allow) ? '/allow' : '/deny');
    return this.http.post<Response<any>>(
      req,
      null,
      this.httpOptions
    );
  }

  permissionGetSourceManagers(uuid): Observable<Response<any>> {
    const req = this.env.sceibaApi  + this.prefix + '/permission/manager/' + uuid +'/users';
    return this.http.get<Response<any>>(req);
  }

  permissionSetSourceManager(uuid, user, allow= false): Observable<Response<any>> {
    const req = this.env.sceibaApi  + this.prefix + '/permission/' + user + '/manager/' + uuid + ((allow) ? '/allow' : '/deny');
    return this.http.post<Response<any>>(
      req,
      null,
      this.httpOptions
    );
  }

  permissionGetOrganizationManagers(uuid): Observable<Response<any>> {
    const req = this.env.sceibaApi  + this.prefix + '/permission/organization/' + uuid +'/users';
    return this.http.get<Response<any>>(req);
  }

  permissionSetOrganizationManager(uuid, user, allow= false): Observable<Response<any>> {
    const req = this.env.sceibaApi  + this.prefix + '/permission/' + user + '/organization/' + uuid + ((allow) ? '/allow' : '/deny');
    return this.http.post<Response<any>>(
      req,
      null,
      this.httpOptions
    );
  }

  permissionGetTermManagers(uuid): Observable<Response<any>> {
    const req = this.env.sceibaApi  + this.prefix + '/permission/term/' + uuid +'/users';
    return this.http.get<Response<any>>(req);
  }

  permissionSetTermManager(uuid, user, allow= false): Observable<Response<any>> {
    const req = this.env.sceibaApi  + this.prefix + '/permission/' + user + '/term/' + uuid + ((allow) ? '/allow' : '/deny');
    return this.http.post<Response<any>>(
      req,
      null,
      this.httpOptions
    );
  }

}


@Injectable()
export class SourceServiceNoAuth {

  http: HttpClient;
  constructor(private env: Environment, private handler: HttpBackend) {

    // TODO: hay una mejor manera de hacer esto, creando diferentes y propios HttpClients que
    // tengan un comportamiento especifico (eg: sin/con autenticacion)
    // ver: https://github.com/angular/angular/issues/20203#issuecomment-369754776
    // otra solucion seria pasar parametros especiales como {ignore_auth = true} y que el
    // interceptor actue en consecuencia... .
    // https://github.com/angular/angular/issues/18155#issuecomment-382438006

    this.http = new HttpClient(handler);
  }

  getSourceByUUID(uuid): Observable<Hit<SourceData>> {
    // const req = this.env.sceibaApi + this.prefix + "/" + uuid;
    const req = this.env.sceibaApi + "/pid/source/" + uuid;
    return this.http.get<Hit<SourceData>>(req);
  }

  getSourceByISSN(issn): Observable<Hit<SourceData>> {
    // const req = this.env.sceibaApi + this.prefix + "/" + uuid;
    const req = this.env.sceibaApi + "source/byissn/" + issn;
    return this.http.get<Hit<SourceData>>(req);
  }

  getSourceByPID(pid): Observable<Hit<SourceData>> {
    // const req = this.env.sceibaApi + this.prefix + "/" + uuid;
    let params = new HttpParams();
    params = params.set('value', pid);

    const options = {
      params: params,
      // headers: this.headers
    };

    const req = this.env.sceibaApi + 'source/pid';
    return this.http.get<Hit<SourceData>>(req, options);
  }


  getSources(params: HttpParams): Observable<SearchResponse<Source>> {
    const options = {
      params: params,
      // headers: this.headers
    };
    // console.log(params);
    const req = this.env.sceibaApi + 'search/sources';
    return this.http.get<SearchResponse<Source>>(req, options);
  }

  getSourcesStats(topOrgId): Observable<Response<any>> {
    let params = new HttpParams();
    params = params.set('org', topOrgId);

    const options = {
      params: params,
      // headers: this.headers
    };
    const req = this.env.sceibaApi + 'source/stats';
    return this.http.get<Response<any>>(req, options);
  }

}
