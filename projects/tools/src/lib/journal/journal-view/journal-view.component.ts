
import { Component, OnInit, OnChanges } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material';

import { MetadataService, MessageHandler, StatusCode } from '@toco/tools/core';

import { Journal } from '@toco/tools/entities';

import { EnvService } from '@tocoenv/tools/env.service';
import { TaxonomyService, VocabulariesInmutableNames } from '@toco/tools/backend';

@Component({
    selector: 'toco-journal-view',
    templateUrl: './journal-view.component.html',
    styleUrls: ['./journal-view.component.scss']
})
export class JournalViewComponent implements OnInit, OnChanges {

    constructor(private route: ActivatedRoute, private metadata: MetadataService, private env: EnvService, private taxonomyService: TaxonomyService, private _snackBar: MatSnackBar)
    { }

    journal: Journal;
    vocabularies: typeof VocabulariesInmutableNames;
    loading = true;
    panelOpenState = false;

    defaultLogo = this.env.sceibaHost+'static/favicon.ico'

    ngOnInit() {
        this.vocabularies = VocabulariesInmutableNames;
        this.route.data
        .subscribe((response) => {

            this.loading = false;
            if (response.journal.status == 'success'){
                this.journal = new Journal();

                this.journal.load_from_data(response.journal.data.source);
                console.log(this.journal);

                this.metadata.setTitleDescription('Revista Científica ' + this.journal.data.title, this.journal.data.description);
            } else {
                const m = new MessageHandler(this._snackBar);
                m.showMessage(StatusCode.serverError, response.message);
            }

          });
    }

    ngOnChanges() {
        // this.metadata.setTitleDescription(this.journal.title, this.journal.description);
    }
}


// ############################################
//   hay q mostrar los terminos agrupados por vocabulario.
// ############################################