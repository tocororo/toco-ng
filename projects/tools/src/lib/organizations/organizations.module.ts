
import { NgModule } from '@angular/core';
import { SharedModule } from '@toco/tools/shared';
import { ReactiveFormsModule } from '@angular/forms';

import { TocoFormsModule } from '@toco/tools/forms';
import { StaticsModule } from '@toco/tools/statics';

import { OrgListComponent } from './org-list/org-list.component';
import { OrgViewComponent } from './org-view/org-view.component';
import { OrgViewAccordionComponent } from './org-view/org-view-accordion/org-view-accordion.component';
import { OrgViewAddressComponent } from './org-view/org-view-address/org-view-address.component';
import { OrgViewRelationshipComponent } from './org-view/org-view-relationship/org-view-relationship.component';
import { OrgEditComponent } from './org-edit/org-edit.component';
import { OrgAddComponent } from './org-add/org-add.component';

@NgModule({
	declarations: [
		OrgListComponent,
		OrgViewComponent,
		OrgViewAccordionComponent,
		OrgViewAddressComponent,
		OrgViewRelationshipComponent,
		OrgEditComponent,
		OrgAddComponent
	],

	imports: [
		SharedModule,
		ReactiveFormsModule,
		TocoFormsModule,
		StaticsModule
	],

	exports: [
		OrgListComponent,
		OrgViewComponent,
		OrgEditComponent,
		OrgAddComponent
	]
})
export class OrganizationsModule
{ }
