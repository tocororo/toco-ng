import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HarvesterRoutingModule } from './harvester-routing.module';
import { RepositoriesComponent } from './repositories/repositories.component';
import { HarvesterComponent } from './harvester/harvester.component';
import { SharedModule } from '../shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import { HarvesterService } from './harvester.service';
import { FiltersModule } from '@toco/filters/filters.module';
import { HarvesterFiltersComponent } from './harvester-filters/harvester-filters.component';
import { CatalogService } from '@toco/catalog/catalog.service';
import { RepositoryComponent } from './repository/repository.component';
@NgModule({
  imports: [
    CommonModule,
    HarvesterRoutingModule,
    SharedModule,
    ReactiveFormsModule,
    FiltersModule
  ],
  declarations: [
    RepositoriesComponent,
    RepositoryComponent,
    HarvesterComponent,
    HarvesterFiltersComponent,
  ],
  providers: [
    CatalogService,
    HarvesterService
    // FiltersService,
    // FilterContainerService
  ]
})
export class HarvesterModule { }
