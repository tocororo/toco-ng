
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NotificationListComponent } from '@toco/tools/notification';
import { AuthenticationService } from '@toco/tools/authentication/authentication.service';
import { TaxonomyComponent } from '@toco/tools/taxonomy';

const routes: Routes = [
    {
        path: '',
        component: TaxonomyComponent
    },
    {
        path: 'notifications',
        component: NotificationListComponent,
        canActivate: [AuthenticationService]
    },
    // {
    //     path: '**',
    //     redirectTo: ''
    // }
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule]
})
export class AppRoutingModule
{ }
