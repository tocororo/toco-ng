import { Entity } from './entity';


export class Term extends Entity {
    uuid: string;
    name: string;
    description: string;
    data: any;
    vocabulary: Vocabulary;
    parent_id: number;
}

export class Vocabulary extends Entity {
    name: string;
    description: string;
}