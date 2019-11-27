import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { SharedModule } from '@toco/shared/shared.module';

import { AppComponent } from './app.component';
import { FormContainerComponent } from '@toco/form-container/form-container.component';
import { FormFieldsComponent } from '@toco/form-fields/form-fields.component';

import { CatalogModule } from '@toco/catalog/catalog.module';

@NgModule({
  declarations: [
    AppComponent,
    FormContainerComponent,
    FormFieldsComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    SharedModule,
    CatalogModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
