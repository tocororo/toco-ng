
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpBackend, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

import { MessageService } from '../core/public-api';
import { EnvService } from '../backend/env.service';
import { Organization, Hit, SearchResponse } from '../entities/public-api';

/**
 * The URL to the root api.
 */
export const ROOT_API: string = 'api';

/**
 * The object with the URLs to the endpoint apis.
 */
export const ENDPOINT_APIS = {
    organizations: ROOT_API + '/organizations',
};

/**
 * The backend service in order to communicate with a remote server over HTTP.
 */
@Injectable({
    providedIn: 'root'
})
export class OrganizationService
{
    /**
     * The `httpOptions` object that contains the headers and will be passed to every `HttpClient` save method.
     */
    private readonly _httpOptions = {
        headers: new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': 'my-auth-token'
        })
    };

    public constructor(private _http: HttpClient, private _messageService: MessageService)
    { }

    /**
     * Gets data from the server.
     * If an error occurs, lets the app keep running by returning the specified safe `optionalResult`.
     * @param url The endpoint api URL.
     * @param optionalResult If an error occurs, lets the app keep running by returning a safe optional value
     * as the observable result.
     */
    public get<T>(url: string, optionalResult: T): Observable<T>
    {
        return this._http.get<T>(url).pipe(
            tap(_ => this.log(`fetched data from '${ url }'`)),
        );
    }

    /**
     * Gets data from the server that meets the specified `query`.
     * If an error occurs, lets the app keep running by returning the specified safe `optionalResult`.
     * @param url The endpoint api URL.
     * @param query The query to search.
     * @param optionalResult If an error occurs, lets the app keep running by returning a safe optional value
     * as the observable result.
     */
    public search<T>(url: string, query: string, optionalResult: T): Observable<T>
    {
        return this._http.get<T>(`${ url }/?${ query }`).pipe(
            tap(_ => this.log(`searched '${ query }' in '${ url }'`)),
        );
    }

    /**
     * Adds `data` to the server. Expects the server to generate an `id` for the new `data`.
     * If an error occurs, lets the app keep running by returning the specified safe `optionalResult`.
     * @param url The endpoint api URL.
     * @param data The data to add.
     * @param optionalResult If an error occurs, lets the app keep running by returning a safe optional value
     * as the observable result.
     */
    public add<T>(url: string, data: T, optionalResult: T): Observable<T>
    {
        /* Expects the server to generate an `id` for the new `data`. */

        return this._http.post<T>(url, data, this._httpOptions).pipe(
            tap(_ => this.log(`added ${ data } to '${ url }'`)),
        );
    }

    /**
     * Updates `data` on the server. Returns an Observable of that `data` if the `data` is inserted (does
     * not exist) on the server; otherwise, returns an Observable of null (if the `data` is only updated).
     * If an error occurs, lets the app keep running by returning the specified safe `optionalResult`.
     * @param url The endpoint api URL.
     * @param data The data to update.
     * @param optionalResult If an error occurs, lets the app keep running by returning a safe optional value
     * as the observable result.
     */
    public update<T>(url: string, data: T, optionalResult: T): Observable<T>
    {
        return this._http.put<T>(url, data, this._httpOptions).pipe(
            tap(_ => this.log(`updated ${ data } to '${ url }'`)),
        );
    }

    /**
     * Deletes data from the server.
     * If an error occurs, lets the app keep running by returning the specified safe `optionalResult`.
     * @param url The endpoint api URL.
     * @param id The unique identifier that identifies the data to delete.
     * @param optionalResult If an error occurs, lets the app keep running by returning a safe optional value
     * as the observable result.
     */
    public delete<T>(url: string, id: string, optionalResult: T): Observable<T>
    {
        return this._http.delete<T>(`${ url }/${ id }`, this._httpOptions).pipe(
            tap(_ => this.log(`deleted data with id = ${ id } from '${ url }'`)),
        );
    }

    /**
     * Logs an `OrganizationService` message with the `MessageService`.
     * @param message The message to log.
     */
    private log(message: string): void
    {
        this._messageService.add(`${ OrganizationService.name }: ${ message }.`);
    }
}


@Injectable()
export class OrganizationServiceNoAuth {

  http: HttpClient;
  path = 'organizations'
  constructor(private env: EnvService, private handler: HttpBackend) {

    this.http = new HttpClient(handler);
  }

  getOrganizationByUUID(uuid): Observable<Hit<Organization>> {
    // const req = this.env.sceibaApi + this.prefix + "/" + uuid;
    const req = this.env.cuorApi + this.path + "/" + uuid;
    return this.http.get<Hit<Organization>>(req);
  }

  getOrganizationRelationships(uuid, relType=null): Observable<Array<Hit<Organization>>> {
    const req = this.env.cuorApi + this.path + '/' + uuid + '/relationships';

    if (relType != null){
      let params = new HttpParams();
      params = params.set('type', relType);
      const options = {
        params: params,
      };
      return this.http.get<Array<Hit<Organization>>>(req, options);
    } else {
      return this.http.get<Array<Hit<Organization>>>(req);
    }

  }

  getOrganizationByPID(pid): Observable<Hit<Organization>> {
    // const req = this.env.sceibaApi + this.prefix + "/" + uuid;
    let params = new HttpParams();
    params = params.set('value', pid);

    const options = {
      params: params,
      // headers: this.headers
    };

    const req = this.env.cuorApi + this.path + '/pid';
    return this.http.get<Hit<Organization>>(req, options);
  }

  getOrganizations(params: HttpParams): Observable<SearchResponse<Organization>> {
    const options = {
      params: params,
      // headers: this.headers
    };
    console.log(params);
    const req = this.env.cuorApi + this.path + '/';
    console.log(req);

    return this.http.get<SearchResponse<Organization>>(req, options);
  }

}
