
import { NgModule } from '@angular/core';
import { SharedModule } from '@toco/tools/shared';
import { ReactiveFormsModule } from '@angular/forms';

import { TocoFormsModule } from '@toco/tools/forms';
import { DialogContentComponent } from '@toco/tools/core';
import { SourceService } from '@toco/tools/backend';

import { JournalRoutingModule } from './journal-routing.module';
import { JournalComponent } from './journal/journal.component';
import { JournalViewComponent, JournalViewTermComponent, JournalViewInfoComponent, JournalViewFieldComponent } from './journal-view/journal-view.component';
import { JournalEditComponent, JournalEditAddIndexComponent } from './journal-edit/journal-edit.component';
import { JournalHomeComponent } from './journal-home/journal-home.component';
import { JournalInclusionComponent } from './journal-inclusion/journal-inclusion.component';

@NgModule({
    declarations: [
        JournalComponent,
        JournalViewComponent,
        JournalViewTermComponent,
        JournalViewInfoComponent,
        JournalViewFieldComponent,
        JournalEditComponent,
        JournalHomeComponent,
        DialogContentComponent,
        JournalInclusionComponent,
        JournalEditAddIndexComponent

    ],
    entryComponents: [
        DialogContentComponent,
        JournalEditAddIndexComponent
    ],
    imports: [
        SharedModule,
        ReactiveFormsModule,
        TocoFormsModule,
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
