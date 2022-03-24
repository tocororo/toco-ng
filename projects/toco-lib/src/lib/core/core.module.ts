
import { CommonModule } from '@angular/common';
import { NgModule, Optional, SkipSelf } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatTabsModule } from '@angular/material/tabs';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { Error404Component } from './error404/error404.component';
import { MetadataService } from './metadata.service';
import { PageHeaderComponent } from './page-header/page-header.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { SceibaAppsComponent } from './sceiba-apps/sceiba-apps.component';
import { GetViewContainerDirective } from './utils/get-view-container.directive';
import { DialogContentComponent, DialogDeleteConfirmComponent } from './utils/message-handler';
import { ProgressComponent } from './utils/progress';
import { RoadMapSceibaComponent } from './utils/road-map-sceiba/road-map-sceiba.component';
import { RoadMapComponent } from './utils/road-map/road-map.component';
import { EqualLengthDirective } from './utils/validator';







@NgModule({
    declarations: [
        Error404Component,
        PageHeaderComponent,
        PageNotFoundComponent,
        RoadMapComponent,
        RoadMapSceibaComponent,
        GetViewContainerDirective,
        EqualLengthDirective,
        DialogContentComponent,
        DialogDeleteConfirmComponent,
        ProgressComponent,
        SceibaAppsComponent
    ],

    imports: [
        CommonModule,
        ReactiveFormsModule,
        RouterModule,
        TranslateModule,
        NgxChartsModule,
        FlexLayoutModule,
        FormsModule,
        MatToolbarModule,
        MatCardModule,
        MatIconModule,
        MatTabsModule,
        MatDividerModule,
        MatGridListModule,
        MatTooltipModule,
        MatCheckboxModule,
        MatProgressBarModule,
        MatButtonModule,
        MatDialogModule,
        MatMenuModule
    ],

    exports: [
        Error404Component,
        PageHeaderComponent,
        PageNotFoundComponent,
        RoadMapComponent,
        RoadMapSceibaComponent,
        GetViewContainerDirective,
        EqualLengthDirective,
        DialogContentComponent,
        DialogDeleteConfirmComponent,
        ProgressComponent,
        SceibaAppsComponent
    ],
    entryComponents: [
        DialogContentComponent,
        DialogDeleteConfirmComponent
    ],
    providers: [
        MetadataService
    ]
})
export class CoreModule
{
    public constructor(@Optional() @SkipSelf() parentModule: CoreModule)
    {
        //throwIfAlreadyLoaded(parentModule, 'CoreModule');
    }
}
