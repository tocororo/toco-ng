
import { NgModule } from '@angular/core';

import { TaxonomyService } from './taxonomy.service';
import { CatalogService } from './catalog.service';

@NgModule({
    providers: [
        TaxonomyService,
        CatalogService
    ]
})
export class BackendModule
{ }
