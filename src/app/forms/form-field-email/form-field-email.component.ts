
import { Component, OnInit, Input } from '@angular/core';
import { FormControl, Validators, ValidationErrors } from '@angular/forms';

import { EmailValue } from './email-value';
import { FormField } from '../form-container/form-container.component';

/**
 * Custom `MatFormFieldControl` for email input, i.e., a control that represents an 
 * email input form field. 
 */
@Component({
    selector: 'toco-form-field-email',
    templateUrl: './form-field-email.component.html',
    styleUrls: ['./form-field-email.component.scss']
})
export class FormFieldEmailComponent extends FormField implements OnInit
{
	/**
	 * Tracks the value and validity state of the control that contains the email. 
	 */
    public readonly email: FormControl;

    /**
     * Input field that represents the placeholder for this control. 
     * By default, its value is 'Email'. 
     */
    @Input()
    public placeholder: string;

    /**
     * Input field that contains true if the control is required; otherwise, false. 
     * By default, its value is true. 
     */
    @Input()
    public required: boolean;

	/**
	 * Input field that contains the control's hint value to show. 
	 * By default, its value is 'Write a valid Email.'. 
	 */
	@Input()
    public hintValue: string;

    public constructor()
    {
        super();

        /* Constructs a new `FormControl` instance. */
        this.email = new FormControl('', [
            Validators.email]);
    }

    public ngOnInit(): void
    {
        if (this.formFieldContent.value == undefined) this.formFieldContent.value = '';

        this.placeholder = this.formFieldContent.placeholder;
        if (this.placeholder == undefined) this.placeholder = EmailValue.email_Label;

        this.required = this.formFieldContent.required;
        if (this.required == undefined) this.required = true;

        this.hintValue = this.formFieldContent.hintValue;
        if (this.hintValue == undefined) this.hintValue = `Write a valid ${ EmailValue.email_Label.toLowerCase() }.`;
    }

	/**
	 * Returns true if the control is empty; otherwise, false. 
	 */
	public get empty(): boolean
	{
		return (!this.email.value);
    }

    /**
     * Returns true if the control is in a hint state; otherwise, false. 
     */
    public get hintState(): boolean
    {
        return this.empty;
    }

    /**
     * Returns true if the control is in an error state; otherwise, false. 
     */
    public get errorState(): boolean
    {
        /* The control does not display errors before the user has a 
         * chance to edit the form. The checks for dirty and touched prevent errors 
         * from showing until the user does one of two things: changes the value, 
         * turning the control dirty; or blurs the form control element, setting the 
         * control to touched. 
         * Thus, it reveals an error message only if the control is invalid and 
         * the control is either dirty or touched. */
        return ((this.email.invalid) && (this.email.dirty || this.email.touched));
    }

    /**
     * Returns an error string if the control is in an error state; otherwise, empty string. 
     */
    public getErrorMessage(): string
    {
        //console.log(this.email.errors);

        let validationErrors: ValidationErrors = this.email.errors;

        /* Shows the email errors. */
        if (validationErrors)
        {
            if (validationErrors[Validators.required.name])
            {
                return 'You must write a valid email.';
            }
            else
            {
                /* It is `validationErrors[Validators.email.name]`. */
                return 'The email is wrong.';
            }
        }

        return '';
    }
    
	/**
	 * Handler function that is called when the control's value changes in the UI. For internal use only. 
	 */
	public _handleInput(): void
	{
        //console.log(this.email.value);

        /* Sets the new value of the control in the `formFieldContent`. */
        this.formFieldContent.value = this.email.value;

        /* Marks the control as `touched`. */
        this.email.markAsTouched({
            onlySelf: true
        });
    }
}
