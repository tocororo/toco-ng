import { Component, OnInit,  Input } from '@angular/core';
import { FormFieldType, FormField } from '@toco/forms/form-container/form-container.component';

/**
 * This componente defines a form fields collection.
 * @description  `fields` is an input atribute, that represents a `FormField` interface Array.
 */
@Component({
	selector: 'toco-form-fields',
	templateUrl: './form-fields.component.html',
	styleUrls: ['./form-fields.component.scss']
})
export class FormFieldsComponent implements OnInit {

	@Input() public fields: Array<FormField>;
	
	public readonly formFieldType: typeof FormFieldType = FormFieldType;

	public constructor()
	{ }

	public ngOnInit(): void
	{
		if (!this.fields)
		{
			this.fields = [];
		}
	}
}
