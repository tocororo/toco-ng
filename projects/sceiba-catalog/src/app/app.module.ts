import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CatalogService } from '@toco/catalog/catalog.service';
import { EnvServiceProvider } from '@tocoenv/env.service.provider';

import { CatalogModule } from '@toco/catalog/catalog.module';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    CatalogModule,
    AppRoutingModule
  ],
  providers: [CatalogService, EnvServiceProvider],
  bootstrap: [AppComponent]
})
export class AppModule { }
