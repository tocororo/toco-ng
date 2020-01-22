
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CatalogComponent } from '@toco/tools/catalog';
import { AuthenticationService } from '@toco/tools/authentication/authentication.service';
import { NotificationListComponent } from '@toco/tools/notification';

const routes: Routes = [
    {
        path: '',
        component: CatalogComponent
    },
    {
        path: 'journal',
        loadChildren: () => import('@toco/tools/journal').then(mod => mod.JournalModule),
        canActivate: [AuthenticationService]
    },
    {
        path: 'notifications',
        component: NotificationListComponent,
        canActivate: [AuthenticationService]
    },
    {
        path: '**',
        redirectTo: ''
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
