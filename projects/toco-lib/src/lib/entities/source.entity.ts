/*
 *   Copyright (c) 2020 Universidad de Pinar del Río "Hermanos Saíz Montes de Oca"
 *   All rights reserved.
 */




import { Entity, EntityBase } from './common';
import { Organization } from './organization.entity';
import { UserProfile } from './person.entity';

export const SourceSystems = {
  OJS: { label: 'Open Journal System', value: 'OJS' },
  CMS: { label: 'Content Management System (Wordpress, Joomla, Drupal, etc)', value: 'CMS' },
  DSPACE: { label: 'Dspace', value: 'DSPACE' },
  OTHER: { label: 'Otro', value: 'OTHER' },
};

export const SourceTypes = {
    JOURNAL: { label: 'Revista Científica', value: 'JOURNAL' },
    SERIAL: { label: 'Publicación Seriada', value: 'SERIAL' },
    STUDENT: { label: 'Revista Científico Estudiantil', value: 'STUDENT' },
    POPULARIZATION: { label: 'Revista de Divulgación', value: 'POPULARIZATION' },
    REPOSITORY: { label: 'Repositorio Institucional', value: 'REPOSITORY' },
    WEBSITE: { label: 'Sitio Web', value: 'WEBSITE' },
    OTHER: { label: 'Otro', value: 'OTHER' },
};

export const SourceOrganizationRole = {
  MAIN: {label: 'Principal', value: 'MAIN'},
  COLABORATOR: {label: 'Colaborador', value: 'COLABORATOR'}
};


export const SourcePersonRole = {
  ADMINISTRATOR: {label: 'Administrador', value: 'ADMINISTRATOR'},
  JOURNALMANAGER: {label: 'Gestor de Revista', value: 'JOURNALMANAGER'},
  AUTHOR: {label: 'Autor', value: 'AUTHOR'},
  EDITOR: {label: 'Editor', value: 'EDITOR'},
  SECTIONEDITOR: {label: 'Editor de Sección', value: 'SECTIONEDITOR'},
  REVIEWER: {label: 'Revisor', value: 'REVIEWER'},
  COPYEDITOR: {label: 'Editor de Copias', value: 'COPYEDITOR'},
  LAYOUTEDITOR: {label: 'Editor de Formato', value: 'LAYOUTEDITOR'},
  PROOFREADER: {label: 'Corrector de Pruebas', value: 'PROOFREADER'},
  READER: {label: 'Lector', value: 'READER'}
};

export const SourceStatus = {
    APPROVED: { label: 'Aprobado', value: 'APPROVED' },
    TO_REVIEW: { label: 'En revision', value: 'TO_REVIEW'},
    UNOFFICIAL: { label: 'Incluido Extraoficialmente', value: 'UNOFFICIAL'}
};

export class SourceOrganization extends Organization {
  role: string = '';
}
export class SourceClasification extends EntityBase {
  id: string = '';
  description: string = '';
  vocabulary: string = '';
  data =  new Object();
}

export class  SavingInfoSchema extends EntityBase {
  user_id: string = '';
  comment: string = '';
}

export class SourceData extends Entity {
    name = '';
    title = '';
    description ?= '';
    // term_sources ?: Array<TermSource> = new Array<TermSource>();
    oaiurl ? = '';
    source_system ? = '';
    source_type = '';
    source_status = '';
    organizations?: Array<SourceOrganization> = new Array<SourceOrganization>();
    classifications?: Array<SourceClasification> = new Array<SourceClasification>();


    _save_info: SavingInfoSchema = new SavingInfoSchema();

    reviewed = false;

    versions? : Array<SourceVersion>;

    // public deepcopy(data: any, exclude: string[] = []): void {

    //   if (data['organizations'] && data['organizations'].length > 0){
    //     for (let index = 0; index < data['organizations'].length; index++) {
    //       const element = data['organizations'][index];
    //       this.organizations.push(new SourceOrganization());
    //     }
    //   }
    //   if (data['classifications'] && data['classifications'].length > 0){
    //     for (let index = 0; index < data['classifications'].length; index++) {
    //       const element = data['classifications'][index];
    //       this.classifications.push(new SourceClasification());
    //     }
    //   }
    //   super.deepcopy(data, exclude);
    // }
}

// export class TermSource extends EntityBase {
//     term_id = '';
//     source_id = '';
//     data =  new Object();
//     term ?: Term  = null;
// }

export class SourceVersion extends Entity {
    user_id = '';
    source_uuid = '';
    comment = '';
    created_at = new Date();
    is_current = false;
    reviewed = false;

    data: SourceData = new SourceData();

    userprofile: UserProfile = new UserProfile();
}



export class Source extends Entity {
    uuid = '';
    name = '';

    clasifications?: Array<SourceClasification> = new Array<SourceClasification>(0);
    organizations?: Array<SourceOrganization> = new Array<SourceOrganization>();

    aliases: Array<string> = new Array<string>();

    source_type = '';
    source_status = '';

    version_to_review = false;

    versions: Array<SourceVersion> = new Array<SourceVersion>();

    data: SourceData = new SourceData();
}
