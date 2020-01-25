
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, PartialObserver, Subject } from 'rxjs';

import { Vocabulary, Term, Response } from '@toco/tools/entities';

import { EnvService } from '@tocoenv/tools/env.service';
import { OAuthStorage } from 'angular-oauth2-oidc';

// TODO: Esto esta bastante feo... hay que agregarle a vocabulario un nombre inmutable y referirse a este por aqui, no por los ids
export enum VocabulariesInmutableNames {
  INTITUTION = 1,
  DATABASES = 4,
  DB_GROUPS = 5,
  PROVINCES = 3,
  SUBJECTS = 2,
  LICENCES = 6
}

@Injectable()
export class TaxonomyService {

  private prefix = 'taxonomy';

  private httpOptions = {
    headers: new HttpHeaders(
      {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer '
      })
  };
  private token = '';

  private currentVocabularyChangedSource = new Subject<Vocabulary>();
  currentVocabularyObservable = this.currentVocabularyChangedSource.asObservable();

  private vocabulariesChangeSource = new Subject<Response<any>>();
  vocabulariesChangeObservable = this.vocabulariesChangeSource.asObservable();

  private termChangeSource = new Subject<Response<any>>();
  termChangeObservable = this.termChangeSource.asObservable();

  private vocabulariesChangeObserver: PartialObserver<Response<any>> = {
    next: (resp: Response<any>) => {
      this.vocabulariesChange(resp);
    },

    error: (err: any) => {
      console.log('The observable got an error notification: ' + err + '.');
    },

    complete: () => {
      console.log('The observable got a complete notification.');
    }
  };

  private termChangeObserver: PartialObserver<Response<any>> = {
    next: (resp: Response<any>) => {
      this.termChange(resp);
    },

    error: (err: any) => {
      console.log('The observable got an error notification: ' + err.message + '.');
    },

    complete: () => {
      console.log('The observable got a complete notification.');
    }
  };

  constructor(private env: EnvService, private http: HttpClient, private oauthStorage: OAuthStorage) {
    this.token = this.oauthStorage.getItem('access_token');
  }

  vocabularyChanged(vocab: Vocabulary) {
    this.currentVocabularyChangedSource.next(vocab);
  }
  vocabulariesChange(resp: Response<any>) {
    this.vocabulariesChangeSource.next(resp);
  }

  termChange(resp: Response<any>) {
    this.termChangeSource.next(resp);
  }

  getVocabulary(id): Observable<Response<any>> {
    let req = this.env.sceibaApi + this.prefix + '/vocabulary/' + id;
    return this.http.get<Response<any>>(req);
  }

  newVocabulary(vocab: Vocabulary): void {
    this.httpOptions.headers = this.httpOptions.headers.set('Authorization', 'Bearer ' + this.token);

    // tslint:disable-next-line: max-line-length
    this.http.post<Response<any>>(this.env.sceibaApi + this.prefix + '/vocabulary/new', vocab.stringify(), this.httpOptions).pipe().subscribe(this.vocabulariesChangeObserver);
  }

  editVocabulary(vocab: Vocabulary): void {
    this.httpOptions.headers = this.httpOptions.headers.set('Authorization', 'Bearer ' + this.token);

    // tslint:disable-next-line: max-line-length
    this.http.post<Response<any>>(
      this.env.sceibaApi + this.prefix + '/vocabulary/edit/' + vocab.id,
      vocab.stringify(),
      this.httpOptions)
      .pipe().subscribe(this.vocabulariesChangeObserver);
  }

  getVocabularies(): Observable<Response<any>> {
    return this.http.get<Response<any>>(this.env.sceibaApi + this.prefix + '/vocabulary/list');
  }

  newTerm(term: Term): void {
    this.httpOptions.headers = this.httpOptions.headers.set('Authorization', 'Bearer ' + this.token);
    let a = term.stringify()
    console.log(a);
    // tslint:disable-next-line: max-line-length
    this.http.post<Response<any>>(
      this.env.sceibaApi + this.prefix + '/term/new',
      term.stringify(),
      this.httpOptions)
      .pipe().subscribe(this.termChangeObserver);
  }

  editTerm(term: Term): void {
    this.httpOptions.headers = this.httpOptions.headers.set('Authorization', 'Bearer ' + this.token);
    this.http.post<Response<any>>(
      this.env.sceibaApi + this.prefix + '/term/edit/' + term.uuid,
      term.stringify(),
      this.httpOptions)
      .pipe().subscribe(this.termChangeObserver);
  }

  getTermsTreeByVocab(vocab: Vocabulary): Observable<Response<any>> {
    const req = this.env.sceibaApi + this.prefix + '/term/tree/' + vocab.id;
    return this.http.get<Response<any>>(req);
  }

  getCurrentUserPermissions(): Observable<Response<any>>{
    const req = this.env.sceibaApi + this.prefix + '/user/permissions';
    this.httpOptions.headers = this.httpOptions.headers.set('Authorization', 'Bearer ' + this.token);
    return this.http.get<Response<any>>(req, this.httpOptions);
  }
}
