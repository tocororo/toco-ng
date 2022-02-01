
import { Component, OnInit } from '@angular/core';

import { InputContent, TextInputAppearance } from 'projects/toco-lib/src/lib/forms/input/input.control';
import { InputBoolComponent } from 'projects/toco-lib/src/lib/forms/input/bool/bool-input.component';

@Component({
	selector: 'test-input-bool',
	templateUrl: './test-bool-input.component.html',
	styleUrls: ['./test-bool-input.component.scss']
})
export class TestInputBoolComponent implements OnInit
{
	public inputContent_00: InputContent;
	public inputContent_01: InputContent;

	public inputContent_02: InputContent;
	public inputContent_03: InputContent;

	public inputContent_04: InputContent;

	public constructor()
	{
		this.inputContent_00 = undefined;
		this.inputContent_01 = undefined;

		this.inputContent_02 = undefined;
		this.inputContent_03 = undefined;

		this.inputContent_04 = undefined;
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
		/* `content.value` value type is NOT boolean type. */
		/* This test case throws an exception. */
		/*********************************************************************************/

		this._Test_04();  // OK

		/*********************************************************************************/
	}

	private _Test_00(): void
	{
		/* `content.label = undefined` */
		/* `content.value = undefined` */

		this.inputContent_00 = {
			'formControl': InputBoolComponent.getFormControlByDefault(),
			'name': 'bool_00',
			'label': undefined,
			'controlType': InputBoolComponent,
			'value': undefined,
			'required': true,
			'width': '100%',
			'appearance': TextInputAppearance.standard,
			'ariaLabel': 'bool_00'
		};

		console.log('TestInputBoolComponent - this.inputContent_00: ', this.inputContent_00);
	}

	private _Test_01(): void
	{
		/* `content.label = undefined` */
		/* `content.value` is `true`. */

		this.inputContent_01 = {
			'formControl': InputBoolComponent.getFormControlByDefault(),
			'name': 'bool_01',
			'label': undefined,
			'controlType': InputBoolComponent,
			'value': true,
			'required': true,
			'width': '100%',
			'appearance': TextInputAppearance.standard,
			'ariaLabel': 'bool_01'
		};

		console.log('TestInputBoolComponent - this.inputContent_01: ', this.inputContent_01);
	}

	private _Test_02(): void
	{
		/* `content.label` is NOT `undefined`. */
		/* `content.value = undefined` */

		this.inputContent_02 = {
			'formControl': InputBoolComponent.getFormControlByDefault(),
			'name': 'bool_02',
			'label': 'BOOL_02',
			'controlType': InputBoolComponent,
			'value': undefined,
			'required': true,
			'width': '100%',
			'appearance': TextInputAppearance.standard,
			'ariaLabel': 'bool_02'
		};

		console.log('TestInputBoolComponent - this.inputContent_02: ', this.inputContent_02);
	}

	private _Test_03(): void
	{
		/* `content.label` is NOT `undefined`. */
		/* `content.value` is `false`. */

		this.inputContent_03 = {
			'formControl': InputBoolComponent.getFormControlByDefault(),
			'name': 'bool_03',
			'label': 'BOOL_03',
			'controlType': InputBoolComponent,
			'value': false,
			'required': true,
			'width': '100%',
			'appearance': TextInputAppearance.standard,
			'ariaLabel': 'bool_03'
		};

		console.log('TestInputBoolComponent - this.inputContent_03: ', this.inputContent_03);
	}

	private _Test_04(): void
	{
		/* `content.label` is NOT `undefined`. */
		/* `content.value` value type is NOT boolean type. */
		/* This test case throws an exception. */

		this.inputContent_04 = {
			'formControl': InputBoolComponent.getFormControlByDefault(),
			'name': 'bool_04',
			'label': 'BOOL_04',
			'controlType': InputBoolComponent,
			'value': 'TOCO_NG_VERDADERO',
			'required': true,
			'width': '100%',
			'appearance': TextInputAppearance.standard,
			'ariaLabel': 'bool_04'
		};

		console.log('TestInputBoolComponent - this.inputContent_04: ', this.inputContent_04);
	}
}
