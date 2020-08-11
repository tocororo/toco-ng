
import { Input, OnInit } from '@angular/core';

import { InputContent } from '../input/input.control';
import { FormFieldControl } from '../form-field.control';
import { FormControl, FormGroup } from '@angular/forms';

/**
 * A interface that represents the content of a `FormFieldControl_Experimental`. 
 */
export interface FormFieldContent_Experimental extends InputContent
{

}

/**
 * Represents the base abstract class for a control that is treated as a form field.
 */
export abstract class FormFieldControl_Experimental implements OnInit
{
    /**
     * Input field that contains the content of this class.
     */
    @Input()
    public content: FormFieldContent_Experimental;

    internalControl = new FormControl();
    
    ngOnInit()
    {
        (this.content.parentFormSection as FormGroup).addControl(this.content.name, this.internalControl);
      
    }
}
