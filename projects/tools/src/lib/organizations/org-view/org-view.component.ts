
import { Component, OnInit, Input } from '@angular/core';

import { Organization } from '@toco/tools/entities';

import { OrgViewAccordionType } from './org-view-accordion/org-view-accordion.component';

export interface RelationshipLink
{
	url: string;
	name: string;
}

export interface RelationshipsValue
{
	links: RelationshipLink[];
}

@Component({
	selector: 'toco-org-view',
	templateUrl: './org-view.component.html',
	styleUrls: ['./org-view.component.scss']
})
export class OrgViewComponent implements OnInit
{
    /**
     * Represents the `OrgViewAccordionType` enum for internal use. 
     */
	public readonly orgViewAccordionType: typeof OrgViewAccordionType;

	/**
	 * Represents the current organization. 
	 */
	@Input()
	public org: Organization;

	private _panelsTitle_Relationships: string[];
	private _relationshipsValue: RelationshipsValue[];

	private _panelsTitle_Addresses: string[];
	/* The `_addressesValue` is gotten directly from `org.addresses`. */

	public constructor()
	{
		this.orgViewAccordionType = OrgViewAccordionType;

		this.org = undefined;
	}

	public ngOnInit(): void
	{
		this._panelsTitle_Relationships = ['Instituciones Padres', 'Instituciones Hijas', 'Instituciones Relacionadas'];
		this._relationshipsValue = this._createRelationshipsValue();

		this._panelsTitle_Addresses = (this.org.addresses) ? this._createPanelsTitle_Generic(this.orgViewAccordionType.Addresses, this.org.addresses.length) : [ ];
	}

	private _createPanelsTitle_Generic(orgViewAccordionType: OrgViewAccordionType, panelsTitleCount: number): string[]
	{
		let panelsTitle: string[] = [ ];

		/* Initializae the `panelsTitle` array. */
		for (let i: number = 0; i < panelsTitleCount; )
		{
			panelsTitle.push(`${ orgViewAccordionType } (${ ++i }) of (${ panelsTitleCount })`);
		}

		return panelsTitle;
	}

	private _createRelationshipsValue(): RelationshipsValue[]
	{
		/* The positions represent: 
		 * pos = 0 --> Instituciones Padres 
		 * pos = 1 --> Instituciones Hijas 
		 * pos = 2 --> Instituciones Relacionadas */
		let result: RelationshipsValue[] = [ ];
		let pos: number = -1;
		let item: any;

		for(item of this._panelsTitle_Relationships)
		{
			result.push({
				'links': [ ]
			});
		}

		if (this.org.relationships)
		{
			for(item of this.org.relationships)
			{
				switch(item.type)
				{
					case 'parent':
					{
						pos = 0;
						break;
					}

					case 'child':
					{
						pos = 1;
						break;
					}

					default:  /* 'related' */
					{
						pos = 2;
						break;
					}
				}

				result[pos].links.push({
					'url': item.label,
					'name': item.label
				});
			}
		}

		return result;
	}

	public get getPanelsTitle_Relationships(): string[]
	{
		return this._panelsTitle_Relationships;
	}

	public get getValue_Relationships(): RelationshipsValue[]
	{
		return this._relationshipsValue;
	}

	public get getPanelsTitle_Addresses(): string[]
	{
		return this._panelsTitle_Addresses;
	}
}
