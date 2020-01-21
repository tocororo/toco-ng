
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { SharedModule } from '@toco/tools/shared';

import { CatalogModule } from '@toco/tools/catalog';
import { CatalogService, TaxonomyService } from '@toco/tools/backend';
import { EnvServiceProvider } from '@tocoenv/tools/env.service.provider';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthenticationModule } from '@toco/tools/authentication';
import { FooterComponent } from '@toco/tools/core';
import { TaxonomyModule } from '@toco/tools/taxonomy';

@NgModule({
    declarations: [
        AppComponent,
        FooterComponent
    ],

    imports: [
        BrowserModule,
        SharedModule,
        CatalogModule,
        TaxonomyModule,
        AuthenticationModule,
        AppRoutingModule
    ],

    providers: [CatalogService, EnvServiceProvider, TaxonomyService],

    bootstrap: [AppComponent]
})
export class AppModule
{ }
