
import { Entity, EntityBase } from './entity';

export class Term extends Entity {
    uuid = '';
    name = '';
    description = '';
    data = new Object();
    vocabulary_id = 0;
    parent_id = 0;
    clasified_ids: number[] = [];
    class_ids: number[] = [];
}



export class TermInstitutionData extends EntityBase {
    grid = '';
    email = '';
    website = '';
    address = '';
}

export class TermIndexData extends EntityBase {
  url = '';
  abrev = '';
  initial_cover = '';
  end_cover = '';
}

export class Vocabulary extends Entity {
    name = '';
    description = '';
    human_name = '';
}

/** File node data with possible child nodes. */
export interface TermNode {
    term: Term;
    parent: TermNode;
    children?: TermNode[];
}
