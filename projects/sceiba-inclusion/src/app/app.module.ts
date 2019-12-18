
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { SharedModule } from '@toco/shared/shared.module';

import { AppComponent } from './app.component';

import { CatalogModule } from '@toco/catalog/catalog.module';
import { JournalModule } from '@toco/journal/journal.module';
import { EnvServiceProvider } from '@tocoenv/env.service.provider';

@NgModule({
  declarations: [
    AppComponent
  ],

  imports: [
    BrowserModule,
    HttpClientModule,
    SharedModule,
    JournalModule
  ],

  providers: [EnvServiceProvider],

  bootstrap: [AppComponent]
})
export class AppModule { }
