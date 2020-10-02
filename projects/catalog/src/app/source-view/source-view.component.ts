import { Component, OnInit, Inject } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import {
  MatSnackBar,
  MAT_DIALOG_DATA,
  MatDialogRef,
  MatDialog,
} from "@angular/material";
import { of } from "rxjs";
import { catchError } from "rxjs/operators";

import {
  MessageHandler,
  StatusCode,
  Response,
  ResponseStatus, HandlerComponent
} from "@toco/tools/core";
import {
  SourceTypes,
  Journal,
  Source,
  SourceVersion,
  JournalVersion,
  Hit,
  SourceData,
  JournalData, SourceStatus
} from "@toco/tools/entities";
import { SourceService } from "@toco/tools/backend";

@Component({
  selector: "toco-source-view",
  templateUrl: "./source-view.component.html",
  styleUrls: ["./source-view.component.scss"],
})
export class SourceViewComponent implements OnInit {
  public sourceType = SourceTypes;


  public editingVersion: SourceVersion;
  public versions: Array<SourceVersion>;

  public dialogCommentText = "";
  public saving = false;
  public allows = '';

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
        console.log("VIEW SOURCE")
        console.log(response);
        try {
          let src = response.source.data.source.record.metadata;
          this.allows = response.source.data.source.allows;
          switch (src.source_type) {
            case this.sourceType.JOURNAL.value:
              this.editingVersion = new JournalVersion();
              this.editingVersion.source_uuid = src.id;
              this.editingVersion.data.deepcopy(src);
              break;

            default:
              this.editingVersion = new SourceVersion();
              this.editingVersion.source_uuid = src.id;
              this.editingVersion.data.deepcopy(src);
          }
          this._load_source_version();
          // initialize Journal
        } catch (error) {
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
  private _load_source_version() {
    console.log("LOAD SOURCE VERSION...");
    this.saving = true;
    this._sourceService.getSourceVersions(this.editingVersion.source_uuid).subscribe(
      (response) => {
        console.log(response);
        if (response.status == ResponseStatus.SUCCESS){
          console.log(response);

          this.versions = response.data.versions;
          // this.versions.forEach((element) => {
          //   if (element.is_current) {
          //     switch (this.source.source_type) {
          //       case this.sourceType.JOURNAL.value:
          //         this.editingVersion = new JournalVersion();
          //         break;
          //       default:
          //         this.editingVersion = new SourceVersion();
          //     }
          //     this.editingVersion.deepcopy(element);
          //   }
          // });
          this.saving = false;
        }
      },
      (error) => {
        console.log("error");
      },
      () => {}
    );
  }
  public saveEditingVersion() {
    const dialogRef = this.dialog.open(SourceViewSaveDialog, {
      data: { comment: this.dialogCommentText, accept: false },
    });
    console.log(this.editingVersion);

    dialogRef.afterClosed().subscribe(
      (result) => {
        console.log("The dialog was closed");
        console.log(dialogRef.getState());
        console.log(result);

        if (result && result.accept) {
          this.dialogCommentText = result.comment;
          this.editingVersion.comment = this.dialogCommentText;
          this.saving = true;
          this._sourceService
            .editSource(this.editingVersion, this.editingVersion.source_uuid)
            .subscribe(
              (res: Response<any>) => {
                console.log(res);
                this.saving = false;
                const m = new MessageHandler(this._snackBar);
                if (res.status == ResponseStatus.SUCCESS && res.data.source) {
                  m.showMessage(
                    StatusCode.OK,
                    'Guardada con éxito',
                    HandlerComponent.dialog,
                    'Revisión Actual'
                  );
                  this.ngOnInit();
                  // this._router.navigate(['sources', this.editingVersion.source_uuid, 'view']);
                  // this.editingVersion.data.deepcopy(res.data.source);
                  // this._load_source_version();
                  // m.showMessage(
                  //   StatusCode.OK,
                  //   'Guardada con éxito',
                  //   HandlerComponent.dialog,
                  //   'Revisión Actual'
                  // );
                  // m.dialog().showMessage(StatusCode.OK, "Guardado con éxito");
                } else {
                  m.showMessage(
                    StatusCode.serverError,
                    res.message,
                    HandlerComponent.dialog,
                    'Revisión Actual'
                  );
                  // m.showMessage(StatusCode.serverError, res.message);
                }
              },
              (error: any) => {
                console.log(error);
                return of(null);
              },
              () => {}
            );
        }
      },
      (error: any) => {
        console.log(error);
        return of(null);
      },
      () => {}
    );
  }

  public editVersion(): void {
    this._router.navigate(["sources", this.editingVersion.source_uuid, "edit"]);
  }


  public publishEditingVersion() {
    const dialogRef = this.dialog.open(SourceViewSaveDialog, {
      data: { comment: this.dialogCommentText, accept: false },
    });
    console.log(this.editingVersion);

    dialogRef.afterClosed().subscribe(
      (result) => {
        console.log("The dialog was closed");
        console.log(dialogRef.getState());
        console.log(result);

        if (result && result.accept) {
          this.dialogCommentText = result.comment;
          this.editingVersion.comment = this.dialogCommentText;
          this.saving = true;
          this._sourceService
            .makeSourceAsApproved(this.editingVersion, this.editingVersion.source_uuid)
            .subscribe(
              (res: Response<any>) => {
                console.log(res);
                this.saving = false;
                const m = new MessageHandler(null, this.dialog);
                if (res.status == ResponseStatus.SUCCESS && res.data.source) {
                  m.showMessage(
                    StatusCode.OK,
                    'Guardada con éxito',
                    HandlerComponent.dialog,
                    'Revisión Actual'
                  );
                  this.ngOnInit();
                  // this._router.navigate(['sources', this.editingVersion.source_uuid, 'view']);
                  // this.editingVersion.data.deepcopy(res.data.source);
                  // this._load_source_version();
                  // m.showMessage(
                  //   StatusCode.OK,
                  //   'Guardada con éxito',
                  //   HandlerComponent.dialog,
                  //   'Revisión Actual'
                  // );
                  // m.dialog().showMessage(StatusCode.OK, "Guardado con éxito");
                } else {
                  m.showMessage(
                    StatusCode.serverError,
                    res.message,
                    HandlerComponent.dialog,
                    'Revisión Actual'
                  );
                  // m.showMessage(StatusCode.serverError, res.message);
                }
              },
              (error: any) => {
                console.log(error);
                return of(null);
              },
              () => {}
            );
        }
      },
      (error: any) => {
        console.log(error);
        return of(null);
      },
      () => {}
    );
  }

  // /**
  //  * approve
  //  */
  // public approve() {
  //   this._sourceService
  //     .makeSourceAsApproved(this.editingVersion, this.editingVersion.source_uuid)
  //     .pipe(
  //       catchError((err) => {
  //         console.log(err);
  //         return of(null);
  //       })
  //     )
  //     .subscribe((res: Response<any>) => {
  //       console.log(res);
  //       const m = new MessageHandler(this._snackBar);
  //       m.showMessage(StatusCode.OK, res.message);
  //     });
  // }

  public desapprove(){

  }

  public is_approved(){
    return this.editingVersion.data.source_status == SourceStatus.APPROVED.value;
  }

  public can_publish(){
    return this.allows == 'publish';
  }

}

@Component({
  selector: "toco-journal-view-save-dialog",
  template: `
    <h1 mat-dialog-title>Guardar cambios</h1>
    <div mat-dialog-content>
      <mat-form-field>
        <mat-label>Comentario sobre esta revisión</mat-label>
        <textarea matInput [(ngModel)]="data.comment"> </textarea>
      </mat-form-field>
    </div>
    <div mat-dialog-actions>
      <button mat-button (click)="onNoClick()">Cancelar</button>
      <button
        mat-button
        [mat-dialog-close]="data"
        cdkFocusInitial
        (click)="data.accept = true"
      >
        Guardar
      </button>
    </div>
  `,
})
export class SourceViewSaveDialog {
  constructor(
    public dialogRef: MatDialogRef<SourceViewSaveDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  onNoClick(): void {
    this.data.accept = false;
    this.dialogRef.close();
  }
}
