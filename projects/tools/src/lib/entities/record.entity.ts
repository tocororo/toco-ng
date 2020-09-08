import { EntityBase } from './common';



export class Record extends EntityBase {
  id = '';
  identifiers = new Object();
  source = new Object();
  spec = new Object();
  title = '';
  creators = new Object();
  keywords = new Array<string>();
  description = '';
  publisher = '';
  sources = new Array<string>();
  rights = new Array<string>();
  types = new Array<string>();
  formats = new Array<string>();
  language = '';
  publication_date = '';
  contributors = new Object();
  references = new Object();
  iroko_terms = new Array<string>();
  status = '';
}
