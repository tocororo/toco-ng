import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { JournalViewComponent } from './journal-view/journal-view.component';
import { JournalResolver } from './journal-resolver';
import { JournalComponent } from './journal/journal.component';

const routes: Routes = [
  {
    path: '',
    component: JournalComponent,
    children: [
      // {
      //   path: '',
      //   redirectTo: '/catalog/journals',
      // },
      {
        path: ':id',
        component: JournalViewComponent,
        resolve: {
          journal: JournalResolver
        }

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
export class JournalRoutingModule { }
