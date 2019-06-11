import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {Observable, Observer} from "rxjs";
import { Response } from "../entities/response";
import { EnvService } from '@tocoenv/env.service';

@Injectable()
export class PagesService {

  constructor(private env: EnvService, private http: HttpClient) { }

  getPageBySlug(slug: string):Observable<Response<any>>{
    let params = new HttpParams();
    let options = {
      params: params.set('_format', 'json')
    };
    return this.http.get<any>(this.env.pagesApi+'/'+slug,options);
  }


}
