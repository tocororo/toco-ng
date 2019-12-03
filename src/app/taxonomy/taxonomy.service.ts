import { Injectable, EventEmitter } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable, PartialObserver, Subject} from 'rxjs';

import { EnvService } from '@tocoenv/env.service';
import { Response } from '@toco/entities/response';
import { FormSuscriberInterface } from '@toco/forms/forms.service';
import { Vocabulary } from '@toco/entities/taxonomy.entity';


@Injectable()
export class TaxonomyService implements FormSuscriberInterface{

  private httpOptions = {
    headers: new HttpHeaders(
      {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer '
      })
  };
  token = '';


  private currentVocabChangedSource = new Subject<Vocabulary>();
  currentVocabObservable = this.currentVocabChangedSource.asObservable();
  vocabChanged(vocab: Vocabulary) {
    this.currentVocabChangedSource.next(vocab);
  }

  private vocabularyAddedSource = new Subject<Response<any>>();
  vocabularyAddedObservable = this.vocabularyAddedSource.asObservable();
  vocabularyAdded(resp: Response<any>) {
    this.vocabularyAddedSource.next(resp);
  }

  private addDataObserver: PartialObserver<Response<any>> = {
    next: (resp: Response<any>) => {
      this.vocabularyAdded(resp);
    },

    error: (err: any) => {
        console.log('The observable got an error notification: ' + err + '.');
    },

    complete: () => {
      console.log('The observable got a complete notification.');
    }
  };

  addData(data: any): void{
    console.log(data);
    this.httpOptions.headers = this.httpOptions.headers.set('Authorization', 'Bearer ' + this.token);

    // tslint:disable-next-line: max-line-length
    this.http.post<Response<any>>( this.env.sceibaApi + '/vocabulary/new', data, this.httpOptions ).pipe().subscribe(this.addDataObserver);
  }

  constructor(private env: EnvService, private http: HttpClient) { }


  getVocabularies():Observable<Response<any>>{
    let req = this.env.sceibaApi + '/vocabularies';
    return this.http.get<Response<any>>(req);
  }

  getTermsTreeByVocab(name: string):Observable<Response<any>>{
    let req = this.env.sceibaApi + '/terms/'+name+'/tree';
    return this.http.get<Response<any>>(req);
  }
}
