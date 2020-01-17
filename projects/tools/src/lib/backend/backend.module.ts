
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { TaxonomyService } from './taxonomy.service';
import { CatalogService } from './catalog.service';

/**
 * A module that contains all shared modules.
 */
@NgModule({
    declarations: [
    ],

    imports: [
    ],

    exports: [

    ],
    providers: [
      TaxonomyService,
      CatalogService
    ],
    schemas: [
        CUSTOM_ELEMENTS_SCHEMA
    ]
})
export class SharedModule
{ }
