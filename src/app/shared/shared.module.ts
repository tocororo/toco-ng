import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from './material.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { PageHeaderComponent } from './page-header/page-header.component';
import { InfoCardComponent } from './info-card/info-card.component';

import { RouterModule } from '@angular/router';
import { JournalCardComponent } from './journal-card/journal-card.component';
import { FormsModule } from '@angular/forms';
import { BodyComponent } from './body/body.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    MaterialModule,
    FlexLayoutModule
  ],
  exports: [
    FormsModule,
    MaterialModule,
    FlexLayoutModule,
    PageHeaderComponent,
    InfoCardComponent,    
    BodyComponent
  ],
  declarations: [
    PageHeaderComponent,
    InfoCardComponent,
    JournalCardComponent,
    BodyComponent
  ]
})
export class SharedModule { }
