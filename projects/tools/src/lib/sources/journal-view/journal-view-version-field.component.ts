/*
 *   Copyright (c) 2020 Universidad de Pinar del Río "Hermanos Saíz Montes de Oca"
 *   All rights reserved.
 */

import { Component, OnInit, Input } from '@angular/core';
import { Journal, JournalData, IdentifierSchemas } from '@toco/tools/entities';
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

    @Input() public editingJournal: JournalData;

    @Input() public currentJournal: JournalData;

    @Input() public type: number;

    public journalDataType = JournalDataType;
    public IdentifierSchemas = IdentifierSchemas;

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
                case JournalDataType.issnP:
                  concat ?
                  this.editingJournal.setIdentifierValue(
                    IdentifierSchemas.pissn,
                      this.editingJournal.getIdentifierValue(IdentifierSchemas.pissn) +
                      ' ' +
                      this.currentJournal.getIdentifierValue(IdentifierSchemas.pissn)) :
                  this.editingJournal.setIdentifierValue(
                    IdentifierSchemas.pissn,
                    this.currentJournal.getIdentifierValue(IdentifierSchemas.pissn));
                  break;
                case JournalDataType.issnE:
                concat ?
                    this.editingJournal.setIdentifierValue(
                      IdentifierSchemas.eissn,
                        this.editingJournal.getIdentifierValue(IdentifierSchemas.eissn) +
                        ' ' +
                        this.currentJournal.getIdentifierValue(IdentifierSchemas.eissn)) :
                    this.editingJournal.setIdentifierValue(
                      IdentifierSchemas.eissn,
                      this.currentJournal.getIdentifierValue(IdentifierSchemas.eissn));
                break;
            case JournalDataType.issnL:
                concat ?
                this.editingJournal.setIdentifierValue(
                  IdentifierSchemas.lissn,
                    this.editingJournal.getIdentifierValue(IdentifierSchemas.lissn) +
                    ' ' +
                    this.currentJournal.getIdentifierValue(IdentifierSchemas.lissn)) :
                this.editingJournal.setIdentifierValue(
                  IdentifierSchemas.lissn,
                  this.currentJournal.getIdentifierValue(IdentifierSchemas.lissn));
                break;
                case JournalDataType.rnpsP:
                  concat ?
                  this.editingJournal.setIdentifierValue(
                    IdentifierSchemas.prnps,
                      this.editingJournal.getIdentifierValue(IdentifierSchemas.prnps) +
                      ' ' +
                      this.currentJournal.getIdentifierValue(IdentifierSchemas.prnps)) :
                  this.editingJournal.setIdentifierValue(
                    IdentifierSchemas.prnps,
                    this.currentJournal.getIdentifierValue(IdentifierSchemas.prnps));
                  break;
              case JournalDataType.rnpsE:
                  concat ?
                  this.editingJournal.setIdentifierValue(
                    IdentifierSchemas.ernps,
                      this.editingJournal.getIdentifierValue(IdentifierSchemas.ernps) +
                      ' ' +
                      this.currentJournal.getIdentifierValue(IdentifierSchemas.ernps)) :
                  this.editingJournal.setIdentifierValue(
                    IdentifierSchemas.ernps,
                    this.currentJournal.getIdentifierValue(IdentifierSchemas.ernps));
                  break;
            case JournalDataType.end_year:
                concat ?
                    this.editingJournal.end_year += ' ' + this.currentJournal.end_year :
                    this.editingJournal.end_year = this.currentJournal.end_year;
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
                this.editingJournal.setIdentifierValue(
                  IdentifierSchemas.url,
                    this.editingJournal.getIdentifierValue(IdentifierSchemas.url) +
                    ' ' +
                    this.currentJournal.getIdentifierValue(IdentifierSchemas.url)) :
                this.editingJournal.setIdentifierValue(
                  IdentifierSchemas.url,
                  this.currentJournal.getIdentifierValue(IdentifierSchemas.url));
                break;
        }
    }


}
