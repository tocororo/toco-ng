
import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable, PartialObserver, Subject} from 'rxjs';


import { EnvService } from '@tocoenv/tools/env.service';
import { OAuthStorage } from 'angular-oauth2-oidc';

@Injectable()
export class SourceService {

    private prefix = 'source';

    private httpOptions = {
        headers: new HttpHeaders(
            {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer '
            })
    };
    private token = '';


    newSource(source: any): void {

    }

    editSource(source: any): void {

    }
}
