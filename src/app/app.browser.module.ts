
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppModule } from './app.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';

@NgModule({
    imports: [
        BrowserModule.withServerTransition({ appId: 'toco-root' }),
        AppModule,
        BrowserAnimationsModule
    ],

    bootstrap: [AppComponent]
})
export class AppBrowserModule
{ }
