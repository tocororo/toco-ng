import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { NotificationButtonComponent } from './notification-button/notification-button.component';
import { NotificationListComponent } from './notification-list/notification-list.component';
import { NotificationService } from '@toco/tools/backend';
import { MatButtonModule, MatMenuModule, MatIconModule, MatBadgeModule, MatTableModule, MatPaginatorModule, MatDividerModule } from '@angular/material';



@NgModule({
    declarations: [
        NotificationButtonComponent,
        NotificationListComponent
    ],
    imports: [
        CommonModule,
        RouterModule,
        MatButtonModule,
        MatMenuModule,
        MatIconModule,
        MatBadgeModule,
        MatTableModule,
        MatPaginatorModule,
        MatDividerModule
    ],
    exports: [
        NotificationButtonComponent,
        NotificationListComponent
    ],
    providers: [
        NotificationService
    ]
})
export class NotificationModule { }
