
import { Entity, EntityBase } from './entity';
import { TermNode, Term } from './taxonomy.entity';



export const SourceTypes = {
    JOURNAL: { 'label': "Revista Cientifica", 'value': 'JOURNAL' },
    STUDENT: { 'label': "Revista Cientifico Estudiantil", 'value': 'STUDENT' },
    POPULARIZATION: { 'label': "Revista de Divulgacion", 'value': 'POPULARIZATION' },
    REPOSITORY: { 'label': "Repositorio Institucional", 'value': 'REPOSITORY' },
    WEBSITE: { 'label': "Sitio Web", 'value': 'WEBSITE' },
};

export const SourcePersonRole = {
  EDITOR: { 'label': "Editor", 'value': 'EDITOR' },
  MANAGER: { 'label': "Gestor", 'value': 'MANAGER'},
  DIRECTOR: { 'label': "Director", 'value': 'DIRECTOR'}
};

export const SourceStatus = {
    APPROVED: { 'label': "Aprobado", 'value': 'APPROVED' },
    TO_REVIEW: { 'label': "En revision", 'value': 'TO_REVIEW'},
    UNOFFICIAL: { 'label': "Incluida Extraoficialmente", 'value': 'UNOFFICIAL'}
};


export class SourceData extends EntityBase {
    title = '';
    description?= '';
    term_sources ? : Array<TermSource> = new Array<TermSource>();
}

export class TermSource extends EntityBase {
    term_id = -1;
    source_id = -1;
    data =  new Object();
    term ? : Term  = null;
}

export class SourceVersion extends Entity {
    user_id = '';
    source_id = -1;
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
