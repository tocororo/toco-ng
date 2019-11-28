import { Entity } from "./entity";
import { JournalReference } from "./journal_reference.entity";
import { Term } from "./taxonomy.entity";


//TODO: En algun momento refactorizar...
    // todo lo que se llama Journal deberia llamarse source
    
    
export class Journal extends Entity
{
    tocoID: string;
    jinformation: JournalInformation;
    jreference?: Array<JournalReference>;
    terms?: Array<Term>;
    source_type: string;
    harvest_type: string;
    /**
     * The OAI protocol URL.
     */ 
    harvest_endpoint: string;
    
     /**
      * Create a new instance of `Journal` class.
      * @param r Length of journal reference.
      * @param t Length of `terms`.
      */
    constructor(r: number,t:number)
    {
        super();
        this.jreference = new Array<JournalReference>(r);
        this.terms = new Array<Term>(t);
    };
}


export class JournalInformation
{
    title: string;
    subtitle: string;
    shortname: string;
    issn: ISSN;
    rnps: string;
    url: string;
    email: string;
    logo: string;
    purpose: string;
    description: string;

    getISSN()
    {
        return this.issn.p;
    }
}

export class ISSN
{
    p: string;
    e: string;
    l: string;
}
