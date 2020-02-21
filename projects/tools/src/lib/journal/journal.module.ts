
import { NgModule } from '@angular/core';
import { SharedModule } from '@toco/tools/shared';
import { ReactiveFormsModule } from '@angular/forms';

import { TocoFormsModule } from '@toco/tools/forms';
import { SourceService } from '@toco/tools/backend';

import { JournalViewComponent, JournalViewTermComponent, JournalViewInfoComponent, JournalViewFieldComponent, JournalViewVersionComponent } from './journal-view/journal-view.component';
import { JournalEditComponent, JournalEditAddIndexComponent } from './journal-edit/journal-edit.component';
import { JournalInclusionComponent } from './journal-inclusion/journal-inclusion.component';

@NgModule({
    declarations: [
        JournalViewComponent,
        JournalViewTermComponent,
        JournalViewInfoComponent,
        JournalViewFieldComponent,
        JournalEditComponent,
        JournalInclusionComponent,
        JournalEditAddIndexComponent,
        JournalViewVersionComponent


    ],
    entryComponents: [
        JournalEditAddIndexComponent
    ],
    imports: [
        SharedModule,
        ReactiveFormsModule,
        TocoFormsModule,
    ],

    exports: [
        JournalViewComponent,
        JournalEditComponent
    ],

    providers: [
        SourceService
    ]
})
export class JournalModule
{ }
