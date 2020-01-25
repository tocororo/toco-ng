
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { SharedModule } from '@toco/tools/shared';
import { TaxonomyModule } from '@toco/tools/taxonomy';
import { EnvServiceProvider } from '@tocoenv/tools/env.service.provider'

import { AppRoutingModule } from './app-routing.module';
import { AuthenticationModule } from '@toco/tools/authentication';

import { AppComponent } from './app.component';
import { TaxonomyService } from '@toco/tools/backend';
import { CoreModule } from '@toco/tools/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NotificationModule } from '@toco/tools/notification';

@NgModule({
    declarations: [
        AppComponent
    ],

    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        SharedModule,
        AppRoutingModule,
        AuthenticationModule,
        TaxonomyModule,
        NotificationModule,
        CoreModule
    ],

    providers: [
        EnvServiceProvider,
        TaxonomyService
    ],

    bootstrap: [AppComponent]
})
export class AppModule
{ }
