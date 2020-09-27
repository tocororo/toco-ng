/*
 *   Copyright (c) 2020 Universidad de Pinar del Río "Hermanos Saíz Montes de Oca"
 *   All rights reserved.
 */


import { NgModule } from '@angular/core';
import { SharedModule } from '@toco/tools/shared';
import { ReactiveFormsModule } from '@angular/forms';

import { TocoFormsModule } from '@toco/tools/forms';
import { SourceService, TaxonomyService } from '@toco/tools/backend';

import { JournalViewComponent } from './journal-view/journal-view.component';
import { JournalEditComponent } from './source-edit/journal-edit/journal-edit.component';
import { JournalViewTermComponent } from './journal-view/journal-view-version-term.component';
import { JournalViewInfoComponent, JournalViewInfoFieldComponent } from './journal-view/journal-view-info.component';
import { JournalViewFieldComponent } from './journal-view/journal-view-version-field.component';
import { JournalViewVersionComponent } from './journal-view/journal-view-version.component';
import { CoreModule } from '../core';
import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';
import { InstitutionsModule } from '../institutions/institutions.module';
import { JournalInstitutionsComponent, JournalAddInstitutionComponent, JournalAddExtraInstitutionComponent } from './journal-institutions/journal-institutions.component';
import { ExtraInstitutionSelectorComponent } from '../institutions/extra-institution-selector/extra-institution-selector.component';

import { CatalogFiltersComponent } from './catalog-filters/catalog-filters.component';
import { CatalogComponent, DialogCatalogJournalInfoDialog } from './catalog/catalog.component';
import { SourcesListComponent } from './sources-list/sources-list.component';
import { SourceOrganizationsComponent, SourceOrganizationSelectDialog } from './source-edit/source-organizations/source-organizations.component';
import { OrganizationsModule } from '../organizations';
import { SourceIndexesComponent, SourceEditAddIndexComponent } from './source-edit/source-indexes/source-indexes.component';

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
        JournalInstitutionsComponent,
        JournalAddInstitutionComponent,
        JournalAddExtraInstitutionComponent,
        CatalogComponent,
        CatalogFiltersComponent,
        SourcesListComponent,
        DialogCatalogJournalInfoDialog,
        SourceOrganizationsComponent,
        SourceOrganizationSelectDialog,
        SourceIndexesComponent
    ],
    entryComponents: [
        SourceEditAddIndexComponent,
        JournalAddInstitutionComponent,
        JournalAddExtraInstitutionComponent,
        DialogCatalogJournalInfoDialog,
        SourceOrganizationSelectDialog
    ],
    imports: [
        SharedModule,
        CoreModule,
        ReactiveFormsModule,
        TocoFormsModule,
        InstitutionsModule,
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
