/*
 *   Copyright (c) 2020 Universidad de Pinar del Río "Hermanos Saíz Montes de Oca"
 *   All rights reserved.
 */


import { Component, OnInit, Input } from '@angular/core';

import { FormFieldType } from '../form-field.control';

/**
 * This component represents a components' factory. 
 * //TODO: Pensar en cómo hacer esto de forma dinámica con facilidades que brinda Angular. 
 */
@Component({
    selector: 'component-factory-depr',
    templateUrl: './component-factory-depr.component.html',
    styleUrls: ['./component-factory-depr.component.scss']
})
export class ComponentFactory_Depr implements OnInit
{
    // TODO: for datepicker, !!!! use https://stackblitz.com/edit/angular-material2-year-picker-7z9k4t?file=app%2Fcustom-datepicker%2Fyear-picker-component%2Fyear-picker.component.html

    /**
     * Represents the `FormFieldType` enum for internal use. 
     */
    public readonly formFieldType: typeof FormFieldType;

    /**
     * Input field that represents an array of types which types inherit from `FormFieldContent` interface. 
     * This array contains the content of the components that the factory is going to create. 
     */
    @Input()
    public componentsContent: any[];

    public constructor()
    {
        this.formFieldType = FormFieldType;

        this.componentsContent = [];
    }

    public ngOnInit(): void
    {
        console.log('ComponentFactory_Depr componentsContent: ', this.componentsContent);
    }
}
