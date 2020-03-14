/*
 *   Copyright (c) 2020 Universidad de Pinar del Río "Hermanos Saíz Montes de Oca"
 *   All rights reserved.
 */


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
