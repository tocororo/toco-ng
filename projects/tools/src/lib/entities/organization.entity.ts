import { EntityBase } from './entity';

/**
 * Entity for Organizations based on schema organization-v1.0.0.json.
 */
export class Organization extends EntityBase {

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
  addresses = new Array<any>();
}
