
import { Entity, EntityBase } from './entity';
import { Term } from './taxonomy.entity';

export class SourceData extends EntityBase {
    title = '';
    description ? = '';
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

    terms?: Array<Term> = new Array<Term>(0);

    source_type = '';
    source_status = '';

    version_to_review = false;

    versions: Array<SourceVersion> = new Array<SourceVersion>();

    data: SourceData = new SourceData();
}
