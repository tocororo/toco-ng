import { Component } from '@angular/core';
import { Panel, FormFieldType } from '@toco/form-container/form-container.component';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss']
})
export class AppComponent {
	title = 'sceiba-inclusion';

	public panels: Panel[] = [{
		title: 'Información Primaria',
		description: "",
		iconName: "",
		formField : [
			{name: 'url', placeholder: 'URL', type: FormFieldType.url, required: true }, 
			{name: 'pedro', placeholder: 'data', type: FormFieldType.datepicker, required: false }, 
			{name: 'juan', placeholder: 'juan', type: FormFieldType.input, required: true },
			{name: 'check', placeholder: 'check', type: FormFieldType.checkbox, required: true }	
		]
	},
	{
		title: 'panel2',
		description: "este es el panel 2",
		iconName: "account_circle",
		formField : [
			{name: 'paco', placeholder: 'paco', type: FormFieldType.textarea, required: true }, 
			{name: 'pedro', placeholder: 'data', type: FormFieldType.datepicker, required: true }, 
			{name: 'juan', placeholder: 'juan', type: FormFieldType.input, required: true },
			{name: 'check', placeholder: 'check', type: FormFieldType.checkbox, required: true }
		]
	},
	{
		title: 'panel3',
		description: "este es el panel 3",
		iconName: "account_circle",
		formField : [
			{name: 'paco', placeholder: 'paco', type: FormFieldType.textarea, required: true }, 
			{name: 'pedro', placeholder: 'data', type: FormFieldType.datepicker, required: true }, 
			{name: 'juan', placeholder: 'juan', type: FormFieldType.input, required: true },
			{name: 'check', placeholder: 'check', type: FormFieldType.checkbox, required: true }
		]
	}];

}
