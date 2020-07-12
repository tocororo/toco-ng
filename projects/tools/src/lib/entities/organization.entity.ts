
import { EntityBase } from './entity';

export class GeoNamesAdmin extends EntityBase
{
	/**
	 * The ID in the region format. 
	 */
	id: string = '';

	/**
	 * The name of the region. 
	 */
	name: string = '';

	/**
	 * A preferred ASCII encoded name for the region. 
	 */
	ascii_name: string = '';
}

/**
 * Entity for `GeoNamesCity` based on schema `organization-v1.0.0.json`. 
 * The linked GeoNames data. 
 */
export class GeoNamesCity extends EntityBase
{
	/**
	 * The GeoNames ID. 
	 */
	id: number = 0;

	/**
	 * The name of the city. 
	 */
	city: string = '';

	/**
	 * geonames_admin1. 
	 */
	geonames_admin1: GeoNamesAdmin = undefined;

	/**
	 * geonames_admin2. 
	 */
	geonames_admin2?: GeoNamesAdmin = undefined;

	/**
	 * nuts_level1
	 */
	nuts_level1: GeoNamesAdmin = undefined;

	/**
	 * nuts_level2
	 */
	nuts_level2?: GeoNamesAdmin = undefined;

	/**
	 * nuts_level3
	 */
	nuts_level3?: GeoNamesAdmin = undefined;
}

/**
 * Entity for `Address` based on schema `organization-v1.0.0.json`. 
 */
export class Address extends EntityBase
{
	/**
	 * The name of the city. 
	 */
	city: string = '';

	/**
	 * The name of the country. 
	 */
	country: string = '';

	/**
	 * The ISO 3166-1 alpha-2 code of the country. 
	 */
	country_code: string = '';

	/**
	 * Latitute of the institute. 
	 */
	lat: number = 0;

	/**
	 * Longitude of the institute. 
	 */
	lng: number = 0;

	/**
	 * First line of the address. 
	 */
	line_1: string = '';

	/**
	 * Second line of the address. 
	 */
	line_2?: string = '';

	/**
	 * Third line of the address. 
	 */
	line_3?: string = '';

	/**
	 * The postcode/zipcode. 
	 */
	postcode: string = '';

	/**
	 * If there is more than one address, identifies the main location. 
	 */
	primary: boolean = false;

	/**
	 * The name of the state/region. 
	 */
	state: string = '';

	/**
	 * The ISO 3166-2 region code. 
	 */
	state_code: string = '';

	/**
	 * The linked GeoNames data. 
	 */
	geonames_city: GeoNamesCity = undefined;
}

/**
 * Entity for `Organizations` based on schema `organization-v1.0.0.json`. 
 */
export class Organization extends EntityBase
{
	id = '';
	identifiers = new Object();
	name = '';
	status = '';
	aliases = new Array<string>();
	acronyms = new Array<string>();
	types = new Array<string>();
	wikipedia_url = '';
	email_address = '';
	ip_addresses = new Array<string>();
	established = -1;
	links = new Array<string>();
	labels = new Array<any>();
	relationships = new Array<any>();
	addresses = new Array<Address>();
}
