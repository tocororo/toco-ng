
import { Component } from '@angular/core';
import { HttpParams } from '@angular/common/http';
import { PageEvent } from '@angular/material';

import { Organization, SearchResponse } from '@toco/tools/entities';
import { SearchService } from '@toco/tools/backend';

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
	"aliases": ["alias1", "alias2", "alias3", "alias4", "alias5"],
	"acronyms": ["acronyms 1", "acronyms 2", "acronyms 3"],
	"types": ["Government", "Nonprofit", "Facility", "Healthcare"],       // Un "Select" multiple
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
	selector: 'toco-org-root',
	templateUrl: './org.component.html',
	styleUrls: ['./org.component.scss']
})
export class OrgRootComponent
{
	/**
	 * Represents an organization. 
	 */
	public org: Organization;

	// begin Layout stuff
	layoutPosition = [
		{
			name: 'Derecha',
			layout: 'row-reverse',
			aling: 'center baseline',
			width: '22'
		},
		{
			name: 'Izquierda',
			layout: 'row',
			aling: 'center baseline',
			width: '22'
		},
		{
			name: 'Arriba',
			layout: 'column',
			aling: 'center center',
			width: '90'
		},
		{
			name: 'Abajo',
			layout: 'column-reverse',
			aling: 'center center',
			width: '90'
		}
	];
	currentlayout = this.layoutPosition[0];
	public changeLayoutPosition(index: number) {
		this.currentlayout = this.layoutPosition[index];
	}
	// end Layout stuff

	// begin paginator stuff
	length = 100;
	pageSize = 5;
	pageIndex = 0;
	pageSizeOptions: number[] = [5, 10, 25, 100];
	// end paginator stuff

	params: HttpParams;
	sr: SearchResponse<Organization>;

	public constructor(private _searchService: SearchService)
	{ }

	public ngOnInit(): void
	{
		this.org = orgExample;

		this.params = new HttpParams();
		this.getRecords();
	}

	public pageChange(event?: PageEvent): void
	{
		this.pageSize = event.pageSize;
		this.pageIndex = event.pageIndex;
		this.getRecords();
	}

	public getRecords(): void
	{
		this.params = this.params.set('size', this.pageSize.toString());
		this.params = this.params.set('page', (this.pageIndex + 1).toString());


		this._searchService.getOrganizations(this.params).subscribe(
			(response: SearchResponse<Organization>) => {
				console.log(response);
				// this.pageEvent.length = response.hits.total;
				this.sr = response;
			},
			(error: any) => {

			},
			() => {

			}
		);
	}
}
