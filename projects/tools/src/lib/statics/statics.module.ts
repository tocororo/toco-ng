
import { NgModule } from '@angular/core';
import { SharedModule } from '@toco/tools/shared';

import { StaticChipsComponent } from './chips/chips-static.component';
import { StaticTextComponent } from './text/text-static.component';

@NgModule({
	declarations: [
		StaticChipsComponent,
		StaticTextComponent
	],

	imports: [
		SharedModule
	],

	exports: [
		StaticChipsComponent,
		StaticTextComponent
	]
})
export class StaticsModule
{ }
