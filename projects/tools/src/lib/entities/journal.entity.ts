import { Entity, EntityBase } from './entity';
import { Term } from './taxonomy.entity';
import { SourceData, Source } from './source.entity';


export class SocialNetworks  extends EntityBase {
  facebook = '';
  twitter = '';
  linkedin = '';
}
export class ISSN extends EntityBase {
    p  = '';
    e  = '';
    l  = '';
}
export class JournalData extends SourceData {

    subtitle  = '';
    shortname  = '';
    issn: ISSN = new ISSN();
    rnps = '';
    url = '';
    email = '';
    logo ? = '';
    purpose ? = '';
    start_year ? = '';
    end_year ? = '';
    frequency ? = '';

    socialNetworks: SocialNetworks = new SocialNetworks();

    getISSN() {
        return this.issn.p;
    }
}

export class Journal extends Source {
  data: JournalData = new JournalData();
}
