
import { Component, OnInit, ViewChild, Input } from '@angular/core';

import { IssnFormFieldInternalComponent } from './issn-form-field-internal/issn-form-field-internal.component';
import { IssnType_Abbreviation } from './issn-value';

/**
 * Custom `MatFormFieldControl` for ISSN input, i.e., a control that represents an 
 * ISSN input form field. 
 * An ISSN (International Standard Serial Number) is an 8-digit code used to identify 
 * newspapers, journals, magazines and periodicals of all kinds and on all media–print 
 * and electronic. For more information follow the link: https://www.issn.org/understanding-the-issn/what-is-an-issn/. 
 */
@Component({
	selector: 'toco-form-field-issn',
	templateUrl: './form-field-issn.component.html',
	styleUrls: ['./form-field-issn.component.scss']
})
export class FormFieldIssnComponent implements OnInit
{
	@ViewChild(IssnFormFieldInternalComponent, { static: true })
	private _issnFormFieldInternalComponent: IssnFormFieldInternalComponent;

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
	 * By default, its value is 'Write a valid ISSN.'. 
	 */
	@Input()
	public hintValue: string;

	public constructor()
	{ }

	public ngOnInit(): void
	{
		if (this.placeholder == undefined) this.placeholder = IssnType_Abbreviation.ISSN;

		if (this.required == undefined) this.required = true;

		if (this.hintValue == undefined) this.hintValue = `Write a valid ${ IssnType_Abbreviation.ISSN }.`;
	}

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
		this.hintValue = '';

		return this._issnFormFieldInternalComponent.getErrorMessage();
	}
}
