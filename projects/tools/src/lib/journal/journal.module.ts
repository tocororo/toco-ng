
import { NgModule } from '@angular/core';
import { SharedModule } from '@toco/tools/shared';
import { ReactiveFormsModule } from '@angular/forms';

import { FormsModule } from '@toco/tools/forms';
import { DialogContentComponent } from '@toco/tools/core';
import { SourceService } from '@toco/tools/backend';

import { JournalRoutingModule } from './journal-routing.module';
import { JournalComponent } from './journal/journal.component';
import { JournalViewComponent, JournalViewTermComponent, JournalViewInfoComponent, JournalViewFieldComponent } from './journal-view/journal-view.component';
import { JournalEditComponent } from './journal-edit/journal-edit.component';
import { JournalHomeComponent } from './journal-home/journal-home.component';

@NgModule({
    declarations: [
        JournalComponent,
        JournalViewComponent,
        JournalViewTermComponent,
        JournalViewInfoComponent,
        JournalViewFieldComponent,
        JournalEditComponent,
        JournalHomeComponent, 
        DialogContentComponent
    ],
    entryComponents: [
        DialogContentComponent
    ],
    imports: [
        SharedModule,
        ReactiveFormsModule,
        FormsModule,
        JournalRoutingModule
    ],

    exports: [
        JournalComponent,
        JournalViewComponent,
        JournalEditComponent,
        JournalHomeComponent
    ],

    providers: [
        SourceService
    ]
})
export class JournalModule
{ }
