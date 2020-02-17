import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SearchRoutingModule } from './search-routing.module';
import { RecordListComponent } from './record-list/record-list.component';
import { RecordComponent } from './record/record.component';


@NgModule({
  declarations: [
    RecordListComponent,
    RecordComponent,
  ],
  imports: [
    CommonModule,
    SearchRoutingModule,
  ],
  exports: [
    RecordListComponent,
    RecordComponent,
],
})
export class SearchModule { }
