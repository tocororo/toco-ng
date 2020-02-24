import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SearchService, TaxonomyService, SourceService } from '@toco/tools/backend';
import { EnvServiceProvider } from '@tocoenv/tools/env.service.provider';
import { AuthenticationModule } from '@toco/tools/authentication';
import { AggregationsComponent } from './aggregations/aggregations.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SharedModule } from '@toco/tools/shared';
import { CoreModule } from '@toco/tools/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { TocoFormsModule } from '@toco/tools/forms';
import { SearchModule } from '@toco/tools/search';

@NgModule({
  declarations: [
    AppComponent,
    AggregationsComponent
  ],
  imports: [
    BrowserAnimationsModule,
    CommonModule,
    ReactiveFormsModule,
    AppRoutingModule,
    AuthenticationModule,
    TocoFormsModule,
    SharedModule,
    SearchModule

  ],
  providers: [
    SearchService,
    TaxonomyService,
    SourceService,
    EnvServiceProvider
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
