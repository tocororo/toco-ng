import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { JournalRoutingModule } from './journal-routing.module';
import { JournalComponent } from './journal/journal.component';
import { JournalViewComponent } from './journal-view/journal-view.component';
import { SharedModule } from '../shared/shared.module';
import { JournalService } from './journal.service';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    JournalRoutingModule
  ],
  declarations: [
    JournalComponent, 
    JournalViewComponent
  ],
  providers: [
    JournalService
  ]
})
export class JournalModule { }
