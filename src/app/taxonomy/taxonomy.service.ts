import { Injectable, EventEmitter } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable, PartialObserver, Subject} from 'rxjs';

import { EnvService } from '@tocoenv/env.service';
import { Response } from '@toco/entities/response';
import { FormSuscriberInterface } from '@toco/forms/forms.service';
import { Vocabulary, Term } from '@toco/entities/taxonomy.entity';

// TODO: Esto esta bastante feo... hay que agregarle a vocabulario un nombre inmutable y referirse a este por aqui, no por los ids
export enum VocabulariesInmutableNames{
  INTITUTION = 1,
  DATABASES = 4, 
  DB_GROUPS = 5,
  PROVINCES = 3
}

@Injectable()
export class TaxonomyService {

  constructor(private env: EnvService, private http: HttpClient) { }

  private httpOptions = {
    headers: new HttpHeaders(
      {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer '
      })
  };
  token = '';

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

  vocabularyChanged(vocab: Vocabulary) {
    this.currentVocabularyChangedSource.next(vocab);
  }
  vocabulariesChange(resp: Response<any>) {
    this.vocabulariesChangeSource.next(resp);
  }

  termChange(resp: Response<any>) {
    this.termChangeSource.next(resp);
  }

  getVocabulary(id):Observable<Response<any>>{
    let req = this.env.sceibaApi + '/vocabulary/' + id;
    return this.http.get<Response<any>>(req);
  }

  newVocabulary(data: any): void {
    console.log(data);
    this.httpOptions.headers = this.httpOptions.headers.set('Authorization', 'Bearer ' + this.token);

    // tslint:disable-next-line: max-line-length
    this.http.post<Response<any>>( this.env.sceibaApi + '/vocabulary/new', data, this.httpOptions ).pipe().subscribe(this.vocabulariesChangeObserver);
  }

  editVocabulary(data: any, vocab: Vocabulary): void {
    console.log(data);
    this.httpOptions.headers = this.httpOptions.headers.set('Authorization', 'Bearer ' + this.token);

    // tslint:disable-next-line: max-line-length
    this.http.post<Response<any>>( this.env.sceibaApi + '/vocabulary/' + vocab.id + '/edit', data, this.httpOptions ).pipe().subscribe(this.vocabulariesChangeObserver);
  }

  getVocabularies():Observable<Response<any>>{
    let req = this.env.sceibaApi + '/vocabularies';
    return this.http.get<Response<any>>(req);
  }

  newTerm(data: any): void {
    console.log(data);
    this.httpOptions.headers = this.httpOptions.headers.set('Authorization', 'Bearer ' + this.token);

    // tslint:disable-next-line: max-line-length
    this.http.post<Response<any>>( this.env.sceibaApi + '/term/new', data, this.httpOptions ).pipe().subscribe(this.termChangeObserver);
  }

  editTerm(data: any, term: Term): void {
    console.log(data);
    this.httpOptions.headers = this.httpOptions.headers.set('Authorization', 'Bearer ' + this.token);

    // tslint:disable-next-line: max-line-length
    this.http.post<Response<any>>( this.env.sceibaApi + '/term/' + term.uuid + '/edit', data, this.httpOptions ).pipe().subscribe(this.termChangeObserver);
  }

  getTermsTreeByVocab(vocab: Vocabulary):Observable<Response<any>>{
    let req = this.env.sceibaApi + '/vocabulary/' + vocab.id + '/terms/tree';
    return this.http.get<Response<any>>(req);
  }
}
