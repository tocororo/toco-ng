import { BrowserModule } from '@angular/platform-browser';
import { NgModule, SecurityContext } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SharedModule } from '@toco/tools/shared';
import { CoreModule } from '@toco/tools/core';
import { CatalogModule } from '@toco/tools/catalog';
import { AuthenticationModule } from '@toco/tools/authentication';
import { NotificationModule } from '@toco/tools/notification';
import { JournalModule } from '@toco/tools/journal';
import { TocoFormsModule } from '@toco/tools/forms';
import { SourceViewSaveDialog } from 'projects/catalog/src/app/source-view/source-view.component';
import { AppCatalogModule } from 'projects/catalog/src/app/app.module';
import { HomeComponent } from './home/home.component';
import { InstitutionsModule } from '@toco/tools/institutions/institutions.module';
import { StaticPagesComponent } from './static-pages/static-pages.component';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { MarkdownModule } from 'ngx-markdown';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    StaticPagesComponent
  ],
  imports: [
    BrowserAnimationsModule,
    SharedModule,
    CoreModule,
    CatalogModule,
    AuthenticationModule,
    NotificationModule,
    JournalModule,
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
    SourceViewSaveDialog
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
