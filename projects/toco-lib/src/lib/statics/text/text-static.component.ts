
import { Component, Input } from '@angular/core';

/**
 * Represents a static control that shows a text. 
 */
@Component({
	selector: 'static-text',
	templateUrl: './text-static.component.html',
	styleUrls: ['./text-static.component.scss']
})
export class StaticTextComponent
{
    /**
     * The control's appearance. 
     * By default, its value is `'outline'`. 
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
	 * The control's value. 
	 * By default, its value is `undefined`. 
	 */
	@Input()
	public value: string;

    /**
     * Returns the control's text align. 
     * By default, its value is `'left'`. 
     */
	@Input()
    public textAlign: string;

	public constructor()
	{
		this.appearance = 'outline';
		this.desc = undefined;
		this.value = undefined;
		this.textAlign = 'left';
	}
}
