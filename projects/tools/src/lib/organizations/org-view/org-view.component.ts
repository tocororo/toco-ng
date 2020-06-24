
import { Component, OnInit, Input } from '@angular/core';

import { Organization } from '@toco/tools/entities';

const orgExample: any = {
	"id": "eb237d50-b64e-11ea-b3de-0242ac130004",  // Generado por Backend. Sólo se muestra.
	"identifiers": [
		{
			"idtype": "isni",
			"value": "An id isni"
		},
		{
			"idtype": "grid",
			"value": "An id grid"
		},
		{
			"idtype": "wkdata",
			"value": "An id wkdata"
		}
	],
	"name": "Library in University",
	"status": "active",
	"aliases": ["est", "eu", "aliquip", "proident", "consequat"],
	"acronyms": ["dolore", "anim laboris", "ad esse ipsum magna fugiat"],
	"types": ["Government", "Nonprofit", "Facility", "Healthcare"],
	"wikipedia_url": "www.wiki.elitaute.com",
	"email_address": "first@gmail.com",
	"ip_addresses": ["192.168.111.1", "192.168.26.4", "192.168.222.16"],
	"established": -1,
	"links": ["www.uclv.cu", "www.ulh.cu", "www.ucm.cu"],
	"labels": [
		{
			"label": "Excepteur 1",
			"iso639": "ipsum irure 1"
		},
		{
			"label": "Excepteur 2",
			"iso639": "ipsum irure 2"
		},
		{
			"label": "Excepteur 3",
			"iso639": "ipsum irure 3"
		}
	],
	"relationships": [
		{
			"identifiers": [
				{
					"idtype": "isni",
					"value": "An id isni"
				}
			],
			"type": "parent"
		},
		{
			"identifiers": [
				{
					"idtype": "grid",
					"value": "An id grid"
				},
				{
					"idtype": "wkdata",
					"value": "An id wkdata"
				}
			],
			"type": "child",
			"label": "ulh"
		},
		{
			"identifiers": [
				{
					"idtype": "wkdata",
					"value": "An id wkdata"
				},
				{
					"idtype": "fundref",
					"value": "An id fundref"
				},
				{
					"idtype": "ror",
					"value": "An id ror"
				},
				{
					"idtype": "isni",
					"value": "An id isni"
				}
			],
			"type": "related",
			"label": "uclv"
		}
	],
	"addresses": [
		{
			"city": "Villa Clara",
			"country": "Cuban",
			"country_code": "ISO 3166-1 alpha-2 code",
			"lat": -53.87,
			"lng": -63.96,
			"line_1": "mollit dolore, proident reprehenderit ad"
		},
		{
			"city": "La Habana",
			"country": "Cuban",
			"country_code": "ISO 3166-1 alpha-2 code",
			"lat": -22.79,
			"lng": -20.64,
			"line_1": "ullamco, ippoi",
			"line_2": "in aute eiusmod nulla",
			"line_3": "in eiusmod",
			"postcode": "25000",
			"primary": true,
			"state": "Vedado",
			"state_code": "ISO 3166-2 region code"
		}
	]
};

@Component({
	selector: 'toco-org-view',
	templateUrl: './org-view.component.html',
	styleUrls: ['./org-view.component.scss']
})
export class OrgViewComponent implements OnInit
{
	@Input()
	public org: Organization;

	@Input()
	public fullView = false;

	public constructor()
	{
		//TODO: Delete this when there is real data. 
		this.org = orgExample;
	}

	public ngOnInit(): void
	{
	}

	public doAction(): void
	{}
}
