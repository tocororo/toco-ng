
import { Component, OnInit } from '@angular/core';
import { ContentPosition, IconSource, IconValue } from '@tools/forms/form-field.control';

import { InputContent, TextInputAppearance } from '../../../input/input.control';
import { InputUrlComponent } from '../../../input/url/url-input.component';

@Component({
	selector: 'test-input-url',
	templateUrl: './test-url-input.component.html',
	styleUrls: ['./test-url-input.component.scss']
})
export class TestInputUrlComponent implements OnInit
{
	public inputContent_00: InputContent;
	public inputContent_01: InputContent;

	public inputContent_02: InputContent;
	public inputContent_03: InputContent;

	// public inputContent_04: InputContent;

	// public inputContent_20: InputContent;
	// public inputContent_21: InputContent;
	// public inputContent_22: InputContent;
	// public inputContent_23: InputContent;
	// public inputContent_24: InputContent;

	public constructor()
	{
		this.inputContent_00 = undefined;
		this.inputContent_01 = undefined;

		this.inputContent_02 = undefined;
		this.inputContent_03 = undefined;

		// this.inputContent_04 = undefined;

		// this.inputContent_20 = undefined;
		// this.inputContent_21 = undefined;
		// this.inputContent_22 = undefined;
		// this.inputContent_23 = undefined;
		// this.inputContent_24 = undefined;
	}

	public ngOnInit(): void
	{
		/*********************************************************************************/
		/* `content.label = undefined` */
		/*********************************************************************************/

		this._Test_00();  // OK

		this._Test_01();  // OK

		/*********************************************************************************/
		/* `content.label` is NOT `undefined`. */
		/*********************************************************************************/

		this._Test_02();  // OK

		this._Test_03();  // OK

		/*********************************************************************************/

		// this._Test_04();  // OK

		/*********************************************************************************/

		// this._Test_20();  // OK

		// this._Test_21();  // OK

		// this._Test_22();  // OK

		// this._Test_23();  // OK

		// this._Test_24();  // OK

		/*********************************************************************************/
	}

	private _Test_00(): void
	{
		/* `content.label = undefined` */
		/* `content.value = undefined` */

		this.inputContent_00 = {
			'formControl': InputUrlComponent.getFormControlByDefault(),
			'name': 'url_00',
			'label': undefined,
			'controlType': InputUrlComponent,
			'value': undefined,
			'required': true,
			'width': '45%',
			'appearance': TextInputAppearance.standard,
			'ariaLabel': 'url_00'
		};
	}

	private _Test_01(): void
	{
		/* `content.label = undefined` */
		/* `content.value` is NOT `undefined`. */

		this.inputContent_01 = {
			'formControl': InputUrlComponent.getFormControlByDefault(),
			'name': 'url_01',
			'label': undefined,
			'controlType': InputUrlComponent,
			'value': 'https://www.google.com',
			'required': true,
			'width': '45%',
			'appearance': TextInputAppearance.standard,
			'prefixIcon': new IconValue(),
			// 'prefixIcon': new IconValue(IconSource.internal, ContentPosition.prefix, 'outlined-bar_code-24px'),
			'ariaLabel': 'url_01'
		};
	}

	private _Test_02(): void
	{
		/* `content.label` is NOT `undefined`. */
		/* `content.value = undefined` */

		this.inputContent_02 = {
			'formControl': InputUrlComponent.getFormControlByDefault(),
			'name': 'url_02',
			'label': 'URL_02',
			'controlType': InputUrlComponent,
			'value': undefined,
			'required': true,
			'width': '45%',
			'appearance': TextInputAppearance.standard,
			'ariaLabel': 'url_02'
		};
	}

	private _Test_03(): void
	{
		/* `content.label` is NOT `undefined`. */
		/* `content.value` is NOT `undefined`. */

		this.inputContent_03 = {
			'formControl': InputUrlComponent.getFormControlByDefault(),
			'name': 'url_03',
			'label': 'URL_03',
			'controlType': InputUrlComponent,
			'value': 'https://www.google.com',
			'required': true,
			'width': '45%',
			'appearance': TextInputAppearance.standard,
			'prefixIcon': new IconValue(),
			// 'prefixIcon': new IconValue(IconSource.internal, ContentPosition.prefix, 'outlined-bar_code-24px'),
			'ariaLabel': 'url_03'
		};
	}

	// private _Test_04(): void
	// {
	// 	/* `content.selectOptions` is NOT `undefined` and `content.value` is NOT `undefined`. */

	// 	this.inputContent_04 = {
	// 		'formControl': InputUrlComponent.getFormControlByDefault(),
	// 		'name': 'url_04',
	// 		'label': undefined/*'_Test_04'*/,
	// 		'controlType': InputUrlComponent,
	// 		'value': 'VALUE B',
	// 		'required': true,
	// 		'width': '45%',
	// 		'appearance': TextInputAppearance.standard,
	// 		'ariaLabel': 'url_04'
	// 	};
	// }

	// private _Test_20(): void
	// {
    //     /* `content.selectOptions = undefined` and `content.value = undefined` */

	// 	this.inputContent_20 = {
	// 		'formControl': InputUrlComponent.getFormControlByDefault(),
	// 		'name': 'url_20',
	// 		'label': undefined/*'_Test_20'*/,
	// 		'controlType': InputUrlComponent,
	// 		'value': undefined,
	// 		'required': true,
	// 		'width': '45%',
	// 		'appearance': TextInputAppearance.standard,
	// 		'ariaLabel': 'url_20'
	// 	};
	// }

	// private _Test_21(): void
	// {
	// 	/* `content.selectOptions = undefined` and `content.value` is an array of values. */

	// 	this.inputContent_21 = {
	// 		'formControl': InputUrlComponent.getFormControlByDefault(),
	// 		'name': 'url_21',
	// 		'label': undefined/*'_Test_21'*/,
	// 		'controlType': InputUrlComponent,
	// 		'value': ['VALUE A', 'VALUE B', 'VALUE C'],
	// 		'required': true,
	// 		'width': '45%',
	// 		'appearance': TextInputAppearance.standard,
	// 		'ariaLabel': 'url_21'
	// 	};
	// }

	// private _Test_22(): void
	// {
	// 	/* `content.selectOptions = undefined` and `content.value` is NOT an array of values. */

	// 	this.inputContent_22 = {
	// 		'formControl': InputUrlComponent.getFormControlByDefault(),
	// 		'name': 'url_22',
	// 		'label': undefined/*'_Test_22'*/,
	// 		'controlType': InputUrlComponent,
	// 		'value': 'VALUE B',
	// 		'required': true,
	// 		'width': '45%',
	// 		'appearance': TextInputAppearance.standard,
	// 		'ariaLabel': 'url_22'
	// 	};
	// }

	// private _Test_23(): void
	// {
    //     /* `content.selectOptions` is NOT `undefined` and `content.value = undefined`. */

	// 	this.inputContent_23 = {
	// 		'formControl': InputUrlComponent.getFormControlByDefault(),
	// 		'name': 'url_23',
	// 		'label': undefined/*'_Test_23'*/,
	// 		'controlType': InputUrlComponent,
	// 		'value': undefined,
	// 		'required': true,
	// 		'width': '45%',
	// 		'appearance': TextInputAppearance.standard,
	// 		'ariaLabel': 'url_23'
	// 	};
	// }

	// private _Test_24(): void
	// {
	// 	/* `content.selectOptions` is NOT `undefined` and `content.value` is NOT `undefined`. */

	// 	this.inputContent_24 = {
	// 		'formControl': InputUrlComponent.getFormControlByDefault(),
	// 		'name': 'url_24',
	// 		'label': undefined/*'_Test_24'*/,
	// 		'controlType': InputUrlComponent,
	// 		'value': 'VALUE B',
	// 		'required': true,
	// 		'width': '45%',
	// 		'appearance': TextInputAppearance.standard,
	// 		'ariaLabel': 'url_24'
	// 	};
	// }
}
