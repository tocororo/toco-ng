
import { NgModule } from '@angular/core';
import { SharedModule } from '@toco/tools/shared';
import { ReactiveFormsModule } from '@angular/forms';

import { FormsModule } from '@toco/tools/forms';
import { DialogContentComponent } from '@toco/tools/core';
import { SourceService } from '@toco/tools/backend';

import { JournalRoutingModule } from './journal-routing.module';
import { JournalComponent } from './journal/journal.component';
<<<<<<< HEAD
import { JournalViewComponent, JournalViewTermComponent, JournalViewInfoComponent, JournalViewFieldComponent } from './journal-view/journal-view.component';
import { JournalEditComponent } from './journal-edit/journal-edit.component';
=======
import { JournalViewComponent, JournalViewTermComponent, JournalViewInfoComponent } from './journal-view/journal-view.component';
import { JournalEditComponent, JournalEditAddIndexComponent } from './journal-edit/journal-edit.component';
>>>>>>> 09e47c207353d158c2316e9fedbb8cc260d950da
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
