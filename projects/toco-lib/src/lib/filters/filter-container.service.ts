/*
 *   Copyright (c) 2020 Universidad de Pinar del Río "Hermanos Saíz Montes de Oca"
 *   All rights reserved.
 */


import { Injectable, Output, EventEmitter } from '@angular/core';

@Injectable()
export class FilterContainerService {

    @Output() emitter: EventEmitter<number> = new EventEmitter();
    
    constructor()
    { }

    filterDeleted(filterIndex:number): void{
        this.emitter.emit(filterIndex);
    }
}
