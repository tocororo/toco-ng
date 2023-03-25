import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { MatLegacyButtonModule as MatButtonModule } from '@angular/material/legacy-button';
import { MatLegacyMenuModule as MatMenuModule } from '@angular/material/legacy-menu';
import { MatIconModule } from '@angular/material/icon';
import { MatBadgeModule } from '@angular/material/badge';
import { MatLegacyTableModule as MatTableModule } from '@angular/material/legacy-table';
import { MatLegacyPaginatorModule as MatPaginatorModule } from '@angular/material/legacy-paginator';
import { MatDividerModule } from '@angular/material/divider';
import { MatLegacyTooltipModule as MatTooltipModule } from '@angular/material/legacy-tooltip';

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
