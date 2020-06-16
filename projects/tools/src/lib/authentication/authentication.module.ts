/*
 *   Copyright (c) 2020 Universidad de Pinar del Río "Hermanos Saíz Montes de Oca"
 *   All rights reserved.
 */


import { NgModule } from '@angular/core';
import { SharedModule } from '@toco/tools/shared';

import { OAuthModule, OAuthStorage } from 'angular-oauth2-oidc';

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

    //TODO: esto se elimina de aquí y se pone en el fichero `core/services/http-interceptor.order.ts`.
    providers: [
        { provide: OAuthStorage, useValue: localStorage },
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
