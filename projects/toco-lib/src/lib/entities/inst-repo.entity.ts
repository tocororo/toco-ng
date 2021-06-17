
import { EntityBase, Entity, Identifier } from './common';

/**
 * Entity for main Institution based on schema `...-v1.0.0.json`. 
 */
export class MainInstitution extends EntityBase
{
    /**
     * The name typically used to refer to the institute. 
     */
    name: string;
    /**
     * Organization Identifiers, different from GRID mapping. 
     */
    identifiers: Array<Identifier>;
}

/**
 * Entity for Institutional Repository based on schema `...-v1.0.0.json`. 
 */
export class InstitutionalRepository extends Entity
{
    /**
     * Name of the region. 
     */
    name: string;
    /**
     * Main Institution. 
     */
    mainInst: MainInstitution;
    /**
     * URL page for the institute. 
     */
    url: string;
    /**
     * URL-OAI page for the institute. 
     */
    url_oai: string;
}

/**
 * Represents an object of `MainInstitution` type with all its values set to empty. 
 * The `identifiers` array field must have one empty value at least. 
 */
export const mainInstEmpty: any = {
    'name': '',
    'identifiers': [{
        'idtype': '',
        'value': ''
    }]
};

/**
 * Represents an object of `InstitutionalRepository` type with all its values set to empty. 
 */
export const instRepoEmpty: any = {
    'id': '',
    'name': '',
    'mainInst': mainInstEmpty,
    'url': '',
    'url_oai': ''
};
