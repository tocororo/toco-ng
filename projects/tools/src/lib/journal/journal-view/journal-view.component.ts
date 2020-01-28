
import { Component, OnInit, OnChanges } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material';

import { MetadataService, MessageHandler, StatusCode } from '@toco/tools/core';

import { Journal, TermSource, SourceVersion} from '@toco/tools/entities';

import { EnvService } from '@tocoenv/tools/env.service';
import { TaxonomyService, VocabulariesInmutableNames } from '@toco/tools/backend';

@Component({
    selector: 'toco-journal-view',
    templateUrl: './journal-view.component.html',
    styleUrls: ['./journal-view.component.scss']
})
export class JournalViewComponent implements OnInit, OnChanges {

    public loading = true;
    public panelOpenState = false;

    public vocabularies: typeof VocabulariesInmutableNames;

    /**
     * Represents a Journal Object, it is a type of Source
     */
    public journal: Journal;

    /** TODO: In the future databaseTerms and subjectTerms will be changes by 
     *  miarTerms and subjectsUnescoTerms
     *  public miarTerms: Array<TermSource>;
     *  public subjectsUnescoTerms: Array<TermSource>;
    */
    public institutionTerms: Array<TermSource>;
    public dataBaseTerms: Array<TermSource>;
    public groupTerms: Array<TermSource>;
    public provinceTerms: Array<TermSource>;
    public subjectTerms: Array<TermSource>;
    public licenceTerms: Array<TermSource>;

    /**
     * the last version of a Journal, (a type of Source)
     * it is to compare and show changes between Journal and last version of journal
     */
    journalLastVersion : SourceVersion;
    /**
     * Array with all versions of a Journal, (a type of Source)
     */
    journalVersions: Array<SourceVersion>;


    defaultLogo = this.env.sceibaHost+'static/favicon.ico'


    constructor(private route: ActivatedRoute, private metadata: MetadataService, private env: EnvService, private taxonomyService: TaxonomyService, private _snackBar: MatSnackBar)
    { }
    
    ngOnInit() {
        this.dataBaseTerms = new Array<TermSource>();
        this.groupTerms = new Array<TermSource>();
        this.institutionTerms = new Array<TermSource>();
        this.licenceTerms = new Array<TermSource>();
        this.provinceTerms = new Array<TermSource>();
        this.subjectTerms = new Array<TermSource>();

        this.vocabularies = VocabulariesInmutableNames;
        this.route.data
        .subscribe((response) => {

            this.loading = false;

            if (response && response.journal && response.journal.status == 'success'){

                // initialize Journal
                this.journal = new Journal();
                this.journal.load_from_data(response.journal.data.source);

                if ( this.journal.versions ) this.journalVersions = this.journal.versions;
                console.log(this.journal);

                if ( this.journal.versions.length != 0 ) this.journalLastVersion = this.journal.versions[0];

                this.metadata.setTitleDescription('Revista Científica ' + this.journal.data.title, this.journal.data.description);

                if ( this.journal.terms ){

                    this.journal.terms.forEach( ( term: TermSource ) => {
                        console.log(term.term);
                        
                        switch (term.term.term.vocabulary_id) {
                            case this.vocabularies.INTITUTION:
                                this.institutionTerms.push(term);
                                break;
                            case this.vocabularies.DATABASES:
                                this.dataBaseTerms.push(term);
                                break;
                            case this.vocabularies.DB_GROUPS:
                                this.groupTerms.push(term);
                                break;
                            case this.vocabularies.LICENCES:
                                this.licenceTerms.push(term);
                                break;
                            case this.vocabularies.PROVINCES:
                                this.provinceTerms.push(term);
                                break;
                            case this.vocabularies.SUBJECTS:
                                this.subjectTerms.push(term);
                                break;
                        }
                    });
                }

            } else {
                const m = new MessageHandler(this._snackBar);
                m.showMessage(StatusCode.serverError, response.message);
            }

        });
    }

    ngOnChanges() {
        // this.metadata.setTitleDescription(this.journal.title, this.journal.description);
    }
}