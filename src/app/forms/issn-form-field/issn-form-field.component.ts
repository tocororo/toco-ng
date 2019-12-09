
import { Component, OnInit, ViewChild, Input } from '@angular/core';

import { IssnFormFieldInternalComponent } from './issn-form-field-internal/issn-form-field-internal.component';

/**
 * Custom `MatFormFieldControl` for ISSN input, i.e., a control that represents an 
 * ISSN input form field. 
 * An ISSN (International Standard Serial Number) is an 8-digit code used to identify 
 * newspapers, journals, magazines and periodicals of all kinds and on all media–print 
 * and electronic. For more information follow the link: https://www.issn.org/understanding-the-issn/what-is-an-issn/. 
 */
@Component({
	selector: 'issn-form-field',
	templateUrl: './issn-form-field.component.html',
	styleUrls: ['./issn-form-field.component.scss']
})
export class IssnFormFieldComponent implements OnInit
{
	@ViewChild(IssnFormFieldInternalComponent, { static: true })
	private _issnFormFieldInternalComponent: IssnFormFieldInternalComponent;

	/**
	 * Input field that represents the placeholder for this control. 
	 * By default, its value is 'ISSN'. 
	 */
	@Input()
	public placeholder: string = 'ISSN';

	/**
	 * Input field that contains true if the control is required; otherwise, false. 
	 * By default, its value is true. 
	 */
	@Input()
	public required: boolean = true;

	public constructor()
	{ }

	public ngOnInit(): void
	{ }

	/**
	 * Returns true if the control is in an error state; otherwise, false. 
	 */
	public get errorState(): boolean
	{
		return this._issnFormFieldInternalComponent.errorState;
	}

	/**
	 * Returns an error string if the control is in an error state; otherwise, empty string. 
	 */
	public getErrorMessage(): string
	{
		return this._issnFormFieldInternalComponent.getErrorMessage();
	}	
}
