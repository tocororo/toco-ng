/*
 *   Copyright (c) 2020 Universidad de Pinar del Río "Hermanos Saíz Montes de Oca"
 *   All rights reserved.
 */


import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, PartialObserver, Subject } from 'rxjs';

import { Vocabulary, Term, Response } from '@toco/tools/entities';

import { EnvService } from '@tocoenv/tools/env.service';
import { OAuthStorage } from 'angular-oauth2-oidc';



// TODO: Poner todos los tipos de datos de retorno de Response.
// No puede haber en ningun servicio del backend un Response<any>

@Injectable()
export class TaxonomyService {

  private prefix = 'taxonomy';

  private httpOptions = {
    headers: new HttpHeaders(
      {
        'Content-Type': 'application/json',
      })
  };
  private token = '';

  // private currentVocabularyChangedSource = new Subject<Vocabulary>();
  // currentVocabularyObservable = this.currentVocabularyChangedSource.asObservable();

  // private vocabulariesChangeSource = new Subject<Response<any>>();
  // vocabulariesChangeObservable = this.vocabulariesChangeSource.asObservable();

  // private termChangeSource = new Subject<Response<any>>();
  // termChangeObservable = this.termChangeSource.asObservable();

  // private vocabulariesChangeObserver: PartialObserver<Response<any>> = {
  //   next: (resp: Response<any>) => {
  //     this.vocabulariesChange(resp);
  //   },

  //   error: (err: any) => {
  //     console.log('The observable got an error notification: ' + err + '.');
  //   },

  //   complete: () => {
  //     console.log('The observable got a complete notification.');
  //   }
  // };

  // private termChangeObserver: PartialObserver<Response<any>> = {
  //   next: (resp: Response<any>) => {
  //     this.termChange(resp);
  //   },

  //   error: (err: any) => {
  //     console.log('The observable got an error notification: ' + err.message + '.');
  //   },

  //   complete: () => {
  //     console.log('The observable got a complete notification.');
  //   }
  // };

  constructor(private env: EnvService, private http: HttpClient, private oauthStorage: OAuthStorage) {
    this.token = this.oauthStorage.getItem('access_token');
  }

  // vocabularyChanged(vocab: Vocabulary) {
  //   this.currentVocabularyChangedSource.next(vocab);
  // }
  // vocabulariesChange(resp: Response<any>) {
  //   this.vocabulariesChangeSource.next(resp);
  // }

  // termChange(resp: Response<any>) {
  //   this.termChangeSource.next(resp);
  // }

  getVocabulary(id): Observable<Response<any>> {
    let req = this.env.sceibaApi + this.prefix + '/vocabulary/' + id;
    return this.http.get<Response<any>>(req);
  }

  newVocabulary(vocab: Vocabulary): Observable<Response<any>> {
    console.log(vocab)
    // this.httpOptions.headers = this.httpOptions.headers.set('Authorization', 'Bearer ' + this.token);

    // tslint:disable-next-line: max-line-length
    return this.http.post<Response<any>>(
      this.env.sceibaApi + this.prefix + '/vocabulary/new',
      vocab.stringify());
  }

  editVocabulary(vocab: Vocabulary): Observable<Response<any>> {
    console.log(vocab)
    // this.httpOptions.headers = this.httpOptions.headers.set('Authorization', 'Bearer ' + this.token);

    // tslint:disable-next-line: max-line-length
    return this.http.post<Response<any>>(
      this.env.sceibaApi + this.prefix + '/vocabulary/edit/' + vocab.id,
      vocab.stringify());
  }

  getVocabularies(): Observable<Response<any>> {
    return this.http.get<Response<any>>(this.env.sceibaApi + this.prefix + '/vocabulary/list');
  }

  newTerm(term: Term): Observable<Response<any>> {
    // this.httpOptions.headers = this.httpOptions.headers.set('Authorization', 'Bearer ' + this.token);
    let a = term.stringify()
    console.log(a);
    // tslint:disable-next-line: max-line-length
    return this.http.post<Response<any>>(
      this.env.sceibaApi + this.prefix + '/term/new',
      term.stringify());
      // ,
      // this.httpOptions);
  }

  editTerm(term: Term): Observable<Response<any>> {
    // this.httpOptions.headers = this.httpOptions.headers.set('Authorization', 'Bearer ' + this.token);
    return this.http.post<Response<any>>(
      this.env.sceibaApi + this.prefix + '/term/edit/' + term.uuid,
      term.stringify());
      // ,
      // this.httpOptions);
  }

  getTermByID(termID, level=10): Observable<Response<any>> {
    let params = new HttpParams();
    const options = {
      params: params.set('level', level.toString())
    };
    const req = this.env.sceibaApi + this.prefix + '/term/' + termID;
    return this.http.get<Response<any>>(req, options);
  }

  getTermByUUID(termUUID, level=10): Observable<Response<any>> {
    let params = new HttpParams();
    const options = {
      params: params.set('level', level.toString())
    };
    const req = this.env.sceibaApi + this.prefix + '/term/' + termUUID;
    return this.http.get<Response<any>>(req, options);
  }

  getTermsTreeByVocab(vocabId, level=10): Observable<Response<any>> {
    let params = new HttpParams();
    const options = {
      params: params.set('level', level.toString())
    };
    const req = this.env.sceibaApi + this.prefix + '/term/tree/' + vocabId;
    return this.http.get<Response<any>>(req, options);
  }

  getCurrentUserPermissions(): Observable<Response<any>>{
    const req = this.env.sceibaApi + this.prefix + '/user/permissions';
    this.httpOptions.headers = this.httpOptions.headers.set('Authorization', 'Bearer ' + this.token);
    return this.http.get<Response<any>>(req, this.httpOptions);
  }
}
