/*
 *   Copyright (c) 2020 Universidad de Pinar del Río "Hermanos Saíz Montes de Oca"
 *   All rights reserved.
 */

/*** La idea de esta clase es tener un deserializador. */
export class EntityBase extends Object {
  public deepcopy(data: any, exclude: string[] = []): void {
    const keys: string[] = Object.keys(this);

    for (const key of keys) {
      if (data[key] && !exclude.includes(key)) {
        if (this[key] instanceof EntityBase) {
          this[key].deepcopy(data[key], exclude);
        }  else {
          this[key] = data[key];
        }
      }
    }
  }
}

/**
 * Created by Edel on 02/04/2018.
 */
export class Entity extends EntityBase {
  id: string = '';

  /** By default is FALSE. If TRUE, means that the entity does not have valid identifiers or has not been saved to the backend.  */
  isNew = false;
  // raw_data: String;
  // created_at: String;
  // updated_at: String;

  identifiers:Array<Identifier> = new Array<Identifier>();
  getIdentifierValue(idtype: IdentifierSchemas): string {
    const id = this.identifiers.find((value) => value.idtype == idtype);
    return id != undefined ? id.value : '';
  }

  setIdentifierValue(idtype: IdentifierSchemas, value: string) {
    if(value != ''){
      let added = false;
      for (let index = 0; index < this.identifiers.length; index++) {
        if(this.identifiers[index].idtype == idtype){
          this.identifiers[index].value = value;
          added = true;
        }
      }
      if (!added) {
        const id = new Identifier();
        id.idtype = idtype;
        id.value = value;
        this.identifiers.push(id)
      }
    }
  }

  constructor() {
    super();
  }


  /**
   * return JSON.stringify, using a function to exclude object fields id and uuid
   */
  entitystringify(): string {
    return JSON.stringify(this, (k, v) => {
      // if (k !== "id" && k !== "uuid" && k !== "isNew") {
      if (k !== "isNew") {
        return v;
      }
    });
  }
}

/**
 * Entity for `Identifier` based on schema `organization-v1.0.0.json`.
 * Organization Identifier, different from GRID mapping.
 */
export class Identifier extends EntityBase {
  /**
   * Identifier type.
   */
  idtype: IdentifierSchemas;

  /**
   * Identifier value.
   */
  value: string = "";
}


export enum IdentifierSchemas {
  ark = "ark",
  arxiv = "arxiv",
  doi = "doi",
  bibcode = "bibcode",
  ean8 = "ean8",
  ean13 = "ean13",
  handle = "handle",
  isbn = "isbn",
  issn_p = "issn_p",
  issn_l = "issn_l",
  issn_e = "issn_e",
  issn_c = "issn_c",
  issn_o = "issn_o",
  istc = "istc",
  lsid = "lsid",
  pmid = "pmid",
  pmcid = "pmcid",
  purl = "purl",
  upc = "upc",
  url = "url",
  urn = "urn",
  orcid = "orcid",
  gnd = "gnd",
  ads = "ads",
  oai = "oai",
  prnps = "prnps",
  ernps = "ernps",
  oaiurl = "oaiurl",
  grid = "grid",
  wkdata = "wkdata",
  ror = "ror",
  isni = "isni",
  fudref = "fudref",
  orgref = "orgref",
  reup = "reup",
}

export class Links extends EntityBase {
  self = "";
  next = "";
  prev = "";
}

export class AggrBucket extends EntityBase {
  doc_count = 0;
  key = "";
}
class AggrMeta extends EntityBase {
  order = 0;
  title = "";
}

export class Aggr extends EntityBase {
  buckets: Array<AggrBucket> = new Array<AggrBucket>();
  meta? = new AggrMeta();
  doc_count_error_upper_bound = 0;
  sum_other_doc_count = 0;
}

export class Hit<T> extends EntityBase {
  id = "";
  created = "";
  updated = "";
  links = new Links();
  metadata: T;
  revision = 0;

  revisions? : Array<Hit<T>>;
}

export class HitList<T> extends EntityBase {
  hits = new Array<Hit<T>>();
  total: 0;
}

export class SearchResponse<T> extends EntityBase {
  aggregations: { [id: string]: Aggr } = {};
  hits = new HitList<T>();
  links = new Links();
}
