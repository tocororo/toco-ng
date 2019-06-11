import { Entity } from "./entity";


export class Repository extends Entity {
    source_id: number;
    last_run: Date;
    identifier: string;
    metadata_formats: Array<string>;
    status: string
    error_log: string
    sets: Array<RepositorySet>
    jobId: string
}


export class RepositorySet extends Entity {
    setSpec: string
    setName: string
}


export class HarvestedItem extends Entity {
    repository_id: number
    identifier: string
    record_uuid: string
    status: string
    error_log: string
}