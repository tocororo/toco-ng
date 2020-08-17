/*
 *   Copyright (c) 2020 Universidad de Pinar del Río "Hermanos Saíz Montes de Oca"
 *   All rights reserved.
 */

import { Component, OnInit, Input } from '@angular/core';
import { Journal, JournalData } from '@toco/tools/entities';
import { JournalDataType } from './journal-view.component';


/**
* This component share the same scss that `JournalViewComponent`.
* His goal, handle the actions and how show a specific data of a `JournalData`
*/
@Component({
    selector: 'toco-journal-view-field',
    templateUrl: './journal-view-field.component.html',
    styleUrls: ['./journal-view.component.scss']
})
export class JournalViewFieldComponent implements OnInit {

    @Input() public editingJournal: JournalData;

    @Input() public currentJournal: JournalData;

    @Input() public type: number;

    public journalDataType = JournalDataType;

    constructor() {

    }

    ngOnInit(): void {
        if (this.editingJournal == undefined) this.editingJournal = new JournalData()

        if (this.currentJournal == undefined) this.currentJournal = new JournalData();

        if (this.type == undefined) this.type = JournalDataType.default;
    }

    /**
 * Replaces a `Journal` property by a equal property in `JournalData`.
 * @param type is a `JournalDataType` enum, that means, `type` has all properties of a `Journal` enumerated as identifyer.
 * @param concat is a `boolean`, by default in `false`. If his value is `true` means the fields will be concated and not replaced.
 * @NOTE The `terms` of a `Journal` can NOT replace because will be the same information and not have sense, only we can merge.
 */
    public replace(type: number, concat: boolean = false) {
        switch (type) {
            case JournalDataType.description:
                concat ?
                    this.editingJournal.description += ' ' + this.currentJournal.description :
                    this.editingJournal.description = this.currentJournal.description;
                break;
            case JournalDataType.email:
                concat ?
                    this.editingJournal.email += ' ' + this.currentJournal.email :
                    this.editingJournal.email = this.currentJournal.email;
                break;
            case JournalDataType.end_year:
                concat ?
                    this.editingJournal.end_year += ' ' + this.currentJournal.end_year :
                    this.editingJournal.end_year = this.currentJournal.end_year;
                break;
            case JournalDataType.facebook:
                concat ?
                    this.editingJournal.socialNetworks.facebook += ' ' + this.currentJournal.socialNetworks.facebook :
                    this.editingJournal.socialNetworks.facebook = this.currentJournal.socialNetworks.facebook;
                break;
            case JournalDataType.frequency:
                concat ?
                    this.editingJournal.frequency += ' ' + this.currentJournal.frequency :
                    this.editingJournal.frequency = this.currentJournal.frequency;
                break;
            case JournalDataType.issnE:
                concat ?
                    this.editingJournal.issn.e += ' ' + this.currentJournal.issn.e :
                    this.editingJournal.issn.e = this.currentJournal.issn.e;
                break;
            case JournalDataType.issnL:
                concat ?
                    this.editingJournal.issn.l += ' ' + this.currentJournal.issn.l :
                    this.editingJournal.issn.l = this.currentJournal.issn.l;
                break;
            case JournalDataType.end_year:
                concat ?
                    this.editingJournal.end_year += ' ' + this.currentJournal.end_year :
                    this.editingJournal.end_year = this.currentJournal.end_year;
                break;
            case JournalDataType.issnP:
                concat ?
                    this.editingJournal.issn.p += ' ' + this.currentJournal.issn.p :
                    this.editingJournal.issn.p = this.currentJournal.issn.p;
                break;
            case JournalDataType.linkedin:
                concat ?
                    this.editingJournal.socialNetworks.linkedin += ' ' + this.currentJournal.socialNetworks.linkedin :
                    this.editingJournal.socialNetworks.linkedin = this.currentJournal.socialNetworks.linkedin;
                break;
            case JournalDataType.logo:
                concat ?
                    this.editingJournal.logo += ' ' + this.currentJournal.logo :
                    this.editingJournal.logo = this.currentJournal.logo;
                break;
            case JournalDataType.purpose:
                concat ?
                    this.editingJournal.purpose += ' ' + this.currentJournal.purpose :
                    this.editingJournal.purpose = this.currentJournal.purpose;
                break;
            case JournalDataType.rnpsP:
                concat ?
                    this.editingJournal.rnps.p += ' ' + this.currentJournal.rnps.p :
                    this.editingJournal.rnps.p = this.currentJournal.rnps.p;
                break;
            case JournalDataType.rnpsE:
                concat ?
                    this.editingJournal.rnps.e += ' ' + this.currentJournal.rnps.e :
                    this.editingJournal.rnps.e = this.currentJournal.rnps.e;
                break;
            case JournalDataType.seriadas_cubanas:
                concat ?
                    this.editingJournal.seriadas_cubanas += ' ' + this.currentJournal.seriadas_cubanas :
                    this.editingJournal.seriadas_cubanas = this.currentJournal.seriadas_cubanas;
                break;
            case JournalDataType.shortname:
                concat ?
                    this.editingJournal.shortname += ' ' + this.currentJournal.shortname :
                    this.editingJournal.shortname = this.currentJournal.shortname;
                break;
            case JournalDataType.start_year:
                concat ?
                    this.editingJournal.start_year += ' ' + this.currentJournal.start_year :
                    this.editingJournal.start_year = this.currentJournal.start_year;
                break;
            case JournalDataType.subtitle:
                concat ?
                    this.editingJournal.subtitle += ' ' + this.currentJournal.subtitle :
                    this.editingJournal.subtitle = this.currentJournal.subtitle;
                break;
            case JournalDataType.title:
                concat ?
                    this.editingJournal.title += ' ' + this.currentJournal.title :
                    this.editingJournal.title = this.currentJournal.title;
                break;
            case JournalDataType.twitter:
                concat ?
                    this.editingJournal.socialNetworks.twitter += ' ' + this.currentJournal.socialNetworks.twitter :
                    this.editingJournal.socialNetworks.twitter = this.currentJournal.socialNetworks.twitter;
                break;
            case JournalDataType.url:
                concat ?
                    this.editingJournal.url += ' ' + this.currentJournal.url :
                    this.editingJournal.url = this.currentJournal.url;
                break;
        }
    }


}
