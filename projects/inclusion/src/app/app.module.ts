
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { SharedModule } from '@toco/tools/shared';
import { CatalogModule } from '@toco/tools/catalog';
import { JournalModule } from '@toco/tools/journal';

import { EnvServiceProvider } from '@tocoenv/tools/env.service.provider';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

@NgModule({
    declarations: [
        AppComponent
    ],

    imports: [
        BrowserModule,
        SharedModule,
        CatalogModule,
        JournalModule,
        AppRoutingModule
    ],

    providers: [EnvServiceProvider],

    bootstrap: [AppComponent]
})
export class AppModule
{ }
