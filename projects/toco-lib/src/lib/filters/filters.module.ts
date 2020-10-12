
import { NgModule } from '@angular/core';
import { SharedModule } from '@toco/shared';
import { ReactiveFormsModule } from '@angular/forms';

import { BooleanFilterComponent } from './boolean-filter/boolean-filter.component';
import { FilterContainerComponent } from './filter-container/filter-container.component';
import { SelectAutocompleteFilterComponent } from './select-autocomplete-filter/select-autocomplete-filter.component';
import { SelectFilterOldComponent } from './select-filter/select-filter.component';
import { TitleFilterComponent } from './title-filter/title-filter.component';
import { FilterContainerService } from './filter-container.service';
import { FiltersService } from './filters.service';
import { FilterDirective } from './filter.directive';
import { TreeFilterComponent } from './tree-filter/tree-filter.component';

@NgModule({
    declarations: [
        BooleanFilterComponent,
        FilterContainerComponent,
        SelectAutocompleteFilterComponent,
        SelectFilterOldComponent,
        TitleFilterComponent,
        FilterDirective,
        TreeFilterComponent
    ],

    entryComponents:[
        BooleanFilterComponent,
        SelectAutocompleteFilterComponent,
        SelectFilterOldComponent,
        TitleFilterComponent,
        TreeFilterComponent
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
        SelectFilterOldComponent,
        TitleFilterComponent,
        FilterDirective,
        TreeFilterComponent
    ],

    providers: [
        FiltersService,
        FilterContainerService
    ]
})
export class FiltersModule
{ }
