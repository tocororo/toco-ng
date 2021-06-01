
import { Component, Input } from '@angular/core';

/**
 * Represents a static control that shows a text. 
 */
@Component({
	selector: 'static-text',
	templateUrl: './text-static.component.html',
	styleUrls: ['./text-static.component.scss'],
    host: {
        '[style.width]': 'width'
    }
})
export class StaticTextComponent
{
    /**
     * The control's width. 
     * The width of the content area, padding area or border area (depending on `box-sizing`) of certain boxes. 
     * By default, its value is `'100%'`. 
     */
	@Input()
	public width: string;

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
	 * The control's default value. 
	 * By default, its value is `'There is not any text to show!'`. 
	 */
	@Input()
	public valueByDefault: string;

    /**
     * Returns the control's text align. 
     * By default, its value is `'left'`. 
     */
	@Input()
    public textAlign: string;

	public constructor()
	{
		this.width = '100%';
		this.appearance = 'outline';
		this.desc = undefined;
		this.value = undefined;
		this.valueByDefault = 'There is not any text to show!';
		this.textAlign = 'left';
	}
}
