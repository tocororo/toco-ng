/*
 *   Copyright (c) 2020 Universidad de Pinar del Río "Hermanos Saíz Montes de Oca"
 *   All rights reserved.
 */


import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, PartialObserver, Subject } from 'rxjs';
import { OAuthStorage } from 'angular-oauth2-oidc';


import { Environment } from '../core/public-api';

import { Response } from '../core/public-api';
import { Vocabulary, Term } from '../entities/public-api';

// TODO: Poner todos los tipos de datos de retorno de Response.
// No puede haber en ningun servicio del backend un Response<any>

@Injectable()
export class TaxonomyService {

  private prefix = 'vocabularies';

  private httpOptions = {
    headers: new HttpHeaders(
      {
        'Content-Type': 'application/json',
      })
  };
  private token = '';

  constructor(private env: Environment, private http: HttpClient, private oauthStorage: OAuthStorage) {
    this.token = this.oauthStorage.getItem('access_token');
  }

  getVocabulary(id): Observable<Response<any>> {
    let req = this.env.sceibaApi + this.prefix + '/vocabulary/' + id;
    return this.http.get<Response<any>>(req);
  }

  getTermListByIDs(ids: number[]): Observable<Response<any>> {
    let p = '';
    ids.forEach(n => p = p + n.toString(10) + ',');
    p = p.substring(0, p.length - 1);
    let params = new HttpParams();
    const options = {
      params: params.set('ids', p)
    };
    const req = this.env.sceibaApi + this.prefix + '/term/inlist';
    return this.http.get<Response<any>>(req, options);
  }

  getTermByID(termID, level=10): Observable<Response<any>> {
    let params = new HttpParams();
    const options = {
      params: params.set('level', level.toString(10))
    };
    const req = this.env.sceibaApi + this.prefix + '/term/id/' + termID;
    return this.http.get<Response<any>>(req, options);
  }

  getTermByUUID(termUUID, level=10): Observable<Response<any>> {
    let params = new HttpParams();
    const options = {
      params: params.set('level', level.toString(10))
    };
    const req = this.env.sceibaApi + this.prefix + '/term/' + termUUID;
    return this.http.get<Response<any>>(req, options);
  }

  getTermsTreeByVocab(vocabId, level=10): Observable<Response<any>> {
    let params = new HttpParams();
    const options = {
      params: params.set('level', level.toString(10))
    };
    const req = this.env.sceibaApi + this.prefix + '/term/tree/' + vocabId;
    return this.http.get<Response<any>>(req, options);
  }

  newVocabulary(vocab: Vocabulary): Observable<Response<any>> {
    this.httpOptions.headers = this.httpOptions.headers.set('Authorization', 'Bearer ' + this.token);
    return this.http.post<Response<any>>(
      this.env.sceibaApi + this.prefix + '/vocabulary/new',
      vocab.entitystringify()
      ,
      this.httpOptions);
  }

  editVocabulary(vocab: Vocabulary): Observable<Response<any>> {
    this.httpOptions.headers = this.httpOptions.headers.set('Authorization', 'Bearer ' + this.token);
    return this.http.post<Response<any>>(
      this.env.sceibaApi + this.prefix + '/vocabulary/edit/' + vocab.id,
      vocab.entitystringify()
      ,
      this.httpOptions);
  }

  getVocabularies(): Observable<Response<any>> {
    return this.http.get<Response<any>>(this.env.sceibaApi + this.prefix + '/vocabulary/list');
  }

  newTerm(term: Term): Observable<Response<any>> {
    this.httpOptions.headers = this.httpOptions.headers.set('Authorization', 'Bearer ' + this.token);
    return this.http.post<Response<any>>(
      this.env.sceibaApi + this.prefix + '/term/new',
      term.entitystringify()
      ,
      this.httpOptions);
  }

  editTerm(term: Term): Observable<Response<any>> {
    this.httpOptions.headers = this.httpOptions.headers.set('Authorization', 'Bearer ' + this.token);
    return this.http.post<Response<any>>(
      this.env.sceibaApi + this.prefix + '/term/edit/' + term.uuid,
      term.entitystringify()
      ,
      this.httpOptions);
  }

  getCurrentUserPermissions(): Observable<Response<any>>{
    const req = this.env.sceibaApi + this.prefix + '/user/permissions';
    this.httpOptions.headers = this.httpOptions.headers.set('Authorization', 'Bearer ' + this.token);
    return this.http.get<Response<any>>(req, this.httpOptions);
  }
}
