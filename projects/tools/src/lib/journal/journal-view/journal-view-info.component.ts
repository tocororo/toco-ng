import { Component, OnInit, OnChanges, Input } from '@angular/core';
import { Journal, TermSource, VocabulariesInmutableNames, JournalVersion, Response } from '@toco/tools/entities';
import { SourceService } from '@toco/tools/backend';
import { MatSnackBar } from '@angular/material';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { MessageHandler, StatusCode } from '@toco/tools/core';

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

    editingJournalChange(): void {
        this.loadJournalData();
    }

    public journalSave(){
        let journalVersion = new JournalVersion();
        journalVersion.comment = "????";

        this._sourveService.editSource(journalVersion, this.journalUUID)
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
