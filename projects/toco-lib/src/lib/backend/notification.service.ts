import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { HttpService, Response } from '../core/public-api';
import { EnvService } from '../backend/env.service';

@Injectable()
export class NotificationService extends HttpService {


    constructor(private env: EnvService, protected http: HttpClient) {
        super(http);
    }

    getNotificationsList(count: number, page: number): Observable<Response<any>> {
        return this.http.get<Response<any>>(this.env.sceibaApi + 'notification/list');
    }


    setNotificationViewed(id: number): Observable<Response<any>>{
        return this.http.get<Response<any>>(this.env.sceibaApi+'notification/viewed/'+id);
    }
}
