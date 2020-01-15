
import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

import { Journal } from '@toco/tools/entities';
import { FormSuscriberInterface } from '@toco/tools/forms';

import { EnvService } from '@tocoenv/tools/env.service';

@Injectable()
export class JournalService implements FormSuscriberInterface
{
    public constructor(private env: EnvService, private http: HttpClient)
    { }

    public getJournalsById(uuid: string):Observable<Journal>
    {
        let req = this.env.sceibaApi + '/source/' + uuid;

        return this.http.get<Journal>(req);
    }

    public addData(data: any): void
    {
        throw new Error("'addData' method not implemented.");
    }

    public newEntity(data: any): void
    {
        throw new Error("'newEntity' method not implemented.");
    }
}
