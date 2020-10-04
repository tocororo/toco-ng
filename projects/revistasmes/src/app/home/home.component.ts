/*
 *   Copyright (c) 2020 Universidad de Pinar del Río "Hermanos Saíz Montes de Oca"
 *   All rights reserved.
 */

import { Component, OnInit } from '@angular/core';
import { MatPaginatorIntl, MatDialog, MatSnackBar } from '@angular/material';
import { Term, Journal, JournalVersion, Organization } from '@toco/tools/entities';
import { EnvService } from '@tocoenv/tools/env.service';
import { HomeService } from './home.service';
import { CatalogService, OrganizationServiceNoAuth, SourceService, SourceServiceNoAuth} from '@toco/tools/backend';
import { MessageHandler, ResponseStatus, StatusCode } from '@toco/tools/core';
import { DialogCatalogJournalInfoDialog } from 'projects/catalog/src/app/catalog/catalog.component';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

    public topOrganizationPID: string;
    public topMainOrganization: Organization = null;

    public institutionsCount: number;

    public records: number;

    public sourcesCount: number;

    public lastSources: Array<Journal>;

    public stats = null;

    constructor(
        private env: EnvService,
        private sourceService: SourceService,
        private sourceServiceNoAuth: SourceServiceNoAuth,
        private orgService: OrganizationServiceNoAuth,
        private _snackBar: MatSnackBar,
        public dialog: MatDialog) {
    }

    ngOnInit() {

        if (this.env.extraArgs && this.env.extraArgs["topOrganizationPID"]) {
          this.topOrganizationPID = this.env.extraArgs["topOrganizationPID"];
          this.orgService.getOrganizationByPID(this.topOrganizationPID).subscribe(
            (response) => {
              // console.log(response)
              this.topMainOrganization = new Organization();
              this.topMainOrganization.deepcopy(response.metadata);
              console.log(this.topMainOrganization)
              this.init();
            },
            (error) => {
              console.log("error");
            },
            () => {}
          );
        }
        this.institutionsCount = 0;
        this.records = 0;
        this.sourcesCount = 0;

        this.lastSources = new Array();

        ;
        // this.catalogService.getSourcesOrgAggregation(this.topOrganizationPID).subscribe(
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

    init(){
      this.sourceServiceNoAuth.getSourcesStats(this.topMainOrganization.id).subscribe(
        response => {
          if(response && response.status == ResponseStatus.SUCCESS){
              this.stats = response.data.aggr;
          }
          console.log(response);
        },
        (err: any) => {
          console.log("error: " + err + ".");
        },
        () => {
          console.log("complete");
        }
      )
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
