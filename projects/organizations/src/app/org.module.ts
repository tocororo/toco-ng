
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SharedModule } from '@toco/tools/shared';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';

import { OrganizationsModule } from '@toco/tools/organizations';
import { TocoFormsModule } from '@toco/tools/forms';
import { SearchService } from '@toco/tools/backend';

import { EnvServiceProvider } from '@tocoenv/tools/env.service.provider';

import { OrgRoutingModule } from './org-routing.module';
import { OrgRootComponent } from './org.component';
import { AggregationsComponent } from './aggregations/aggregations.component';
import { InMemoryDataService }  from './in-memory-data.service';

@NgModule({
	declarations: [
		OrgRootComponent,
		AggregationsComponent
	],

	imports: [
		BrowserAnimationsModule,
		SharedModule,
		// The `HttpClientInMemoryWebApiModule` module intercepts HTTP requests 
		// and returns simulated server responses. 
		// Remove it when a real server is ready to receive requests. 
		HttpClientInMemoryWebApiModule.forRoot(
			InMemoryDataService, { dataEncapsulation: false }
		),
		//    ReactiveFormsModule,    
		OrganizationsModule,
		// AuthenticationModule,
		TocoFormsModule,
		OrgRoutingModule
	],

	providers: [
		SearchService,
		EnvServiceProvider
	],

	bootstrap: [OrgRootComponent]
})
export class OrgModule { }
