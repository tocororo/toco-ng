
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { SharedModule } from '@toco/tools/shared';

import { CatalogModule, CatalogService } from '@toco/tools/catalog';
import { EnvServiceProvider } from '@tocoenv/tools/env.service.provider';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthenticationModule } from '@toco/tools/authentication';
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
        AppRoutingModule
    ],

    providers: [CatalogService, EnvServiceProvider],

    bootstrap: [AppComponent]
})
export class AppModule
{ }
