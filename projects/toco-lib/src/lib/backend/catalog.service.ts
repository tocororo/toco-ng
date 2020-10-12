/*
 *   Copyright (c) 2020 Universidad de Pinar del Río "Hermanos Saíz Montes de Oca"
 *   All rights reserved.
 */


import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

import { HttpService, Response } from '@toco/core';
import { FilterHttpMap } from '@toco/filters';

import { EnvService } from '@toco/backend/env.service';

@Injectable()
export class CatalogService extends HttpService {

    constructor(private env: EnvService, protected http: HttpClient) {
        super(http);
    }

    getJournalsPage(count: number, page: number, parameters: Array<FilterHttpMap>): Observable<Response<any>> {
        try {
            let params = new HttpParams();
            if (parameters) {
                for (let i = 0; i < parameters.length; i++) {
                    params = params.set(parameters[i].field, parameters[i].value)
                }
            }
            const options = {
                params: params.set('size', count.toString(10)).set('page', (page).toString(10))
            };
            return this.http.get<Response<any>>(this.env.sceibaApi + 'source/journals', options);
        }
        catch (error) {
        }
    }

    getJournalsCount(): Observable<any> {
        try {
            return this.http.get<Response<any>>(this.env.sceibaApi + 'source/count');
        } catch (error) {

        }
    }

    getJournalsVocab(): Observable<Response<any>> {
        return this.http.get<Response<any>>(this.env.sceibaApi + 'taxonomy/vocabulary/list');
    }
    getTerminosByVocab(vocabId: string): Observable<any> {
        try {
            return this.http.get<any>(this.env.sceibaApi + 'taxonomy/term/list/' + vocabId);
        } catch (error) {

        }
    }

    //   getPeople():Observable<People_Response>{
    //     return this.http.get<People_Response>(this.dominio);

    //   }
    //   getPeopleById(id: number):Observable<Person_Response>{
    //         return this.http.get<Person_Response>(this.dominio+'/'+id);

    //     }

    //   getPeoplepaginator(inicio: number, cant: number):Observable<People_Response>{
    //       return this.http.get<People_Response>(this.dominio+'/'+inicio+'/'+cant);

    //   }
    //     addPeople(body):Observable<Response>{
    //       return this.http.post<Response>(this.dominio,body);
    //   }

    getSourceByUUID(uuid): Observable<Response<any>> {
        const req = this.env.sceibaApi + 'source/' + uuid;
        return this.http.get<Response<any>>(req);
    }
    getSourcesOrgAggregation(uuid): Observable<Response<any>> {
      const req = this.env.sceibaApi + 'source/aggs/org/' + uuid;
      return this.http.get<Response<any>>(req);
    }
}
