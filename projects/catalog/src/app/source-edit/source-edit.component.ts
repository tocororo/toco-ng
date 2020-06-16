/*
 *   Copyright (c) 2020 Universidad de Pinar del Río "Hermanos Saíz Montes de Oca"
 *   All rights reserved.
 */

import { Component, OnInit } from '@angular/core';
import { SourceTypes, Journal, Source, SourceVersion, JournalVersion, TermSource, VocabulariesInmutableNames, Term } from '@toco/tools/entities';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageHandler, StatusCode } from '@toco/tools/core';
import { MatSnackBar } from '@angular/material';
import { SourceService, TaxonomyService } from '@toco/tools/backend';
import { EnvService } from '@tocoenv/tools/env.service';

@Component({
  selector: 'toco-source-edit',
  templateUrl: './source-edit.component.html',
  styleUrls: ['./source-edit.component.scss']
})
export class SourceEditComponent implements OnInit {

  public sourceType = SourceTypes;
  public source: Source;
  public version: SourceVersion;
  public saving = false;
  public organizationUUID = null;
  constructor(
    private route: ActivatedRoute,
    private _router: Router,
    private _snackBar: MatSnackBar,
    private sourceService: SourceService,
    private taxonomyService: TaxonomyService,
    private env: EnvService,
  ) {
    if (env.extraArgs && env.extraArgs["organizationUUID"]) {
      this.organizationUUID = env.extraArgs["organizationUUID"];
    }
  }

  ngOnInit() {
    this.route.data
      .subscribe((response) => {

        // this.loading = false;
        console.log(response);

        if (response && response.resolver.status == 'success' && response.resolver.data.source) {
          let src = response.resolver.data.source;
          switch (src.source_type) {
            case this.sourceType.JOURNAL.value:
              this.source = new Journal();
              this.source.load_from_data(src);
              this.source.versions.length;
              this.version = new JournalVersion();
              this.version.source_id = this.source.id;
              this.version.data.load_from_data(this.source.data);

              break;

            default:
              this.source = new Source();
              this.source.load_from_data(src);
          }
          // initialize Journal
        }
        else {
          const m = new MessageHandler(this._snackBar);
          m.showMessage(StatusCode.serverError, response.message);
        }

      }
      );
  }

  sourceEditDone() {
    this.saving = true;
    console.log(this.version);

    this.sourceService.editSource(this.version, this.source.uuid)
      .subscribe(
        (values) => {
          console.log(values);
          this._router.navigate(['sources', this.source.uuid, 'view']);
          this.saving = false;
        },
        (err: any) => {
          console.log('error: ' + err + '.');
        },
        () => {
          console.log('complete');
        }
      );

    // this.saving = true;
    // let toReplace = -1;
    // for (let index = 0; index < this.version.data.term_sources.length; index++) {
    //   const element = this.version.data.term_sources[index];
    //   if (element.term.vocabulary_id == VocabulariesInmutableNames.INTITUTION
    //     && element.term.isNew) {
    //     toReplace = index;
    //   }
    // }
    // this.taxonomyService.newTerm(this.version.data.term_sources[toReplace].term)
    //   .subscribe(
    //     (response) => {
    //       console.log(response);
    //       let newTerm = new Term();
    //       newTerm.load_from_data(response.data.term);
    //       this.version.data.term_sources[toReplace].term_id = newTerm.id;
    //       this.sourceService.editSource(this.version, this.source.uuid)
    //         .subscribe(
    //           (values) => {
    //             console.log(values);
    //             this._router.navigate(['sources', this.source.uuid, 'view']);
    //             this.saving = false;
    //           },
    //           (err: any) => {
    //             console.log('error: ' + err + '.');
    //           },
    //           () => {
    //             console.log('complete');
    //           }
    //         );
    //     },
    //     (err: any) => {
    //       console.log('error: ' + err + '.');
    //     },
    //     () => {
    //       console.log('complete');
    //     }
    //   );
  }

  // createNewTerms() {
  //   this.version.data.term_sources.forEach((ts: TermSource, index) => {
  //     if (ts.term.isNew &&
  //         (ts.term.vocabulary_id === VocabulariesInmutableNames.INTITUTION
  //         || ts.term.vocabulary_id === VocabulariesInmutableNames.EXTRA_INSTITUTIONS)) {
  //           this.postNewTerm(index);
  //           return;
  //     }
  //   });
  // }
  // private postNewTerm(index) {
  //   this.taxonomyService.newTerm(this.version.data.term_sources[index].term)
  //     .subscribe(
  //       (response) => {
  //         console.log(response);
  //         let newTerm = new Term();
  //         newTerm.load_from_data(response.data.term);
  //         this.version.data.term_sources[index].term_id = newTerm.id;
  //         this.version.data.term_sources[index].term = newTerm;
  //         this.createNewTerms();
  //       },
  //       (err: any) => {
  //         console.log('error: ' + err + '.');
  //       },
  //       () => {
  //         console.log('complete');
  //       }
  //     );
  // }

  editCanceled() {
    this._router.navigate(['sources', this.source.uuid, 'view']);
  }
}


          // {
          //   name: 'source_type',
          //   label: 'Tipo de Revista',
          //   type: FormFieldType.select,
          //   required: true,
          //   width: '45%',
          //   value: this.journalVersion ? this.journalVersion.source_type : '',
          //   extraContent: {
          //     getOptions: () => {
          //       console.log(this.journalVersion.source_type);
          //       console.log(SourceTypes[this.journalVersion.source_type]);
          //       const opts: SelectOption[] = [
          //         {
          //           value: SourceTypes.JOURNAL.value,
          //           label: SourceTypes.JOURNAL.label,
          //         },
          //         {
          //           value: SourceTypes.STUDENT.value,
          //           label: SourceTypes.STUDENT.label,
          //         },
          //         {
          //           value: SourceTypes.POPULARIZATION.value,
          //           label: SourceTypes.POPULARIZATION.label,
          //         },
          //       ];
          //       return opts;
          //     }
          //   }
          // },
