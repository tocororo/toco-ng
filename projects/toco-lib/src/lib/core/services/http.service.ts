/*
 *   Copyright (c) 2020 Universidad de Pinar del Río "Hermanos Saíz Montes de Oca"
 *   All rights reserved.
 */


import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";

export interface Response<T>
{
    message?: string;
    status?: string;
    data?: T;
}

export const ResponseStatus = {
    SUCCESS: 'success',
    ERROR: 'error'
};

@Injectable()
export class HttpService
{
    constructor(protected http: HttpClient)
    { }
}