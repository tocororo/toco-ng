
import { Injectable } from '@angular/core';
import { InMemoryDbService, RequestInfo } from 'angular-in-memory-web-api';
import { Observable } from 'rxjs';

import { Organization } from '@toco/tools/entities';

@Injectable({
	providedIn: 'root',
})
export class InMemoryDataService implements InMemoryDbService
{
	public createDb(reqInfo?: RequestInfo): {} | Observable<{}> | Promise<{}>
	{
		const ORGANIZATIONS: any[] = [
			{
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
            },
			{
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
            },
			{
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
            },
			{
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
            },
			{
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
            }
		];

		return {
			organizations: ORGANIZATIONS as Organization[]
		};
	}

	/**
	 * Generates a unique identifier for each entity. 
	 * @param entities The array of entities that already exists. The generated identifier is not present here. 
	 * @param firstId The first id to return if the `entities` argument is empty. 
	 */
	// public genId<T extends IEntity>(entities: T[], firstId: number): number
	// {
	// 	return (entities.length > 0) ? Math.max(...entities.map(value => value.id)) + 1 : firstId;
	// }
}
