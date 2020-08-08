
import { NgModule } from '@angular/core';
import { SharedModule } from '@toco/tools/shared';

import { RecordComponent } from './record/record.component';
import { RecordListComponent } from './record-list/record-list.component';

@NgModule({
  declarations: [
    RecordComponent,
    RecordListComponent
  ],

  imports: [
    SharedModule
  ],

  exports: [
    RecordComponent,
    RecordListComponent
  ]
})
export class SearchModule
{ }
