import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import moment from 'moment';
import { of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { NotificationService } from '../../backend/public-api';
import { MessageHandler, StatusCode } from '../../core/public-api';
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
    ]
})

export class NotificationListComponent implements OnInit {

    dataSource = new MatTableDataSource<NotificationInfo>();
    columnsToDisplay = ['action', 'description', 'classification', 'emiter', 'emiterEmail', 'createdAt' ];
    columnsLabels = ['', 'Descripción', 'Clasificación', 'Emisor', 'Correo del emisor', 'Creada'];
    expandedElement: Notification;
    public moment: any = moment;

    pageSizeOptions: number[] = [5, 10, 15, 20];

    @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

    constructor(private service: NotificationService, private _snackBar: MatSnackBar) { }

    ngOnInit() {
        this.paginator.firstPage();
        this.paginator.pageSize = 5;
        this.getNotificationsListData();
    }
    getNotificationsListData() {
        this.service.getNotificationsList(this.paginator.pageSize, this.paginator.pageIndex)
            .pipe(
                catchError(error => {
                    const m = new MessageHandler(this._snackBar);
                    m.showMessage(StatusCode.serverError, error.message);
                    return of(null);
                })
            )
            .subscribe(response => {
                if (response) {
                    this.paginator.length = response.data.total_not_view;
                    const arr: NotificationInfo[] = response.data.notifications
                    .map( n => ({...n, classification: {
                        label: n.classification,
                        color: n.classification === 'INFO' ? '#2196F3' : n.classification === 'ALERT' ? '#FF5722' : '#d32f2f'
                      }}));
                    this.dataSource.data = arr;
                } else {
                    this.paginator.length = 0;
                    this.dataSource.data = null;
                }

            });
    }
    setnotificationViewed(id: number) {
        // console.log(id);
        if (id) {
          this.service.setNotificationViewed(id)
            .pipe(
              catchError(error => {
                const m = new MessageHandler(this._snackBar);
                m.showMessage(StatusCode.serverError, error.message);
                return of(null);
              })
            )
            .subscribe(response => {
                if (response.status === 'success') {
                  this.getNotificationsListData();
                  const m = new MessageHandler(this._snackBar);
                  m.showMessage(StatusCode.OK, 'La notificación fue marcada como leída');
                } else {
                  const m = new MessageHandler(this._snackBar);
                  m.showMessage(StatusCode.serverError, response.message);
                }
              }
            );
        }
    }
}
