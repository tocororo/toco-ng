/*
 *   Copyright (c) 2020 Universidad de Pinar del Río "Hermanos Saíz Montes de Oca"
 *   All rights reserved.
 */


import { Entity } from "./common";

export class Person extends Entity
{
    institution_id: string;
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


export class UserProfile extends Entity {
    biography: string = '';
    email: string = '';
    full_name: string = '';
    id: string = '';
    institution: string = '';
    institution_id: number = -1;
    institution_rol: string = '';
    username: string = '';
    avatar: string = '';
}

