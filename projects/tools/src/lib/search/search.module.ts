import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RecordListComponent } from './record-list/record-list.component';
import { RecordComponent } from './record/record.component';
import { SharedModule } from '../shared';
import { AggregationsComponent } from './aggregations/aggregations.component';
import { QueryInputComponent } from './query-input/query-input.component';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    RecordListComponent,
    RecordComponent,
    AggregationsComponent,
    QueryInputComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    ReactiveFormsModule
  ],
  exports: [
    RecordListComponent,
    RecordComponent,
    AggregationsComponent,
    QueryInputComponent
],
})
export class SearchModule { }
