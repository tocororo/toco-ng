
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { SharedModule } from '@toco/tools/shared';
import { TaxonomyModule } from '@toco/tools/taxonomy';
import { EnvServiceProvider } from '@tocoenv/tools/env.service.provider'

import { AppRoutingModule } from './app-routing.module';
import { AuthenticationModule } from '@toco/tools/authentication';

import { AppComponent } from './app.component';
import { FooterComponent } from '@toco/tools/core';

@NgModule({
    declarations: [
        AppComponent,
        FooterComponent
    ],

    imports: [
        BrowserModule,
        SharedModule,
        AppRoutingModule,
        AuthenticationModule,
        TaxonomyModule
    ],

    providers: [
        EnvServiceProvider
    ],

    bootstrap: [AppComponent]
})
export class AppModule
{ }
