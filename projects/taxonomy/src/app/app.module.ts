
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { SharedModule } from '@toco/tools/shared';
import { CoreModule } from '@toco/tools/core';
import { TaxonomyModule } from '@toco/tools/taxonomy';
import { AuthenticationModule } from '@toco/tools/authentication';
import { NotificationModule } from '@toco/tools/notification';
import { TaxonomyService } from '@toco/tools/backend';

import { EnvServiceProvider } from '@tocoenv/tools/env.service.provider'

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

@NgModule({
    declarations: [
        AppComponent
    ],

    imports: [
        BrowserAnimationsModule,
        SharedModule,
        CoreModule,
        TaxonomyModule,
        AuthenticationModule,
        NotificationModule,
        AppRoutingModule
    ],

    providers: [
        EnvServiceProvider,
        TaxonomyService
    ],

    bootstrap: [AppComponent]
})
export class AppModule
{ }
