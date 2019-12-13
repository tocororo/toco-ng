import { MatSnackBar } from "@angular/material/snack-bar";

export enum HandlerComponent{
    snackBar = 'snackBar',
    dialog = 'dialog',
}

export enum StatusCode{
    OK = 200,
    serverError = 500,
    notFound = 400
}

export class MessageHandler {
    
    constructor(private _snackBar: MatSnackBar){}

    showMessage( status: StatusCode, message?: string, component?: HandlerComponent ) {
        switch (status) {
            case StatusCode.serverError:
                    this.componentHandler( message ? message : 'No se pudo conectar al servidor', component )
                break;
            case StatusCode.notFound:
                    this.componentHandler( message ? message : 'Operación extraviada, no se pudo realizar', component )
                break;
            default:
                    this.componentHandler( message ? message : 'Operación realizada con éxito', component )
                break;
        }
    }

    private componentHandler( message: string, handlercomponent?: HandlerComponent ):void{
        switch (handlercomponent) {
            case HandlerComponent.dialog:
                console.log(message)
                break;
        
            default:
                this._snackBar.open(message, null, {
                    duration: 3000,
                    });
                break;
        }
    }

}