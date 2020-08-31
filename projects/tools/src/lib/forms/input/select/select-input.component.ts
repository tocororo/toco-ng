
import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { isArray } from 'util';

import { InputControl, InputContent } from '../input.control';

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

/**
 * An interface that represents the content of a select control. 
 */
export interface SelectContent extends InputContent
{
	/**
	 * Returns the options list that can be selected. 
	 * This field can be set using three ways: 
	 *  - Its value is `undefined`, then it takes the options from the `content.value` field. 
	 *  - Its value is a `SelectOption[]`, then it already contains the options. 
	 *  - Its value is an `Observable<SelectOption[]>`, then it takes the options when the observable emits values. 
	 * By default, its value is `[]`. 
	 */
	selectOptions?: SelectOption[] | Observable<SelectOption[]>;

	/**
	 * Returns true if the selection can be multiple; otherwise, false. 
	 * By default, its value is `false`. 
	 */
	multiple?: boolean;
}

/**
 * Represents a control that allows to select one value or multiple values. 
 * Implementation notes: 
 * The `extraContent` recibe una funcion llamada getOptions() que se encarga de contruir un SelectOption[]. 
 * Si es multiple, entonces el `value` es un array de valores. 
 */
@Component({
	selector: 'input-select',
	templateUrl: './select-input.component.html',
	styleUrls: ['./select-input.component.scss'],
	host: {
		'[style.minWidth]': 'content.minWidth',
		'[style.width]': 'content.width'
	}
})
export class InputSelectComponent extends InputControl implements OnInit, OnDestroy
{
	/**
     * Input field that contains the content of this class. 
     */
    @Input()
	public content: SelectContent;

	private _selectOptionsSubscription: Subscription = null;

	public constructor()
	{
        super();
	}

	public ngOnInit(): void
	{
        /* Sets the default values. */
		this.init(undefined, false, false);

		this.onSelectionChange();
	}

	public ngOnDestroy(): void
	{
		/* Disposes the resources held by the subscription. */
		this._selectOptions_Unsubscription();
	}

    /**
     * Initializes the `content` input property. 
     * @param label The label to set. If the value is `undefined`, sets the label to `content.label`. 
     * @param isAbbreviation If it is true then the `label` argument represents an abbreviation; otherwise, false. 
     * @param alwaysHint If it is true then there is always at leat one hint start-aligned. 
     */
    protected init(label: string | undefined, isAbbreviation: boolean, alwaysHint: boolean): void
    {
        /* Sets the default values. */

		super.init(label, isAbbreviation, alwaysHint);

		if (this.content.multiple == undefined) this.content.multiple = false;

		if (this.content.selectOptions == undefined)
		{
			if (this.content.value == undefined) this.content.selectOptions = [ ];
			else
			{
				/* Gets the `content.selectOptions` from the `content.value` field. */

				if (isArray(this.content.value))
				{
					this.content.selectOptions = [ ];

					this.content.value.forEach(
						(option: string): void => {
							(this.content.selectOptions as SelectOption[]).push({
								'label': option,
								'value': option.toLowerCase()
							});
						}
					);
				}
				else
				{
					this.content.selectOptions = [
						{
							'label': this.content.value,
							'value': this.content.value.toLowerCase()
						}
					];
				}
			}
		}
		else if (this.content.selectOptions instanceof Observable)
		{
			/* Gets the `content.selectOptions` from an `Observable` when it emits values. */

			this._selectOptions_Unsubscription();

			this._selectOptionsSubscription = this.content.selectOptions.subscribe(
				(selectOptions: SelectOption[]): void => {
					this.content.selectOptions = selectOptions;
				}
			);
		}
	}
	
	private _selectOptions_Unsubscription(): void
	{
		/* Disposes the resources held by the subscription. */
		if (this._selectOptionsSubscription)
		{
			this._selectOptionsSubscription.unsubscribe();
		}
	}

	public onSelectionChange(): void
	{
		if ((this.content.extraContent) && (this.content.extraContent.selectionChange))
		{
			this.content.extraContent.selectionChange(this.content.formControl.value);
		}

		console.log('Select value: ', this.content.formControl.value);
	}
}
