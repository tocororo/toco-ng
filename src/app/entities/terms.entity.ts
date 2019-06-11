import { Entity } from "./entity";


export class Term extends Entity{
    value: string; 
    vocabulary: Vocabulary;
}

export class Vocabulary{
    value: string;
}