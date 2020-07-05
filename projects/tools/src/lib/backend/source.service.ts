/*
 *   Copyright (c) 2020 Universidad de Pinar del Río "Hermanos Saíz Montes de Oca"
 *   All rights reserved.
 */

import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Observable } from "rxjs";
import { OAuthStorage } from "angular-oauth2-oidc";

import { EnvService } from "@tocoenv/tools/env.service";

import { Response } from "@toco/tools/core";
import { SourceVersion } from "@toco/tools/entities";

@Injectable()
export class SourceService {
  private prefix = "source";

  private httpOptions = {
    headers: new HttpHeaders({
      "Content-Type": "application/json",
      Authorization: "Bearer "
    })
  };

  private token = "";

  constructor(
    private env: EnvService,
    private http: HttpClient,
    private oauthStorage: OAuthStorage
  ) {
    this.token = this.oauthStorage.getItem("access_token");
  }

  getMySources(size: number = 10, page: number = 1): Observable<Response<any>> {
    let params = new HttpParams();
    params = params.set("size", size.toString(10));
    params = params.set("page", page.toString(10));

    const options = {
      params: params
      // headers: this.headers
    };
    // this.httpOptions.headers = this.httpOptions.headers.set('Authorization', 'Bearer ' + this.token);

    const req = this.env.sceibaApi + this.prefix + "/me/sources/all";
    return this.http.get<Response<any>>(req, options);
  }

  newSource(source: any): void {}

  editSource(source: SourceVersion, uuid: any): Observable<Response<any>> {
    console.log(source.stringify());

    const req = this.env.sceibaApi + this.prefix + "/" + uuid + "/edit";
    return this.http.post<Response<any>>(
      req,
      source.stringify(),
      this.httpOptions
    );
  }

  getIssnInfo(issn): Observable<Response<any>> {
    const req = this.env.sceibaApi + this.prefix + "/journal/issn/" + issn;
    return this.http.get<Response<any>>(req);
  }

  getSourceByUUID(uuid): Observable<Response<any>> {
    const req = this.env.sceibaApi + this.prefix + "/" + uuid;
    return this.http.get<Response<any>>(req);
  }

  getSourcesByTermUUID(uuid): Observable<Response<any>> {
    const req = this.env.sceibaApi + this.prefix + "/relations/" + uuid;
    return this.http.get<Response<any>>(req);
  }

  getSourceByUUIDWithVersions(uuid): Observable<Response<any>> {
    this.httpOptions.headers = this.httpOptions.headers.set(
      "Authorization",
      "Bearer " + this.token
    );
    const req = this.env.sceibaApi + this.prefix + "/" + uuid + "/versions";
    return this.http.get<Response<any>>(req, this.httpOptions);
  }

  makeSourceAsApproved(uuid): Observable<Response<any>> {
    const req = this.env.sceibaApi + this.prefix + "/" + uuid + "/approved";
    return this.http.get<Response<any>>(req, this.httpOptions);
  }

  countSourcesByTerm(uuid, level = 0): Observable<Response<any>> {
    let params = new HttpParams();
    const options = {
      params: params.set("level", level.toString(10))
    };
    const req =
      this.env.sceibaApi + this.prefix + "/relations/" + uuid + "/count";
    return this.http.get<Response<any>>(req, options);
  }
}
