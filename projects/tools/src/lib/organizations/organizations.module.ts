
import { NgModule } from '@angular/core';
import { SharedModule } from '@toco/tools/shared';
import { ReactiveFormsModule } from '@angular/forms';

import { TocoFormsModule } from '@toco/tools/forms';

import { OrgListComponent } from './org-list/org-list.component';
import { OrgViewComponent } from './org-view/org-view.component';
import { OrgEditComponent } from './org-edit/org-edit.component';

@NgModule({
	declarations: [
		OrgListComponent,
		OrgViewComponent,
		OrgEditComponent
	],

	imports: [
		SharedModule,
		ReactiveFormsModule,
		TocoFormsModule
	],

	exports: [
		OrgListComponent,
		OrgViewComponent,
		OrgEditComponent
	]
})
export class OrganizationsModule
{ }
