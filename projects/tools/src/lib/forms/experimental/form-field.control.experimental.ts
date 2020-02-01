
import { Input } from '@angular/core';

import { FormFieldType, FormFieldContent } from '../form-field.control';
import { InputContent } from '../input/input.control';

/**
 * Represents a form field interface.
 */
export interface FormFieldContent_Experimental extends InputContent
{

}

/**
 * Represents the base abstract class for a control that is treated as a form field.
 */
export abstract class FormFieldControl_Experimental
{
    /**
     * Input field that contains the content of this class.
     */
    @Input()
    public content: FormFieldContent_Experimental;
}
