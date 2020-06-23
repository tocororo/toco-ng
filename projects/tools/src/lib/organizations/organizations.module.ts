
import { NgModule } from '@angular/core';
import { SharedModule } from '@toco/tools/shared';
import { ReactiveFormsModule } from '@angular/forms';

import { OrgListComponent } from './org-list/org-list.component';
import { OrgViewComponent } from './org-view/org-view.component';

@NgModule({
	declarations: [
		OrgListComponent,
		OrgViewComponent],

	imports: [
		SharedModule,
		ReactiveFormsModule
	],

	exports: [
		OrgListComponent,
		OrgViewComponent
	]
})
export class OrganizationsModule
{ }
