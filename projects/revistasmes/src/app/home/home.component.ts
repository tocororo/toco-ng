/*
 *   Copyright (c) 2020 Universidad de Pinar del Río "Hermanos Saíz Montes de Oca"
 *   All rights reserved.
 */

import { Component, OnInit } from '@angular/core';
import { MatPaginatorIntl, MatDialog, MatSnackBar } from '@angular/material';
import { Term, Journal, JournalVersion } from '@toco/tools/entities';
import { EnvService } from '@tocoenv/tools/env.service';
import { HomeService } from './home.service';
import { CatalogService, SourceService, SourceServiceNoAuth} from '@toco/tools/backend';
import { MessageHandler, StatusCode } from '@toco/tools/core';
import { DialogCatalogJournalInfoDialog } from 'projects/catalog/src/app/catalog/catalog.component';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

    public mesORGAID = 'orgaid.223';

    public organizationUUID: string;

    public institutionsCount: number;

    public records: number;

    public sourcesCount: number;

    public lastSources: Array<Journal>;

    constructor(
        private env: EnvService,
        private sourceService: SourceService,
        private sourceServiceNoAuth: SourceServiceNoAuth,

        private _snackBar: MatSnackBar,
        public dialog: MatDialog) {
    }

    ngOnInit() {

        this.organizationUUID = this.env.extraArgs['organizationUUID'];

        this.institutionsCount = 0;
        this.records = 0;
        this.sourcesCount = 0;

        this.lastSources = new Array();

        this.sourceServiceNoAuth.getSourcesOrgAggregation(this.organizationUUID).subscribe(
        values => {
          console.log(values);
        },
        (err: any) => {
          console.log("error: " + err + ".");
        },
        () => {
          console.log("complete");
        }
      );
        // this.catalogService.getSourcesOrgAggregation(this.organizationUUID).subscribe(
        //     response => {
        //         if (response && response.data && response.data.home_statics) {
        //           console.log(response)

        //             // this.institutionsCount = response.data.home_statics.institutions_count;

        //             // this.records = response.data.home_statics.records;

        //             // this.sourcesCount = response.data.home_statics.soources_count;

        //             // response.data.home_statics.last_sources.forEach( (j: Journal) => {
        //             //     let jl = new Journal();
        //             //     jl.deepcopy(j);
        //             //     this.lastSources.push( jl );
        //             // });

        //         }
        //         console.log(response);

        //       },
        //       (error: any) => {},
        //       () => {}
        // );
    }

    viewJournal(uuid: string): void {
        this.sourceServiceNoAuth.getSourceByUUID(uuid).subscribe(
          response => {
            console.log(response);
            // if (response.status == "success") {
            //   let journalVersion = new JournalVersion();
            //   journalVersion.deepcopy(response.data.sources);
            //   const dialogRef = this.dialog.open(DialogCatalogJournalInfoDialog, {
            //     data: {
            //       journalVersion: journalVersion,
            //       journalUUID: uuid
            //     }
            //   });

            //   dialogRef.afterClosed();
            // } else {
            //   const m = new MessageHandler(this._snackBar);
            //   m.showMessage(
            //     StatusCode.serverError,
            //     "No fue posible encontrar la Revista"
            //   );
            // }
          },
          error => {
            console.log("error");
          },
          () => {}
        );
      }
}
