/*
 *   Copyright (c) 2020 Universidad de Pinar del Río "Hermanos Saíz Montes de Oca"
 *   All rights reserved.
 */


import { NgModule } from '@angular/core';
import { SharedModule } from '@toco/tools/shared';
import { ReactiveFormsModule } from '@angular/forms';

import { FiltersModule } from '@toco/tools/filters';
import { AuthenticationModule } from '@toco/tools/authentication';
import { BackendModule } from '@toco/tools/backend';

import { CatalogComponent, DialogCatalogJournalInfoDialog } from './catalog/catalog.component';
import { CatalogFiltersComponent } from './catalog-filters/catalog-filters.component';
import { SourcesListComponent } from './sources-list/sources-list.component';
import { JournalModule } from '../journal';

@NgModule({
    declarations: [
        CatalogComponent,
        CatalogFiltersComponent,
        SourcesListComponent,
        DialogCatalogJournalInfoDialog
    ],

    imports: [
        SharedModule,
        ReactiveFormsModule,
        FiltersModule,
        AuthenticationModule,
        BackendModule,
        JournalModule
    ],

    exports: [
        CatalogComponent,
        SourcesListComponent
    ],

    entryComponents: [
        DialogCatalogJournalInfoDialog
    ],

    providers: [
    ]
})
export class CatalogModule
{ }
