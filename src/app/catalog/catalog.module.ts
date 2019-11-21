import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { SharedModule } from '@toco/shared/shared.module';
import { FiltersModule } from '@toco/filters/filters.module';

import { CatalogComponent } from './catalog/catalog.component';
import { CatalogService } from './catalog.service';
import { CatalogFiltersComponent } from './catalog-filters/catalog-filters.component';
import { AuthenticateModule } from '../authenticate/authenticate.module';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    ReactiveFormsModule,
    FiltersModule,
    AuthenticateModule
  ],
  exports: [
    CatalogComponent
  ],
  declarations: [
    CatalogComponent,
    CatalogFiltersComponent
  ],
  providers: [
    CatalogService
  ]
})
export class CatalogModule { }
