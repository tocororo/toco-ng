
import { EntityBase, Entity, Identifier } from './common';


export const OrganizationRelationships = {
	PARENT: { label: 'Padre', value: 'parent' },
	CHILD: { label: 'Hija', value: 'child' },
	RELATED: { label: 'Relacionada', value: 'related' },
  };


/**
 * Entity for `LabelDiffLang` based on schema `organization-v1.0.0.json`.
 * Name of the institute in different language.
 */
export class LabelDiffLang extends EntityBase
{
	/**
	 * Institute name in a language variant.
	 */
	label: string = '';

	/**
	 * ISO-639-1 language code.
	 */
	iso639: string = '';
}


/**
 * Entity for `Relationship` based on schema `organization-v1.0.0.json`.
 * A relationship the institute has to other.
 */
export class Relationship extends Entity
{
	/**
	 * Organization Identifiers, different from GRID mapping.
	 */
	identifiers: Array<Identifier> = new Array<Identifier>();

	/**
	 * Relationship type.
	 */
	type: string = '';

	/**
	 * Name of the related institute.
	 */
	label: string = '';
}

/**
 * Entity for `GeoNamesAdmin` based on schema `organization-v1.0.0.json`.
 */
export class GeoNamesAdmin extends EntityBase
{
	/**
	 * ID in the region format.
	 */
	id: string = '';

	/**
	 * Name of the region.
	 */
	name: string = '';

	/**
	 * Preferred ASCII encoded name for the region.
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
	 * GeoNames ID.
	 */
	id: number = 0;

	/**
	 * Name of the city.
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
 * An address associated with the institute.
 */
export class Address extends EntityBase
{
	/**
	 * Name of the city.
	 */
	city: string = '';

	/**
	 * Name of the country.
	 */
	country: string = '';

	/**
	 * ISO 3166-1 alpha-2 code of the country.
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
	 * Postcode/zipcode.
	 */
	postcode: string = '';

	/**
	 * If there is more than one address, identifies the main location.
	 * This address identifies the main location.
	 */
	primary: boolean = false;

	/**
	 * Name of the state/region.
	 */
	state: string = '';

	/**
	 * ISO 3166-2 region code.
	 */
	state_code: string = '';

	/**
	 * Linked GeoNames data.
	 */
	geonames_city: GeoNamesCity = undefined;
}

/**
 * Entity for `Organizations` based on schema `organization-v1.0.0.json`.
 */
export class Organization extends Entity
{


	/**
	 * Organization Identifiers, different from GRID mapping.
	 */
	identifiers: Array<Identifier> = new Array<Identifier>();

	/**
	 * The name typically used to refer to the institute.
	 */
	name: string = '';

	/**
	 * For an active institute, this is always set to active.
	 */
	status: string = '';

	/**
	 * The list of other names the institute is known as.
	 */
	aliases: Array<string> = new Array<string>();

	/**
	 * The list of short acronyms the institute is known as (e.g. MRC for the Medical Research Council).
	 */
	acronyms: Array<string> = new Array<string>();

	/**
	 * The list of types describing the institute.
	 */
	types: Array<string> = new Array<string>();

	/**
	 * URL of the wikipedia page for the institute.
	 */
	wikipedia_url: string = '';

	/**
	 * Contact email address for the institute.
	 */
	email_address: string = '';

	/**
	 * The list of IP addresses known to belong to the institute.
	 */
	ip_addresses: Array<string> = new Array<string>();

	/**
	 * Year the institute opened, CE.
	 */
	established: number = -1;

	/**
	 * The list of URLs linking to things like the homepage for the institute.
	 */
	links: Array<string> = new Array<string>();

	/**
	 * Name of the institute in different languages.
	 */
	labels: Array<LabelDiffLang> = new Array<LabelDiffLang>();

	/**
	 * Any relationships the institute has to others.
	 */
	relationships: Array<Relationship> = new Array<Relationship>();

	/**
	 * An array of addresses associated with the institute.
	 */
	addresses: Array<Address> = new Array<Address>();
}
