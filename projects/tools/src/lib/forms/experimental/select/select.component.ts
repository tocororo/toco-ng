/*
 *   Copyright (c) 2020 Universidad de Pinar del Río "Hermanos Saíz Montes de Oca"
 *   All rights reserved.
 */

import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

import { Common } from '@toco/tools/core';

import { InputControl } from '../../input/input.control';

/**
 * An interface that represents a selectable option. 
 */
export interface SelectOption
{
	/**
	 * Returns the label that is showed. 
	 */
	label: string;

	/**
	 * Returns the value that is stored internally. 
	 */
	value: any;

	/**
	 * Returns true if this option is selected; otherwise, false. 
	 */
	// selected?: boolean;
}

/***
 * The `extraContent` recibe una funcion llamada getOptions() que se encarga de contruir un SelectOption[]. 
 * Si es multiple, entonces el `value` es un array de valores. 
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

	public constructor()
	{
        super();

		this.selectOptions = undefined;
	}

	public ngOnInit(): void
	{
		console.log('SelectComponent OnInit');

        /* Sets this `content.formControl` by default. */
        if (this.content.formControl == undefined) this.content.formControl = new FormControl(Common.emptyString);
		
        /* Sets the default values. */
		this.init(undefined, false, false);

		this.multiple = this.content.extraContent['multiple'] ? this.content.extraContent['multiple'] : false;

//		this.content.parentFormSection.addControl(this.content.name, this.content.formControl);

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

		this.onSelectionChange();
	}

	public onSelectionChange(): void
	{
		if (this.content.extraContent.selectionChange)
		{
			this.content.extraContent.selectionChange(this.content.value);
		}

		console.log('Select value: ', this.content.formControl.value);
	}
}
