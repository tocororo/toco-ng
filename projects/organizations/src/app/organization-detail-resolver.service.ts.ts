
import { Injectable } from '@angular/core';
import { Router, Resolve, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { take, map } from 'rxjs/operators';

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
		// {
		// 	"label": "Excepteur 3",
		// 	"iso639": "ipsum irure 3"
		// }
	],
	// "relationships": [
	// 	{
	// 		"identifiers": [
	// 			{
	// 				"idtype": "isni",
	// 				"value": "An id isni"
	// 			}
	// 		],
	// 		"type": "parent",
	// 		"label": "Universidad de la Habana"
	// 	},
	// 	{
	// 		"identifiers": [
	// 			{
	// 				"idtype": "grid",
	// 				"value": "An id grid"
	// 			},
	// 			{
	// 				"idtype": "wkdata",
	// 				"value": "An id wkdata"
	// 			}
	// 		],
	// 		"type": "child",
	// 		"label": "Universidad de las Villas"
	// 	},
	// 	{
	// 		"identifiers": [
	// 			{
	// 				"idtype": "wkdata",
	// 				"value": "An id wkdata"
	// 			},
	// 			{
	// 				"idtype": "fundref",
	// 				"value": "An id fundref"
	// 			},
	// 			{
	// 				"idtype": "ror",
	// 				"value": "An id ror"
	// 			},
	// 			{
	// 				"idtype": "isni",
	// 				"value": "An id isni"
	// 			}
	// 		],
	// 		"type": "related",
	// 		"label": "uclv"
	// 	}
	// ],
	"relationships": [
		{
			"identifiers": [
				{
					"idtype": "isni",
					"value": "An id isni"
				}
			],
			"type": "parent",
			"label": "Universidad de la Habana"
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
			"label": "Universidad de las Villas"
		}
	],
	"addresses": [
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
			"state_code": "ISO 3166-2 RC-25",
			"geonames_city": {
				"id": 123,
				"city": "La Habana City",
				"geonames_admin1": {
					"id": "11111",
					"name": "Región La Habana",
					"ascii_name": "QQQQQ"
				},
				"geonames_admin2": {
					"id": "22222",
					"name": "Región La Habana",
					"ascii_name": "WWWWW"
				},
				"nuts_level1": {
					"id": "33333",
					"name": "Región La Habana",
					"ascii_name": "EEEEE"
				},
				"nuts_level2": {
					"id": "44444",
					"name": "Región La Habana",
					"ascii_name": "RRRRR"
				},
				"nuts_level3": {
					"id": "55555",
					"name": "Región La Habana",
					"ascii_name": "TTTTT"
				}
			}
		},
		{
			"city": "Villa Clara",
			"country": "Cuban",
			"country_code": "ISO 3166-1 alpha-2 code",
			"lat": -53.87,
			"lng": -63.96,
			"line_1": "mollit dolore, proident reprehenderit ad",
			"postcode": "73000",
			"primary": false,
			"state": "Vedado",
			"state_code": "ISO 3166-2 RC-73",
			"geonames_city": {
				"id": 123,
				"city": "La Habana City",
				"geonames_admin1": {
					"id": "11111",
					"name": "Región La Habana",
					"ascii_name": "QQQQQ"
				},
				"nuts_level1": {
					"id": "33333",
					"name": "Región La Habana",
					"ascii_name": "EEEEE"
				}
			}
		}
	]
};

@Injectable({
	providedIn: 'root',
})
export class OrganizationDetailResolverService implements Resolve<SearchResponse<Organization>>
{
	public constructor(private router: Router, private service: SearchService)
	{ }

	public resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<SearchResponse<Organization>>
	{
		let uuid = route.paramMap.get('uuid');
		return this.service.getOrganizationById(uuid).pipe(
            take(1),
            map(node => {
                if (node) {
                    return node;
				}
				else {
                    this.router.navigate(['/']);
                }
            })
        );
		// return of(orgExample);
	}
}
