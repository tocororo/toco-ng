/*
 *   Copyright (c) 2020 Universidad de Pinar del Río "Hermanos Saíz Montes de Oca"
 *   All rights reserved.
 */


import { Entity, EntityBase } from './common';

// TODO: Esto esta bastante feo... hay que agregarle a vocabulario un nombre inmutable y referirse a este por aqui, no por los ids
export enum VocabulariesInmutableNames {
    CUBAN_INTITUTIONS = 'CUBAN_INTITUTIONS',
    SUBJECTS = 'SUBJECTS',
    CUBAN_PROVINCES = 'CUBAN_PROVINCES',
    // DATABASES = '3',
    // MES_GROUPS = 'MES_GROUPS',
    LICENCES = 'LICENCES',
    INDEXES_CLASIFICATION = 'INDEXES_CLASIFICATION',
    INDEXES = 'INDEXES',
    UNESCO_VOCAB = 'UNESCO_VOCAB',
    RECOD_SETS = 'RECOD_SETS',
    RECORD_TYPES = 'RECORD_TYPES',
    EXTRA_INSTITUTIONS = 'EXTRA_INSTITUTIONS',
    SUBJECT_COVER = 'SUBJECT_COVER',
    COUNTRIES = 'COUNTRIES'
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

    // deepcopy(data: any){
    //     switch (data['vocabulary_id']) {
    //         case VocabulariesInmutableNames.INTITUTION:
    //             this.data = new TermInstitutionData();
    //             break;
    //         case VocabulariesInmutableNames.LICENCES:
    //             this.data = new TermIndexData();
    //         default:
    //             this.data = new EntityBase();
    //     }
    //     super.deepcopy(data);
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
