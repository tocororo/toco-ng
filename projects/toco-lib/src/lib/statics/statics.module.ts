
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/public-api';

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
		SharedModule,
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
