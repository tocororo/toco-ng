
import { NgModule } from '@angular/core';
import { SharedModule } from '@toco/tools/shared';

import { FormsModule } from '@toco/tools/forms';

import { JournalRoutingModule } from './journal-routing.module';
import { JournalComponent } from './journal/journal.component';
import { JournalViewComponent } from './journal-view/journal-view.component';
import { JournalEditComponent } from './journal-edit/journal-edit.component';
import { JournalListComponent } from './journal-list/journal-list.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SourceService } from '../backend/source.service';
import { JournalHomeComponent } from './journal-home/journal-home.component';

@NgModule({
    declarations: [
        JournalComponent,
        JournalViewComponent,
        JournalEditComponent,
        JournalListComponent,
        JournalHomeComponent
    ],

    imports: [
        SharedModule,
        ReactiveFormsModule,
        FormsModule,
        JournalRoutingModule
    ],

    exports: [
        JournalViewComponent,
        JournalEditComponent,
        JournalListComponent
    ],

    providers: [
        SourceService
    ]
})
export class JournalModule
{ }