/*
 *   Copyright (c) 2020 Universidad de Pinar del Río "Hermanos Saíz Montes de Oca"
 *   All rights reserved.
 */

import {
  HttpBackend,
  HttpClient,
  HttpHeaders,
  HttpParams,
} from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";
import { Environment, Response } from "../core/public-api";
import {
  Organization,
  Record,
  SearchResponse,
  Source
} from "../entities/public-api";

@Injectable()
export class SearchService {
  private prefix = "search";

  // private headers = new HttpHeaders(
  //     {
  //       'Accept': 'application/json',
  //       'Content-Type': 'application/json',
  //       'Access-Control-Allow-Origin': '*'
  //     }
  // );
  public http: HttpClient;

  public constructor(private env: Environment, private handler: HttpBackend) {

    // TODO: hay una mejor manera de hacer esto, creando diferentes y propios HttpClients que
    // tengan un comportamiento especifico (eg: sin/con autenticacion)
    // ver: https://github.com/angular/angular/issues/20203#issuecomment-369754776
    // otra solucion seria pasar parametros especiales como {ignore_auth = true} y que el
    // interceptor actue en consecuencia... .
    // https://github.com/angular/angular/issues/18155#issuecomment-382438006

    this.http = new HttpClient(handler);
  }

  public getAggregationTerms(query): Observable<Response<any>> {
    const req = this.env.sceibaApi + "utils/agg/terms";
    let _query = JSON.stringify(query);
    console.log(_query);

    return this.http.post<Response<any>>(req, _query, {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
      }),
    });
  }

  public getRecords(params: HttpParams): Observable<SearchResponse<Record>> {
    const options = {
      params: params,
      // headers: this.headers
    };
    // console.log(params)
    const req = this.env.sceibaApi + this.prefix + "/records/";
    return this.http.get<SearchResponse<Record>>(req, options);
  }

  public getSources(params: HttpParams): Observable<SearchResponse<Source>> {
    const options = {
      params: params,
      // headers: this.headers
    };
    // console.log(params);
    const req = this.env.sceibaApi + this.prefix + "/sources";
    return this.http.get<SearchResponse<Source>>(req, options);
  }

  public getOrganizations(
    params: HttpParams
  ): Observable<SearchResponse<Organization>> {
    const options = {
      params: params,
      // headers: this.headers
    };
    // // console.log(params);
    const req = this.env.sceibaApi + this.prefix + "/organizations/";
    // // console.log(req);

    return this.http.get<SearchResponse<Organization>>(req, options);
  }

  public getOrganizationById(
    id: string
  ): Observable<SearchResponse<Organization>> {
    const req = this.env.cuorApi + "organizations/" + id + "/";
    // // console.log(req);

    return this.http.get<SearchResponse<Organization>>(req);
  }
  public updateOrganizations(data: Organization): Observable<Organization> {
    //TODO: Do this method...
    return of(null);
  }

  public getSourcesOrgAggregation(uuid): Observable<Response<any>> {
    const req = this.env.sceibaApi + "source/aggs/org/" + uuid;
    return this.http.get<Response<any>>(req);
  }
}
