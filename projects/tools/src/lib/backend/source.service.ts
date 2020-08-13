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
import { stringToKeyValue } from "@angular/flex-layout/extended/typings/style/style-transforms";

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
      params: params,
      // headers: this.headers
    };
    // this.httpOptions.headers = this.httpOptions.headers.set('Authorization', 'Bearer ' + this.token);

    const req = this.env.sceibaApi + this.prefix + "/me/sources/all";
    return this.http.get<Response<any>>(req, options);
  }

  newSource(source: any): void {}

  private adhocstringgify(source: SourceVersion) {
    let orgs: string = JSON.stringify(source.data.organizations);
    console.log("-------------------", orgs);

    let all = source.entitystringify();
    console.log("-------------------", all);

    let from = all.search('"organizations"') + 16;

    let p1 = all.substr(0, from);
    console.log(p1);

    let p2 = all.substr(from);
    console.log(p2);

    let len = this.count_to_len(p2);
    console.log(len);

    let p3 = all.substr(from + len);
    console.log(p3);

    return p1 + orgs + p3;
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
    // console.log(source)
    // let valu = source.entitystringify();
    // console.log("s: ", valu)

    const req = this.env.sceibaApi + this.prefix + "/" + uuid + "/edit";
    return this.http.post<Response<any>>(
      req,
      this.adhocstringgify(source),
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
      params: params.set("level", level.toString(10)),
    };
    const req =
      this.env.sceibaApi + this.prefix + "/relations/" + uuid + "/count";
    return this.http.get<Response<any>>(req, options);
  }
}
