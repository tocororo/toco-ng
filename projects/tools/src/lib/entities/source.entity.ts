


import { Entity, EntityBase } from './entity';
import { TermNode, Term } from './taxonomy.entity';



export const SourceTypes = {
    JOURNAL: { 'label': 'Revista Científica', 'value': 'JOURNAL' },
    STUDENT: { 'label': 'Revista Científico Estudiantil', 'value': 'STUDENT' },
    POPULARIZATION: { 'label': 'Revista de Divulgación', 'value': 'POPULARIZATION' },
    REPOSITORY: { 'label': 'Repositorio Institucional', 'value': 'REPOSITORY' },
    WEBSITE: { 'label': 'Sitio Web', 'value': 'WEBSITE' },
    OTHER: { 'label': 'Otro', 'value': 'OTHER' },
};

export const SourcePersonRole = {
  ADMINISTRATOR: {'label': "Administrador", 'value': "ADMINISTRATOR"},
  JOURNALMANAGER: {'label': "Gestor de Revista", 'value': "JOURNALMANAGER"},
  AUTHOR: {'label': "Autor", 'value': "AUTHOR"},
  EDITOR: {'label': "Editor", 'value': "EDITOR"},
  SECTIONEDITOR: {'label': "Editor de Sección", 'value': "SECTIONEDITOR"},
  REVIEWER: {'label': "Revisor", 'value': "REVIEWER"},
  COPYEDITOR: {'label': "Editor de Copias", 'value': "COPYEDITOR"},
  LAYOUTEDITOR: {'label': "Editor de Formato", 'value': "LAYOUTEDITOR"},
  PROOFREADER: {'label': "Corrector de Pruebas", 'value': "PROOFREADER"},
  READER: {'label': "Lector", 'value': "READER"}
};

export const SourceStatus = {
    APPROVED: { 'label': "Aprobado", 'value': 'APPROVED' },
    TO_REVIEW: { 'label': "En revision", 'value': 'TO_REVIEW'},
    UNOFFICIAL: { 'label': "Incluido Extraoficialmente", 'value': 'UNOFFICIAL'}
};


export class SourceData extends EntityBase {
    title = '';
    description?= '';
    term_sources ? : Array<TermSource> = new Array<TermSource>();
}

export class TermSource extends EntityBase {
    term_id = '';
    source_id = '';
    data =  new Object();
    term ? : Term  = null;
}

export class SourceVersion extends Entity {
    user_id = '';
    source_id = '';
    comment = '';
    created_at = new Date();
    is_current = false;
    reviewed = false;

    data: SourceData = new SourceData();
}

export class Source extends Entity {
    uuid = '';
    name = '';

    term_sources?: Array<TermSource> = new Array<TermSource>(0);

    source_type = '';
    source_status = '';

    version_to_review = false;

    versions: Array<SourceVersion> = new Array<SourceVersion>();

    data: SourceData = new SourceData();
}
