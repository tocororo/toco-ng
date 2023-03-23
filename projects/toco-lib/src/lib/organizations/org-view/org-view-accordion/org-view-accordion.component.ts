
import { Component, Input, ViewChild, OnInit } from '@angular/core';
import { MatAccordion } from '@angular/material/expansion';

/**
 * The `OrgViewAccordionComponent` type.
 */
export enum OrgViewAccordionType
{
	/**
	 * The `OrgViewAccordionComponent` is used to show relationships.
	 */
	Relationships = 'Relación'/*'Relationship'*/,

	/**
	 * The `OrgViewAccordionComponent` is used to show addresses.
	 */
	Addresses = 'Dirección'/*'Address'*/
};

@Component({
	selector: 'toco-org-view-accordion',
	templateUrl: './org-view-accordion.component.html',
	styleUrls: ['./org-view-accordion.component.scss']
})
export class OrgViewAccordionComponent implements OnInit
{
    /**
     * Represents the `OrgViewAccordionType` enum for internal use.
     */
	public readonly orgViewAccordion_Type: typeof OrgViewAccordionType;

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
	 * This array has the same length than the `panelsTitle` field.
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

	/**
	 * The panels title.
	 * This array has the same length than the `value` field.
     * By default, its value is `[]`.
	 */
	@Input()
	public panelsTitle: string[];

	@ViewChild(MatAccordion, { static: true })
	private _accordion: MatAccordion;

	public constructor()
	{
		this.orgViewAccordion_Type = OrgViewAccordionType;

		this.appearance = 'outline';
		this.desc = undefined;
		this.value = [];
		this.orgViewAccordionType = OrgViewAccordionType.Relationships;
		this.panelsTitle = [];  /* This array has the same length than the `value` field. */
	}

	public ngOnInit(): void
	{
	}

	/**
	 * Returns the `MatAccordion` control.
	 */
	public get getAccordion(): MatAccordion
	{
		return this._accordion;
	}

	/**
	 * Returns true if the panel has element; otherwise, false.
	 * The panel always has element by default.
	 * @param pos The panel position.
	 */
	public panelHasElement(pos: number): boolean
	{
		switch(this.orgViewAccordionType)
		{
			case this.orgViewAccordion_Type.Relationships:
			{
				return this.value[pos].links.length;
			}

			default:
			{
				/* The panel always has element by default. */
				return true;
			}
		}
	}
}
