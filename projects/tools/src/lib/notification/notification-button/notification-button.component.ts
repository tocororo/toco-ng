import { Component, OnInit } from '@angular/core';
import { of as observableOf, timer, Subscription, PartialObserver } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material';

import { NotificationService } from '@toco/tools/backend';
import { MessageHandler, StatusCode } from '@toco/tools/core';
import { OAuthStorage } from 'angular-oauth2-oidc';

@Component({
    selector: 'toco-notification-button',
    templateUrl: './notification-button.component.html',
    styleUrls: ['./notification-button.component.scss']
})
export class NotificationButtonComponent implements OnInit {

    private count: number;
    public notifications : Array<NotificationInfo>;

    private timerSuscription: Subscription = null;
    private timerObserver: PartialObserver<number> = {
        next: (_) => {
            console.log('token',this.oauthStorage);
            
            if (this.oauthStorage.getItem('access_token')){
                this.service.getNotificationsList(5,0).pipe(
                    catchError(error => {
                        const m = new MessageHandler(this._snackBar);
                        m.showMessage(StatusCode.serverError, error.message);
                        return observableOf(null);
                    })
                )
                .subscribe(response => {
        
                    if (response.status == "success"){
                        this.count = response.data.notifications.total_not_view;
                        const arr : NotificationInfo[] = response.data.notifications.data;
                        this.notifications = arr;
                    }
                    else{
                        const m = new MessageHandler(this._snackBar);
                        m.showMessage(StatusCode.serverError, response.message);
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
        this.timerSuscription = timer(0, 90000).subscribe(this.timerObserver);

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
