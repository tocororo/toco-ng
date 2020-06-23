
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { SharedModule } from '@toco/tools/shared';
import { OrganizationsModule } from '@toco/tools/organizations';
import { TocoFormsModule } from '@toco/tools/forms';
import { SearchService } from '@toco/tools/backend';

import { EnvServiceProvider } from '@tocoenv/tools/env.service.provider';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AggregationsComponent } from './aggregations/aggregations.component';

@NgModule({
	declarations: [
		AppComponent,
		AggregationsComponent
	],

	imports: [
		BrowserAnimationsModule,
		SharedModule,
		//    ReactiveFormsModule,    
		OrganizationsModule,
		// AuthenticationModule,
		TocoFormsModule,
		AppRoutingModule
	],

	providers: [
		SearchService,
		EnvServiceProvider
	],

	bootstrap: [AppComponent]
})
export class AppModule { }
