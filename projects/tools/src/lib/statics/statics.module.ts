
import { NgModule } from '@angular/core';
import { SharedModule } from '@toco/tools/shared';

import { StaticChipsComponent } from './chips/chips-static.component';

@NgModule({
	declarations: [
		StaticChipsComponent
	],

	imports: [
		SharedModule
	],

	exports: [
		StaticChipsComponent
	]
})
export class StaticsModule
{ }
