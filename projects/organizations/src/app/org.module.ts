
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { SharedModule } from '@toco/tools/shared';
import { OrganizationsModule } from '@toco/tools/organizations';
import { TocoFormsModule } from '@toco/tools/forms';
import { SearchService } from '@toco/tools/backend';

import { EnvServiceProvider } from '@tocoenv/tools/env.service.provider';

import { OrgRoutingModule } from './org-routing.module';
import { OrgComponent } from './org.component';
import { AggregationsComponent } from './aggregations/aggregations.component';

@NgModule({
	declarations: [
		OrgComponent,
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

	bootstrap: [OrgComponent]
})
export class OrgModule { }
