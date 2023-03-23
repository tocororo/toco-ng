
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

import { TocoFormsModule } from 'projects/toco-lib/src/public-api';

import { TestHelpers } from './core/test/utils/test-helpers';
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

@NgModule({
    declarations: [
        AppComponent,
        // TestHelpers,
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
        TocoFormsModule,
        AppRoutingModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule
{ }
