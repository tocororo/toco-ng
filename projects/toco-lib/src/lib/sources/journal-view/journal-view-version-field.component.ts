/*
 *   Copyright (c) 2020 Universidad de Pinar del Río "Hermanos Saíz Montes de Oca"
 *   All rights reserved.
 */

import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Journal, JournalData, IdentifierSchemas, JournalVersion } from '../../entities/public-api';
import { JournalDataType } from './journal-view.component';


/**
* This component share the same scss that `JournalViewComponent`.
* His goal, handle the actions and how show a specific data of a `JournalData`
*/
@Component({
    selector: 'toco-journal-view-version-field',
    templateUrl: './journal-view-version-field.component.html',
    styleUrls: ['./journal-view.component.scss']
})
export class JournalViewFieldComponent implements OnInit {

    @Input() public editingJournal: JournalVersion;

    @Input() public currentJournal: JournalVersion;

    @Input() public type: number;

    @Output()
    editingJournalChange = new EventEmitter<JournalVersion>();

    
    public journalDataType = JournalDataType;
    public IdentifierSchemas = IdentifierSchemas;

    constructor() {

    }

    ngOnInit(): void {
        if (this.editingJournal.data == undefined) this.editingJournal.data = new JournalData()

        if (this.currentJournal.data == undefined) this.currentJournal.data = new JournalData();

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
                    this.editingJournal.data.description += ' ' + this.currentJournal.data.description :
                    this.editingJournal.data.description = this.currentJournal.data.description;
                break;
            case JournalDataType.email:
                concat ?
                    this.editingJournal.data.email += ' ' + this.currentJournal.data.email :
                    this.editingJournal.data.email = this.currentJournal.data.email;
                break;
            case JournalDataType.end_year:
                concat ?
                    this.editingJournal.data.end_year += ' ' + this.currentJournal.data.end_year :
                    this.editingJournal.data.end_year = this.currentJournal.data.end_year;
                break;
            case JournalDataType.facebook:
                concat ?
                    this.editingJournal.data.socialNetworks.facebook += ' ' + this.currentJournal.data.socialNetworks.facebook :
                    this.editingJournal.data.socialNetworks.facebook = this.currentJournal.data.socialNetworks.facebook;
                break;
            case JournalDataType.frequency:
                concat ?
                    this.editingJournal.data.frequency += ' ' + this.currentJournal.data.frequency :
                    this.editingJournal.data.frequency = this.currentJournal.data.frequency;
                break;
                case JournalDataType.issnP:
                  concat ?
                  this.editingJournal.data.setIdentifierValue(
                    IdentifierSchemas.pissn,
                      this.editingJournal.data.getIdentifierValue(IdentifierSchemas.pissn) +
                      ' ' +
                      this.currentJournal.data.getIdentifierValue(IdentifierSchemas.pissn)) :
                  this.editingJournal.data.setIdentifierValue(
                    IdentifierSchemas.pissn,
                    this.currentJournal.data.getIdentifierValue(IdentifierSchemas.pissn));
                  break;
                case JournalDataType.issnE:
                concat ?
                    this.editingJournal.data.setIdentifierValue(
                      IdentifierSchemas.eissn,
                        this.editingJournal.data.getIdentifierValue(IdentifierSchemas.eissn) +
                        ' ' +
                        this.currentJournal.data.getIdentifierValue(IdentifierSchemas.eissn)) :
                    this.editingJournal.data.setIdentifierValue(
                      IdentifierSchemas.eissn,
                      this.currentJournal.data.getIdentifierValue(IdentifierSchemas.eissn));
                break;
            case JournalDataType.issnL:
                concat ?
                this.editingJournal.data.setIdentifierValue(
                  IdentifierSchemas.lissn,
                    this.editingJournal.data.getIdentifierValue(IdentifierSchemas.lissn) +
                    ' ' +
                    this.currentJournal.data.getIdentifierValue(IdentifierSchemas.lissn)) :
                this.editingJournal.data.setIdentifierValue(
                  IdentifierSchemas.lissn,
                  this.currentJournal.data.getIdentifierValue(IdentifierSchemas.lissn));
                break;
                case JournalDataType.rnpsP:
                  concat ?
                  this.editingJournal.data.setIdentifierValue(
                    IdentifierSchemas.prnps,
                      this.editingJournal.data.getIdentifierValue(IdentifierSchemas.prnps) +
                      ' ' +
                      this.currentJournal.data.getIdentifierValue(IdentifierSchemas.prnps)) :
                  this.editingJournal.data.setIdentifierValue(
                    IdentifierSchemas.prnps,
                    this.currentJournal.data.getIdentifierValue(IdentifierSchemas.prnps));
                  break;
              case JournalDataType.rnpsE:
                  concat ?
                  this.editingJournal.data.setIdentifierValue(
                    IdentifierSchemas.ernps,
                      this.editingJournal.data.getIdentifierValue(IdentifierSchemas.ernps) +
                      ' ' +
                      this.currentJournal.data.getIdentifierValue(IdentifierSchemas.ernps)) :
                  this.editingJournal.data.setIdentifierValue(
                    IdentifierSchemas.ernps,
                    this.currentJournal.data.getIdentifierValue(IdentifierSchemas.ernps));
                  break;
            case JournalDataType.end_year:
                concat ?
                    this.editingJournal.data.end_year += ' ' + this.currentJournal.data.end_year :
                    this.editingJournal.data.end_year = this.currentJournal.data.end_year;
                break;
            case JournalDataType.linkedin:
                concat ?
                    this.editingJournal.data.socialNetworks.linkedin += ' ' + this.currentJournal.data.socialNetworks.linkedin :
                    this.editingJournal.data.socialNetworks.linkedin = this.currentJournal.data.socialNetworks.linkedin;
                break;
            case JournalDataType.logo:
                concat ?
                    this.editingJournal.data.logo += ' ' + this.currentJournal.data.logo :
                    this.editingJournal.data.logo = this.currentJournal.data.logo;
                break;
            case JournalDataType.purpose:
                concat ?
                    this.editingJournal.data.purpose += ' ' + this.currentJournal.data.purpose :
                    this.editingJournal.data.purpose = this.currentJournal.data.purpose;
                break;
            case JournalDataType.seriadas_cubanas:
                concat ?
                    this.editingJournal.data.seriadas_cubanas += ' ' + this.currentJournal.data.seriadas_cubanas :
                    this.editingJournal.data.seriadas_cubanas = this.currentJournal.data.seriadas_cubanas;
                break;
            case JournalDataType.shortname:
                concat ?
                    this.editingJournal.data.shortname += ' ' + this.currentJournal.data.shortname :
                    this.editingJournal.data.shortname = this.currentJournal.data.shortname;
                break;
            case JournalDataType.start_year:
                concat ?
                    this.editingJournal.data.start_year += ' ' + this.currentJournal.data.start_year :
                    this.editingJournal.data.start_year = this.currentJournal.data.start_year;
                break;
            case JournalDataType.subtitle:
                concat ?
                    this.editingJournal.data.subtitle += ' ' + this.currentJournal.data.subtitle :
                    this.editingJournal.data.subtitle = this.currentJournal.data.subtitle;
                break;
            case JournalDataType.title:
                concat ?
                    this.editingJournal.data.title += ' ' + this.currentJournal.data.title :
                    this.editingJournal.data.title = this.currentJournal.data.title;
                break;
            case JournalDataType.twitter:
                concat ?
                    this.editingJournal.data.socialNetworks.twitter += ' ' + this.currentJournal.data.socialNetworks.twitter :
                    this.editingJournal.data.socialNetworks.twitter = this.currentJournal.data.socialNetworks.twitter;
                break;
            case JournalDataType.url:
                concat ?
                this.editingJournal.data.setIdentifierValue(
                  IdentifierSchemas.url,
                    this.editingJournal.data.getIdentifierValue(IdentifierSchemas.url) +
                    ' ' +
                    this.currentJournal.data.getIdentifierValue(IdentifierSchemas.url)) :
                this.editingJournal.data.setIdentifierValue(
                  IdentifierSchemas.url,
                  this.currentJournal.data.getIdentifierValue(IdentifierSchemas.url));
                break;
            case JournalDataType.oaiurl:
                concat ?
                this.editingJournal.data.setIdentifierValue(
                    IdentifierSchemas.oaiurl,
                    this.editingJournal.data.getIdentifierValue(IdentifierSchemas.oaiurl) +
                    ' ' +
                    this.currentJournal.data.getIdentifierValue(IdentifierSchemas.oaiurl)) :
                this.editingJournal.data.setIdentifierValue(
                    IdentifierSchemas.oaiurl,
                    this.currentJournal.data.getIdentifierValue(IdentifierSchemas.oaiurl));
                break;
        }
        this.editingJournalChange.emit(this.editingJournal);
    }


}
