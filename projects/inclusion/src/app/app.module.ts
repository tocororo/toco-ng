
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { SharedModule } from '@toco/tools/shared';
<<<<<<< HEAD
import { CoreModule } from '@toco/tools/core';
import { FormsModule } from '@toco/tools/forms';
=======
import { TocoFormsModule } from '@toco/tools/forms';
>>>>>>> 34c29f2930c744ca7a08d6c2457085ffb57ec3ed
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
<<<<<<< HEAD
        CoreModule,
        FormsModule,
=======
        TocoFormsModule,
>>>>>>> 34c29f2930c744ca7a08d6c2457085ffb57ec3ed
        CatalogModule,
        JournalModule,
        AppRoutingModule
    ],

    providers: [EnvServiceProvider],

    bootstrap: [AppComponent]
})
export class AppModule
{ }
