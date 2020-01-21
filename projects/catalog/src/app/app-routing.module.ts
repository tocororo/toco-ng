
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CatalogComponent } from '@toco/tools/catalog';
import { AuthenticationService } from '@toco/tools/authentication/authentication.service';
import { NotificationListComponent } from '@toco/tools/notification/notification/notification-list/notification-list.component';

const routes: Routes = [
    { 
        path: '',
        component: CatalogComponent 
    },
    { 
        path: 'mysources',
        component: NotificationListComponent,
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
