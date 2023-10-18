import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { TocoFormsModule } from "../forms/public-api";
import { StaticsModule } from "../statics/public-api";

import { MatAutocompleteModule } from "@angular/material/autocomplete";
import { MatChipsModule } from "@angular/material/chips";
import { OrgAddComponent } from "./org-add/org-add.component";
import { OrgEditComponent } from "./org-edit/org-edit.component";
import { OrgSearchComponent } from "./org-search/org-search.component";
import { OrgTableEditComponent } from "./org-table-edit/org-table-edit.component";
import { OrgViewAccordionComponent } from "./org-view/org-view-accordion/org-view-accordion.component";
import { OrgViewAddressComponent } from "./org-view/org-view-address/org-view-address.component";
import { OrgViewGeoNamesCityComponent } from "./org-view/org-view-geo-names-city/org-view-geo-names-city.component";
import { OrgViewRelationshipComponent } from "./org-view/org-view-relationship/org-view-relationship.component";
import { OrgViewComponent } from "./org-view/org-view.component";
// import { OrgFooterComponent } from './org-footer/org-footer.component';
import { CommonModule } from "@angular/common";
import { HttpClientModule } from "@angular/common/http";
import { FlexLayoutModule } from "@angular/flex-layout";
import { MatDialogModule } from "@angular/material/dialog";
import { RouterModule } from "@angular/router";
import { SearchModule } from "../search/search.module";
import { OrgDialogComponent } from "./org-search-dialog/org-dialog/org-dialog.component";
import { OrgSearchDialogComponent } from "./org-search-dialog/org-search-dialog.component";
import { OrgTreeViewerComponent } from "./org-tree-viewer/org-tree-viewer.component";

@NgModule({
    declarations: [
        OrgViewComponent,
        OrgViewAccordionComponent,
        OrgViewAddressComponent,
        OrgViewGeoNamesCityComponent,
        OrgViewRelationshipComponent,
        OrgEditComponent,
        OrgAddComponent,
        OrgDialogComponent,
        OrgSearchComponent,
        OrgTableEditComponent,
        // OrgFooterComponent,
        OrgTreeViewerComponent,
        OrgSearchDialogComponent,
    ],
    imports: [
        FlexLayoutModule,
        CommonModule,
        FormsModule,
        HttpClientModule,
        ReactiveFormsModule,
        RouterModule,
        TocoFormsModule,
        MatAutocompleteModule,
        MatChipsModule,
        MatDialogModule,
        StaticsModule,
        SearchModule,
    ],
    exports: [
        OrgViewComponent,
        OrgEditComponent,
        OrgAddComponent,
        OrgSearchComponent,
        OrgSearchDialogComponent,
        // OrgFooterComponent,
        OrgTreeViewerComponent,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class OrganizationsModule {}
