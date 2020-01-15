
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { MaterialModule } from './material.module';
import { FlexLayoutModule } from '@angular/flex-layout';

import { PageHeaderComponent } from './page-header/page-header.component';
import { InfoCardComponent } from './info-card/info-card.component';

import { JournalCardComponent } from './journal-card/journal-card.component';
import { BodyComponent } from './body/body.component';
import { DialogContentComponent } from './utils/message-handler';

@NgModule({
  declarations: [
    PageHeaderComponent,
    InfoCardComponent,
    JournalCardComponent,
    BodyComponent,
    DialogContentComponent
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ],
  imports: [
    CommonModule,
    BrowserAnimationsModule,
    RouterModule,
    FormsModule,
    MaterialModule,
    FlexLayoutModule
  ],
  entryComponents: [
    DialogContentComponent
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
})
export class SharedModule { }
