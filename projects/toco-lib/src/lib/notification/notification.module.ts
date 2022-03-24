import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatBadgeModule } from '@angular/material/badge';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { MatTooltipModule } from '@angular/material/tooltip';
import { RouterModule } from '@angular/router';
import { NotificationService } from '../backend/public-api';
import { NotificationButtonComponent } from './notification-button/notification-button.component';
import { NotificationListComponent } from './notification-list/notification-list.component';





@NgModule({
    declarations: [
        NotificationButtonComponent,
        NotificationListComponent
    ],
    imports: [
        FlexLayoutModule,
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
        MatDividerModule,
        NotificationButtonComponent,
        NotificationListComponent
    ],
    providers: [
        NotificationService
    ]
})
export class NotificationModule { }
