
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from './shared/shared.module';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

import { FormsModule } from './forms/forms.module';
import { AppComponent } from './app.component';

@NgModule({
	declarations: [
		AppComponent
	],

	imports: [
		CommonModule,
		SharedModule,
		HttpClientModule,
		ReactiveFormsModule,
		FormsModule
	],

	providers: [
	],
})
export class AppModule
{ }
