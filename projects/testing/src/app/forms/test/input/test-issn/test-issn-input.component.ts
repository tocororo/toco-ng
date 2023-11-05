
import { Component, OnInit } from '@angular/core';

import { ContentPosition, IconSource, IconValue } from 'projects/toco-lib/src/lib/forms/form-field.control';
import { InputContent, TextInputAppearance } from 'projects/toco-lib/src/lib/forms/input/input.control';
import { InputIssnComponent } from 'projects/toco-lib/src/lib/forms/input/issn/issn-input.component';

@Component({
	selector: 'test-input-issn',
	templateUrl: './test-issn-input.component.html',
	styleUrls: ['./test-issn-input.component.scss']
})
export class TestInputIssnComponent implements OnInit
{
	public inputContent_00: InputContent;
	public inputContent_01: InputContent;

	public inputContent_02: InputContent;
	public inputContent_03: InputContent;

	public constructor()
	{
		this.inputContent_00 = undefined;
		this.inputContent_01 = undefined;

		this.inputContent_02 = undefined;
		this.inputContent_03 = undefined;
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
	}

	private _Test_00(): void
	{
		/* `content.label = undefined` */
		/* `content.value = undefined` */

		this.inputContent_00 = {
			'formControl': InputIssnComponent.getFormControlByDefault(),
			'name': 'issn_00',
			'label': undefined,
			'controlType': InputIssnComponent,
			'value': undefined,
			'required': true,
			'width': '45%',
			'appearance': TextInputAppearance.outline,
			'ariaLabel': 'issn_00'
		};
	}

	private _Test_01(): void
	{
		/* `content.label = undefined` */
		/* `content.value` is NOT `undefined`. */

		this.inputContent_01 = {
			'formControl': InputIssnComponent.getFormControlByDefault(),
			'name': 'issn_01',
			'label': undefined,
			'controlType': InputIssnComponent,
			'value': '1234-124x',
			'required': true,
			'width': '45%',
			'appearance': TextInputAppearance.outline,
			'prefixIcon': new IconValue(IconSource.internal, ContentPosition.prefix, 'outlined-bar_code-24px'),
			'ariaLabel': 'issn_01'
		};
	}

	private _Test_02(): void
	{
		/* `content.label` is NOT `undefined`. */
		/* `content.value = undefined` */

		this.inputContent_02 = {
			'formControl': InputIssnComponent.getFormControlByDefault(),
			'name': 'issn_02',
			'label': 'ISSN_02',
			'controlType': InputIssnComponent,
			'value': undefined,
			'required': true,
			'width': '45%',
			'appearance': TextInputAppearance.outline,
			'ariaLabel': 'issn_02'
		};
	}

	private _Test_03(): void
	{
		/* `content.label` is NOT `undefined`. */
		/* `content.value` is NOT `undefined`. */

		this.inputContent_03 = {
			'formControl': InputIssnComponent.getFormControlByDefault(),
			'name': 'issn_03',
			'label': 'ISSN_03',
			'controlType': InputIssnComponent,
			'value': '1234-124x',
			'required': true,
			'width': '45%',
			'appearance': TextInputAppearance.outline,
			'prefixIcon': new IconValue(IconSource.internal, ContentPosition.prefix, 'outlined-bar_code-24px'),
			'ariaLabel': 'issn_03'
		};
	}
}
