import { Component, OnInit, Input } from '@angular/core';
import { Journal, JournalVersion } from '@toco/tools/entities';
import { JournalDataType } from './journal-view.component';


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

    @Input() public editingJournal: JournalVersion;

    @Input() public currentJournal: JournalVersion;

    @Input() public type: number;

    public journalDataType = JournalDataType;

    constructor() {

    }

    ngOnInit(): void {
        if (this.editingJournal == undefined) this.editingJournal = new JournalVersion()

        if (this.currentJournal == undefined) this.currentJournal = new JournalVersion();

        if (this.type == undefined) this.type = JournalDataType.default;
    }

    /**
 * Replaces a `Journal` property by a equal property in `JournalVersion`.
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
            case JournalDataType.issnE:
                concat ?
                    this.editingJournal.data.issn.e += ' ' + this.currentJournal.data.issn.e :
                    this.editingJournal.data.issn.e = this.currentJournal.data.issn.e;
                break;
            case JournalDataType.issnL:
                concat ?
                    this.editingJournal.data.issn.l += ' ' + this.currentJournal.data.issn.l :
                    this.editingJournal.data.issn.l = this.currentJournal.data.issn.l;
                break;
            case JournalDataType.end_year:
                concat ?
                    this.editingJournal.data.end_year += ' ' + this.currentJournal.data.end_year :
                    this.editingJournal.data.end_year = this.currentJournal.data.end_year;
                break;
            case JournalDataType.issnP:
                concat ?
                    this.editingJournal.data.issn.p += ' ' + this.currentJournal.data.issn.p :
                    this.editingJournal.data.issn.p = this.currentJournal.data.issn.p;
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
            case JournalDataType.rnps:
                concat ?
                    this.editingJournal.data.rnps += ' ' + this.currentJournal.data.rnps :
                    this.editingJournal.data.rnps = this.currentJournal.data.rnps;
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
                    this.editingJournal.data.url += ' ' + this.currentJournal.data.url :
                    this.editingJournal.data.url = this.currentJournal.data.url;
                break;
        }
    }


}
