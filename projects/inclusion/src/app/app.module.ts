/*
 *   Copyright (c) 2020 Universidad de Pinar del Río "Hermanos Saíz Montes de Oca"
 *   All rights reserved.
 */


import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { SharedModule } from '@toco/tools/shared';
import { TocoFormsModule } from '@toco/tools/forms';


import { EnvServiceProvider } from '@tocoenv/tools/env.service.provider';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SourcesModule } from '@toco/tools/sources';


@NgModule({
    declarations: [
        AppComponent
    ],

    imports: [
        BrowserAnimationsModule,
        SharedModule,
        TocoFormsModule,
        SourcesModule,
        AppRoutingModule
    ],

    providers: [EnvServiceProvider],

    bootstrap: [AppComponent]
})
export class AppModule
{ }
