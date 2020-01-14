
import { Entity } from "./entity";

export class JournalReference extends Entity
{
    reference: Reference;
    startdate: string;
    enddate: string;
    url: string;
}

export class Reference
{
    name: string
}
