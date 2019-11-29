
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from './shared/shared.module';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { FormContainerComponent } from '@toco/forms/form-container/form-container.component';
import { FormFieldsComponent } from './forms/form-fields/form-fields.component';
import { IdsPanelFormFieldComponent } from './forms/ids-panel-form-field/ids-panel-form-field.component';
//import { IssnFormFieldComponent } from './forms/issn-form-field/issn-form-field.component';
import { MyTelInput } from './forms/issn-form-field/issn-form-field.component';

@NgModule({
	declarations: [
		AppComponent,
		FormContainerComponent,
		FormFieldsComponent,
		IdsPanelFormFieldComponent,
		//IssnFormFieldComponent,

		MyTelInput
	],

	imports: [
		CommonModule,
		SharedModule,
		HttpClientModule,
		ReactiveFormsModule
	],

	providers: [
	],
})
export class AppModule
{ }
