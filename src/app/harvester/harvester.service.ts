import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {Observable, Observer} from "rxjs";
import { Response } from "../entities/response";
import { Journal, JournalInformation, ISSN } from '../entities/journal.entity';
import { environment } from '../../environments/environment';
import { Entity } from '../entities/entity';
import { FilterHttpMap } from '../filters/filter-item';
@Injectable()
export class HarvesterService {

  constructor(private http: HttpClient) { }

}