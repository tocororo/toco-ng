
import { Component, OnInit, Input } from '@angular/core';
import { ENTER, COMMA } from '@angular/cdk/keycodes';

@Component({
	selector: 'input-chips',
	templateUrl: './chips-input.component.html',
	styleUrls: ['./chips-input.component.scss']
})
export class InputChipsComponent implements OnInit
{
	/**
	 * Represents the description. 
	 */
	@Input()
	public desc: string;

	/**
	 * Represents the array of items for displaying. 
	 */
	@Input()
	public items: string[];

	public readonly separatorKeysCodes: number[];

	public selectable: boolean;

	public constructor()
	{
		this.items = undefined;
		this.separatorKeysCodes = [ENTER, COMMA];
		this.selectable = true;
	}

	public ngOnInit(): void
	{
	}
}
