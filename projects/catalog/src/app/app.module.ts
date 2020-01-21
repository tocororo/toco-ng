
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { SharedModule } from '@toco/tools/shared';

import { CatalogModule } from '@toco/tools/catalog';
import { CatalogService } from '@toco/tools/backend';
import { EnvServiceProvider } from '@tocoenv/tools/env.service.provider';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthenticationModule } from '@toco/tools/authentication';
import { NotificationModule } from '@toco/tools/notification/notification/notification.module';
import { FooterComponent } from '@toco/tools/core';

@NgModule({
    declarations: [
        AppComponent,
        FooterComponent
    ],

    imports: [
        BrowserModule,
        SharedModule,
        CatalogModule,
        AuthenticationModule,
        NotificationModule,
        AppRoutingModule
    ],

    providers: [CatalogService, EnvServiceProvider],

    bootstrap: [AppComponent]
})
export class AppModule
{ }
