
import { Component, Inject } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
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

/**
 * Object that is used with the `DialogContentComponent` component.
 * It contains the different data that are showed in the message.
 */
export class DialogMessageData {
    /**
     * Message title.
     */
	title: string;
    /**
     * Message content.
     */
	content: string;
}

/**
 * Object that is used with the `DialogDeleteConfirmComponent` component.
 * It contains the different data that are showed in the message.
 */
export class DialogDeleteConfirmMessageData
{
    /**
     * Article of the type to delete.
     */
	delTypeArt: string;
    /**
     * Type to delete.
     */
	delType: string;
    /**
     * Value to delete.
     */
	delValue: string;
}

/**
 * Simple dialog message.
 */
@Component({
	selector: 'toco-dialog-message',
	template: `
		<h1 mat-dialog-title>
			{{ data.title }}
		</h1>
		<mat-dialog-content> {{ data.content }} </mat-dialog-content>
		<mat-dialog-actions align="end">
			<button mat-stroked-button mat-dialog-close>OK</button>
		</mat-dialog-actions>
	`
})
export class DialogContentComponent
{
	public constructor(@Inject(MAT_DIALOG_DATA) public data: DialogMessageData)
	{ }
}

/**
 * Dialog confirm message used to delete something.
 */
@Component({
	selector: 'toco-dialog-delete-confirm',
	template: `
		<h1 mat-dialog-title>
			¿Está usted seguro que desea eliminar {{ data.delTypeArt }} <strong>{{ data.delType }}</strong>?
		</h1>
		<mat-dialog-content>
			Su valor es: <em>{{ data.delValue }}</em>
		</mat-dialog-content>
		<mat-dialog-actions align="end">
			<button mat-stroked-button mat-dialog-close color="warning">Cancelar</button>
			<button mat-stroked-button [mat-dialog-close]="true" color="warning" cdkFocusInitial>Eliminar</button>
		</mat-dialog-actions>
	`
})
export class DialogDeleteConfirmComponent
{
	public constructor(
		/*public dialogRef: MatDialogRef<DialogDeleteConfirmComponent>,*/
		@Inject(MAT_DIALOG_DATA) public data: DialogDeleteConfirmMessageData)
	{ }
}

export class MessageHandler
{
	constructor(private _snackBar?: MatSnackBar, public dialog?: MatDialog)
	{ }

	showMessage(status: StatusCode, message?: string, component?: HandlerComponent, title?: string, width?: string) {
		switch (status)
		{
			case StatusCode.serverError:
				this.componentHandler(message ? message : 'No se pudo conectar al servidor.', component, title, width);
				break;
			case StatusCode.notFound:
				this.componentHandler(message ? message : 'Operación extraviada, no se pudo realizar.', component, title, width);
				break;
			default:
				this.componentHandler(message ? message : 'Operación realizada con éxito.', component, title, width);
				break;
		}
	}

	private componentHandler(message: string, handlercomponent?: HandlerComponent, title?: string, width: string = '300px'): void {
		switch (handlercomponent)
		{
			case HandlerComponent.dialog:
				this.dialog.open(DialogContentComponent, {
					width: width,
					data: { title: title, content: message }
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
