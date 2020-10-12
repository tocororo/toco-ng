
import { NgModule } from '@angular/core';
import { SharedModule } from '@toco/shared';
import { ReactiveFormsModule } from '@angular/forms';

import { FiltersModule } from '@toco/filters';
import { CatalogService } from '@toco/backend';

import { HarvesterRoutingModule } from './harvester-routing.module';
import { RepositoriesComponent } from './repositories/repositories.component';
import { RepositoryComponent } from './repository/repository.component';
import { HarvesterComponent } from './harvester/harvester.component';
import { HarvesterService } from './harvester.service';
import { HarvesterFiltersComponent } from './harvester-filters/harvester-filters.component';

@NgModule({
    declarations: [
        RepositoriesComponent,
        RepositoryComponent,
        HarvesterComponent,
        HarvesterFiltersComponent
    ],

    imports: [
        SharedModule,
        ReactiveFormsModule,
        HarvesterRoutingModule,
        FiltersModule
    ],

    exports: [
        RepositoriesComponent,
        RepositoryComponent,
        HarvesterComponent,
        HarvesterFiltersComponent
    ],

    providers: [
        CatalogService,
        HarvesterService
        // FiltersService,
        // FilterContainerService
    ]
})
export class HarvesterModule
{ }
