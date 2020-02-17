
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { SharedModule } from '@toco/tools/shared';
import { CoreModule } from '@toco/tools/core';
import { FormsModule } from '@toco/tools/forms';
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
        BrowserAnimationsModule,
        SharedModule,
        CoreModule,
        FormsModule,
        CatalogModule,
        JournalModule,
        AppRoutingModule
    ],

    providers: [EnvServiceProvider],

    bootstrap: [AppComponent]
})
export class AppModule
{ }
