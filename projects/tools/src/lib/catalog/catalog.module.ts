
import { NgModule } from '@angular/core';
import { SharedModule } from '@toco/tools/shared';
import { ReactiveFormsModule } from '@angular/forms';

import { FiltersModule } from '@toco/tools/filters';
import { AuthenticateModule } from '@toco/tools/authenticate';

import { CatalogComponent } from './catalog/catalog.component';
import { CatalogService } from './catalog.service';
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
        AuthenticateModule
    ],

    exports: [
        CatalogComponent,
        SourcesListComponent
    ],

    providers: [
        CatalogService
    ]
})
export class CatalogModule
{ }
