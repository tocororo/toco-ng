import { Component, OnInit } from '@angular/core';
import { SourceTypes, Journal, Source, SourceVersion, JournalVersion } from '@toco/tools/entities';
import { ActivatedRoute } from '@angular/router';
import { MessageHandler, StatusCode } from '@toco/tools/core';
import { MatSnackBar } from '@angular/material';
import { SourceService } from '@toco/tools/backend';

@Component({
  selector: 'toco-source-edit',
  templateUrl: './source-edit.component.html',
  styleUrls: ['./source-edit.component.scss']
})
export class SourceEditComponent implements OnInit {

  public sourceType = SourceTypes;
  public source: Source;
  public version: SourceVersion;
  constructor(
    private route: ActivatedRoute,
    private _snackBar: MatSnackBar, 
    private sourceService: SourceService
  ) { }

  ngOnInit() {
    this.route.data
      .subscribe((response) => {

        // this.loading = false;
        console.log(response);
        

        if (response && response.resolver.status == 'success' && response.resolver.data.source ) {
          let src = response.resolver.data.source;
          switch (src.source_type) {
            case this.sourceType.JOURNAL.value:
              this.source = new Journal();
              this.source.load_from_data(src);
              this.source.versions.length
              this.version = new JournalVersion();
              this.version.source_id = this.source.id;
              this.version.data = this.source.data;

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

  sourceEditDone(){
    console.log(this.version);
    this.sourceService.editSource(this.version, this.source.uuid)
      .subscribe(
        ( values ) => {
          console.log(values);
        },
        (err: any) => {
            console.log('error: ' + err + '.');
        },
        () => {
          console.log('complete');
        }
      )
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