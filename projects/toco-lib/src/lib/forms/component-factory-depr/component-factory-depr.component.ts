/*
 *   Copyright (c) 2020 Universidad de Pinar del Río "Hermanos Saíz Montes de Oca"
 *   All rights reserved.
 */


import { Component, Input, OnInit } from '@angular/core';

import { FormFieldType } from '../form-field.control';

/**
 * This component represents a components' factory.
 * This component is deprecated.
 */
@Component({
    selector: 'component-factory-depr',
    templateUrl: './component-factory-depr.component.html',
    styleUrls: ['./component-factory-depr.component.scss']
})
export class ComponentFactory_Depr implements OnInit
{
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
        // console.log('ComponentFactory_Depr componentsContent: ', this.componentsContent);
    }
}
