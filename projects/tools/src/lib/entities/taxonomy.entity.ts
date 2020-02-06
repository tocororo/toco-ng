
import { Entity, EntityBase } from './entity';

// TODO: Esto esta bastante feo... hay que agregarle a vocabulario un nombre inmutable y referirse a este por aqui, no por los ids
export enum VocabulariesInmutableNames {
    INTITUTION = 1,
    DATABASES = 4,
    DB_GROUPS = 5,
    PROVINCES = 3,
    SUBJECTS = 2,
    LICENCES = 6, 
    MIAR = 7,
    SUBJECTS_UNESCO = 8,
  }

export class Term extends Entity {
    uuid = '';
    name = '';
    description = '';
    data = new EntityBase();
    vocabulary_id = 0;
    parent_id = 0;
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
