import { Entity } from './entity';


export class Term extends Entity {
    uuid: string;
    name: string;
    description: string;
    vocabulary: Vocabulary;
}

export class Vocabulary extends Entity {
    name: string;
    description: string;
}
