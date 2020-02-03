
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { JournalViewComponent } from './journal-view/journal-view.component';
import { JournalResolver } from './journal-resolver';
import { JournalComponent } from './journal/journal.component';
import { JournalEditComponent } from './journal-edit/journal-edit.component';
import { JournalHomeComponent } from './journal-home/journal-home.component';
import { JournalInclusionComponent } from './journal-inclusion/journal-inclusion.component';

const routes: Routes = [
    {
        path: '',
        component: JournalComponent,
        children: [
            {
                path: 'new',
                component: JournalInclusionComponent,
            },
            {
                path: ':uuid',
                component: JournalViewComponent,
                resolve: {
                    journal: JournalResolver
                }
            },
            {
                path: '',
                component: JournalHomeComponent
            }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],

    exports: [RouterModule],

    providers: [
        JournalResolver
    ]
})
export class JournalRoutingModule
{ }
