
import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { TooltipPosition } from '@angular/material/tooltip';
import { LangChangeEvent, TranslateService } from '@ngx-translate/core';
import { isArray } from 'is-what';
import { Observable, Subscription } from 'rxjs';

import { HintPosition, HintValue } from '../../form-field.control';
import { InputContent, InputControl } from '../input.control';

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

	/**
	 * Returns true if the tooltip is showed; otherwise, false.
	 * By default, its value is `false`.
	 */
	showTooltip?: boolean;

	/**
	 * Returns a value that allows the user to define the position of the tooltip for the select control.
	 * It is used if the `showTooltip` field value is `true`.
	 * By default, its value is `'below'`.
	 * Its value can be one of these values: 'left', 'right', 'above', 'below', 'after', 'before'
	 */
	selectTooltipPosition?: TooltipPosition;

	/**
	 * Returns a value that allows the user to define the position of the tooltip for the select control's options.
	 * It is used if the `showTooltip` field value is `true`.
	 * By default, its value is `'right'`.
	 * Its value can be one of these values: 'left', 'right', 'above', 'below', 'after', 'before'
	 */
	optionsTooltipPosition?: TooltipPosition;
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

	/**
	 * Returns the current selected option tooltip.
	 * If nothing is selected, then its value is `''`.
	 */
	public selectTooltip: string;

	private _selectOptionsSubscription: Subscription = null;

	public constructor(private _transServ: TranslateService)
	{
        super();

		this.selectTooltip = '';
	}

	public ngOnInit(): void
	{
        /* Sets the default values. */
		this.init('', '', false, true);

		/* The `selectTooltip` value is set in `onSelectionChange` method when happening initialization or selection change. */
		this.onSelectionChange();
	}

	public ngOnDestroy(): void
	{
		/* Disposes the resources held by the subscription. */
		this._selectOptions_Unsubscription();
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
		/* Changes the translation when the language changes. */
		this._transServ.onLangChange.subscribe((params: LangChangeEvent) => {
			this._setSelectTooltip();
		});

        /* Sets the default values. */

		super.init(label, placeholder, isAbbreviation, alwaysHint);

		if (this.content.startHint != undefined)
		{
			if (this.content.startHint.label == 'TOCO_NG_HINT_TEXTO_POR_DEFECTO') this.content.startHint.label = 'TOCO_NG_HINT_TEXTO_SELECC_POR_DEFECTO';
		}
		else this.content.startHint = new HintValue(HintPosition.start, 'TOCO_NG_HINT_TEXTO_SELECC_POR_DEFECTO');

		if (this.content.multiple == undefined) this.content.multiple = false;
		if (this.content.showTooltip == undefined) this.content.showTooltip = false;
		if (this.content.selectTooltipPosition == undefined) this.content.selectTooltipPosition = 'below';
		if (this.content.optionsTooltipPosition == undefined) this.content.optionsTooltipPosition = 'right';

		if (this.content.selectOptions == undefined)
		{
			if (this.content.value == undefined)
			{
				this.content.selectOptions = [ ];
			}
			else
			{
				/* Gets the `content.selectOptions` from the `content.value` field. */

				if (isArray(this.content.value))
				{
					this.content.multiple = true;  /* The control must be multiple. */
					this.content.selectOptions = [ ];

					this.content.value.forEach(
						(option: string): void => {
							(this.content.selectOptions as SelectOption[]).push({
								'label': option,
								'value': option.toUpperCase()
							});
						}
					);
				}
				else
				{
					this.content.selectOptions = [
						{
							'label': this.content.value,
							'value': this.content.value.toUpperCase()
						}
					];
				}
			}
		}
		else if (isArray(this.content.selectOptions))
		{
			/* Nothing to do here, but this case must be here. */
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
		else
		{
			throw new Error(`For the '${ InputSelectComponent.name }' control, the 'content.selectOptions' type value has a configuration error because the programme does not know what to do with it!`);
		}

		/* The `selectTooltip` value is set in `onSelectionChange` method when happening initialization or selection change. */
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
		// console.log('Call `onSelectionChange` - ', 'Select value: ', this.content.formControl.value);

		this._setSelectTooltip();

		if ((this.content.extraContent) && (this.content.extraContent.selectionChange))
		{
			this.content.extraContent.selectionChange(this.content.formControl.value);
		}
	}

	/**
	 * Does the translation for a key (or an array of keys).
	 * @param key The key (or an array of keys) to translate.
	 */
	private _doTranslation(key: string | Array<string>): void
	{
		if (key.length == 0)
		{
			this.selectTooltip = '';
			return;
		}

		this._transServ.get(key).subscribe((res: any) => {
			// console.log(key, ' --> ', res);

			if (this.content.multiple)
			{
				/* `res` is an object of translated keys. */

				let translationKeys: string[] = Object.keys(res);
				let len: number = translationKeys.length;

				let translationRes: string = res[translationKeys[0]];

				for (let i = 1; i < len; ++i)
				{
					translationRes += '\n' + res[translationKeys[i]];
				}

				this.selectTooltip = translationRes;
			}
			else
			{
				/* `res` is a translated key. */

				this.selectTooltip = res;
			}
		});
	}

	/**
	 * Finds the label for a value (or an array of values).
	 * @param value The value (or an array of values) to find the label.
	 * @returns Returns a label (or an array of labels).
	 */
	private _findLabel(value: string | Array<string>): string | Array<string>
	{
		if (this.content.multiple)
		{
			let label: Array<string> = [ ];

			for (let val of value)
			{
				for (let opt of (this.content.selectOptions as SelectOption[]))
				{
					if (opt.value == val)
					{
						label.push(opt.label);
						break;
					}
				}
			}

			return label;
		}
		else
		{
			let label: string = '';

			for (let opt of (this.content.selectOptions as SelectOption[]))
			{
				if (opt.value == value)
				{
					label = opt.label;
					break;
				}
			}

			return label;
		}
	}

	/**
	 * Sets the `selectTooltip` field value.
	 */
	private _setSelectTooltip(): void
	{
		if (this.content.formControl.value != undefined)
		{
			this._doTranslation(this._findLabel(this.content.formControl.value));
		}
		else
		{
			this.selectTooltip = '';
		}
	}
}
