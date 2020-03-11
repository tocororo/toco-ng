/*
 *   Copyright (c) 2020 Universidad de Pinar del Río "Hermanos Saíz Montes de Oca"
 *   All rights reserved.
 */


import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class EnvService {

    public sceibaApi = '';
    public sceibaHost = '';
    public appHost = '';
    public appName = '';
    public pagesApi = '';
    public oauthRedirectUri = '';
    public oauthClientId = '';
    public oauthScope = '';
    public organizationUUID = '';
    public extraArgs: any = null;
    constructor()
    { }
}
