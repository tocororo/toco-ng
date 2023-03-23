import { Component, OnInit, Input } from '@angular/core';
import { of as observableOf, timer, Subscription, PartialObserver } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material/snack-bar';
import moment from 'moment';
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

    public count: number = 0;
    public notifications: Array<NotificationInfo>;
    public moment: any = moment;

    private timerSuscription: Subscription = null;
    private timerObserver: PartialObserver<number> = {
        next: (_) => {

            // if (this.oauthStorage.getItem('access_token')){
                this.service.getNotificationsList(5,0).pipe(
                    catchError(error => {
                        const m = new MessageHandler(this._snackBar);
                        m.showMessage(StatusCode.serverError, error.message);
                        return observableOf(null);
                    })
                )
                .subscribe(response => {
                    if (response && response.status === "success"){
                        this.count = response.data.total_not_view;
                        const arr: NotificationInfo[] = response.data.notifications
                          .map( n => ({...n, classification: {
                            label: n.classification,
                            color: n.classification === 'INFO' ? '#2196F3' : n.classification === 'ALERT' ? '#FF5722' : '#d32f2f'
                          }}))
                            .filter(n => !n.viewed);
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
            // }
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

class  UserNotification {
  id: string;
  name: string;
  lastname: string;
  email: string;
}

export class NotificationInfo {
  classification: { label: string, color: string };
  receiver_id: UserNotification;
  viewed: boolean;
  viewed_date: string;
  description: string;
  createdAt: string;
  emiter: UserNotification;
  app: string;
  data: {};
}
