
import { Component, OnInit } from '@angular/core';

import { InputControl } from '../input.control';

/**
 * Represents a control that allows to select true or false value. 
 */
@Component({
	selector: 'input-boolean',
	templateUrl: './boolean-input.component.html',
	styleUrls: ['./boolean-input.component.scss'],
	host: {
		'[style.minWidth]': 'content.minWidth',
		'[style.width]': 'content.width'
	}
})
export class InputBooleanComponent extends InputControl implements OnInit
{
	public constructor()
	{
        super();
	}

	public ngOnInit(): void
	{
        /* Sets the default values. */
		this.init('', false, false);

		this.onSelectionChange();
	}

	public onSelectionChange(): void
	{
		if ((this.content.extraContent) && (this.content.extraContent.selectionChange))
		{
			this.content.extraContent.selectionChange(this.content.formControl.value);
		}

		// console.log('Select value: ', this.content.formControl.value);
	}
}
