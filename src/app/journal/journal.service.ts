import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {Observable, Observer, from} from "rxjs";
import { Journal } from '../entities/journal.entity';
import { EnvService } from '@tocoenv/env.service';
@Injectable()
export class JournalService {


  constructor(private env: EnvService, private http: HttpClient) { }

  getJournalsById(id: string):Observable<Journal>{
    let req = this.env.sceibaApi + '/sources/' + id;
    return this.http.get<Journal>(req);
  }
}
