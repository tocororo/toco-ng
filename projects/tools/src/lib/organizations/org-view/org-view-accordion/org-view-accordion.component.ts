
import { Component, Input, ViewChild } from '@angular/core';
import { MatAccordion } from '@angular/material';

@Component({
	selector: 'toco-org-view-accordion',
	templateUrl: './org-view-accordion.component.html',
	styleUrls: ['./org-view-accordion.component.scss']
})
export class OrgViewAccordionComponent
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
	 * The array of data that should be rendered by the accordion, where each object represents one row. 
     * By default, its value is `[]`. 
	 */
	@Input()
	public value: any[];

	@ViewChild(MatAccordion, { static: true })
	private _accordion: MatAccordion;

	public constructor()
	{
		this.appearance = 'outline';
		this.desc = undefined;
		this.value = [];
	}

	/**
	 * Returns the `MatAccordion` control. 
	 */
	public get getAccordion(): MatAccordion
	{
		return this._accordion;
	}
}
