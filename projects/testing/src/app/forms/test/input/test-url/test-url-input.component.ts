
import { Component, OnInit } from '@angular/core';

import { ContentPosition, IconSource, IconValue } from 'projects/toco-lib/src/lib/forms/form-field.control';
import { InputContent, TextInputAppearance } from 'projects/toco-lib/src/lib/forms/input/input.control';
import { InputUrlComponent } from 'projects/toco-lib/src/lib/forms/input/url/url-input.component';

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
			'value': 'https://www.google.com/',
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
			'value': 'https://www.google.com/',
			'required': true,
			'width': '45%',
			'appearance': TextInputAppearance.standard,
			'prefixIcon': new IconValue(),
			// 'prefixIcon': new IconValue(IconSource.internal, ContentPosition.prefix, 'outlined-bar_code-24px'),
			'ariaLabel': 'url_03'
		};
	}
}
