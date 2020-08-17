
import { Component, OnInit, OnChanges, Input, ViewChild } from '@angular/core';
import { SourceClasification, VocabulariesInmutableNames, JournalVersion, JournalData } from '@toco/tools/entities';
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

    @Input() public journalVersion: JournalData;
    @Input() public journalUUID: string;

    /** TODO: In the future databaseTerms and subjectTerms will be changes by
     *  miarTerms and subjectsUnescoTerms
     *  public miarTerms: Array<SourceClasification>;
     *  public subjectsUnescoTerms: Array<SourceClasification>;
     */
    public institutionTerms: Array<SourceClasification>;
    public dataBaseTerms: Array<SourceClasification>;
    public groupTerms: Array<SourceClasification>;
    public provinceTerms: Array<SourceClasification>;
    public subjectTerms: Array<SourceClasification>;
    public licenceTerms: Array<SourceClasification>;

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
        if (this.journalVersion == undefined) this.journalVersion = new JournalData();


        this.dataBaseTerms = new Array<SourceClasification>();
        this.groupTerms = new Array<SourceClasification>();
        this.institutionTerms = new Array<SourceClasification>();
        this.licenceTerms = new Array<SourceClasification>();
        this.provinceTerms = new Array<SourceClasification>();
        this.subjectTerms = new Array<SourceClasification>();

        this.vocabularies = VocabulariesInmutableNames;

        if (this.journalVersion.classifications) {

            this.journalVersion.classifications.forEach((term: SourceClasification) => {

                switch (term.vocabulary.toString()) {
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
