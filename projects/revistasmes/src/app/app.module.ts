/*
 *   Copyright (c) 2020 Universidad de Pinar del Río "Hermanos Saíz Montes de Oca"
 *   All rights reserved.
 */

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SharedModule } from '@toco/tools/shared';
import { CoreModule, HTTP_INTERCEPTOR_PROVIDERS, CACHABLE_URL_PROVIDER, REQUEST_CACHE_DIFFERENT_TIME_WITH_MAP_PROVIDER } from '@toco/tools/core';
import { SourcesModule } from '@toco/tools/sources';
import { AuthenticationModule, AuthenticationService } from '@toco/tools/authentication';
import { NotificationModule } from '@toco/tools/notification';

import { TocoFormsModule } from '@toco/tools/forms';
import { SourceViewSaveDialog } from 'projects/catalog/src/app/source-view/source-view.component';
import { AppCatalogModule } from 'projects/catalog/src/app/app.module';
import { HomeComponent } from './home/home.component';
import { InstitutionsModule } from '@toco/tools/institutions/institutions.module';
import { StaticPagesComponent } from './static-pages/static-pages.component';
import { HttpClientModule, HttpClient, HTTP_INTERCEPTORS } from '@angular/common/http';
import { MarkdownModule } from 'ngx-markdown';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { EnvServiceProvider } from '@tocoenv/tools/env.service.provider';
import { SourceInclusionAcceptComponent } from 'projects/catalog/src/app/source-inclusion/source-inclusion.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    StaticPagesComponent,
    UserProfileComponent
  ],
  imports: [
    BrowserAnimationsModule,
    ReactiveFormsModule,
    SharedModule,
    CoreModule,
    SourcesModule,
    AuthenticationModule,
    NotificationModule,
    TocoFormsModule,
    AppRoutingModule,
    AppCatalogModule,
    InstitutionsModule,
    HttpClientModule,
    MarkdownModule.forRoot({
      loader: HttpClient
    })
  ],
  entryComponents: [
    SourceViewSaveDialog,
    SourceInclusionAcceptComponent
  ],
  providers: [
    EnvServiceProvider,
    CACHABLE_URL_PROVIDER,
    REQUEST_CACHE_DIFFERENT_TIME_WITH_MAP_PROVIDER,
    { provide: HTTP_INTERCEPTORS, useClass: AuthenticationService, multi: true },
  ],
  bootstrap: [AppComponent]
})
export class AppRevistasMesModule { }
