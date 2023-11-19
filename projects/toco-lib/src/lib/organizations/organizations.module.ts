import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { TocoFormsModule } from "../forms/public-api";
import { StaticsModule } from "../statics/public-api";

import { CommonModule } from "@angular/common";
import { HttpClientModule } from "@angular/common/http";
import { FlexLayoutModule } from "@angular/flex-layout";
import { MatAutocompleteModule } from "@angular/material/autocomplete";
import { MatChipsModule } from "@angular/material/chips";
import { MatDialogModule } from "@angular/material/dialog";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatIconModule } from "@angular/material/icon";
import { MatInputModule } from "@angular/material/input";
import { MatTreeModule } from "@angular/material/tree";
import { RouterModule } from "@angular/router";
import { SearchModule } from "../search/search.module";
import { OrgAddComponent } from "./org-add/org-add.component";
import { OrgEditComponent } from "./org-edit/org-edit.component";
import { OrgDialogComponent } from "./org-search-dialog/org-dialog/org-dialog.component";
import { OrgSearchDialogComponent } from "./org-search-dialog/org-search-dialog.component";
import { OrgSearchComponent } from "./org-search/org-search.component";
import { OrgTableEditComponent } from "./org-table-edit/org-table-edit.component";
import { OrgTreeViewerComponent } from "./org-tree-viewer/org-tree-viewer.component";

@NgModule({
    declarations: [
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
        MatFormFieldModule,
        MatInputModule,
        MatTreeModule,
        MatIconModule
    ],
    exports: [
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
