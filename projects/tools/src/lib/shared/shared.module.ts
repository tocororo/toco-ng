
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';

import { AngularMaterialModule } from '@toco/tools/angular-material';

/**
 * A module that contains all shared modules. 
 */
@NgModule({
    declarations: [
    ],

    imports: [
        CommonModule,
        BrowserAnimationsModule,
        HttpClientModule,
        FormsModule,
        FlexLayoutModule,
        AngularMaterialModule
    ],

    exports: [
        CommonModule,
        BrowserAnimationsModule,
        HttpClientModule,
        FormsModule,
        FlexLayoutModule,
        AngularMaterialModule
    ],

    schemas: [
        CUSTOM_ELEMENTS_SCHEMA
    ]
})
export class SharedModule
{ }
