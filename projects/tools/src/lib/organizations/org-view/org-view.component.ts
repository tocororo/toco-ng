
import { Component, OnInit, Input } from '@angular/core';

import { Organization, Address } from '@toco/tools/entities';

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

	@Input()
	public showContent: boolean = true;


	private _panelsTitle_Relationships: string[];
	private _relationshipsValue: RelationshipsValue[];

	private _panelsTitle_Addresses: string[];
	private _addressesValue: Address[];

	public constructor()
	{
		this.orgViewAccordionType = OrgViewAccordionType;

		this.org = undefined;
	}

	public ngOnInit(): void
	{
		this._panelsTitle_Relationships = ['Organizaciones Padres', 'Organizaciones Hijas', 'Organizaciones Relacionadas'];
		this._relationshipsValue = this._createRelationshipsValue();

		this._addressesValue = this._createAddressesValue();  /* This initialization is first than the `_panelsTitle_Addresses` initialization. */
		// this._panelsTitle_Addresses = (this.org.addresses) ? this._createPanelsTitle_Generic(this.orgViewAccordionType.Addresses, this.org.addresses.length) : [ ];
		this._panelsTitle_Addresses = this._createPanelsTitle_Addresses();
	}

	/**
	 * Creates a generic array of panels title.
	 * Usage example:
	 * this._panelsTitle_Addresses = (this.org.addresses) ? this._createPanelsTitle_Generic(this.orgViewAccordionType.Addresses, this.org.addresses.length) : [ ];
	 * @param orgViewAccordionType The `OrgViewAccordionComponent` type.
	 * @param panelsTitleCount Amount of panels title.
	 */
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

	private _createPanelsTitle_Addresses(): string[]
	{
		let panelsTitle: string[] = [ ];
		let panelsTitleCount = this._addressesValue.length;

		/* Initializae the `panelsTitle` array. */
		for (let i: number = 0; i < panelsTitleCount; i++)
		{
			panelsTitle.push(`${ this._addressesValue[i].city } | ${ this._addressesValue[i].country } ${ (this._addressesValue[i].primary) ? '(Principal)' : '' }`);
		}

		return panelsTitle;
	}

	private _createRelationshipsValue(): RelationshipsValue[]
	{
		/* The positions represent:
		 * pos = 0 --> Organizaciones Padres
		 * pos = 1 --> Organizaciones Hijas
		 * pos = 2 --> Organizaciones Relacionadas */
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
					'url': `${ item.id }/view`,
					'name': item.label
				});
			}
		}

		return result;
	}

	/**
	 * Returns an array of addresses ordered by the `primary` field of its addresses,
	 * the true values are first than the false values.
	 */
	private _createAddressesValue(): Address[]
	{
		let result: Address[] = [ ];
		let noPrimary: Address[] = [ ];

		for(let item of this.org.addresses)
		{
			if (item.primary)
			{
				result.push(item);
			}
			else
			{
				noPrimary.push(item);
			}
		}

		return result.concat(noPrimary);
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

	public get getValue_Addresses(): Address[]
	{
		return this._addressesValue;
	}
}
