
import { Entity } from './entity';

export class Term extends Entity {
    uuid = '';
    name = '';
    description = '';
    data = '';
    vocabulary_id = 0;
    parent_id = 0;
    clasified_ids: number[] = [];
    class_ids: number[] = [];
}

export class Vocabulary extends Entity {
    name = '';
    description = '';
    human_name = '';
}

/** File node data with possible child nodes. */
export interface TermNode {
    term: Term;
    children?: TermNode[];
}
