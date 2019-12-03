
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from './shared/shared.module';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { FormContainerComponent } from '@toco/forms/form-container/form-container.component';
import { FormFieldsComponent } from './forms/form-fields/form-fields.component';
import { IssnFormFieldComponent } from './forms/issn-form-field/issn-form-field.component';

@NgModule({
	declarations: [
		AppComponent,
		FormContainerComponent,
		FormFieldsComponent,
		IssnFormFieldComponent
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
