import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
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
    BrowserAnimationsModule,
    RouterModule,
    FormsModule,
    MaterialModule,
    FlexLayoutModule
  ],
  exports: [
    BrowserAnimationsModule,
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
