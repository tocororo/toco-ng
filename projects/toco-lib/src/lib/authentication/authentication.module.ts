/*
 *   Copyright (c) 2020 Universidad de Pinar del Río "Hermanos Saíz Montes de Oca"
 *   All rights reserved.
 */


import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/public-api';

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
        // AuthenticateRoutingModule
    ],
    exports: [
        AuthenticationComponent
    ],

    //TODO: esto se elimina de aquí y se pone en el fichero `core/services/http-interceptor.order.ts`.
    providers: [
        { provide: OAuthStorage, useValue: localStorage },
        AuthenticationService,
        /* This can not be set here. */
        // {
        //     provide: HTTP_INTERCEPTORS,
        //     useClass: AuthenticationService,
        //     multi: true
        // }
      ]
})
export class AuthenticationModule
{ }