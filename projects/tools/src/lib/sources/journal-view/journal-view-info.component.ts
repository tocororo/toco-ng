
import { Component, OnInit, OnChanges, Input, ViewChild } from '@angular/core';
import { TermSource, VocabulariesInmutableNames, JournalVersion } from '@toco/tools/entities';
import { SourceService } from '@toco/tools/backend';
import { MatSnackBar } from '@angular/material';
import { JournalInstitutionsComponent } from '../journal-institutions/journal-institutions.component';

/**
 * This component share the same scss that `JournalViewComponent`.
 * His goal, shows a Journal
 */
@Component({
    selector: 'toco-journal-view-info',
    templateUrl: './journal-view-info.component.html',
    styleUrls: ['./journal-view.component.scss']
})
export class JournalViewInfoComponent implements OnInit, OnChanges{

    @Input() public journalVersion: JournalVersion;
    @Input() public journalUUID: string;

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
    public panelOpenState = false;

    @ViewChild(JournalInstitutionsComponent, { static: false }) inst: JournalInstitutionsComponent;

    constructor(
        private _sourveService: SourceService,
        private _snackBar: MatSnackBar
    ) {

    }

    ngOnInit(): void {
        this.loadJournalData();
    }
    ngOnChanges(): void {
        console.log("changes....");
        this.loadJournalData();
    }
    loadJournalData(){
        if (this.journalVersion == undefined) this.journalVersion = new JournalVersion();
        

        this.dataBaseTerms = new Array<TermSource>();
        this.groupTerms = new Array<TermSource>();
        this.institutionTerms = new Array<TermSource>();
        this.licenceTerms = new Array<TermSource>();
        this.provinceTerms = new Array<TermSource>();
        this.subjectTerms = new Array<TermSource>();

        this.vocabularies = VocabulariesInmutableNames;

        if (this.journalVersion.data.term_sources) {

            this.journalVersion.data.term_sources.forEach((term: TermSource) => {

                switch (term.term.vocabulary_id.toString()) {
                    case VocabulariesInmutableNames.CUBAN_INTITUTIONS:
                    case VocabulariesInmutableNames.EXTRA_INSTITUTIONS:
                        this.institutionTerms.push(term);
                        break;
                    case VocabulariesInmutableNames.INDEXES:
                        this.dataBaseTerms.push(term);
                        break;
                    case VocabulariesInmutableNames.INDEXES_CLASIFICATION:
                        this.groupTerms.push(term);
                        break;
                    case VocabulariesInmutableNames.LICENCES:
                        this.licenceTerms.push(term);
                        break;
                    case VocabulariesInmutableNames.CUBAN_PROVINCES:
                        this.provinceTerms.push(term);
                        break;
                    case VocabulariesInmutableNames.SUBJECTS:
                        this.subjectTerms.push(term);
                        break;
                }
            });

        }
    }

    editingJournalChange(newVersion: JournalVersion): void {
        console.log("*****llego....", newVersion, this.journalVersion);
        
        this.loadJournalData();
        this.inst.ngOnChanges();
    }
}
