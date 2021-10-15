
import { Component, OnInit } from '@angular/core';

import { InputControl } from '../input.control';

/**
 * Represents a control that allows to select true or false value. 
 */
@Component({
	selector: 'input-bool',
	templateUrl: './bool-input.component.html',
	styleUrls: ['./bool-input.component.scss'],
	host: {
		'[style.minWidth]': 'content.minWidth',
		'[style.width]': 'content.width'
	}
})
export class InputBoolComponent extends InputControl implements OnInit
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
