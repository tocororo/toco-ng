/*
 *   Copyright (c) 2020 Universidad de Pinar del Río "Hermanos Saíz Montes de Oca"
 *   All rights reserved.
 */

import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

import { Common } from '@toco/tools/core';

import { FormFieldControl_Experimental } from '../form-field.control.experimental';
import { InputControl } from '../../input/input.control';

export interface SelectOption
{
	value: any;
	label: string;
	// selected?: boolean;
}

/***
 * extraContent recibe una funcion llamada getOptions() que se encarga de contruir un SelectOption[]
 */
@Component({
	selector: 'toco-select',
	templateUrl: './select.component.html',
	styleUrls: ['./select.component.scss'],
	host: {
		'[style.minWidth]': 'content.minWidth',
		'[style.width]': 'content.width'
	}
})
export class SelectComponent extends InputControl/*FormFieldControl_Experimental*/ implements OnInit
{
	public selectOptions: SelectOption[];

	public multiple: boolean = false;

	selectedValue: any;

	public constructor()
	{
        super(
            /* Constructs a new `FormControl` instance. */
            new FormControl(Common.emptyString)
        );

		this.selectOptions = null;
	}

	public ngOnInit(): void
	{
        /* Sets the default values. */
//		this.init(undefined, false, true);

		this.multiple = this.content.extraContent['multiple'] ? this.content.extraContent['multiple'] : false;

//		this.content.parentFormSection.addControl(this.content.name, this.formControl);

		if (this.content.extraContent.observable)
		{
			this.content.extraContent.observable.subscribe(

				// next
				(response: any) => {
					this.selectOptions = this.content.extraContent.getOptions(response);
				},

				// error
				(error: any) => { console.log(error); }
				,

				// complete
				() => { }

			);
		}
		else
		{
			this.selectOptions = this.content.extraContent.getOptions();
		}

		this.formControl.setValue(this.content.value);
		this.onSelectionChange();
	}

	public onSelectionChange(): void
	{
		if (this.content.extraContent.selectionChange)
		{
			this.content.extraContent.selectionChange(this.content.value);
		}
	}
}
