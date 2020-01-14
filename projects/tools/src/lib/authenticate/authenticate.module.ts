
import { NgModule } from '@angular/core';
import { SharedModule } from '@toco/tools/shared';
import { OAuthModule } from 'angular-oauth2-oidc';

import { AuthenticateComponent } from './authenticate.component'
import { AuthenticateRoutingModule } from './authenticate-routing.module'

@NgModule({
    declarations: [
        AuthenticateComponent
    ],

    imports: [
        SharedModule,
        OAuthModule.forRoot(),
        AuthenticateRoutingModule
    ],

    exports: [
        AuthenticateComponent
    ]
})
export class AuthenticateModule
{ }
