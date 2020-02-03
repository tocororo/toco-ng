
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SharedModule } from '@toco/tools/shared';

import { CatalogModule } from '@toco/tools/catalog';
import { CatalogService } from '@toco/tools/backend';
import { EnvServiceProvider } from '@tocoenv/tools/env.service.provider';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthenticationModule } from '@toco/tools/authentication';
import { NotificationModule } from '@toco/tools/notification';
import { CoreModule } from '@toco/tools/core';

@NgModule({
    declarations: [
        AppComponent
    ],

    imports: [
        BrowserAnimationsModule,
        SharedModule,
        CoreModule,
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
