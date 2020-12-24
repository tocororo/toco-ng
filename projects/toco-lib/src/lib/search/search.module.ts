
import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/public-api';

import { RecordComponent } from './record/record.component';
import { AggregationsComponent } from './aggregations/aggregations.component';
import { QueryInputComponent } from './query-input/query-input.component';
import { ReactiveFormsModule } from '@angular/forms';

import { RecordListComponent } from './record-list/record-list.component';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [
    RecordComponent,
    AggregationsComponent,
    QueryInputComponent,
    RecordListComponent
  ],

  imports: [
    CommonModule,
    SharedModule,
    ReactiveFormsModule,
    SharedModule
  ],

  exports: [
    RecordComponent,
    AggregationsComponent,
    QueryInputComponent,
    RecordListComponent
  ]
})
export class SearchModule
{ }
