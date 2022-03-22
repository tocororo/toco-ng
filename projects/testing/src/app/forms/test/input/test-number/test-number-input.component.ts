
import { Component, OnInit } from '@angular/core';

import { ContentPosition, IconSource, IconValue } from 'projects/toco-lib/src/lib/forms/form-field.control';
import { InputContent, TextInputAppearance } from 'projects/toco-lib/src/lib/forms/input/input.control';
import { InputNumberComponent } from 'projects/toco-lib/src/lib/forms/input/number/number-input.component';

@Component({
	selector: 'test-input-number',
	templateUrl: './test-number-input.component.html',
	styleUrls: ['./test-number-input.component.scss']
})
export class TestInputNumberComponent implements OnInit
{
	public inputContent_00: InputContent;
	public inputContent_01: InputContent;

	public inputContent_02: InputContent;
	public inputContent_03: InputContent;

	public inputContent_04: InputContent;
	public inputContent_05: InputContent;

	public constructor()
	{
		this.inputContent_00 = undefined;
		this.inputContent_01 = undefined;

		this.inputContent_02 = undefined;
		this.inputContent_03 = undefined;

		this.inputContent_04 = undefined;
		this.inputContent_05 = undefined;
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
		/* Input custom validation. */
		/*********************************************************************************/

		this._Test_04();  // OK

		this._Test_05();  // OK

		/*********************************************************************************/
	}

	private _Test_00(): void
	{
		/* `content.label = undefined` */
		/* `content.value = undefined` */

		this.inputContent_00 = {
			'formControl': InputNumberComponent.getFormControlByDefault(),
			'name': 'number_00',
			'label': undefined,
			'controlType': InputNumberComponent,
			'value': undefined,
			'required': true,
			'width': '45%',
			'appearance': TextInputAppearance.standard,
			'ariaLabel': 'number_00'
		};
	}

	private _Test_01(): void
	{
		/* `content.label = undefined` */
		/* `content.value` is NOT `undefined`. */

		this.inputContent_01 = {
			'formControl': InputNumberComponent.getFormControlByDefault(),
			'name': 'number_01',
			'label': undefined,
			'controlType': InputNumberComponent,
			'value': 12345,
			'required': true,
			'width': '45%',
			'appearance': TextInputAppearance.standard,
			'prefixIcon': new IconValue(),
			// 'prefixIcon': new IconValue(IconSource.internal, ContentPosition.prefix, 'outlined-bar_code-24px'),
			'ariaLabel': 'number_01'
		};
	}

	private _Test_02(): void
	{
		/* `content.label` is NOT `undefined`. */
		/* `content.value = undefined` */

		this.inputContent_02 = {
			'formControl': InputNumberComponent.getFormControlByDefault(),
			'name': 'number_02',
			'label': 'NUMBER_02',
			'controlType': InputNumberComponent,
			'value': undefined,
			'required': true,
			'width': '45%',
			'appearance': TextInputAppearance.standard,
			'ariaLabel': 'number_02'
		};
	}

	private _Test_03(): void
	{
		/* `content.label` is NOT `undefined`. */
		/* `content.value` is NOT `undefined`. */

		this.inputContent_03 = {
			'formControl': InputNumberComponent.getFormControlByDefault(),
			'name': 'number_03',
			'label': 'NUMBER_03',
			'controlType': InputNumberComponent,
			'value': 12345,
			'required': true,
			'width': '45%',
			'appearance': TextInputAppearance.standard,
			'prefixIcon': new IconValue(),
			// 'prefixIcon': new IconValue(IconSource.internal, ContentPosition.prefix, 'outlined-bar_code-24px'),
			'ariaLabel': 'number_03'
		};
	}

	private _Test_04(): void
	{
		/* Input custom validation. */

		this.inputContent_04 = {
			'formControl': InputNumberComponent.getFormControlByDefault({ 'min': 0 }),
			'name': 'number_04',
			'label': 'Validates min = 0',
			'controlType': InputNumberComponent,
			'value': 0,
			'required': true,
			'width': '45%',
			'appearance': TextInputAppearance.standard,
			'ariaLabel': 'number_04'
		};
	}

	private _Test_05(): void
	{
		/* Input custom validation. */

		this.inputContent_05 = {
			'formControl': InputNumberComponent.getFormControlByDefault({ 'min': 1, 'max': 5 }),
			'name': 'number_05',
			'label': 'Validates min = 1 and max = 5',
			'controlType': InputNumberComponent,
			'value': 0,
			'required': true,
			'width': '45%',
			'appearance': TextInputAppearance.standard,
			'prefixIcon': new IconValue(),
			// 'prefixIcon': new IconValue(IconSource.internal, ContentPosition.prefix, 'outlined-bar_code-24px'),
			'ariaLabel': 'number_05'
		};
	}
}
