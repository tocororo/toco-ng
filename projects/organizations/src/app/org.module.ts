
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { SharedModule } from '@toco/tools/shared';
import { OrganizationsModule } from '@toco/tools/organizations';
import { TocoFormsModule } from '@toco/tools/forms';
import { SearchService } from '@toco/tools/backend';

import { EnvServiceProvider } from '@tocoenv/tools/env.service.provider';

import { OrgRoutingModule } from './org-routing.module';
import { OrgRootComponent } from './org.component';
import { AggregationsComponent } from './aggregations/aggregations.component';

@NgModule({
	declarations: [
		OrgRootComponent,
		AggregationsComponent
	],

	imports: [
		BrowserAnimationsModule,
		SharedModule,
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
