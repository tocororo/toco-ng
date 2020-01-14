
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthenticateComponent } from './authenticate.component';

const routes: Routes = [
    {
        path: 'authorized',
        component: AuthenticateComponent,
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class AuthenticateRoutingModule
{ }
