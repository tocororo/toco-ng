
import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";

@Injectable()
export class HarvesterService
{
    public constructor(private http: HttpClient)
    { }
}
