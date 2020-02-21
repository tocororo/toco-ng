import { Entity, EntityBase } from './entity';

export class Links extends EntityBase {
  self = '';
  next = '';
  prev = '';
}

export class AggrBucket extends EntityBase {
  doc_count = 0;
  key = '';
}
class AggrMeta extends EntityBase {
  order = 0;
  title = '';
}

export class Aggr extends EntityBase {
  buckets ?: Array<AggrBucket> = new Array<AggrBucket>();
  meta = new AggrMeta();
}

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

export class Hit extends EntityBase {
  id = '';
  created = '';
  updated = '';
  links = new Links();
  metadata = new Record();
  revision = 0;
}

export class HitList extends EntityBase {
  hits = new Array<Hit>();
  total: 0
}

export class SearchResponse extends EntityBase {
  aggregations: { [id: string]: Aggr;  } = {};
  hits = new HitList();
  links = new Links();
}
