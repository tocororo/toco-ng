import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from "@angular/core";
import { SharedModule } from "../shared/public-api";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { TocoFormsModule } from "../forms/public-api";
import { StaticsModule } from "../statics/public-api";

import { OrgViewComponent } from "./org-view/org-view.component";
import { OrgViewAccordionComponent } from "./org-view/org-view-accordion/org-view-accordion.component";
import { OrgViewAddressComponent } from "./org-view/org-view-address/org-view-address.component";
import { OrgViewGeoNamesCityComponent } from "./org-view/org-view-geo-names-city/org-view-geo-names-city.component";
import { OrgViewRelationshipComponent } from "./org-view/org-view-relationship/org-view-relationship.component";
import { OrgEditComponent } from "./org-edit/org-edit.component";
import { OrgAddComponent } from "./org-add/org-add.component";
import { OrgSearchComponent } from "./org-search/org-search.component";
import { MatLegacyAutocompleteModule as MatAutocompleteModule } from "@angular/material/legacy-autocomplete";
import { MatLegacyChipsModule as MatChipsModule } from "@angular/material/legacy-chips";
import { OrgTableEditComponent } from "./org-table-edit/org-table-edit.component";
// import { OrgFooterComponent } from './org-footer/org-footer.component';
import { RouterModule } from "@angular/router";
import { FlexLayoutModule } from "@angular/flex-layout";
import { AngularMaterialModule } from "../angular-material/public-api";
import { HttpClientModule } from "@angular/common/http";
import { CommonModule } from "@angular/common";
import { OrgTreeViewerComponent } from "./org-tree-viewer/org-tree-viewer.component";
import { OrgDialogComponent } from "./org-search-dialog/org-dialog/org-dialog.component";
import { OrgSearchDialogComponent } from "./org-search-dialog/org-search-dialog.component";
import { SearchModule } from "../search/search.module";

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
        AngularMaterialModule,
        ReactiveFormsModule,
        RouterModule,
        TocoFormsModule,
        MatAutocompleteModule,
        MatChipsModule,
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
