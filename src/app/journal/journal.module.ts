import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { JournalRoutingModule } from './journal-routing.module';
import { JournalComponent } from './journal/journal.component';
import { JournalViewComponent } from './journal-view/journal-view.component';
import { SharedModule } from '../shared/shared.module';
import { JournalService } from './journal.service';
import { JournalEditComponent } from './journal-edit/journal-edit.component';
import { FormFieldsComponent } from '@toco/forms/form-fields/form-fields.component';
import { FormContainerComponent } from '@toco/forms/form-container/form-container.component';
import { FormsModule } from '@toco/forms/forms.module';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    JournalRoutingModule, 
    FormsModule
  ],
  exports: [
    JournalViewComponent,
    JournalEditComponent
  ],
  declarations: [
    JournalComponent, 
    JournalViewComponent,
    JournalEditComponent
  ],
  providers: [
    JournalService
  ]
})
export class JournalModule { }
