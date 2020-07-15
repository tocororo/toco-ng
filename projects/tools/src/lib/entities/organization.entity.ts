
import { EntityBase } from './entity';

/**
 * Entity for `LabelDiffLang` based on schema `organization-v1.0.0.json`. 
 * The name of the institute in different language. 
 */
export class LabelDiffLang extends EntityBase
{
	/**
	 * The institute name in a language variant. 
	 */
	label: string = '';

	/**
	 * The ISO-639-1 language code. 
	 */
	iso639: string = '';
}

/**
 * Entity for `GeoNamesAdmin` based on schema `organization-v1.0.0.json`. 
 */
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
	 * nuts_level1. 
	 */
	nuts_level1: GeoNamesAdmin = undefined;

	/**
	 * nuts_level2. 
	 */
	nuts_level2?: GeoNamesAdmin = undefined;

	/**
	 * nuts_level3. 
	 */
	nuts_level3?: GeoNamesAdmin = undefined;
}

/**
 * Entity for `Address` based on schema `organization-v1.0.0.json`. 
 * Address associated with the institute. 
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
	/**
	 * Iroko Organization UUID, pid_type = orgid. 
	 */
	id = '';

	/**
	 * Organization Identifiers, different from GRID mapping. 
	 */
	identifiers = new Object();

	/**
	 * The name typically used to refer to the institute. 
	 */
	name = '';

	/**
	 * For an active institute, this is always set to active. 
	 */
	status = '';

	/**
	 * A list of other names the institute is known as. 
	 */
	aliases = new Array<string>();

	/**
	 * A list of short acronyms the institute is known as (e.g. MRC for the Medical Research Council). 
	 */
	acronyms = new Array<string>();

	/**
	 * A list of types describing the institute. 
	 */
	types = new Array<string>();

	/**
	 * URL of the wikipedia page for the institute. 
	 */
	wikipedia_url = '';

	/**
	 * A contact email address for the institute. 
	 */
	email_address = '';

	/**
	 * IP addresses known to belong to the institute. 
	 */
	ip_addresses = new Array<string>();

	/**
	 * The year the institute opened, CE. 
	 */
	established = -1;

	/**
	 * An array of URLs linking to things like the homepage for the institute. 
	 */
	links = new Array<string>();

	/**
	 * The name of the institute in different languages. 
	 */
	labels = new Array<LabelDiffLang>();

	/**
	 * Any relationships the institute has to others. 
	 */
	relationships = new Array<any>();

	/**
	 * An array of addresses associated with the institute. 
	 */
	addresses = new Array<Address>();
}
