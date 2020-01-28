
import { NgModule } from '@angular/core';
import { SharedModule } from '@toco/tools/shared';

import { OAuthModule } from 'angular-oauth2-oidc';

import { AuthenticationComponent } from './authentication.component'
import { AuthenticateRoutingModule } from './authentication-routing.module'
import { AuthenticationService } from './authentication.service'
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

@NgModule({
    declarations: [
        AuthenticationComponent
    ],

    imports: [
        SharedModule,
        HttpClientModule,
        OAuthModule.forRoot(),
        AuthenticateRoutingModule
    ],

    exports: [
        AuthenticationComponent
    ],
    providers: [
        AuthenticationService,
        {
            provide: HTTP_INTERCEPTORS,
            useClass: AuthenticationService,
            multi: true
          }
      ]
})
export class AuthenticationModule
{ }
