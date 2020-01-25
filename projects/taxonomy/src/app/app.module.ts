
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { SharedModule } from '@toco/tools/shared';
import { TaxonomyModule } from '@toco/tools/taxonomy';
import { EnvServiceProvider } from '@tocoenv/tools/env.service.provider'

import { AppRoutingModule } from './app-routing.module';
import { AuthenticationModule } from '@toco/tools/authentication';

import { AppComponent } from './app.component';
import { TaxonomyService } from '@toco/tools/backend';
import { CoreModule } from '@toco/tools/core';

@NgModule({
    declarations: [
        AppComponent
    ],

    imports: [
        BrowserAnimationsModule,
        SharedModule,
        AppRoutingModule,
        AuthenticationModule,
        TaxonomyModule,
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
