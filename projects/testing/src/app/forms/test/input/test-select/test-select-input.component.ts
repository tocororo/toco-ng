
import { Component, OnInit } from '@angular/core';

import { TextInputAppearance } from 'projects/toco-lib/src/lib/forms/input/input.control';
import { InputSelectComponent, SelectContent } from 'projects/toco-lib/src/lib/forms/input/select/select-input.component';

@Component({
	selector: 'test-input-select',
	templateUrl: './test-select-input.component.html',
	styleUrls: ['./test-select-input.component.scss']
})
export class TestInputSelectComponent implements OnInit
{
	public selectContent_00: SelectContent;
	public selectContent_01: SelectContent;
	public selectContent_02: SelectContent;
	public selectContent_03: SelectContent;
	public selectContent_04: SelectContent;

	public selectContent_20: SelectContent;
	public selectContent_21: SelectContent;
	public selectContent_22: SelectContent;
	public selectContent_23: SelectContent;
	public selectContent_24: SelectContent;

	public constructor()
	{
		this.selectContent_00 = undefined;
		this.selectContent_01 = undefined;
		this.selectContent_02 = undefined;
		this.selectContent_03 = undefined;
		this.selectContent_04 = undefined;

		this.selectContent_20 = undefined;
		this.selectContent_21 = undefined;
		this.selectContent_22 = undefined;
		this.selectContent_23 = undefined;
		this.selectContent_24 = undefined;
	}

	public ngOnInit(): void
	{
		/*********************************************************************************/
		/* `content.showTooltip = false` */
		/*********************************************************************************/

		this._Test_00();  // OK

		this._Test_01();  // OK

		this._Test_02();  // OK

		this._Test_03();  // OK

		this._Test_04();  // OK

		// TODO: Hacer un test poniendo el campo `content.selectOptions` del select como un `Observable`.

		/*********************************************************************************/
		/* `content.showTooltip = true` */
		/*********************************************************************************/

		this._Test_20();  // OK

		this._Test_21();  // OK

		this._Test_22();  // OK

		this._Test_23();  // OK

		this._Test_24();  // OK

		// TODO: Hacer un test poniendo el campo `content.selectOptions` del select como un `Observable`.

		/*********************************************************************************/
	}

	private _Test_00(): void
	{
		/* `content.showTooltip = false` */
		/* `content.selectOptions = undefined` and `content.value = undefined` */

		this.selectContent_00 = {
			'formControl': InputSelectComponent.getFormControlByDefault(),
			'name': 'select_00',
			'label': undefined/*'_Test_00'*/,
			'controlType': InputSelectComponent,
			'value': undefined,
			'required': true,
			'width': '45%',
			'appearance': TextInputAppearance.outline,
			'ariaLabel': 'select_00',
			'selectOptions': undefined,
			'multiple': false,
			'showTooltip': false
		};
	}

	private _Test_01(): void
	{
		/* `content.showTooltip = false` */
		/* `content.selectOptions = undefined` and `content.value` is an array of values. */

		this.selectContent_01 = {
			'formControl': InputSelectComponent.getFormControlByDefault(),
			'name': 'select_01',
			'label': undefined/*'_Test_01'*/,
			'controlType': InputSelectComponent,
			'value': ['VALUE A', 'VALUE B', 'VALUE C'],
			'required': true,
			'width': '45%',
			'appearance': TextInputAppearance.outline,
			'ariaLabel': 'select_01',
			'selectOptions': undefined,
			'multiple': true,
			'showTooltip': false
		};
	}

	private _Test_02(): void
	{
		/* `content.showTooltip = false` */
		/* `content.selectOptions = undefined` and `content.value` is NOT an array of values. */

		this.selectContent_02 = {
			'formControl': InputSelectComponent.getFormControlByDefault(),
			'name': 'select_02',
			'label': undefined/*'_Test_02'*/,
			'controlType': InputSelectComponent,
			'value': 'VALUE B',
			'required': true,
			'width': '45%',
			'appearance': TextInputAppearance.outline,
			'ariaLabel': 'select_02',
			'selectOptions': undefined,
			'multiple': false,
			'showTooltip': false
		};
	}

	private _Test_03(): void
	{
		/* `content.showTooltip = false` */
		/* `content.selectOptions` is NOT `undefined` and `content.value = undefined`. */

		this.selectContent_03 = {
			'formControl': InputSelectComponent.getFormControlByDefault(),
			'name': 'select_03',
			'label': undefined/*'_Test_03'*/,
			'controlType': InputSelectComponent,
			'value': undefined,
			'required': true,
			'width': '45%',
			'appearance': TextInputAppearance.outline,
			'ariaLabel': 'select_03',
			'selectOptions': [
				{
					'label': 'label a',
					'value': 'VALUE A'
				},
				{
					'label': 'label b',
					'value': 'VALUE B'
				},
				{
					'label': 'label c',
					'value': 'VALUE C'
				}
			],
			'multiple': false,
			'showTooltip': false
		};
	}

	private _Test_04(): void
	{
		/* `content.showTooltip = false` */
		/* `content.selectOptions` is NOT `undefined` and `content.value` is NOT `undefined`. */

		this.selectContent_04 = {
			'formControl': InputSelectComponent.getFormControlByDefault(),
			'name': 'select_04',
			'label': undefined/*'_Test_04'*/,
			'controlType': InputSelectComponent,
			'value': 'VALUE B',
			'required': true,
			'width': '45%',
			'appearance': TextInputAppearance.outline,
			'ariaLabel': 'select_04',
			'selectOptions': [
				{
					'label': 'label a',
					'value': 'VALUE A'
				},
				{
					'label': 'label b',
					'value': 'VALUE B'
				},
				{
					'label': 'label c',
					'value': 'VALUE C'
				}
			],
			'multiple': false,
			'showTooltip': false
		};
	}

	private _Test_20(): void
	{
        /* `content.showTooltip = true` */
        /* `content.selectOptions = undefined` and `content.value = undefined` */

		this.selectContent_20 = {
			'formControl': InputSelectComponent.getFormControlByDefault(),
			'name': 'select_20',
			'label': undefined/*'_Test_20'*/,
			'controlType': InputSelectComponent,
			'value': undefined,
			'required': true,
			'width': '45%',
			'appearance': TextInputAppearance.outline,
			'ariaLabel': 'select_20',
			'selectOptions': undefined,
			'multiple': false,
            'showTooltip': true
		};
	}

	private _Test_21(): void
	{
        /* `content.showTooltip = true` */
		/* `content.selectOptions = undefined` and `content.value` is an array of values. */

		this.selectContent_21 = {
			'formControl': InputSelectComponent.getFormControlByDefault(),
			'name': 'select_21',
			'label': undefined/*'_Test_21'*/,
			'controlType': InputSelectComponent,
			'value': ['VALUE A', 'VALUE B', 'VALUE C'],
			'required': true,
			'width': '45%',
			'appearance': TextInputAppearance.outline,
			'ariaLabel': 'select_21',
			'selectOptions': undefined,
			'multiple': true,
            'showTooltip': true
		};
	}

	private _Test_22(): void
	{
        /* `content.showTooltip = true` */
		/* `content.selectOptions = undefined` and `content.value` is NOT an array of values. */

		this.selectContent_22 = {
			'formControl': InputSelectComponent.getFormControlByDefault(),
			'name': 'select_22',
			'label': undefined/*'_Test_22'*/,
			'controlType': InputSelectComponent,
			'value': 'VALUE B',
			'required': true,
			'width': '45%',
			'appearance': TextInputAppearance.outline,
			'ariaLabel': 'select_22',
			'selectOptions': undefined,
			'multiple': false,
            'showTooltip': true
		};
	}

	private _Test_23(): void
	{
        /* `content.showTooltip = true` */
        /* `content.selectOptions` is NOT `undefined` and `content.value = undefined`. */

		this.selectContent_23 = {
			'formControl': InputSelectComponent.getFormControlByDefault(),
			'name': 'select_23',
			'label': undefined/*'_Test_23'*/,
			'controlType': InputSelectComponent,
			'value': undefined,
			'required': true,
			'width': '45%',
			'appearance': TextInputAppearance.outline,
			'ariaLabel': 'select_23',
			'selectOptions': [
				{
					'label': 'label a',
					'value': 'VALUE A'
				},
				{
					'label': 'label b',
					'value': 'VALUE B'
				},
				{
					'label': 'label c',
					'value': 'VALUE C'
				}
			],
			'multiple': false,
            'showTooltip': true
		};
	}

	private _Test_24(): void
	{
        /* `content.showTooltip = true` */
		/* `content.selectOptions` is NOT `undefined` and `content.value` is NOT `undefined`. */

		this.selectContent_24 = {
			'formControl': InputSelectComponent.getFormControlByDefault(),
			'name': 'select_24',
			'label': undefined/*'_Test_24'*/,
			'controlType': InputSelectComponent,
			'value': 'VALUE B',
			'required': true,
			'width': '45%',
			'appearance': TextInputAppearance.outline,
			'ariaLabel': 'select_24',
			'selectOptions': [
				{
					'label': 'label a',
					'value': 'VALUE A'
				},
				{
					'label': 'label b',
					'value': 'VALUE B'
				},
				{
					'label': 'label c',
					'value': 'VALUE C'
				}
			],
			'multiple': false,
            'showTooltip': true
		};
	}
}
