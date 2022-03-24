/*
 *   Copyright (c) 2020 Universidad de Pinar del Río "Hermanos Saíz Montes de Oca"
 *   All rights reserved.
 */


import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatChipsModule } from '@angular/material/chips';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSelectModule } from '@angular/material/select';
import { MatStepperModule } from '@angular/material/stepper';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { SourceService, TaxonomyService } from '../backend/public-api';
import { CoreModule } from '../core/public-api';
import { TocoFormsModule } from '../forms/public-api';
import { OrganizationsModule } from '../organizations/public-api';
import { CatalogFiltersComponent } from './catalog-filters/catalog-filters.component';
import { CatalogComponent, DialogCatalogJournalInfoDialog } from './catalog/catalog.component';
import { JournalViewInfoComponent, JournalViewInfoFieldComponent } from './journal-view/journal-view-info.component';
import { JournalViewFieldComponent } from './journal-view/journal-view-version-field.component';
import { JournalViewTermComponent } from './journal-view/journal-view-version-term.component';
import { JournalViewVersionComponent } from './journal-view/journal-view-version.component';
import { JournalViewComponent } from './journal-view/journal-view.component';
import { JournalEditComponent } from './source-edit/journal-edit/journal-edit.component';
import { SourceEditAddIndexComponent, SourceIndexesComponent } from './source-edit/source-indexes/source-indexes.component';
import { SourceOrganizationsComponent, SourceOrganizationSelectDialog, SourceOrganizationSelectTopDialog } from './source-edit/source-organizations/source-organizations.component';
import { SourcesListComponent } from './sources-list/sources-list.component';







@NgModule({
    declarations: [
        JournalViewComponent,
        JournalViewTermComponent,
        JournalViewInfoComponent,
        JournalViewInfoFieldComponent,
        JournalViewFieldComponent,
        JournalEditComponent,
        SourceEditAddIndexComponent,
        JournalViewVersionComponent,
        CatalogComponent,
        CatalogFiltersComponent,
        SourcesListComponent,
        DialogCatalogJournalInfoDialog,
        SourceOrganizationsComponent,
        SourceOrganizationSelectDialog,
        SourceOrganizationSelectTopDialog,
        SourceIndexesComponent
    ],
    entryComponents: [
        SourceEditAddIndexComponent,
        DialogCatalogJournalInfoDialog,
        SourceOrganizationSelectDialog,
        SourceOrganizationSelectTopDialog
    ],
    imports: [
        CommonModule,
        CoreModule,
        ReactiveFormsModule,
        TocoFormsModule,
        FormsModule,
        FlexLayoutModule,
        MatCardModule,
        MatIconModule,
        MatTabsModule,
        MatDividerModule,
        MatTooltipModule,
        MatToolbarModule,
        MatCheckboxModule,
        MatDialogModule,
        MatExpansionModule,
        MatPaginatorModule,
        MatMenuModule,
        MatChipsModule,
        MatSelectModule,
        MatTableModule,
        MatButtonModule,
        MatProgressBarModule,
        MatStepperModule,
        MatFormFieldModule,
        MatProgressSpinnerModule,
        OrganizationsModule
    ],

    exports: [
        JournalViewComponent,
        JournalEditComponent,
        JournalViewInfoComponent,
        CatalogComponent,
        SourcesListComponent
    ],

    providers: [
        SourceService,
        TaxonomyService,
        {
            provide: STEPPER_GLOBAL_OPTIONS,
            useValue: { displayDefaultIndicatorType: false }
          }
    ]
})
export class SourcesModule
{ }
