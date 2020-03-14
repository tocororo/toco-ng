/*
 *   Copyright (c) 2020 Universidad de Pinar del Río "Hermanos Saíz Montes de Oca"
 *   All rights reserved.
 */


import { Component, OnInit, Input, OnChanges, DoCheck, Inject, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { MatSnackBar, MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material';

import { MetadataService, MessageHandler, StatusCode } from '@toco/tools/core';

import { Journal, TermSource, SourceVersion, JournalVersion, Term, VocabulariesInmutableNames, Response, ResponseStatus} from '@toco/tools/entities';
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
    rnpsP = 7,
    rnpsE = 21,
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

    public panelOpenState = false;

    
    public defaultLogo = this.env.sceibaHost + 'static/favicon.ico'

    /**
     * Button roperty, is to enable or disable if there are not more versions
     */
    isDisabledNavigatePrevious: boolean;
    isDisabledNavigateNext: boolean;

    public vocabularies: typeof VocabulariesInmutableNames;


    /**************** journal variables *******************/

    /**
     * Represents a Journal Object, it is a type of Source. 
     */
    @Input()
    public journal: Journal;



    /**************** select journal version variables *******************/

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

    @Input()
    public editingJournal: JournalVersion;

    public showVersions = false;

    

    constructor(
        private metadata: MetadataService,
        private env: EnvService,
        private _snackBar: MatSnackBar,
        public dialog: MatDialog
    ) { }

    ngOnInit() {

        this.isDisabledNavigatePrevious = true;
        this.isDisabledNavigateNext = false;

        this.vocabularies = VocabulariesInmutableNames;

        // guardar la cantidad total de versiones
        this.lengthVersion = this.journal.versions.length;
        // guardar la posicion de la version donde este la actual
        this.selectedVersion = this.getSelectedJournalPosition();

        this.SelectJournalVersion();

        this.metadata.setTitleDescription('Revista Científica ' + this.journal.data.title, this.journal.data.description);

        if (! this.editingJournal){
            this.journal.versions.forEach((journalVersion: JournalVersion, index: number) => {
                // check if has versions to view and return that position
                if (journalVersion.is_current) {
                    this.currentJournal = journalVersion;
                    this.editingJournal = new JournalVersion();
                    this.editingJournal.load_from_data(journalVersion);
                }
            });
        }


    }



    /**
     * Changes the selected position to the next one if possible
     */
    public nextVersion(): void {

        if (this.selectedVersion < this.lengthVersion - 1) {

            this.isDisabledNavigateNext = false;
            this.isDisabledNavigatePrevious = false;
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
    public previousVersion(): void {

        if (this.selectedVersion > 0) {
            this.isDisabledNavigatePrevious = false;
            this.isDisabledNavigateNext = false;
            this.selectedVersion--;
            this.SelectJournalVersion();

        }
        else {

            this.isDisabledNavigatePrevious = true;
            const m = new MessageHandler(this._snackBar);
            m.showMessage(StatusCode.OK, 'No hay más versiones para mostrar')

        }
        if (this.selectedVersion == 0) {
            this.isDisabledNavigatePrevious = true;
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


    /**
     * Returns the position of the unseen version of the journal as JournalVersion
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



}

