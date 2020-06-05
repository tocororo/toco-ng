import { EntityBase } from './entity';


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
