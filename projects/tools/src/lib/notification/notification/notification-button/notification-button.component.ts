import { Component, OnInit } from '@angular/core';
import { of as observableOf } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material';

import { NotificationService } from '@toco/tools/backend';
import { MessageHandler, StatusCode } from '@toco/tools/core';

@Component({
    selector: 'toco-notification-button',
    templateUrl: './notification-button.component.html',
    styleUrls: ['./notification-button.component.scss']
})
export class NotificationButtonComponent implements OnInit {

    private count: number;
    public notifications : Array<NotificationInfo>;

    constructor(private service: NotificationService, private _snackBar?: MatSnackBar) { }

    ngOnInit() {
        this.service.getNotificationsList(5,0).pipe(
            catchError(error => {
                const m = new MessageHandler(this._snackBar);
                m.showMessage(StatusCode.serverError, error.message);
                return observableOf(null);
            })
        )
        .subscribe(response => {

            if (response.status == "success"){
                this.count = response.data.notifications.total;
                const arr : NotificationInfo[] = response.data.notifications.data;
                this.notifications = arr;
            }
            else{
                const m = new MessageHandler(this._snackBar);
                m.showMessage(StatusCode.serverError, response.message);
            }
        });
    }

    notificationsCount(){
        if (this.count > 9)
            return '+9';
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
