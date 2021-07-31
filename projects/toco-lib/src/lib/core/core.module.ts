
import { NgModule, Optional, SkipSelf } from '@angular/core';
import { SharedModule } from '../shared/public-api';
import { ReactiveFormsModule } from '@angular/forms';
import { NgxChartsModule } from '@swimlane/ngx-charts';

// import { throwIfAlreadyLoaded } from './module-import-guard';

import { BodyComponent } from './body/body.component';
import { Error404Component } from './error404/error404.component';
import { FooterComponent } from './footer/footer.component';
import { HomeComponent } from './home/home.component';
import { InfoCardComponent } from './info-card/info-card.component';
import { JournalCardComponent } from './journal-card/journal-card.component';
import { NavComponent } from './nav/nav.component';
import { PageHeaderComponent } from './page-header/page-header.component';

import { CoreRoutingModule } from './core-routing.module';
import { MetadataService } from './metadata.service';
import { RoadMapComponent } from './utils/road-map/road-map.component';
import { RoadMapSceibaComponent } from './utils/road-map-sceiba/road-map-sceiba.component';
import { GetViewContainerDirective } from './utils/get-view-container.directive';
import { EqualLengthDirective } from './utils/validator';
import { DialogContentComponent } from './utils/message-handler';
import { ProgressComponent } from './utils/progress';
import { SceibaAppsComponent } from './sceiba-apps/sceiba-apps.component';

@NgModule({
    declarations: [
        BodyComponent,
        Error404Component,
        FooterComponent,
        HomeComponent,
        InfoCardComponent,
        JournalCardComponent,
        NavComponent,
        PageHeaderComponent,
        RoadMapComponent,
        RoadMapSceibaComponent,
        GetViewContainerDirective,
        EqualLengthDirective,
        DialogContentComponent,
        ProgressComponent,
        SceibaAppsComponent
    ],

    imports: [
        SharedModule,
        ReactiveFormsModule,
        NgxChartsModule,
        CoreRoutingModule
    ],

    exports: [
        BodyComponent,
        Error404Component,
        FooterComponent,
        HomeComponent,
        InfoCardComponent,
        JournalCardComponent,
        NavComponent,
        PageHeaderComponent,
        RoadMapComponent,
        RoadMapSceibaComponent,
        GetViewContainerDirective,
        EqualLengthDirective,
        DialogContentComponent,
        ProgressComponent,
        SceibaAppsComponent
    ],
    entryComponents: [
        DialogContentComponent,
    ],
    providers: [
        MetadataService
    ]
})
export class CoreModule
{
    public constructor(@Optional() @SkipSelf() parentModule: CoreModule)
    {
        // throwIfAlreadyLoaded(parentModule, 'CoreModule');
    }
}
