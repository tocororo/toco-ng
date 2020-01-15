import { Entity, EntityBase } from './entity';
import { JournalReference } from './journal_reference.entity';
import { Term } from './taxonomy.entity';


// TODO: En algun momento refactorizar...
    // todo lo que se llama Journal deberia llamarse source
export class SocialNetworks  extends EntityBase {
  facebook = '';
  twitter = '';
  linkedin = '';
}
export class ISSN {
    p  = '';
    e  = '';
    l  = '';
}
export class JournalInformation extends EntityBase {
    title = '';
    subtitle  = '';
    shortname  = '';
    issn: ISSN = new ISSN();
    rnps = '';
    url = '';
    email = '';
    logo ? = '';
    purpose ? = '';
    description ? = '';
    start_year ? = '';
    end_year ? = '';
    frequency ? = '';

    socialNetworks: SocialNetworks = new SocialNetworks();

    getISSN() {
        return this.issn.p;
    }
}

export class Journal extends Entity {
    tocoID: string;
    data: JournalInformation = new JournalInformation();
    jreference?: Array<JournalReference> = new Array<JournalReference>(0);
    terms?: Array<Term> = new Array<Term>(0);
    source_type = '';
    source_app = '';

    /**
     * The OAI protocol URL.
     */
    harvest_endpoint = '';
    harvest_type = '';
}


