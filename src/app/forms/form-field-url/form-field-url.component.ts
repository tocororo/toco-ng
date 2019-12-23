
import { Component, OnInit, Input } from '@angular/core';
import { FormControl, Validators, ValidationErrors } from '@angular/forms';

import { UrlValue } from './url-value';
import { FormField } from '../form-container/form-container.component';

/**
 * Custom `MatFormFieldControl` for url input, i.e., a control that represents an 
 * url input form field. 
 */
@Component({
    selector: 'toco-form-field-url',
    templateUrl: './form-field-url.component.html',
    styleUrls: ['./form-field-url.component.scss']
})
export class FormFieldUrlComponent extends FormField implements OnInit
{
	/**
	 * Tracks the value and validity state of the control that contains the url. 
	 */
    public readonly url: FormControl;

    /**
     * Input field that represents the placeholder for this control. 
     * By default, its value is 'Url'. 
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
	 * By default, its value is 'Write a valid url.'. 
	 */
	@Input()
    public hintValue: string;

    public constructor()
    {
        super();

        /* Constructs a new `FormControl` instance. */
        this.url = new FormControl('', [
            Validators.pattern(/(^|\s)((https?:\/\/)?[\w-]+(\.[\w-]+)+\.?(:\d+)?(\/\S*)?)/i)
            //Validators.pattern(/((([A-Za-z]{3,9}:(?:\/\/)?)(?:[\-;:&=\+\$,\w]+@)?[A-Za-z0-9\.\-]+|(?:www\.|[\-;:&=\+\$,\w]+@)[A-Za-z0-9\.\-]+)((?:\/[\+~%\/\.\w\-_]*)?\??(?:[\-\+=&;%@\.\w_]*)#?(?:[\.\!\/\\\w]*))?)/i)
        ]);
    }

    public ngOnInit(): void
    {
        if (this.formFieldContent.value == undefined) this.formFieldContent.value = '';

        this.placeholder = this.formFieldContent.placeholder;
        if (this.placeholder == undefined) this.placeholder = UrlValue.url_Label;

        this.required = this.formFieldContent.required;
        if (this.required == undefined) this.required = true;

        this.hintValue = this.formFieldContent.hintValue;
        if (this.hintValue == undefined) this.hintValue = `Write a valid ${ UrlValue.url_Label.toLowerCase() }.`;
    }

	/**
	 * Returns true if the control is empty; otherwise, false. 
	 */
	public get empty(): boolean
	{
		return (!this.url.value);
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
        return ((this.url.invalid) && (this.url.dirty || this.url.touched));
    }

    /**
     * Returns an error string if the control is in an error state; otherwise, empty string. 
     */
    public getErrorMessage(): string
    {
        //console.log(this.url.errors);

        let validationErrors: ValidationErrors = this.url.errors;

        /* Shows the url errors. */
        if (validationErrors)
        {
            if (validationErrors[Validators.required.name])
            {
                return 'You must write a valid url.';
            }
            else
            {
                /* It is `validationErrors[Validators.pattern.name]`. */
                return 'The url is wrong.';
            }
        }

        return '';
    }
    
	/**
	 * Handler function that is called when the control's value changes in the UI. For internal use only. 
	 */
	public _handleInput(): void
	{
        /* Sets the new value of the control in the `formFieldContent`. */
        this.formFieldContent.value = this.url.value;

        /* Marks the control as `touched`. */
        this.url.markAsTouched({
            onlySelf: true
        });
    }
}
