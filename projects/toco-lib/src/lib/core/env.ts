/*
 *   Copyright (c) 2020 Universidad de Pinar del Río "Hermanos Saíz Montes de Oca"
 *   All rights reserved.
 */


export abstract class Environment {
  abstract readonly production: boolean;

  abstract readonly sceibaHost: string;
  abstract readonly sceibaApi: string;
  abstract readonly cuorHost: string;
  abstract readonly cuorApi: string;

  abstract readonly appHost: string;
  abstract readonly appName: string;

  abstract readonly oauthRedirectUri: string;
  abstract readonly oauthClientId: string;
  abstract readonly oauthScope: string;

  abstract readonly topOrganizationPID: string;

  abstract readonly cachableUrls: Array<string>;
}

// import { Injectable } from '@angular/core';

// import { Params } from '../core/public-api';

// @Injectable({
//     providedIn: 'root'
// })
// export class Environment {

//     public sceibaApi = '';
//     public cuorApi = '';
//     public sceibaHost = '';
//     public cuorHost = '';
//     public appHost = '';
//     public appName = '';
//     public pagesApi = '';
//     public oauthRedirectUri = '';
//     public oauthClientId = '';
//     public oauthScope = '';
//     public topOrganizationPID = '';
//     public extraArgs: any = null;
//     public user = null;

//     /**
//      * A collection of key/value elements, where the keys are cachable URLs,
//      * and the values are maximum cache ages in milliseconds.
//      */
//     public cachableUrls: Params<number>;

//     public constructor()
//     { }
// }
