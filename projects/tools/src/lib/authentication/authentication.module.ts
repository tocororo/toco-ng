
import { NgModule } from '@angular/core';
import { SharedModule } from '@toco/tools/shared';

import { OAuthModule } from 'angular-oauth2-oidc';

import { AuthenticationComponent } from './authentication.component'
import { AuthenticateRoutingModule } from './authentication-routing.module'
import { AuthenticationService } from './authentication.service'

@NgModule({
    declarations: [
        AuthenticationComponent
    ],

    imports: [
        SharedModule,
        OAuthModule.forRoot(),
        AuthenticateRoutingModule
    ],

    exports: [
        AuthenticationComponent
    ],
    providers: [
        AuthenticationService
      ]
})
export class AuthenticationModule
{ }
