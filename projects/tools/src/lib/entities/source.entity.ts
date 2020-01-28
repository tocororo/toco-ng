
import { Entity, EntityBase } from './entity';
import { Term } from './taxonomy.entity';


// TODO: las llaves raras son porque el backend lo da asi.. esto es un TODO en el backend, que cuando se resuelva hay que venir aqui.
export const SourceTypes = {
    "SourceTypes.JOURNAL": { 'label': "Revista Cientifica", 'value': 'SourceTypes.JOURNAL' },
    "SourceTypes.STUDENT": { 'label': "Revista Cientifico Estudiantil", 'value': "SourceTypes.STUDENT" },
    "SourceTypes.POPULARIZATION": { 'label': "Revista de Divulgacion", 'value': "SourceTypes.POPULARIZATION" },
    "SourceTypes.REPOSITORY": { 'label': "Repositorio Institucional", 'value': "SourceTypes.REPOSITORY" },
    "SourceTypes.WEBSITE": { 'label': "Sitio Web", 'value': "SourceTypes.WEBSITE" },
}

export const SourceStatus = {
    'SourceStatus.APPROVED': "Aprobado",
    'SourceStatus.TO_REVIEW': "En revision",
    'SourceStatus.UNOFFICIAL': "Incluida Extraoficialmente"
}


export class SourceData extends EntityBase {
    title = '';
    description?= '';
}

export class TermSource extends EntityBase {
    term_id = -1;
    source_id = -1;
    data = '';

}

export class SourceVersion extends Entity {
    user_id = '';
    source_id = '';
    comment = '';
    created_at = new Date();
    is_current = false;

    data: SourceData = new SourceData();
}

export class Source extends Entity {
    uuid = '';
    name = '';

    terms?: Array<TermSource> = new Array<TermSource>(0);

    source_type = '';
    source_status = '';

    version_to_review = false;

    versions: Array<SourceVersion> = new Array<SourceVersion>();

    data: SourceData = new SourceData();
}
