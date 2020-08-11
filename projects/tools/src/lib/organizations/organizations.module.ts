
import { NgModule } from '@angular/core';
import { SharedModule } from '@toco/tools/shared';
import { ReactiveFormsModule } from '@angular/forms';

import { TocoFormsModule } from '@toco/tools/forms';
import { StaticsModule } from '@toco/tools/statics';


import { OrgViewComponent } from './org-view/org-view.component';
import { OrgViewAccordionComponent } from './org-view/org-view-accordion/org-view-accordion.component';
import { OrgViewAddressComponent } from './org-view/org-view-address/org-view-address.component';
import { OrgViewRelationshipComponent } from './org-view/org-view-relationship/org-view-relationship.component';
import { OrgEditComponent } from './org-edit/org-edit.component';
import { OrgAddComponent } from './org-add/org-add.component';
import { OrgSearchComponent } from './org-search/org-search.component';
import { MatAutocompleteModule, MatChipsModule } from '@angular/material';
import { OrgTableEditComponent } from './org-table-edit/org-table-edit.component';

@NgModule({
	declarations: [
		OrgViewComponent,
		OrgViewAccordionComponent,
		OrgViewAddressComponent,
		OrgViewRelationshipComponent,
		OrgEditComponent,
		OrgAddComponent,
		OrgSearchComponent,
		OrgTableEditComponent
	],

	imports: [
		SharedModule,
		ReactiveFormsModule,
		TocoFormsModule,
		MatAutocompleteModule,
		MatChipsModule,
		StaticsModule
	],

	exports: [
		OrgViewComponent,
		OrgEditComponent,
		OrgAddComponent,
		OrgSearchComponent
	]
})
export class OrganizationsModule
{ }
