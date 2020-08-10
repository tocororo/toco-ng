/*
 *   Copyright (c) 2020 Universidad de Pinar del Río "Hermanos Saíz Montes de Oca"
 *   All rights reserved.
 */

import { Component, OnInit } from '@angular/core';
import { MatPaginatorIntl, MatDialog, MatSnackBar } from '@angular/material';
import { Term, Journal, JournalVersion } from '@toco/tools/entities';
import { EnvService } from '@tocoenv/tools/env.service';
import { HomeService } from './home.service';
import { CatalogService } from '@toco/tools/backend';
import { DialogCatalogJournalInfoDialog } from '@toco/tools/catalog';
import { MessageHandler, StatusCode } from '@toco/tools/core';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

    public organizationUUID: string;

    public institutionsCount: number;

    public records: number;

    public sourcesCount: number;

    public lastSources: Array<Journal>;

    constructor(
        private env: EnvService,
        private service: HomeService,
        private catalogService: CatalogService,
        private _snackBar: MatSnackBar,
        public dialog: MatDialog) {
    }

    ngOnInit() {
        this.organizationUUID = this.env.extraArgs['organizationUUID'];

        this.institutionsCount = 0;
        this.records = 0;
        this.sourcesCount = 0;

        this.lastSources = new Array();

        this.service.getOrganizationInfo(this.organizationUUID).subscribe(
            response => {
                if (response && response.data && response.data.home_statics) {
                  console.log(response)
                    
                    this.institutionsCount = response.data.home_statics.institutions_count;

                    this.records = response.data.home_statics.records;

                    this.sourcesCount = response.data.home_statics.soources_count;

                    response.data.home_statics.last_sources.forEach( (j: Journal) => {
                        let jl = new Journal();
                        jl.load_from_data(j);
                        this.lastSources.push( jl );
                    });

                }
                console.log(response);
                
              },
              (error: any) => {},
              () => {}
        );
    }

    viewJournal(uuid: string): void {
        this.catalogService.getSourceByUUID(uuid).subscribe(
          response => {
            console.log(response);
            if (response.status == "success") {
              let journalVersion = new JournalVersion();
              journalVersion.load_from_data(response.data.sources);
              const dialogRef = this.dialog.open(DialogCatalogJournalInfoDialog, {
                data: {
                  journalVersion: journalVersion,
                  journalUUID: uuid
                }
              });
    
              dialogRef.afterClosed();
            } else {
              const m = new MessageHandler(this._snackBar);
              m.showMessage(
                StatusCode.serverError,
                "No fue posible encontrar la Revista"
              );
            }
          },
          error => {
            console.log("error");
          },
          () => {}
        );
      }
}
