import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RecordListComponent } from './record-list/record-list.component';
import { RecordComponent } from './record/record.component';
import { SharedModule } from '../shared';
import { AggregationsComponent } from './aggregations/aggregations.component';


@NgModule({
  declarations: [
    RecordListComponent,
    RecordComponent,
    AggregationsComponent,
  ],
  imports: [
    CommonModule,
    SharedModule
  ],
  exports: [
    RecordListComponent,
    RecordComponent,
    AggregationsComponent
],
})
export class SearchModule { }
