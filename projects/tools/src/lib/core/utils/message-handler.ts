import { MatSnackBar } from '@angular/material/snack-bar';
import { Component, Input, Inject } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';

export enum HandlerComponent {
  snackBar = 'snackBar',
  dialog = 'dialog',
}

export enum StatusCode {
  OK = 200,
  serverError = 500,
  notFound = 400
}


@Component({
  selector: 'toco-dialog-message',
  template: '<h2 mat-dialog-title>{{ data.title }}</h2> <mat-dialog-content> {{ data.content }} </mat-dialog-content> <mat-dialog-actions align="end"><button mat-button mat-dialog-close>OK</button> </mat-dialog-actions>',
})
export class DialogContentComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: any) { }
}

export class MessageHandler {

  constructor(private _snackBar?: MatSnackBar, public dialog?: MatDialog) { }

  showMessage(status: StatusCode, message?: string, component?: HandlerComponent, tilte?: string , width?: string ) {
    switch (status) {
      case StatusCode.serverError:
        this.componentHandler(message ? message : 'No se pudo conectar al servidor', component, tilte, width);
        break;
      case StatusCode.notFound:
        this.componentHandler(message ? message : 'Operación extraviada, no se pudo realizar', component, tilte, width);
        break;
      default:
        this.componentHandler(message ? message : 'Operación realizada con éxito', component, tilte, width);
        break;
    }
  }

  private componentHandler(message: string, handlercomponent?: HandlerComponent, tilte?: string , width: string = '300px' ): void {
    switch (handlercomponent) {
      case HandlerComponent.dialog:
        this.dialog.open(DialogContentComponent, {
          width: width,
          data: {title: tilte, content: message}
        });
        break;

      default:
        this._snackBar.open(message, null, {
          duration: 5000,
          verticalPosition: 'bottom',
        });
        break;
    }
  }

}
