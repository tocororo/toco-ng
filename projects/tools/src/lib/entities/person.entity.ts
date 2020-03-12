/*
 *   Copyright (c) 2020 Universidad de Pinar del Río "Hermanos Saíz Montes de Oca"
 *   All rights reserved.
 */


import { Entity } from "./entity";

export class Person extends Entity
{
    institution_id: number;
    name: String;
    secondName: String;
    lastName: String;
    sex: String;
    inicialsName: String;
    userName: String;
    email: String;
    orcid: String;
    phone: String;
    bio: String;
    street: String;
    number: String;
    city: String;
    province: String;
    country: String;
}
