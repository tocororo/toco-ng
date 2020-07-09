/*
 *   Copyright (c) 2020 Universidad de Pinar del Río "Hermanos Saíz Montes de Oca"
 *   All rights reserved.
 */


import { Component, OnInit, Input } from '@angular/core';

import { FormFieldType, FormSection } from '../../form-field.control';

/**
 * This component represents a components' factory. 
 * //TODO: Pensar en cómo hacer esto de forma dinámica con facilidades que brinda Angular. 
 */
@Component({
    selector: 'component-factory',
    templateUrl: './component-factory.component.html',
    styleUrls: ['./component-factory.component.scss']
})
export class ComponentFactory implements OnInit
{
    // TODO: for datepicker, !!!! use https://stackblitz.com/edit/angular-material2-year-picker-7z9k4t?file=app%2Fcustom-datepicker%2Fyear-picker-component%2Fyear-picker.component.html

    /**
     * Represents the `FormFieldType` enum for internal use. 
     */
    public readonly formFieldType: typeof FormFieldType;

    /**
     * Input field that contains the `FormSection` that represents the `FormGroup` or `FormArray` which the inserted control belongs to. 
     */
    @Input()
    public parentFormSection: FormSection;

    /**
     * Input field that represents an array of types which types inherit from `FormFieldContent` interface. 
     */
    @Input()
    public fieldsContent: Array<any>;

    public constructor()
    {
        this.formFieldType = FormFieldType;
    }

    public ngOnInit(): void
    {
        if (this.fieldsContent == undefined) this.fieldsContent = [];
        console.log('ComponentFactory: parentFormSection: ', this.parentFormSection, 'fieldsContent: ', this.fieldsContent);
    }
}
