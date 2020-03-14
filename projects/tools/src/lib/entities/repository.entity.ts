/*
 *   Copyright (c) 2020 Universidad de Pinar del Río "Hermanos Saíz Montes de Oca"
 *   All rights reserved.
 */


import { Entity } from "./entity";

export class Repository extends Entity {
    source_id: string;
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
    repository_id: string;
    identifier: string;
    record_uuid: string;
    status: string;
    error_log: string;
}
