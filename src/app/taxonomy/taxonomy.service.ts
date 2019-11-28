import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {Observable, Observer, from} from "rxjs";
import { Vocabulary, Term } from '../entities/taxonomy.entity';

import { EnvService } from '@tocoenv/env.service';
import { Response } from '@toco/entities/response';
@Injectable()
export class TaxonomyService {


  constructor(private env: EnvService, private http: HttpClient) { }

  getVocabularies():Observable<Response<any>>{
    let req = this.env.sceibaApi + '/vocabularies';
    return this.http.get<Response<any>>(req);
  }
}
