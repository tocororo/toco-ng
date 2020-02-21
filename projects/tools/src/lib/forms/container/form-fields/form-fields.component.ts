
import { Component, OnInit, Input } from '@angular/core';

import { FormFieldType } from '../../form-field.control';
import { InputContent } from '../../input/input.control';
import { ActionContent } from '../../action/action.control';
import { FormFieldContent_Experimental } from '../../experimental/form-field.control.experimental';
import { FormGroup, ControlContainer } from '@angular/forms';

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
    // TODO: for datepicker, !!!! use https://stackblitz.com/edit/angular-material2-year-picker-7z9k4t?file=app%2Fcustom-datepicker%2Fyear-picker-component%2Fyear-picker.component.html

    @Input()
    public fields: Array<InputContent | ActionContent | FormFieldContent_Experimental> | Array<any>;

    @Input()
    public containerFormGroup: FormGroup;

    public readonly formFieldType: typeof FormFieldType = FormFieldType;

    public constructor(private controlContainer: ControlContainer)
    { }

    public ngOnInit(): void
    {
        if (this.fields == undefined) this.fields = [];
        console.log(this.fields);

    }
}
