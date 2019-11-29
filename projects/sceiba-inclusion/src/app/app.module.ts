import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { SharedModule } from '@toco/shared/shared.module';

import { AppComponent } from './app.component';

import { CatalogModule } from '@toco/catalog/catalog.module';
import { JournalModule } from '@toco/journal/journal.module';

@NgModule({
	declarations: [
		AppComponent
	],
	imports: [
		BrowserModule,
		HttpClientModule,
		SharedModule,
		CatalogModule, 
		JournalModule
	],
	providers: [],
	bootstrap: [AppComponent]
})
export class AppModule { }
