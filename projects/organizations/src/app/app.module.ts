import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AggregationsComponent } from './aggregations/aggregations.component';
import { OrganizationsModule } from '@toco/tools/organizations';
import { SearchService } from '@toco/tools/backend';
import { EnvServiceProvider } from '@tocoenv/tools/env.service.provider';
import { SharedModule } from '@toco/tools/shared';
import { TocoFormsModule } from '@toco/tools/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent,
    AggregationsComponent
  ],
  imports: [
    AppRoutingModule,
    OrganizationsModule,
    BrowserAnimationsModule,
    CommonModule,
    ReactiveFormsModule,
    // AuthenticationModule,
    TocoFormsModule,
    SharedModule,

  ],
  providers: [
    SearchService,
    EnvServiceProvider
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
