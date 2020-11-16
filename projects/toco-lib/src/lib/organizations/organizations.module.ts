
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { SharedModule } from '../shared/public-api';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { TocoFormsModule } from '../forms/public-api';
import { StaticsModule } from '../statics/public-api';


import { OrgViewComponent } from './org-view/org-view.component';
import { OrgViewAccordionComponent } from './org-view/org-view-accordion/org-view-accordion.component';
import { OrgViewAddressComponent } from './org-view/org-view-address/org-view-address.component';
import { OrgViewGeoNamesCityComponent } from './org-view/org-view-geo-names-city/org-view-geo-names-city.component';
import { OrgViewRelationshipComponent } from './org-view/org-view-relationship/org-view-relationship.component';
import { OrgEditComponent } from './org-edit/org-edit.component';
import { OrgAddComponent } from './org-add/org-add.component';
import { OrgSearchComponent } from './org-search/org-search.component';
import { MatAutocompleteModule, MatChipsModule } from '@angular/material';
import { OrgTableEditComponent } from './org-table-edit/org-table-edit.component';
import { OrgFooterComponent } from './org-footer/org-footer.component';
import { RouterModule } from '@angular/router';
import { FlexLayoutModule } from '@angular/flex-layout';
import { AngularMaterialModule } from '../angular-material/public-api';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { OrgTreeViewerComponent } from './org-tree-viewer/org-tree-viewer.component';

@NgModule({
	declarations: [
		OrgViewComponent,
		OrgViewAccordionComponent,
		OrgViewAddressComponent,
		OrgViewGeoNamesCityComponent,
		OrgViewRelationshipComponent,
		OrgEditComponent,
		OrgAddComponent,
		OrgSearchComponent,
		OrgTableEditComponent,
		OrgFooterComponent,
		OrgTreeViewerComponent
	],

	imports: [
		// SharedModule,
		FlexLayoutModule,
		CommonModule,
		FormsModule,
		HttpClientModule,
		AngularMaterialModule,

		ReactiveFormsModule,
		RouterModule,
		TocoFormsModule,
		MatAutocompleteModule,
		MatChipsModule,
		StaticsModule
	],

	exports: [
		OrgViewComponent,
		OrgEditComponent,
		OrgAddComponent,
		OrgSearchComponent,
    OrgFooterComponent,
    OrgTreeViewerComponent
	],
	schemas: [
        CUSTOM_ELEMENTS_SCHEMA
    ]
})
export class OrganizationsModule
{ }
