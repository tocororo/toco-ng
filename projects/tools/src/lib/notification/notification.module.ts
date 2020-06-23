import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { MatButtonModule, MatMenuModule, MatIconModule, MatBadgeModule, MatTableModule, MatPaginatorModule, MatDividerModule, MatTooltipModule } from '@angular/material';

import { NotificationService } from '@toco/tools/backend';

import { NotificationButtonComponent } from './notification-button/notification-button.component';
import { NotificationListComponent } from './notification-list/notification-list.component';

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
        MatDividerModule,
        MatTooltipModule
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
