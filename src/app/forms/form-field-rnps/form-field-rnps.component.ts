
import { Component, OnInit, Input } from '@angular/core';
import { FormControl, Validators, ValidationErrors } from '@angular/forms';

import { RnpsValue } from './rnps-value';
import { ExtraValidators } from '../../core/utils/validator';

/**
 * Custom `MatFormFieldControl` for RNPS input, i.e., a control that represents an 
 * RNPS input form field. 
 * An RNPS (Registro Nacional de Publicaciones Seriadas) is an 4-digit code used to control 
 * las publicaciones seriadas autorizadas a editarse, imprimirse y circular en Cuba. 
 * For more information follow the link: http://www.seriadas.cult.cu/. 
 */
@Component({
    selector: 'toco-form-field-rnps',
    templateUrl: './form-field-rnps.component.html',
    styleUrls: ['./form-field-rnps.component.scss']
})
export class FormFieldRnpsComponent implements OnInit
{
	/**
	 * Tracks the value and validity state of the control that contains the code. 
	 */
    public readonly code: FormControl;
    private _codeOldValue: string;  /* It is used by '_handleInput' method. */

    /**
     * Input field that represents the placeholder for this control. 
     * By default, its value is 'ISSN'. 
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
	 * By default, its value is 'Write a valid RNPS.'. 
	 */
	@Input()
    public hintValue: string;

    public constructor()
    {
        /* Constructs a new `FormControl` instance. */
        this.code = new FormControl((this._codeOldValue = ''), [
            ExtraValidators.equalLength(RnpsValue.codeLength),
            Validators.pattern('^[0-9]*$')]
            );
    }

    public ngOnInit(): void
    {
        if (this.placeholder == undefined) this.placeholder = RnpsValue.rnps_Abbreviation;

        if (this.required == undefined) this.required = true;

        if (this.hintValue == undefined) this.hintValue = `Write a valid ${ RnpsValue.rnps_Abbreviation }.`;
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
        return ((this.code.invalid) && (this.code.dirty || this.code.touched));
    }

    /**
     * Returns an error string if the control is in an error state; otherwise, empty string. 
     */
    public getErrorMessage(): string
    {
		let result: string = '';
		let result_alreadyHaveErrorInfo: boolean = false;
		let validationErrors: ValidationErrors = this.code.errors;

		/* Shows the code errors. */
		if (validationErrors)
		{
			if (validationErrors[ExtraValidators.equalLength.name])
			{
				result += 'Its length must be ' + RnpsValue.codeLengthAsString;
				result_alreadyHaveErrorInfo = true;
			}

			if (validationErrors[Validators.pattern.name])
			{
				if (result_alreadyHaveErrorInfo)
				{
					result += ', and all positions have digits';
				}
				else
				{
					result += 'All positions must have digits';
				}

				result_alreadyHaveErrorInfo = true;
			}

			result += '.';
        }

        return result;
    }
    
	/**
	 * Handler function that is called when the control's value changes in the UI. For internal use only. 
	 */
	public _handleInput(): void
	{
        this.hintValue = '';

		if (this.code.value.length > RnpsValue.codeLength)
		{
			/* Sets the old value. */
			this.code.setValue(this._codeOldValue);
        }
        else
        {
            /* Updates the old values. */
            this._codeOldValue = this.code.value;
        }

        /* Marks the control as `touched`. */
        this.code.markAsTouched({
            onlySelf: true
        });
    }
}
