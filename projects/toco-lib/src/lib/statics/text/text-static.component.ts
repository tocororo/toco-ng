
import { Component, OnInit, Input} from '@angular/core';
import { UntypedFormControl } from '@angular/forms';

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
export class StaticTextComponent implements OnInit
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

	/**
	 * Returns a reference to the `FormControl` that tracks the value and validity state 
	 * of the internal control that contains the text input. 
	 * For internal use only. 
	 */
	public input_static: UntypedFormControl;

	public constructor()
	{
		this.width = '100%';
		this.appearance = 'outline';
		this.desc = undefined;
		this.value = undefined;
		this.valueByDefault = 'There is not any text to show!';
		this.textAlign = 'left';

		this.input_static = undefined;
	}

    public ngOnInit(): void
	{
		if(this.value === undefined) this.value = this.valueByDefault;

		this.input_static = new UntypedFormControl(this.value);
	}

	/**
	 * Handler method that is called when the control's value changes in the UI. 
	 * It is always used to set the `value` input field as the component value. 
	 * For internal use only. 
	 */
	public handleInput(): void
	{
		/* It always sets the `value` input field as the component value. */
		this.input_static.setValue(this.value);
	}
}
