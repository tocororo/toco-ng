/*
 *   Copyright (c) 2020 Universidad de Pinar del Río "Hermanos Saíz Montes de Oca"
 *   All rights reserved.
 */

import { Component, OnInit } from '@angular/core';

import { InputControl } from '../../input/input.control';

/**
 * This interface is deprecated.
 * An interface that represents a selectable option.
 */
interface SelectOption
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

/**
 * This component is deprecated.
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
	/**
	 * Returns the options list that can be selected.
	 * By default, its value is `[]`.
	 */
	public selectOptions: SelectOption[];

	/**
	 * Returns true if the selection can be multiple; otherwise, false.
	 * By default, its value is `false`.
	 */
	public multiple: boolean;

	public constructor()
	{
        super();

		this.selectOptions = [ ];
		this.multiple = false;
	}

	public ngOnInit(): void
	{
		// console.log('SelectComponent OnInit');

        /* Sets the default values. */
		this.init('', '', false, false);

		this.onSelectionChange();
	}

    /**
     * Initializes the `content` input property.
     * @param label The default label to use. It is used if the `content.label` is not specified.
	 * @param placeholder The default placeholder to use. It is used if the `content.placeholder` is not specified.
     * @param isAbbreviation If it is true then the `label` argument represents an abbreviation; otherwise, false.
     * @param alwaysHint If it is true then there is always at leat one hint start-aligned.
     */
    protected init(label: string | undefined, placeholder: string = '', isAbbreviation: boolean, alwaysHint: boolean): void
    {
        /* Sets the default values. */

		super.init(label, placeholder, isAbbreviation, alwaysHint);

//		if (this.content.appearance == undefined) this.content.appearance = false;
		this.multiple = this.content.extraContent['multiple'] ? this.content.extraContent['multiple'] : false;

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
    }

	public onSelectionChange(): void
	{
		if ((this.content.extraContent) && (this.content.extraContent.selectionChange))
		{
			this.content.extraContent.selectionChange(this.content.value);
		}

		// console.log('Select value: ', this.content.formControl.value);
	}
}
