/*
 *   Copyright (c) 2020 Universidad de Pinar del Río "Hermanos Saíz Montes de Oca"
 *   All rights reserved.
 */


import { Entity, EntityBase } from './entity';

// TODO: Esto esta bastante feo... hay que agregarle a vocabulario un nombre inmutable y referirse a este por aqui, no por los ids
export enum VocabulariesInmutableNames {
    INTITUTION = '1',
    SUBJECTS = '2',
    PROVINCES = '3',
    DATABASES = '4',
    MES_GROUPS = '5',
    LICENCES = '6', 
    MIAR_TYPES = '7',
    MIAR_DATABASES = '8',
    UNESCO_VOCAB = '9',
    RECOD_SETS = '10',
    RECORD_TYPES = '11'
  }

export class Term extends Entity {
    uuid = '';
    name = '';
    description = '';
    data = new EntityBase();
    vocabulary_id = '';
    parent_id = '';
    clasified_ids: number[] = [];
    class_ids: number[] = [];
    
    // load_from_data(data: any){
    //     switch (data['vocabulary_id']) {
    //         case VocabulariesInmutableNames.INTITUTION:
    //             this.data = new TermInstitutionData();
    //             break;
    //         case VocabulariesInmutableNames.LICENCES:
    //             this.data = new TermIndexData();
    //         default:
    //             this.data = new EntityBase();
    //     }
    //     super.load_from_data(data);
    // }
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
