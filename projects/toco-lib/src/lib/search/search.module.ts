
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatChipsModule } from '@angular/material/chips';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { TranslateModule } from '@ngx-translate/core';
import { AggregationsComponent } from './aggregations/aggregations.component';
import { QueryInputComponent } from './query-input/query-input.component';
import { RecordListComponent } from './record-list/record-list.component';
import { RecordComponent } from './record/record.component';




@NgModule({
  declarations: [
    RecordComponent,
    AggregationsComponent,
    QueryInputComponent,
    RecordListComponent
  ],

  imports: [
    CommonModule,
    FlexLayoutModule,
    ReactiveFormsModule,
    TranslateModule,
    MatDividerModule,
    MatCheckboxModule,
    MatChipsModule,
    MatCardModule,
    MatFormFieldModule,
    MatButtonModule,
    MatInputModule,
    MatIconModule
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
