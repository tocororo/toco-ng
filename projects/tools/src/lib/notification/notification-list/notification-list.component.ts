import { Component, OnInit, ViewChild } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { MatTableDataSource, MatPaginator, MatSnackBar } from '@angular/material';
import { of } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { NotificationService } from '@toco/tools/backend';
import { MessageHandler, StatusCode } from '@toco/tools/core';
import { NotificationInfo } from '../notification-button/notification-button.component';

@Component({
    selector: 'lib-notification-list',
    templateUrl: './notification-list.component.html',
    styleUrls: ['./notification-list.component.scss'],
    animations: [
        trigger('detailExpand', [
            state('collapsed', style({ height: '0px', minHeight: '0' })),
            state('expanded', style({ height: '*' })),
            transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
        ]),
    ],
})
export class NotificationListComponent implements OnInit {

    dataSource = new MatTableDataSource<NotificationInfo>();
    columnsToDisplay = ['emiter', 'classification'];
    expandedElement: Notification;

    pageSizeOptions: number[] = [5, 10, 15, 20];

    @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

    constructor(private service: NotificationService, private _snackBar: MatSnackBar) { }

    ngOnInit() {
        this.paginator.firstPage();
        this.paginator.pageSize = 5;
        this.getNotificationsListData();
    }
    getNotificationsListData(){
        this.service.getNotificationsList(this.paginator.pageSize, this.paginator.pageIndex)
            .pipe(
                catchError(error => {
                    const m = new MessageHandler(this._snackBar);
                    m.showMessage(StatusCode.serverError, error.message);
                    return of(null);
                })
            )
            .subscribe(response =>{
                this.paginator.length = response.data.notifications.total;
                this.dataSource.data = response.data.notifications.data
            });
    }
    setnotificationViewed(id: number){
        console.log(id);

        this.service.setNotificationViewed(id)
            .pipe(
                catchError(error => {
                    const m = new MessageHandler(this._snackBar);
                    m.showMessage(StatusCode.serverError, error.message);
                    return of(null);
                })
            )
            .subscribe(response =>{
                if (response.status == "success"){
                    this.getNotificationsListData();
                } else {
                    const m = new MessageHandler(this._snackBar);
                    m.showMessage(StatusCode.serverError, response.message);
                }
            }
        );
    }
}