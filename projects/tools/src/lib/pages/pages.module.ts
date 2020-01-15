
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PagesRoutingModule } from './pages-routing.module';
import { PagesComponent } from './pages/pages.component';
import { PageViewComponent } from './page-view/page-view.component';
import { PagesService } from './pages.service';

@NgModule({
    declarations: [
        PagesComponent,
        PageViewComponent
    ],

    imports: [
        CommonModule,
        PagesRoutingModule
    ],

    providers: [
        PagesService
    ]
})
export class PagesModule
{ }
