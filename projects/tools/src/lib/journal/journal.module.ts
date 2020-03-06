
import { NgModule } from '@angular/core';
import { SharedModule } from '@toco/tools/shared';
import { ReactiveFormsModule } from '@angular/forms';

import { TocoFormsModule } from '@toco/tools/forms';
import { SourceService } from '@toco/tools/backend';

import { JournalViewComponent } from './journal-view/journal-view.component';
import { JournalEditComponent, JournalEditAddIndexComponent } from './journal-edit/journal-edit.component';
import { JournalInclusionComponent } from './journal-inclusion/journal-inclusion.component';
import { JournalViewTermComponent } from './journal-view/journal-view-version-term.component';
import { JournalViewInfoComponent } from './journal-view/journal-view-info.component';
import { JournalViewFieldComponent } from './journal-view/journal-view-version-field.component';
import { JournalViewVersionComponent } from './journal-view/journal-view-version.component';
import { CoreModule } from '../core';
import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';

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
        CoreModule,
        ReactiveFormsModule,
        TocoFormsModule
    ],

    exports: [
        JournalViewComponent,
        JournalEditComponent,
        JournalViewInfoComponent
    ],

    providers: [
        SourceService,
        {
            provide: STEPPER_GLOBAL_OPTIONS,
            useValue: { displayDefaultIndicatorType: false }
          }
    ]
})
export class JournalModule
{ }
