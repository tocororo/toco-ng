
import { Input } from '@angular/core';

import { FormFieldType } from '../form-field.control';

/**
 * Represents a form field interface.
 */
export interface FormFieldContent_Experimental
{
    /** The form field type. */
    type: FormFieldType;

    /** The form field name. */
    name: string;

    /** The form field label. */
    label: string;

    /** If it is true the form field is required; otherwise, false. */
    required: boolean;

	/** The form field hint text. */
    startHint?: string;

    /** The form field value. */
    value?: any;

    /** The form field width. */
    width?: string;

    /** For any other input needed by an specific `FormFieldContent`. */
    extraContent?: any;
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
