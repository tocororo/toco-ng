
import { Component, OnInit } from '@angular/core';

import { ContentPosition, IconSource, IconValue } from '../../../form-field.control';
import { InputContent, TextInputAppearance } from '../../../input/input.control';
import { InputTextComponent } from '../../../input/text/text-input.component';

@Component({
	selector: 'test-input-text',
	templateUrl: './test-text-input.component.html',
	styleUrls: ['./test-text-input.component.scss']
})
export class TestInputTextComponent implements OnInit
{
	public inputContent_00: InputContent;
	public inputContent_01: InputContent;
	public inputContent_02: InputContent;

	public inputContent_03: InputContent;
	public inputContent_04: InputContent;
	public inputContent_05: InputContent;

	// public inputContent_20: InputContent;
	// public inputContent_21: InputContent;
	// public inputContent_22: InputContent;

	// public inputContent_23: InputContent;
	// public inputContent_24: InputContent;
	// public inputContent_25: InputContent;

	public constructor()
	{
		this.inputContent_00 = undefined;
		this.inputContent_01 = undefined;
		this.inputContent_02 = undefined;

		this.inputContent_03 = undefined;
		this.inputContent_04 = undefined;
		this.inputContent_05 = undefined;

		// this.inputContent_20 = undefined;
		// this.inputContent_21 = undefined;
		// this.inputContent_22 = undefined;

		// this.inputContent_23 = undefined;
		// this.inputContent_24 = undefined;
		// this.inputContent_25 = undefined;
	}

	public ngOnInit(): void
	{
		/*********************************************************************************/
		/* `content.label = undefined` and `content.placeholder = undefined` */
		/*********************************************************************************/

		this._Test_00();  // OK

		this._Test_01();  // OK

		this._Test_02();  // OK

		/*********************************************************************************/
		/* `content.label` is NOT `undefined` and `content.placeholder = undefined` */
		/*********************************************************************************/

		this._Test_03();  // OK

		this._Test_04();  // OK

		this._Test_05();  // OK

		/*********************************************************************************/
		/* `content.label = undefined` and `content.placeholder` is NOT `undefined` */
		/*********************************************************************************/

		// this._Test_20();  // OK

		// this._Test_21();  // OK

		// this._Test_22();  // OK

		/*********************************************************************************/
		/* `content.label` is NOT `undefined` and `content.placeholder` is NOT `undefined` */
		/*********************************************************************************/

		// this._Test_23();  // OK

		// this._Test_24();  // OK

		// this._Test_25();  // OK

		/*********************************************************************************/
	}

	private _Test_00(): void
	{
		/* `content.label = undefined` and `content.placeholder = undefined` */
		/* `content.value = undefined` and `validatorArguments = undefined` for the `InputTextComponent.getFormControlByDefault`. */

		this.inputContent_00 = {
			'formControl': InputTextComponent.getFormControlByDefault(),
			'name': 'text_00',
			'label': undefined,
			'controlType': InputTextComponent,
			'value': undefined,
			'required': true,
			'width': '45%',
			'appearance': TextInputAppearance.standard,
			'ariaLabel': 'text_00'
		};
	}

	private _Test_01(): void
	{
		/* `content.label = undefined` and `content.placeholder = undefined` */
		/* `content.value` is NOT `undefined` and `validatorArguments = undefined` for the `InputTextComponent.getFormControlByDefault`. */

		this.inputContent_01 = {
			'formControl': InputTextComponent.getFormControlByDefault(),
			'name': 'text_01',
			'label': undefined,
			'controlType': InputTextComponent,
			'value': 'Text value is NOT undefined',
			'required': true,
			'width': '45%',
			'appearance': TextInputAppearance.standard,
			'prefixIcon': new IconValue(),
			// 'prefixIcon': new IconValue(IconSource.internal, ContentPosition.prefix, 'outlined-bar_code-24px'),
			'ariaLabel': 'text_01'
		};
	}

	private _Test_02(): void
	{
		/* `content.label = undefined` and `content.placeholder = undefined` */
		/* `content.value` is NOT `undefined` and `validatorArguments` for the `InputTextComponent.getFormControlByDefault` is NOT `undefined`. */

		this.inputContent_02 = {
			'formControl': InputTextComponent.getFormControlByDefault({ 'pattern': '^[a-zA-Z\_áéíóúÁÉÍÓÚ][a-zA-Z\-\_áéíóúÁÉÍÓÚ\ 0-9]*$' }),
			'name': 'text_02',
			'label': undefined,
			'controlType': InputTextComponent,
			'value': 'Test validator argument',
			'required': true,
			'width': '45%',
			'appearance': TextInputAppearance.standard,
			'ariaLabel': 'text_02'
		};
	}

	private _Test_03(): void
	{
		/* `content.label` is NOT `undefined` and `content.placeholder = undefined` */
		/* `content.value = undefined` and `validatorArguments = undefined` for the `InputTextComponent.getFormControlByDefault`. */

		this.inputContent_03 = {
			'formControl': InputTextComponent.getFormControlByDefault(),
			'name': 'text_03',
			'label': 'TEXT_03',
			'controlType': InputTextComponent,
			'value': undefined,
			'required': true,
			'width': '45%',
			'appearance': TextInputAppearance.standard,
			'ariaLabel': 'text_03'
		};
	}

	private _Test_04(): void
	{
		/* `content.label` is NOT `undefined` and `content.placeholder = undefined` */
		/* `content.value` is NOT `undefined` and `validatorArguments = undefined` for the `InputTextComponent.getFormControlByDefault`. */

		this.inputContent_04 = {
			'formControl': InputTextComponent.getFormControlByDefault(),
			'name': 'text_04',
			'label': 'TEXT_04',
			'controlType': InputTextComponent,
			'value': 'Text value is NOT undefined',
			'required': true,
			'width': '45%',
			'appearance': TextInputAppearance.standard,
			'prefixIcon': new IconValue(),
			// 'prefixIcon': new IconValue(IconSource.internal, ContentPosition.prefix, 'outlined-bar_code-24px'),
			'ariaLabel': 'text_04'
		};
	}

	private _Test_05(): void
	{
		/* `content.label` is NOT `undefined` and `content.placeholder = undefined` */
		/* `content.value` is NOT `undefined` and `validatorArguments` for the `InputTextComponent.getFormControlByDefault` is NOT `undefined`. */

		this.inputContent_05 = {
			'formControl': InputTextComponent.getFormControlByDefault({ 'pattern': '^[a-zA-Z\_áéíóúÁÉÍÓÚ][a-zA-Z\-\_áéíóúÁÉÍÓÚ\ 0-9]*$' }),
			'name': 'text_05',
			'label': 'TEXT_05',
			'controlType': InputTextComponent,
			'value': 'Test validator argument',
			'required': true,
			'width': '45%',
			'appearance': TextInputAppearance.standard,
			'ariaLabel': 'text_05'
		};
	}

	// private _Test_20(): void
	// {
	// }

	// private _Test_21(): void
	// {
	// 	/* `content.selectOptions = undefined` and `content.value` is an array of values. */

	// 	this.inputContent_21 = {
	// 		'formControl': InputTextComponent.getFormControlByDefault(),
	// 		'name': 'text_21',
	// 		'label': undefined/*'_Test_21'*/,
	// 		'controlType': InputTextComponent,
	// 		'value': ['VALUE A', 'VALUE B', 'VALUE C'],
	// 		'required': true,
	// 		'width': '45%',
	// 		'appearance': TextInputAppearance.standard,
	// 		'ariaLabel': 'text_21'
	// 	};
	// }

	// private _Test_22(): void
	// {
	// 	/* `content.selectOptions = undefined` and `content.value` is NOT an array of values. */

	// 	this.inputContent_22 = {
	// 		'formControl': InputTextComponent.getFormControlByDefault(),
	// 		'name': 'text_22',
	// 		'label': undefined/*'_Test_22'*/,
	// 		'controlType': InputTextComponent,
	// 		'value': 'VALUE B',
	// 		'required': true,
	// 		'width': '45%',
	// 		'appearance': TextInputAppearance.standard,
	// 		'ariaLabel': 'text_22'
	// 	};
	// }

	// private _Test_23(): void
	// {
    //     /* `content.selectOptions` is NOT `undefined` and `content.value = undefined`. */

	// 	this.inputContent_23 = {
	// 		'formControl': InputTextComponent.getFormControlByDefault(),
	// 		'name': 'text_23',
	// 		'label': undefined/*'_Test_23'*/,
	// 		'controlType': InputTextComponent,
	// 		'value': undefined,
	// 		'required': true,
	// 		'width': '45%',
	// 		'appearance': TextInputAppearance.standard,
	// 		'ariaLabel': 'text_23'
	// 	};
	// }

	// private _Test_24(): void
	// {
	// 	/* `content.selectOptions` is NOT `undefined` and `content.value` is NOT `undefined`. */

	// 	this.inputContent_24 = {
	// 		'formControl': InputTextComponent.getFormControlByDefault(),
	// 		'name': 'text_24',
	// 		'label': undefined/*'_Test_24'*/,
	// 		'controlType': InputTextComponent,
	// 		'value': 'VALUE B',
	// 		'required': true,
	// 		'width': '45%',
	// 		'appearance': TextInputAppearance.standard,
	// 		'ariaLabel': 'text_24'
	// 	};
	// }
}
