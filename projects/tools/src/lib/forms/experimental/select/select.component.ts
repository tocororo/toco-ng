/*
 *   Copyright (c) 2020 Universidad de Pinar del Río "Hermanos Saíz Montes de Oca"
 *   All rights reserved.
 */

import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

import { FormFieldControl_Experimental } from '../form-field.control.experimental';

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
export class SelectComponent extends FormFieldControl_Experimental implements OnInit {

	public internalControl = new FormControl();

	public selectOptions: SelectOption[];

	selectedValue: any;

	multiple = false;

	public constructor()
	{
		super();

		this.selectOptions = null;
	}

	public ngOnInit(): void
	{
		this.multiple = this.content.extraContent['multiple'] ? this.content.extraContent['multiple'] : false;

		this.content.formGroup.addControl(this.content.name, this.internalControl);

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

		this.internalControl.setValue(this.content.value);
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
