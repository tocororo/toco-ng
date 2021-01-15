import { EntityBase } from './common';
import { Source } from './source.entity';



export class Record extends EntityBase {
  id = '';
  identifiers = new Array<Object>();
  source_repo = new Source();
  spec = new Object();
  title = '';
  creators = new Array<Object>();
  keywords = new Array<string>();
  description = '';
  publisher = '';
  sources = new Array<string>();
  rights = new Array<string>();
  types = new Array<string>();
  formats = new Array<string>();
  language = '';
  publication_date = '';
  contributors = new Array<Object>();
  references = new Object();
  iroko_terms = new Array<string>();
  status = '';
}
