import { Injectable, EventEmitter, Output } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable, Observer, from, PartialObserver} from 'rxjs';

import { EnvService } from '@tocoenv/env.service';
import { Response } from '@toco/entities/response';
import { FormSuscriberInterface } from '@toco/forms/forms.service';
import { response } from 'express';

@Injectable()
export class TaxonomyService implements FormSuscriberInterface{

  @Output() vocabularyAdded: EventEmitter<Response<any>> = new EventEmitter();

  private httpOptions = {
    headers: new HttpHeaders(
      {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer '
      })
  };
  token = '';

  private sendDataObserver: PartialObserver<Response<any>> = {
    next: (resp: Response<any>) => {
      this.vocabularyAdded.emit(resp);
    },

    error: (err: any) => {
        console.log('The observable got an error notification: ' + err + '.');
    },

    complete: () => {
      console.log('The observable got a complete notification.');
    }
  };

  constructor(private env: EnvService, private http: HttpClient) { }

  addData(data: any): void{
    console.log(data);
    this.httpOptions.headers = this.httpOptions.headers.set('Authorization', 'Bearer ' + this.token);

    // tslint:disable-next-line: max-line-length
    const resp = this.http.post<Response<any>>( this.env.sceibaApi + '/vocabulary/new', data, this.httpOptions ).pipe().subscribe(this.sendDataObserver);
    // console.log(resp);
  }


  getVocabularies():Observable<Response<any>>{
    let req = this.env.sceibaApi + '/vocabularies';
    return this.http.get<Response<any>>(req);
  }
}
