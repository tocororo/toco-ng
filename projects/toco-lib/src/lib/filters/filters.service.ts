/*
 *   Copyright (c) 2020 Universidad de Pinar del Río "Hermanos Saíz Montes de Oca"
 *   All rights reserved.
 */


import { Injectable, Output, EventEmitter } from '@angular/core';

import { FilterHttpMap } from './filter-item';

@Injectable()
export class FiltersService {

    params: Array<FilterHttpMap> = new Array();
    // httpParams: HttpParams = new HttpParams();
    autocompleteFilter: Array<AutocompleteFilter> = new Array();

    @Output() paramsChanged: EventEmitter<Array<FilterHttpMap>> = new EventEmitter();

    constructor()
    { }

    /**
     * 
     * @param field el nombre del campo que se esta filtrando (title, etc...)
     * @param value el valor del filtro
     * @param emitEvent si se emite o no el evento de cambio de parametros, para los que estan suscritos.  
     */
    changeFilter(field? : string, value?: any, emitEvent:boolean = true): void{
        if(this.params.find(x => x.field == field)){
            this.params.find(x => x.field == field).value = value;
        }
        else if(field && value){
            this.params.push(new FilterHttpMap(field, value));
        }
        /*
        crear el httpParams... a partir del params... 
        */
        // this.httpParams.set(field, value);
        
        if(emitEvent) 
            this.paramsChanged.emit(this.params);
    }

    deleteParameter(field:string):void{
        var paramToDelete = this.params.find(x => x.field == field);
        if(paramToDelete){
            this.params.splice(this.params.indexOf(this.params.find(x => x.field == field)), 1)
            this.paramsChanged.emit(this.params);
        }
    }


    /**
     * Especifico para el filtro de terminos.
     * @param termValue identificador del termino por el cual se esta filtrando
     * @param isdelete especifica si se va a eliminar o adicionar el @param termValue
     */
    changeAutocompleteFilter(name: string, value: string){
        let isexist = false;
        this.autocompleteFilter.forEach(filter =>{
            if(filter.name == name){
                filter.value = value
                isexist = true;
            }
        });
        if(!isexist){
            this.autocompleteFilter.push(new AutocompleteFilter(name,value))
        }
        this.createAutocompleteFilterValue();
    }

    deleteAutocompleteFilter(name: string){
        this.autocompleteFilter.splice(this.autocompleteFilter.indexOf(this.autocompleteFilter.find(x => x.name == name)), 1)
        this.createAutocompleteFilterValue();
    }
    
    createAutocompleteFilterValue(){
        let emitValue = this.autocompleteFilter[0].value;
        for (let index = 1; index < this.autocompleteFilter.length; index++) {
            emitValue = emitValue + ','+ this.autocompleteFilter[index].value;

        }

        this.changeFilter('terms', emitValue, true);
    }
}

export class AutocompleteFilter
{
    name: string;
    value: string;

    constructor(name: string, value: string){
        this.name = name;
        this.value = value;
    }
}