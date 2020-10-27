import { Component, OnInit, Input } from '@angular/core';
import { of as observableOf, timer, Subscription, PartialObserver } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material';

import { NotificationService } from '../../backend/public-api';
import { MessageHandler, StatusCode } from '../../core/public-api';
import { OAuthStorage } from 'angular-oauth2-oidc';

@Component({
    selector: 'toco-notification-button',
    templateUrl: './notification-button.component.html',
    styleUrls: ['./notification-button.component.scss']
})
export class NotificationButtonComponent implements OnInit {

    @Input() public color: string;

    @Input() public buttonType: string;

    private count: number;
    public notifications : Array<NotificationInfo>;

    private timerSuscription: Subscription = null;
    private timerObserver: PartialObserver<number> = {
        next: (_) => {

            if (this.oauthStorage.getItem('access_token')){
                this.service.getNotificationsList(5,0).pipe(
                    catchError(error => {
                        const m = new MessageHandler(this._snackBar);
                        m.showMessage(StatusCode.serverError, error.message);
                        return observableOf(null);
                    })
                )
                .subscribe(response => {

                    if (response && response.status == "success"){
                        this.count = response.data.notifications.total_not_view;
                        const arr : NotificationInfo[] = response.data.notifications.data;
                        this.notifications = arr;
                    }
                    else if(response){
                        const m = new MessageHandler(this._snackBar);
                        m.showMessage(StatusCode.serverError, response.message);
                    } else {
                        const m = new MessageHandler(this._snackBar);
                        m.showMessage(StatusCode.serverError, 'Notificaciones no encontradas');
                    }
                });
            }
        },

        error: (err: any) => {
            console.log('The observable got an error notification: ' + err + '.');
        },

        complete: () => {
            console.log('The observable got a complete notification.');
        }
    };

    constructor(private service: NotificationService, private _snackBar: MatSnackBar, private oauthStorage: OAuthStorage) { }

    ngOnInit() {
        // Emits, one every second (90000ms), starting after 0 seconds
        this.timerSuscription = timer(0, 900000).subscribe(this.timerObserver);

        if (this.color == undefined) this.color = "primary";

        if (this.buttonType == undefined) this.buttonType = "mat-mini-fab";
    }

    notificationsCount(){
      if(this.count == 0)
        return '';
      if (this.count > 10)
            return '+10';
        return this.count;
    }

}
export class NotificationInfo{
    emiter: string;
    description: string;
    classification: string;
    viewed: boolean;
    id: number;
}
