
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatChipsModule } from '@angular/material/chips';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatSelectModule } from '@angular/material/select';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatTreeModule } from '@angular/material/tree';
import { BooleanFilterComponent } from './boolean-filter/boolean-filter.component';
import { FilterContainerService } from './filter-container.service';
import { FilterContainerComponent } from './filter-container/filter-container.component';
import { FilterDirective } from './filter.directive';
import { FiltersService } from './filters.service';
import { SelectAutocompleteFilterComponent } from './select-autocomplete-filter/select-autocomplete-filter.component';
import { SelectFilterOldComponent } from './select-filter/select-filter.component';
import { TitleFilterComponent } from './title-filter/title-filter.component';
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
    imports: [
        CommonModule,
        FormsModule,
        FlexLayoutModule,
        MatIconModule,
        MatTooltipModule,
        MatCheckboxModule,
        MatMenuModule,
        MatChipsModule,
        MatAutocompleteModule,
        MatSelectModule,
        MatTreeModule,
        // InfiniteScrollModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatInputModule
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
