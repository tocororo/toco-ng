
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { OAuthModule, OAuthStorage } from 'angular-oauth2-oidc';

import { CoreModule, TocoFormsModule, Environment } from 'projects/toco-lib/src/public-api';
import { allowedURLS, environment } from '../environments/environment';

import { TestContainerControlComponent } from './forms/test/container/test-container-control/test-container-control.component';
import { TestInputBoolComponent } from './forms/test/input/test-bool/test-bool-input.component';
import { TestInputIssnComponent } from './forms/test/input/test-issn/test-issn-input.component';
import { TestInputNumberComponent } from './forms/test/input/test-number/test-number-input.component';
import { TestInputSelectComponent } from './forms/test/input/test-select/test-select-input.component';
import { TestInputTextComponent } from './forms/test/input/test-text/test-text-input.component';
import { TestInputUrlComponent } from './forms/test/input/test-url/test-url-input.component';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

export function createTranslateLoader(http: HttpClient): TranslateHttpLoader
{
	return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

export function storageFactory(): OAuthStorage
{
    return sessionStorage
}

@NgModule({
    declarations: [
        AppComponent,
        TestContainerControlComponent,  
        TestInputBoolComponent,
        TestInputIssnComponent,
        TestInputNumberComponent,
        TestInputSelectComponent,
        TestInputTextComponent,
        TestInputUrlComponent
    ],
    imports: [
        BrowserModule,
		CommonModule,
		BrowserAnimationsModule,
		HttpClientModule,
		FormsModule,
		FlexLayoutModule,
		TranslateModule.forRoot({
			loader: {
				provide: TranslateLoader,
				useFactory: (createTranslateLoader),
				deps: [HttpClient]
			}
		}),
        OAuthModule.forRoot({
            resourceServer: {
                allowedUrls: allowedURLS,
                sendAccessToken: true
            }
        }),

        TocoFormsModule,
        CoreModule,
        AppRoutingModule
    ],
    providers: [
        { provide: Environment, useValue: environment },
        { provide: OAuthStorage, useFactory: storageFactory }
    ],
    bootstrap: [AppComponent]
})
export class AppModule
{ }
