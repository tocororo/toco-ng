import { Component, OnInit } from '@angular/core';
import { MatSnackBar, MatDialog } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
import { SourceService } from '@toco/tools/backend';
import { MessageHandler, StatusCode } from '@toco/tools/core';
import { JournalData, JournalVersion, SourceData, SourceTypes, SourceVersion } from '@toco/tools/entities';

@Component({
  selector: 'toco-source-view-read',
  templateUrl: './source-view-read.component.html',
  styleUrls: ['./source-view-read.component.scss']
})
export class SourceViewReadComponent implements OnInit {
  public sourceType = SourceTypes;
  public source: SourceVersion;
  public editingSource: SourceVersion;
  public dialogCommentText = "";
  public saving = false;
  constructor(
    private route: ActivatedRoute,
    private _router: Router,
    private _snackBar: MatSnackBar,
    public dialog: MatDialog,
    private _sourceService: SourceService
  ) {}

  ngOnInit() {
    this.route.data.subscribe(
      (response) => {
        console.log("VIEW READ SOURCE")
        console.log(response);
        if (response.record && response.record.metadata) {
          let src = response.record.metadata;
          let data;
          switch (src.source_type) {
            case this.sourceType.JOURNAL.value:
              data = new JournalData();
              data.deepcopy(src);
              this.source = new JournalVersion();
              this.source.source_uuid = data.id;
              this.source.data.deepcopy(data);
              break;

            default:
              data = new SourceData();
              data.deepcopy(src);
              this.source = new SourceVersion();
              this.source.source_uuid = data.id;
              this.source.data.deepcopy(data);
          }
        } else {
          const m = new MessageHandler(this._snackBar);
          m.showMessage(StatusCode.serverError, response.toString());
        }
      },
      (err: any) => {
        console.log("error: " + err + ".");
      },
      () => {
        console.log("complete");
      }
    );
  }

}
