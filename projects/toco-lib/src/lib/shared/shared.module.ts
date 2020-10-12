
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';

import { AngularMaterialModule } from '../angular-material';

/**
 * A module that contains all shared modules.
 */
@NgModule({
    declarations: [
    ],

    imports: [
        CommonModule,
        HttpClientModule,
        FormsModule,
        FlexLayoutModule,
        AngularMaterialModule
    ],

    exports: [
        CommonModule,
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
