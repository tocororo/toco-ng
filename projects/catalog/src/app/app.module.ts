/*
 *   Copyright (c) 2020 Universidad de Pinar del Río "Hermanos Saíz Montes de Oca"
 *   All rights reserved.
 */


import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SharedModule } from '@toco/tools/shared';
import { ReactiveFormsModule } from '@angular/forms';

import { EnvServiceProvider } from '@tocoenv/tools/env.service.provider';

import { AuthenticationModule } from '@toco/tools/authentication';
import { CatalogService, SearchService, SourceService, SourceServiceNoAuth } from '@toco/tools/backend';
import { NotificationModule } from '@toco/tools/notification';
import { CoreModule, CACHABLE_URL_PROVIDER, REQUEST_CACHE_DIFFERENT_TIME_WITH_MAP_PROVIDER, HTTP_INTERCEPTOR_PROVIDERS } from '@toco/tools/core';
import { TocoFormsModule } from '@toco/tools/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SourceViewComponent, SourceViewSaveDialog } from './source-view/source-view.component';
import { SourcesComponent } from './sources/sources.component';
import { SourceEditComponent } from './source-edit/source-edit.component';
import { FiltersComponent } from './filters/filters.component';
import { CatalogComponent, DialogCatalogJournalInfoDialog } from './catalog/catalog.component';
import { SourcesModule } from '@toco/tools/sources';
import { FiltersService } from '@toco/tools/filters';
import { SourceViewReadComponent } from './catalog/source-view-read/source-view-read.component';
import { MysourcesComponent } from './mysources/mysources.component';
import { RoleComponent } from './mysources/role/role.component';

@NgModule({
    declarations: [
        AppComponent,
        SourceViewComponent,
        SourceEditComponent,
        SourcesComponent,
        SourceViewSaveDialog,
        FiltersComponent,
        CatalogComponent,
        DialogCatalogJournalInfoDialog,
        SourceViewReadComponent,
        MysourcesComponent,
        RoleComponent
    ],

    imports: [
        BrowserAnimationsModule,
        SharedModule,
        ReactiveFormsModule,
        CoreModule,
        AuthenticationModule,
        NotificationModule,
        AppRoutingModule,
        SourcesModule,
        TocoFormsModule
    ],

    entryComponents: [
        SourceViewSaveDialog,
        DialogCatalogJournalInfoDialog
    ],

    providers: [
        EnvServiceProvider,
        CACHABLE_URL_PROVIDER,
        REQUEST_CACHE_DIFFERENT_TIME_WITH_MAP_PROVIDER,
        HTTP_INTERCEPTOR_PROVIDERS,
        CatalogService,
        SearchService,
        FiltersService,
        SourceService,
        SourceServiceNoAuth
    ],

    bootstrap: [AppComponent]
})
export class AppCatalogModule {

}
