import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SearchService, TaxonomyService } from '@toco/tools/backend';
import { EnvServiceProvider } from '@tocoenv/tools/env.service.provider';
import { AuthenticationModule } from '@toco/tools/authentication';
import { AggregationsComponent } from './aggregations/aggregations.component';
import { FormsModule } from '@toco/tools/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SharedModule } from '@toco/tools/shared';
import { CoreModule } from '@toco/tools/core';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    AggregationsComponent
  ],
  imports: [
    BrowserAnimationsModule,
    SharedModule,
    CoreModule,
    AppRoutingModule,
    AuthenticationModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [
    SearchService,
    TaxonomyService,
    EnvServiceProvider
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
