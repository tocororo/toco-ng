import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

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

@NgModule({
  declarations: [
    AppComponent
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
    AppCatalogModule
  ],
  entryComponents: [
    SourceViewSaveDialog
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
