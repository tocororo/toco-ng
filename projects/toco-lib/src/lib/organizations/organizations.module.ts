
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatTreeModule } from '@angular/material/tree';
// import { OrgFooterComponent } from './org-footer/org-footer.component';
import { RouterModule } from '@angular/router';
import { TocoFormsModule } from '../forms/public-api';
import { StaticsModule } from '../statics/public-api';
import { OrgAddComponent } from './org-add/org-add.component';
import { OrgEditComponent } from './org-edit/org-edit.component';
import { OrgSearchComponent } from './org-search/org-search.component';
import { OrgTableEditComponent } from './org-table-edit/org-table-edit.component';
import { OrgTreeViewerComponent } from './org-tree-viewer/org-tree-viewer.component';
import { OrgViewAccordionComponent } from './org-view/org-view-accordion/org-view-accordion.component';
import { OrgViewAddressComponent } from './org-view/org-view-address/org-view-address.component';
import { OrgViewGeoNamesCityComponent } from './org-view/org-view-geo-names-city/org-view-geo-names-city.component';
import { OrgViewRelationshipComponent } from './org-view/org-view-relationship/org-view-relationship.component';
import { OrgViewComponent } from './org-view/org-view.component';





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
		// OrgFooterComponent,
		OrgTreeViewerComponent
	],

	imports: [
		//
		FlexLayoutModule,
		CommonModule,
		FormsModule,
		HttpClientModule,

		ReactiveFormsModule,
		RouterModule,
		TocoFormsModule,
		MatAutocompleteModule,
		MatChipsModule,
    MatExpansionModule,
    MatTooltipModule,
    MatTreeModule,
    MatCardModule,
    MatFormFieldModule,
    MatButtonModule,
		StaticsModule
	],

	exports: [
		OrgViewComponent,
		OrgEditComponent,
		OrgAddComponent,
		OrgSearchComponent,
    // OrgFooterComponent,
    OrgTreeViewerComponent
	],
	schemas: [
        CUSTOM_ELEMENTS_SCHEMA
    ]
})
export class OrganizationsModule
{ }
