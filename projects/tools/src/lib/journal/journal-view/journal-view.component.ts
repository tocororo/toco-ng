
import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material';

import { MetadataService, MessageHandler, StatusCode } from '@toco/tools/core';

import { Journal, TermSource, SourceVersion, JournalVersion, Term} from '@toco/tools/entities';

import { EnvService } from '@tocoenv/tools/env.service';
import { VocabulariesInmutableNames } from '@toco/tools/backend';

@Component({
    selector: 'toco-journal-view',
    templateUrl: './journal-view.component.html',
    styleUrls: ['./journal-view.component.scss']
})
export class JournalViewComponent implements OnInit {

    /**************** auxiliary variables *******************/
    public loading = true;

    public panelOpenState = false;

    defaultLogo = this.env.sceibaHost+'static/favicon.ico'

    /**
     * Button roperty, is to enable or disable if there are not more versions
     */
    isDisabledNavigateBefore: boolean;
    isDisabledNavigateNext: boolean;

    public vocabularies: typeof VocabulariesInmutableNames;


    /**************** journal variables *******************/

    /**
     * Represents a Journal Object, it is a type of Source
     */
    public journal: Journal;



    /**************** current journal variables *******************/

    /**
     * the version of a Journal, (a type of Source)
     * it is to compare and show changes between Journal and last version of journal
     */
    public currentJournal : JournalVersion;
    
    /** TODO: In the future databaseTerms and subjectTerms will be changes by 
     *  miarTerms and subjectsUnescoTerms
     *  public miarTerms: Array<TermSource>;
     *  public subjectsUnescoTerms: Array<TermSource>;
    */
    public currentInstitutionTerms: Array<Term>;
    public currentDataBaseTerms: Array<Term>;
    public currentGroupTerms: Array<Term>;
    public currentProvinceTerms: Array<Term>;
    public currentSubjectTerms: Array<Term>;
    public currentLicenceTerms: Array<Term>;

    /**
     * Properties to move between versions
     */
    private currentVersion: number;
    private lengthVersion: number;


    constructor(
        private route: ActivatedRoute,
        private metadata: MetadataService,
        private env: EnvService,
        private _snackBar: MatSnackBar
        )
    { }
    
    ngOnInit() {

        this.isDisabledNavigateBefore = true;
        this.isDisabledNavigateNext = false;

        this.vocabularies = VocabulariesInmutableNames;

        this.currentInstitutionTerms = new Array<Term>();
        this.currentDataBaseTerms = new Array<Term>();
        this.currentGroupTerms = new Array<Term>();
        this.currentProvinceTerms = new Array<Term>();
        this.currentSubjectTerms = new Array<Term>();
        this.currentLicenceTerms = new Array<Term>();

        this.route.data
        .subscribe((response) => {
            
            this.loading = false;
            
            if (response && response.journal && response.journal.status == 'success'){
                
                // initialize Journal
                this.journal = new Journal();
                this.journal.load_from_data(response.journal.data.source);
                
                // loads data
                console.log(response, this.journal);
                
                // guardar la cantidad total de versiones
                this.lengthVersion = this.journal.versions.length;
                // guardar la posicion de la version donde este la actual
                this.currentVersion = this.getCurrentJournalPosition();

                this.currentJournal = this.getCurrentJournal();
                
                this.metadata.setTitleDescription('Revista Científica ' + this.journal.data.title, this.journal.data.description);


            } else {
                const m = new MessageHandler(this._snackBar);
                m.showMessage(StatusCode.serverError, response.message);
            }

        });
    }


    /**
     * Changes the current position to the next one if possible
     */
    public nextVersion(): void {
        if (this.currentVersion < this.lengthVersion - 1) {

            this.isDisabledNavigateNext = false;
            this.isDisabledNavigateBefore = false;
            this.currentVersion ++;
            this.currentJournal = this.getCurrentJournal();

        }
        else {

            this.isDisabledNavigateNext = true;
            const m = new MessageHandler(this._snackBar);
            m.showMessage(StatusCode.OK, 'No hay más versiones para mostrar')

        }
        if (this.currentVersion == this.lengthVersion - 1){
            this.isDisabledNavigateNext = true;
        }
    }

    /**
     * Changes the current position to the before one if possible
     */
    public beforeVersion(): void {

        if (this.currentVersion > 0) {
            this.isDisabledNavigateBefore = false;
            this.isDisabledNavigateNext = false;
            this.currentVersion --;
            this.currentJournal = this.getCurrentJournal();

        }
        else {

            this.isDisabledNavigateBefore = true;
            const m = new MessageHandler(this._snackBar);
            m.showMessage(StatusCode.OK, 'No hay más versiones para mostrar')

        }
        if (this.currentVersion == 0){
            this.isDisabledNavigateBefore = true;
        }
    }

    /**
     * Returns the current journal as a SourceVersion
     */
    public getCurrentJournal(): JournalVersion{
        if( this.journal.versions.length >= 0 &&
            this.currentVersion >= 0 &&
            this.currentVersion < this.journal.versions.length) {

                if ( this.currentJournal && this.currentJournal.terms ){

                    this.currentJournal.terms.forEach( ( term: Term ) => {
                        
                        switch (term.vocabulary_id) {
                            case this.vocabularies.INTITUTION:
                                this.currentInstitutionTerms.push(term);
                                break;
                            case this.vocabularies.DATABASES:
                                this.currentDataBaseTerms.push(term);
                                break;
                            case this.vocabularies.DB_GROUPS:
                                this.currentGroupTerms.push(term);
                                break;
                            case this.vocabularies.LICENCES:
                                this.currentLicenceTerms.push(term);
                                break;
                            case this.vocabularies.PROVINCES:
                                this.currentProvinceTerms.push(term);
                                break;
                            case this.vocabularies.SUBJECTS:
                                this.currentSubjectTerms.push(term);
                                break;
                        }
                    });
                }

                this.currentJournal = new JournalVersion();
                this.currentJournal.load_from_data(this.journal.versions[this.currentVersion]);
                return this.currentJournal;

            }

        return new JournalVersion();
    }

    /**
     * Returns the position of the unseen version of the journal as SourceVersion
     */
    private getCurrentJournalPosition(): number {
        let count = 0;
        this.journal.versions.forEach( (journalVerion : SourceVersion, index: number) => {
            
            // check if has versions to view and return that position
            if( journalVerion.reviewed != null && journalVerion.reviewed){
                count = index;
                return;
            }
        });
        return count;
    }
}

/**
 * This component share the same scss that `JournalViewComponent`.
 * His goal is show a list of `terms`
 */
@Component({
    selector: 'toco-journal-view-term',
    templateUrl: './journal-view-term.component.html',
    styleUrls: ['./journal-view.component.scss']
})
export class JournalViewTermComponent implements OnInit{

    @Input() public title: string;
    
    @Input() public vocab_id: number;
    
    @Input() public terms: Array<TermSource>;
    
    constructor() {

    }

    ngOnInit(): void {
        if ( this.terms == undefined ) this.terms = new Array<TermSource>(0);

        if( this.vocab_id == undefined ) this.vocab_id = 0;

        if( this.title == undefined ) this.title = '';
    }
}


/**
 * This component share the same scss that `JournalViewComponent`.
 * His goal is show a Journal
 */
@Component({
    selector: 'toco-journal-view-info',
    templateUrl: './journal-view-info.component.html',
    styleUrls: ['./journal-view.component.scss']
})
export class JournalViewInfoComponent implements OnInit{

    @Input() public journal: Journal;

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

    public vocabularies: typeof VocabulariesInmutableNames;

    constructor() {

    }

    ngOnInit(): void {
        if ( this.journal == undefined ) this.journal = new Journal();
        
        this.dataBaseTerms = new Array<TermSource>();
        this.groupTerms = new Array<TermSource>();
        this.institutionTerms = new Array<TermSource>();
        this.licenceTerms = new Array<TermSource>();
        this.provinceTerms = new Array<TermSource>();
        this.subjectTerms = new Array<TermSource>();

        this.vocabularies = VocabulariesInmutableNames;

        if ( this.journal.terms ){

            this.journal.terms.forEach( ( term: TermSource ) => {
                
                switch (term.term.vocabulary_id) {
                    case VocabulariesInmutableNames.INTITUTION:
                        this.institutionTerms.push(term);
                        break;
                    case VocabulariesInmutableNames.DATABASES:
                        this.dataBaseTerms.push(term);
                        break;
                    case VocabulariesInmutableNames.DB_GROUPS:
                        this.groupTerms.push(term);
                        break;
                    case VocabulariesInmutableNames.LICENCES:
                        this.licenceTerms.push(term);
                        break;
                    case VocabulariesInmutableNames.PROVINCES:
                        this.provinceTerms.push(term);
                        break;
                    case VocabulariesInmutableNames.SUBJECTS:
                        this.subjectTerms.push(term);
                        break;
                }
            });
        }
    }
}