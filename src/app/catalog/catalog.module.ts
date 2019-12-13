
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { SharedModule } from '@toco/shared/shared.module';
import { FiltersModule } from '@toco/filters/filters.module';
import { AuthenticateModule } from '@toco/authenticate/authenticate.module';

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
        CommonModule,
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
