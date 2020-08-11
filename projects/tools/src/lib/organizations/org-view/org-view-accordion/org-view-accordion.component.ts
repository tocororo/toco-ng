
import { Component, Input, ViewChild, OnInit } from '@angular/core';
import { MatAccordion } from '@angular/material';

/**
 * The `OrgViewAccordionComponent` type. 
 */
export enum OrgViewAccordionType
{
	/**
	 * The `OrgViewAccordionComponent` is used to show relationships. 
	 */
	Relationships = 'Relationship ',

	/**
	 * The `OrgViewAccordionComponent` is used to show addresses. 
	 */
	Addresses = 'Address '
};

@Component({
	selector: 'toco-org-view-accordion',
	templateUrl: './org-view-accordion.component.html',
	styleUrls: ['./org-view-accordion.component.scss']
})
export class OrgViewAccordionComponent implements OnInit
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

	/**
	 * The `OrgViewAccordionComponent` type. 
     * By default, its value is `OrgViewAccordionType.Relationships`. 
	 */
	@Input()
	public orgViewAccordionType: OrgViewAccordionType;

	@ViewChild(MatAccordion, { static: true })
	private _accordion: MatAccordion;

	private _panelsTitle: string[];

	public constructor()
	{
		this.appearance = 'outline';
		this.desc = undefined;
		this.value = [];
		this.orgViewAccordionType = OrgViewAccordionType.Relationships;

		this._panelsTitle = [];
	}

	public ngOnInit(): void
	{
		const panelsTitleCount = this.value.length;

		/* Initializae the `_panelsTitle` array. */
		for (let i: number = 0; i < panelsTitleCount; )
		{
			this._panelsTitle.push(`${ this.orgViewAccordionType }(${ ++i }) of (${ panelsTitleCount })`);
		}
	}

	/**
	 * Returns the `MatAccordion` control. 
	 */
	public get getAccordion(): MatAccordion
	{
		return this._accordion;
	}

	/**
	 * Returns the panel title for the specified panel position. 
	 * @param pos The position of the panel. 
	 */
	public getPanelTitle(pos: number): string
	{
		return this._panelsTitle[pos];
	}
}
