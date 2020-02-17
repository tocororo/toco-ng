
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
<<<<<<< HEAD
        EqualLengthDirective
=======
        EqualLengthDirective,
        DialogContentComponent
>>>>>>> 34c29f2930c744ca7a08d6c2457085ffb57ec3ed
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
<<<<<<< HEAD
        EqualLengthDirective
=======
        EqualLengthDirective,
        DialogContentComponent
>>>>>>> 34c29f2930c744ca7a08d6c2457085ffb57ec3ed
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
