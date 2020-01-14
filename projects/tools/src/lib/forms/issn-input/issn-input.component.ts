
import { Component, OnInit } from '@angular/core';

import { TextInputControl } from '../text-input/text-input.control';
import { IssnType_Abbreviation, IssnValue } from './issn-value';

/**
 * Represents a control that allows the writing of an ISSN. 
 * An ISSN (International Standard Serial Number) is an 8-digit code used to identify 
 * newspapers, journals, magazines and periodicals of all kinds and on all media–print 
 * and electronic. For more information follow the link: https://www.issn.org/understanding-the-issn/what-is-an-issn/. 
 */
@Component({
	selector: 'issn-input',
	templateUrl: './issn-input.component.html',
	styleUrls: ['./issn-input.component.scss']
})
export class IssnInputComponent extends TextInputControl implements OnInit
{
	public constructor()
	{
		super(null);
	}

	public ngOnInit(): void
	{
        /* Sets the default values. */
		this.init(IssnType_Abbreviation.ISSN, true, true);
	}

	/**
	 * Returns the control's default value. 
	 */
    public get getDefaultValue(): any
    {
		return IssnValue.defaultIssnValue;
    }
}
