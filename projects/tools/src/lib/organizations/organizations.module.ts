
import { NgModule } from '@angular/core';
import { SharedModule } from '@toco/tools/shared';
import { ReactiveFormsModule } from '@angular/forms';

import { TocoFormsModule } from '@toco/tools/forms';

import { OrgListComponent } from './org-list/org-list.component';
import { OrgViewComponent } from './org-view/org-view.component';

@NgModule({
	declarations: [
		OrgListComponent,
		OrgViewComponent],

	imports: [
		SharedModule,
		ReactiveFormsModule,
		TocoFormsModule
	],

	exports: [
		OrgListComponent,
		OrgViewComponent
	]
})
export class OrganizationsModule
{ }
