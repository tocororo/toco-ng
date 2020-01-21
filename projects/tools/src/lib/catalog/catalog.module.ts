
import { NgModule } from '@angular/core';
import { SharedModule } from '@toco/tools/shared';
import { ReactiveFormsModule } from '@angular/forms';

import { FiltersModule } from '@toco/tools/filters';
import { AuthenticationModule } from '@toco/tools/authentication';
import { BackendModule } from '@toco/tools/backend';

import { CatalogComponent } from './catalog/catalog.component';
import { CatalogFiltersComponent } from './catalog-filters/catalog-filters.component';
import { SourcesListComponent } from './sources-list/sources-list.component';

@NgModule({
    declarations: [
        CatalogComponent,
        CatalogFiltersComponent,
        SourcesListComponent
    ],

    imports: [
        SharedModule,
        ReactiveFormsModule,
        FiltersModule,
        AuthenticationModule,
        BackendModule
    ],

    exports: [
        CatalogComponent,
        SourcesListComponent
    ],

    providers: [
    ]
})
export class CatalogModule
{ }
