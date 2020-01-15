
import { Component, OnInit, Input } from '@angular/core';

import { FormFieldType, FormFieldContent } from '../../form-field.control';

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
    public fields: Array<FormFieldContent>;

    public readonly formFieldType: typeof FormFieldType = FormFieldType;

    public constructor()
    { }

    public ngOnInit(): void
    {
        if (this.fields == undefined) this.fields = [ ];
    }
}
