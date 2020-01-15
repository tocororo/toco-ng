
import { NgModule } from '@angular/core';
import { SharedModule } from '@toco/tools/shared';

import { FormsModule } from '@toco/tools/forms';

import { JournalRoutingModule } from './journal-routing.module';
import { JournalComponent } from './journal/journal.component';
import { JournalViewComponent } from './journal-view/journal-view.component';
import { JournalService } from './journal.service';
import { JournalEditComponent } from './journal-edit/journal-edit.component';

@NgModule({
    declarations: [
        JournalComponent, 
        JournalViewComponent,
        JournalEditComponent
    ],

    imports: [
        SharedModule,
        FormsModule,
        JournalRoutingModule
    ],

    exports: [
        JournalViewComponent,
        JournalEditComponent
    ],

    providers: [
        JournalService
    ]
})
export class JournalModule
{ }
