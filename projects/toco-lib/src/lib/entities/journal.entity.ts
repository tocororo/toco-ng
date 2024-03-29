/*
 *   Copyright (c) 2020 Universidad de Pinar del Río "Hermanos Saíz Montes de Oca"
 *   All rights reserved.
 */

import { EntityBase } from './common';
import { Source, SourceData, SourceVersion } from './source.entity';


export class SocialNetworks  extends EntityBase {
  facebook = '';
  twitter = '';
  linkedin = '';
}

export class IssnOrg extends EntityBase {
  issn: '';
  title: '';
}

export class ISSN extends EntityBase {
    p  = '';
    e  = '';
    l  = '';
    issn_org = new IssnOrg();
}

export class RNPS extends EntityBase {
  p  = '';
  e  = '';
}

export class JournalData extends SourceData {

    subtitle  = '';
    shortname  = '';
    issn: ISSN = new ISSN();
    rnps: RNPS = new RNPS();
    url = '';
    email = '';
    logo ? = '';
    purpose ? = '';
    start_year ? = '';
    end_year ? = '';
    frequency ? = '';
    seriadas_cubanas ? = '';

    socialNetworks: SocialNetworks = new SocialNetworks();

}

export class Journal extends Source {
  data: JournalData = new JournalData();
  versions: Array<JournalVersion> = new Array<JournalVersion>();
}

export class JournalVersion extends SourceVersion {
  data: JournalData = new JournalData();
  // /** WARNING: helper variable in the client side. Do not rely on this unless you know what you are doing */
  // organization?: Term = null;
  // /** WARNING: helper variable in the client side. Do not rely on this unless you know what you are doing */
  // institution?: Term = null;
  // /** WARNING: helper variable in the client side. Do not rely on this unless you know what you are doing */
  // entity?: Term = null;

  // entitystringify(): string  {
  //   return JSON.stringify(this, (k, v) => {
  //     if (k !== 'id' &&
  //         k !== 'uuid' &&
  //         k !== 'isNew' &&
  //         k !== 'organization' &&
  //         k !== 'institution' &&
  //         k !== 'entity' ) {
  //       return v;
  //     }
  //   });
  // }
}
