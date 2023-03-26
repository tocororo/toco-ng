import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatBadgeModule } from '@angular/material/badge';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatDividerModule } from '@angular/material/divider';
import { MatTooltipModule } from '@angular/material/tooltip';

import { NotificationService } from '../backend/public-api';

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
