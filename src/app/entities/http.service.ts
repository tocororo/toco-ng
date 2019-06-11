import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";

@Injectable()
export class HttpService {

  constructor(protected http: HttpClient) { }


}