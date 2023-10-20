
import { Component, OnInit } from '@angular/core';
import { isBoolean, isNullOrUndefined } from 'is-what';

import { HintPosition, HintValue } from '../../form-field.control';
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
		this.init('', '', false, true);

		this.onSelectionChange();
	}

    /**
     * Initializes the `content` input property.
     * @param label The default label to use. It is used if the `content.label` is not specified.
	 * @param placeholder The default placeholder to use. It is used if the `content.placeholder` is not specified.
     * @param isAbbreviation If it is true then the `label` argument represents an abbreviation; otherwise, false.
     * @param alwaysHint If it is true then there is always at leat one hint start-aligned.
     */
	 protected init(label: string, placeholder: string = '', isAbbreviation: boolean, alwaysHint: boolean): void
	 {
		/* Sets the default values. */

		super.init(label, placeholder, isAbbreviation, alwaysHint);

		if (!isBoolean(this.content.value) && !isNullOrUndefined(this.content.value)) throw new Error(`For the '${ this.content.name }' control, the 'content.value' value must have a boolean type.`);

		if (this.content.startHint != undefined)
		{
			if (this.content.startHint.label == 'TOCO_NG_HINT_TEXTO_POR_DEFECTO') this.content.startHint.label = 'TOCO_NG_HINT_TEXTO_SELECC_POR_DEFECTO';
		}
		else this.content.startHint = new HintValue(HintPosition.start, 'TOCO_NG_HINT_TEXTO_SELECC_POR_DEFECTO');
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
