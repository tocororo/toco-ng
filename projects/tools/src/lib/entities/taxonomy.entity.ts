
import { Entity } from './entity';

export class Term extends Entity {
    uuid: string;
    name: string;
    description: string;
    data: any;
    vocabulary_id: number;
    parent_id: number;
    clasified_ids: number[];
    class_ids: number[];
}

export class Vocabulary extends Entity {
    name: string;
    description: string;
    human_name: string;
}

/** File node data with possible child nodes. */
export interface TermNode {
    term: Term;
    children?: TermNode[];
}
