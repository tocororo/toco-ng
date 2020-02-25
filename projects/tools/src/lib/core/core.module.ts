
import { NgModule, Optional, SkipSelf } from '@angular/core';
import { SharedModule } from '@toco/tools/shared';
import { ReactiveFormsModule } from '@angular/forms';

import { throwIfAlreadyLoaded } from './module-import-guard';

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
import { EqualLengthDirective } from './utils/validator';
import { DialogContentComponent } from './utils/message-handler';
import { ProgressComponent } from './utils/progress';

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
        EqualLengthDirective,
        DialogContentComponent,
        ProgressComponent
    ],

    imports: [
        SharedModule,
        ReactiveFormsModule,
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
        EqualLengthDirective,
        DialogContentComponent,
        ProgressComponent
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
        throwIfAlreadyLoaded(parentModule, 'CoreModule');
    }
}
