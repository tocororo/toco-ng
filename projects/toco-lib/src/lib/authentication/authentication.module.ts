/*
 *   Copyright (c) 2020 Universidad de Pinar del Río "Hermanos Saíz Montes de Oca"
 *   All rights reserved.
 */
import { CommonModule } from '@angular/common';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { TranslateModule } from '@ngx-translate/core';
import { OAuthModule, OAuthStorage } from 'angular-oauth2-oidc';
import { AuthenticationComponent } from './authentication.component';
import { OauthAuthenticationService, SimpleAuthenticationService } from './authentication.service';




export function storageFactory() : OAuthStorage {
  return localStorage
}
@NgModule({
    declarations: [
        AuthenticationComponent
    ],

    imports: [
        CommonModule,
        FlexLayoutModule,
        HttpClientModule,
        MatCardModule,
        MatIconModule,
        MatButtonModule,
        MatTooltipModule,
        TranslateModule,
        OAuthModule.forRoot(),
        // AuthenticateRoutingModule
    ],
    exports: [
        AuthenticationComponent
    ],

    //TODO: esto se elimina de aquí y se pone en el fichero `core/services/http-interceptor.order.ts`.
    providers: [
        { provide: OAuthStorage, useFactory: storageFactory },
        OauthAuthenticationService,
        SimpleAuthenticationService,
        /* TODO: This can not be set here. */
        {
            provide: HTTP_INTERCEPTORS,
            useClass: OauthAuthenticationService,
            multi: true
        }
      ]
})
export class AuthenticationModule
{ }
