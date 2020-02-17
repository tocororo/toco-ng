import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RecordListComponent } from './record-list/record-list.component';
import { RecordComponent } from './record/record.component';
import { SharedModule } from '../shared';


@NgModule({
  declarations: [
    RecordListComponent,
    RecordComponent,
  ],
  imports: [
    CommonModule,
    SharedModule
  ],
  exports: [
    RecordListComponent,
    RecordComponent,
],
})
export class SearchModule { }
