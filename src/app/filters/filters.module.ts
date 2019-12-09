import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { FiltersService } from './filters.service';
import { TitleFilterComponent } from './title-filter/title-filter.component';
import { FilterDirective } from './filter.directive';
import { BooleanFilterComponent } from './boolean-filter/boolean-filter.component';
import { SelectFilterComponent } from './select-filter/select-filter.component';
import { SelectAutocompleteFilterComponent } from './select-autocomplete-filter/select-autocomplete-filter.component';
import { ReactiveFormsModule } from '@angular/forms';
import { FilterContainerService } from './filter-container.service';
import { FilterContainerComponent } from './filter-container/filter-container.component';
@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    // InfiniteScrollModule,
    ReactiveFormsModule
  ],
  declarations: [
    TitleFilterComponent,
    FilterDirective,
    BooleanFilterComponent,
    SelectFilterComponent,
    SelectAutocompleteFilterComponent,
    FilterContainerComponent
  ],
  exports: [
    FilterDirective,
  ],
  entryComponents:[
    TitleFilterComponent,
    BooleanFilterComponent,
    SelectFilterComponent,
    SelectAutocompleteFilterComponent
  ],
  providers: [
    FiltersService,
    FilterContainerService
  ]
})
export class FiltersModule { }
