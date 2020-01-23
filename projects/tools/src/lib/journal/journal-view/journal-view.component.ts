
import { Component, OnInit, OnChanges } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { MetadataService, MessageHandler, StatusCode } from '@toco/tools/core';
import { Journal } from '@toco/tools/entities';
import { EnvService } from '@tocoenv/tools/env.service';
import { MatSnackBar } from '@angular/material';

@Component({
    selector: 'toco-journal-view',
    templateUrl: './journal-view.component.html',
    styleUrls: ['./journal-view.component.scss']
})
export class JournalViewComponent implements OnInit, OnChanges {

    constructor(private route: ActivatedRoute, private metadata: MetadataService, private env: EnvService, private _snackBar: MatSnackBar)
    { }

    journal: Journal;
    journalVersion: Journal [];

    loading = true;

    defaultLogo = this.env.sceibaHost+'static/favicon.ico'

    ngOnInit() {
        this.route.data
        .subscribe((response) => {

            this.loading = false;
            console.log(response)
            if (response.journal.status == 'success'){
                this.journal = new Journal();

                this.journal.load_from_data(response.journal.data.source);

                if (response.journal.data.source.versions){
                    this.journalVersion = response.journal.data.source.versions;
                }

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
