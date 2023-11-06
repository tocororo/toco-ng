import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
} from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { Params } from "@angular/router";
import { OrgDialogComponent } from "./org-dialog/org-dialog.component";

@Component({
  selector: "org-search-dialog",
  templateUrl: "./org-search-dialog.component.html",
  styleUrls: ["./org-search-dialog.component.scss"],
})
export class OrgSearchDialogComponent implements OnChanges {
  @Input() open: any;
  @Output() afterClosed = new EventEmitter<any>();
  @Input() dialogRefConfig: any;
  @Input() title: string =
    "Seleccione la organización a que pertenecen las personas a importar.";

  constructor(public dialog: MatDialog) {}

  ngOnChanges(changes: SimpleChanges) {
    const _open = changes["open"];
    // console.log(
    //   "🚀 ~ file: org-search-dialog.component.ts:22 ~ OrgSearchDialogComponent ~ ngOnChanges ~ _open:",
    //   _open
    // );
    const curOpen = _open.currentValue;
    const prevOpen = JSON.stringify(_open.previousValue);

    if (curOpen) {
      this.openDialog();
    }
  }

  filtersChange(values: Params) {
    // console.log(values.organizations);
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(OrgDialogComponent, {
      width: "95%",
      data: { title: this.title },
      ...this.dialogRefConfig,
    });

    dialogRef.afterClosed().subscribe((result) => {
      // console.log("The dialog was closed");
      this.afterClosed.emit(result);
    });
  }
}
