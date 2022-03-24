
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatChipsModule } from '@angular/material/chips';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { StaticChipsComponent } from './chips/chips-static.component';
import { StaticTableComponent } from './table/table-static.component';
import { StaticTextComponent } from './text/text-static.component';



@NgModule({
	declarations: [
		StaticChipsComponent,
		StaticTableComponent,
		StaticTextComponent
	],

	imports: [
    CommonModule,
    MatTabsModule,
    MatChipsModule,
    MatFormFieldModule,
    MatTableModule,

		ReactiveFormsModule
	],

	exports: [
		StaticChipsComponent,
		StaticTableComponent,
		StaticTextComponent
	]
})
export class StaticsModule
{ }
