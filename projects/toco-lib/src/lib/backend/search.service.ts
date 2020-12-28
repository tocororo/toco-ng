/*
 *   Copyright (c) 2020 Universidad de Pinar del Río "Hermanos Saíz Montes de Oca"
 *   All rights reserved.
 */


import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams, HttpBackend } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { Response } from '../core/public-api';
import { SearchResponse, Record, Source, Organization } from '../entities/public-api';
import { Environment } from '../core/public-api';

@Injectable()
export class SearchService {

  private prefix = 'records';

  // private headers = new HttpHeaders(
  //     {
  //       'Accept': 'application/json',
  //       'Content-Type': 'application/json',
  //       'Access-Control-Allow-Origin': '*'
  //     }
  // );
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

  getAggregation(field, size = 10): Observable<Response<any>> {
    let params = new HttpParams();
    const options = {
      params: params.set('size', size.toString(10))
    };
    const req = this.env.sceibaApi + this.prefix + '/aggs/' + field;
    return this.http.get<Response<any>>(req, options);
  }

  getRecords(params: HttpParams): Observable<SearchResponse<Record>> {
    const options = {
      params: params,
      // headers: this.headers
    };
    console.log(params)
    const req = this.env.sceibaApi + 'records/';
    return this.http.get<SearchResponse<Record>>(req, options);
  }

  getSources(params: HttpParams): Observable<SearchResponse<Source>> {
    const options = {
      params: params,
      // headers: this.headers
    };
    console.log(params);
    const req = this.env.sceibaApi + 'sources';
    return this.http.get<SearchResponse<Source>>(req, options);
  }

  getOrganizations(params: HttpParams): Observable<SearchResponse<Organization>> {
    const options = {
      params: params,
      // headers: this.headers
    };
    // console.log(params);
    const req = this.env.cuorApi + 'organizations/';
    // console.log(req);

    return this.http.get<SearchResponse<Organization>>(req, options);
  }

  getOrganizationById(id: string): Observable<SearchResponse<Organization>> {
    const req = this.env.cuorApi + 'organizations/' + id + '/';
    // console.log(req);

    return this.http.get<SearchResponse<Organization>>(req);
  }
  updateOrganizations(data: Organization): Observable<Organization> {
    //TODO: Do this method...
    return of(null);
  }

  getSourcesOrgAggregation(uuid): Observable<Response<any>> {
    const req = this.env.sceibaApi + 'source/aggs/org/' + uuid;
    return this.http.get<Response<any>>(req);
  }

}
