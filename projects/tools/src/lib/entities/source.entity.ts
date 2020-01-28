
import { Entity, EntityBase } from './entity';
import { Term } from './taxonomy.entity';


export class SourceData extends EntityBase {
    title = '';
    description ? = '';
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
