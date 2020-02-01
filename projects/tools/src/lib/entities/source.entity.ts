
import { Entity, EntityBase } from './entity';
import { TermNode, Term } from './taxonomy.entity';


// TODO: las llaves raras son porque el backend lo da asi.. esto es un TODO en el backend, que cuando se resuelva hay que venir aqui.
export const SourceTypes = {
    JOURNAL: { 'label': "Revista Cientifica", 'value': 'JOURNAL' },
    STUDENT: { 'label': "Revista Cientifico Estudiantil", 'value': 'STUDENT' },
    POPULARIZATION: { 'label': "Revista de Divulgacion", 'value': 'POPULARIZATION' },
    REPOSITORY: { 'label': "Repositorio Institucional", 'value': 'REPOSITORY' },
    WEBSITE: { 'label': "Sitio Web", 'value': 'WEBSITE' },
}

export const SourceStatus = {
    APPROVED: { 'label': "Aprobado", 'value': 'APPROVED' },
    TO_REVIEW: { 'label': "En revision", 'value': 'TO_REVIEW'},
    UNOFFICIAL: { 'label': "Incluida Extraoficialmente", 'value': 'UNOFFICIAL'}
}


export class SourceData extends EntityBase {
    title = '';
    description?= '';
}

export class TermSource extends EntityBase {
    term_id = -1;
    source_id = -1;
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
    
    terms ? : Array<Term> = new Array<Term>();

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
