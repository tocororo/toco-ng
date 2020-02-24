
import { Component, OnInit, Input, OnChanges, DoCheck } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { MatSnackBar } from '@angular/material';

import { MetadataService, MessageHandler, StatusCode } from '@toco/tools/core';

import { Journal, TermSource, SourceVersion, JournalVersion, Term, VocabulariesInmutableNames, Response} from '@toco/tools/entities';
import { EnvService } from '@tocoenv/tools/env.service';
import { SourceService } from '@toco/tools/backend';


export enum JournalDataType {
    /** is used by default, `Journal` have not that type of data. */
    default = 0,
    title = 1,
    subtitle = 2,
    shortname = 3,
    issnP = 4,
    issnE = 5,
    issnL = 6,
    rnps = 7,
    url = 8,
    email = 9,
    logo = 10,
    purpose = 11,
    start_year = 12,
    end_year = 13,
    frequency = 14,
    seriadas_cubanas = 15,
    facebook = 16,
    twitter = 17,
    linkedin = 18,
    description = 19,
    term = 20
}

@Component({
    selector: 'toco-journal-view',
    templateUrl: './journal-view.component.html',
    styleUrls: ['./journal-view.component.scss']
})
export class JournalViewComponent implements OnInit {

    /**************** auxiliary variables *******************/
    public loading = true;

    public panelOpenState = false;

    
    public defaultLogo = this.env.sceibaHost + 'static/favicon.ico'

    /**
     * Button roperty, is to enable or disable if there are not more versions
     */
    public isDisabledNavigateBefore: boolean;
    public isDisabledNavigateNext: boolean;

    public vocabularies: typeof VocabulariesInmutableNames;


    /**************** journal variables *******************/

    /**
     * Represents a Journal Object, it is a type of Source. 
     */
    @Input()
    public journal: Journal;


<<<<<<< HEAD
    /**************** current journal variables *******************/
=======

    /**************** select journal version variables *******************/
>>>>>>> 6910977af1c87e814aaedc1b24d89a077cc3645c

    /**
     * the current version of a Journal, (a type of Source)
     * it is to compare and show changes between Journal and last version of journal
     * iteration over journal.versions
     */
    public selectedJournal: JournalVersion;


    /** TODO: In the future databaseTerms and subjectTerms will be changes by 
     *  miarTerms and subjectsUnescoTerms
     *  public miarTerms: Array<TermSource>;
     *  public subjectsUnescoTerms: Array<TermSource>;
    */

<<<<<<< HEAD
    public currentJournalChecked: boolean = false;
=======
>>>>>>> 6910977af1c87e814aaedc1b24d89a077cc3645c

    /**
     * Properties to move between versions
     */
    private selectedVersion: number;
    private lengthVersion: number;

    /**
     * Inmutables data types of Journal
     */
    public journalDataType = JournalDataType;



    /**
     * version.is_current = true 
     */
    public currentJournal: JournalVersion;

    public editingJournal: JournalVersion;


    constructor(
        private metadata: MetadataService,
        private env: EnvService,
        private _sourveService: SourceService,
        private _snackBar: MatSnackBar
    ) { }

    ngOnInit() {

        this.isDisabledNavigateBefore = true;
        this.isDisabledNavigateNext = false;

        this.vocabularies = VocabulariesInmutableNames;

        // guardar la cantidad total de versiones
        this.lengthVersion = this.journal.versions.length;
        // guardar la posicion de la version donde este la actual
        this.selectedVersion = this.getSelectedJournalPosition();

        this.SelectJournalVersion();

        this.metadata.setTitleDescription('Revista Científica ' + this.journal.data.title, this.journal.data.description);

        this.journal.versions.forEach((journalVersion: JournalVersion, index: number) => {
            // check if has versions to view and return that position
            if (journalVersion.is_current) {
                this.currentJournal = journalVersion;
                this.editingJournal = new JournalVersion();
                this.editingJournal.load_from_data(journalVersion);
            }
        });

    }



    /**
     * Changes the selected position to the next one if possible
     */
    public nextVersion(): void {

        if (this.selectedVersion < this.lengthVersion - 1) {

            this.isDisabledNavigateNext = false;
            this.isDisabledNavigateBefore = false;
            this.selectedVersion++;
            this.SelectJournalVersion();

        }
        else {

            this.isDisabledNavigateNext = true;
            const m = new MessageHandler(this._snackBar);
            m.showMessage(StatusCode.OK, 'No hay más versiones para mostrar')

        }
        if (this.selectedVersion == this.lengthVersion - 1) {
            this.isDisabledNavigateNext = true;
        }
    }

    /**
     * Changes the selected position to the before one if possible
     */
    public beforeVersion(): void {

        if (this.selectedVersion > 0) {
            this.isDisabledNavigateBefore = false;
            this.isDisabledNavigateNext = false;
            this.selectedVersion--;
            this.SelectJournalVersion();

        }
        else {

            this.isDisabledNavigateBefore = true;
            const m = new MessageHandler(this._snackBar);
            m.showMessage(StatusCode.OK, 'No hay más versiones para mostrar')

        }
        if (this.selectedVersion == 0) {
            this.isDisabledNavigateBefore = true;
        }
    }

    /**
     * Selects the selected journal as a JournalVersion
     */
    public SelectJournalVersion(): void {
        if (this.journal.versions.length >= 0 &&
            this.selectedVersion >= 0 &&
            this.selectedVersion < this.journal.versions.length) {

            // load the selected journal
            let version = new JournalVersion();
            version.load_from_data(this.journal.versions[this.selectedVersion]);
            this.selectedJournal = version;

            // load if was viewed
            // this.selectedJournalChecked = this.selectedJournal.reviewed;

        }
    }

<<<<<<< HEAD
    /**
     * Replaces . 
     */
    public replace(): void {
        this.journal.data = this.currentJournal.data;
        this.journal.name = this.currentJournal.data.title;
        this.journal.term_sources = [];
        this.currentJournal.terms.forEach((term: Term) => {

            const termSouce = new TermSource()

            termSouce.source_id = this.currentJournal.source_id;
            termSouce.term_id = term.id;
            termSouce.term = term;
            termSouce.data = term.data;

            this.journal.term_sources.push(termSouce);

        });
        console.log('journal remplazado', this.journal);

    }

    /**
     * Returns the first position of the unseen version of the `SourceVersion` (journal). 
=======

    /**
     * Returns the position of the unseen version of the journal as JournalVersion
>>>>>>> 6910977af1c87e814aaedc1b24d89a077cc3645c
     */
    private getSelectedJournalPosition(): number {
        let count = 0;
        this.journal.versions.forEach((journalVersion: JournalVersion, index: number) => {

            // check if has versions to view and return that position
            if (journalVersion.reviewed != null && journalVersion.reviewed) {
                count = index;
                return count;
            }
        });
        return count;
    }

<<<<<<< HEAD
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
export class JournalViewTermComponent implements OnInit {

    @Input() public title: string;

    @Input() public vocab_id: number;

    @Input() public terms: Array<TermSource>;

    constructor() {

    }

    ngOnInit(): void {
        if (this.terms == undefined) this.terms = new Array<TermSource>(0);

        if (this.vocab_id == undefined) this.vocab_id = 0;

        if (this.title == undefined) this.title = '';
    }
}


/**
 * This component share the same scss that `JournalViewComponent`.
 * His goal, shows a Journal
 */
@Component({
    selector: 'toco-journal-view-info',
    templateUrl: './journal-view-info.component.html',
    styleUrls: ['./journal-view.component.scss']
})
export class JournalViewInfoComponent implements OnInit {

    @Input()
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

    public vocabularies: typeof VocabulariesInmutableNames;

    public constructor() {
    }

    public ngOnInit(): void {
        this.loadJournalData();
    }

    public loadJournalData(): void {
        if (this.journal == undefined) this.journal = new Journal();

        this.dataBaseTerms = new Array<TermSource>();
        this.groupTerms = new Array<TermSource>();
        this.institutionTerms = new Array<TermSource>();
        this.licenceTerms = new Array<TermSource>();
        this.provinceTerms = new Array<TermSource>();
        this.subjectTerms = new Array<TermSource>();

        this.vocabularies = VocabulariesInmutableNames;

        if (this.journal.term_sources) {

            this.journal.term_sources.forEach((term: TermSource) => {

                switch (term.term.vocabulary_id) {
                    case VocabulariesInmutableNames.INTITUTION:
                        this.institutionTerms.push(term);
                        break;
                    case VocabulariesInmutableNames.DATABASES:
                        this.dataBaseTerms.push(term);
                        break;
                    case VocabulariesInmutableNames.MES_GROUPS:
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

    /**
     * Approves the 
     */
    public approve(): void{

    }
}

/**
* This component share the same scss that `JournalViewComponent`.
* His goal, handle the actions and how show a specific data of a `JournalVersion`
*/
@Component({
    selector: 'toco-journal-view-field',
    templateUrl: './journal-view-field.component.html',
    styleUrls: ['./journal-view.component.scss']
})
export class JournalViewFieldComponent implements OnInit {

    @Input()
    public journal: Journal;

    @Input()
    public currentJournal: JournalVersion;

    @Input()
    public type: number;

    public journalDataType = JournalDataType;

    public constructor() {
    }

    ngOnInit(): void {
        if (this.journal == undefined) this.journal = new Journal()

        if (this.currentJournal == undefined) this.currentJournal = new JournalVersion();

        if (this.type == undefined) this.type = JournalDataType.default;
    }
=======
>>>>>>> 6910977af1c87e814aaedc1b24d89a077cc3645c

    /**
     * approve
     */
    public approve() {
        this._sourveService.makeSourceAsApproved(this.journal.uuid)
            .pipe(
                catchError(err => {
                    console.log(err);
                    return of(null);
                })
            )
            .subscribe((res: Response<any> ) => {
                console.log(res);
                const m = new MessageHandler(this._snackBar);
                m.showMessage(StatusCode.OK, res.message);

            });
    }

}
