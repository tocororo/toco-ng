
import { NgModule } from '@angular/core';
import { SharedModule } from '@toco/tools/shared';

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
		SharedModule
	],

	exports: [
		StaticChipsComponent,
		StaticTableComponent,
		StaticTextComponent
	]
})
export class StaticsModule
{ }
