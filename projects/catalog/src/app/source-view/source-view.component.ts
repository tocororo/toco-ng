import { Component, OnInit, Inject } from '@angular/core';
import { SourceTypes, Journal, Source, SourceVersion, Response, ResponseStatus, JournalVersion } from '@toco/tools/entities';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageHandler, StatusCode } from '@toco/tools/core';
import { MatSnackBar, MAT_DIALOG_DATA, MatDialogRef, MatDialog } from '@angular/material';
import { SourceService } from '@toco/tools/backend';
import { of } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Component({
  selector: 'toco-source-view',
  templateUrl: './source-view.component.html',
  styleUrls: ['./source-view.component.scss']
})
export class SourceViewComponent implements OnInit {

  public sourceType = SourceTypes;
  public source: Source;
  public editingSource: SourceVersion;
  public dialogCommentText = '';
  public saving = false;
  constructor(
    private route: ActivatedRoute,
    private _router: Router,
    private _snackBar: MatSnackBar,
    public dialog: MatDialog,
    private _sourceService: SourceService,
  ) { }

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

              this.editingSource = new JournalVersion();
              this.editingSource.load_from_data(this.source.data)
              break;

            default:
              this.source = new Source();
              this.source.load_from_data(src);
              this.editingSource = new SourceVersion();
          }
          this._load_source_version();
          // initialize Journal
        }
        else {
          const m = new MessageHandler(this._snackBar);
          m.showMessage(StatusCode.serverError, response.message);
        }

      }
      );
  }
  private _load_source_version() {
    this.source.versions.forEach((version: SourceVersion, index: number) => {
      // check if has versions to view and return that position
      if (version.is_current) {
        switch (this.source.source_type) {
          case this.sourceType.JOURNAL.value:
            this.editingSource = new JournalVersion();
            break;

          default:
            this.editingSource = new SourceVersion();
        }
        this.editingSource.load_from_data(version);
      }
    });
  }
  public saveEditingVersion() {
    const dialogRef = this.dialog.open(SourceViewSaveDialog, {
      width: '250px',
      data: { comment: this.dialogCommentText, accept: false }
    });
    console.log(this.editingSource);

    dialogRef.afterClosed().subscribe(
      result => {
        console.log('The dialog was closed');
        console.log(dialogRef.getState());
        console.log(result);

        if (result.accept) {
          this.dialogCommentText = result.comment;
          this.editingSource.comment = this.dialogCommentText;
          this.saving = true;
          this._sourceService.editSource(this.editingSource, this.source.uuid)
            .subscribe(
              (res: Response<any>) => {
                console.log(res);
                this.saving = false;
                const m = new MessageHandler(this._snackBar);
                if (res.status == ResponseStatus.SUCCESS && res.data.source) {
                  this.source.load_from_data(res.data.source);
                  // this.ngOnInit();
                  m.showMessage(StatusCode.OK, "Guardado con éxito");
                } else {
                  m.showMessage(StatusCode.serverError, res.message);
                }


              },
              (error: any) => {
                console.log(error);
                return of(null);
              },
              () => {

              }
            );
        }

      },
      (error: any) => {
        console.log(error);
        return of(null);
      },
      () => {

      }
    );
  }

  public editVersion(): void {
    this._router.navigate(['sources', this.source.uuid, 'edit' ]);
  }

  /**
   * approve
   */
  public approve() {
    this._sourceService.makeSourceAsApproved(this.source.uuid)
      .pipe(
        catchError(err => {
          console.log(err);
          return of(null);
        })
      )
      .subscribe((res: Response<any>) => {
        console.log(res);
        const m = new MessageHandler(this._snackBar);
        m.showMessage(StatusCode.OK, res.message);

      });
  }

}


@Component({
  selector: 'toco-journal-view-save-dialog',
  template: `
      <h1 mat-dialog-title>Guardar cambios</h1>
      <div mat-dialog-content>
      
      <mat-form-field>
          <mat-label>Comentario extra</mat-label>
          <textarea matInput [(ngModel)]="data.comment"> </textarea>
      </mat-form-field>
      </div>
      <div mat-dialog-actions>
      <button mat-button (click)="onNoClick()">Cancelar</button>
      <button mat-button [mat-dialog-close]="data" cdkFocusInitial (click)="data.accept=true">Guardar</button>
      </div>
  `
})
export class SourceViewSaveDialog {

  constructor(
    public dialogRef: MatDialogRef<SourceViewSaveDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  onNoClick(): void {
    this.data.accept = false;
    this.dialogRef.close();
  }
}