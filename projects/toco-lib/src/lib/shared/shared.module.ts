
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule } from '@angular/forms';


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
        FlexLayoutModule
    ],

    exports: [
        CommonModule,
        HttpClientModule,
        FormsModule,
        FlexLayoutModule
    ],

    schemas: [
        CUSTOM_ELEMENTS_SCHEMA
    ]
})
export class SharedModule
{ }
