
import { Component, Input } from '@angular/core';

@Component({
	selector: 'static-chips',
	templateUrl: './chips-static.component.html',
	styleUrls: ['./chips-static.component.scss']
})
export class StaticChipsComponent
{
    /**
     * The control's appearance. 
     * By default, its value is `outline`. 
     */
	@Input()
	public appearance: string;

	/**
	 * The control's description. 
	 * By default, its value is `undefined` and it is not showed. 
	 */
	@Input()
	public desc: string;

	/**
	 * The array of items for displaying. 
	 * By default, its value is `[]`. 
	 */
	@Input()
	public items: string[];

	public constructor()
	{
		this.appearance = 'outline';
		this.desc = undefined;
		this.items = [];
	}
}
