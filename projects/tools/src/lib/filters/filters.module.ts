
import { NgModule } from '@angular/core';
import { SharedModule } from '@toco/tools/shared';
import { ReactiveFormsModule } from '@angular/forms';

import { BooleanFilterComponent } from './boolean-filter/boolean-filter.component';
import { FilterContainerComponent } from './filter-container/filter-container.component';
import { SelectAutocompleteFilterComponent } from './select-autocomplete-filter/select-autocomplete-filter.component';
import { SelectFilterComponent } from './select-filter/select-filter.component';
import { TitleFilterComponent } from './title-filter/title-filter.component';
import { FilterContainerService } from './filter-container.service';
import { FiltersService } from './filters.service';
import { FilterDirective } from './filter.directive';

@NgModule({
    declarations: [
        BooleanFilterComponent,
        FilterContainerComponent,
        SelectAutocompleteFilterComponent,
        SelectFilterComponent,
        TitleFilterComponent,
        FilterDirective
        
    ],

    entryComponents:[
        BooleanFilterComponent,
        SelectAutocompleteFilterComponent,
        SelectFilterComponent,
        TitleFilterComponent
    ],

    imports: [
        SharedModule,
        // InfiniteScrollModule,
        ReactiveFormsModule
    ],

    exports: [
        BooleanFilterComponent,
        FilterContainerComponent,
        SelectAutocompleteFilterComponent,
        SelectFilterComponent,
        TitleFilterComponent,
        FilterDirective
    ],

    providers: [
        FiltersService,
        FilterContainerService
    ]
})
export class FiltersModule
{ }
