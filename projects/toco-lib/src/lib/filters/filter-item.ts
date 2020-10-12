/*
 *   Copyright (c) 2020 Universidad de Pinar del Río "Hermanos Saíz Montes de Oca"
 *   All rights reserved.
 */


import { Type } from '@angular/core';

export class FilterItem {
    constructor(public component: Type<any>, public data: any)
    { }
}

export class FilterHttpMap{
    field: string;
    value: any;

    constructor(field: string, value: string){
        this.field=field;
        this.value=value;
    }
}