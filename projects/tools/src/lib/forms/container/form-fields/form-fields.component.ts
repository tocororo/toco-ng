
import { Component, OnInit, Input } from '@angular/core';

import { FormFieldType } from '../../form-field.control';
import { InputContent } from '../../input/input.control';
import { ActionContent } from '../../action/action.control';
import { FormFieldContent_Experimental } from '../../experimental/form-field.control.experimental';

/**
 * @description
 * This componente defines a form fields collection. 
 * `fields` is an input atribute, that represents an array of `FormFieldContent` interface. 
 */
@Component({
    selector: 'toco-form-fields',
    templateUrl: './form-fields.component.html',
    styleUrls: ['./form-fields.component.scss']
})
export class FormFieldsComponent implements OnInit
{
    @Input()
    public fields: Array<InputContent | ActionContent | FormFieldContent_Experimental> | Array<any>;

    public readonly formFieldType: typeof FormFieldType = FormFieldType;

    public constructor()
    { }

    public ngOnInit(): void
    {
        if (this.fields == undefined) this.fields = [ ];
    }
}
