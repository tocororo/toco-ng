
import { NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import {throwIfAlreadyLoaded} from './module-import-guard';

import { NavComponent } from './nav/nav.component';
import { FooterComponent } from './footer/footer.component';
import { Error404Component } from './error404/error404.component';
import { HomeComponent } from './home/home.component';
import { CoreRoutingModule } from './core-routing.module';
import { SharedModule } from '../shared/shared.module';
import { MetadataService } from './metadata.service';
import { EqualLengthDirective } from '../shared/utils/validator';
import { DialogContentComponent } from '../shared/utils/message-handler';

@NgModule({
  declarations: [
    NavComponent,
    FooterComponent,
    Error404Component,
    HomeComponent,
    EqualLengthDirective
  ],

  imports: [
    CommonModule,
    SharedModule,
    ReactiveFormsModule,
    CoreRoutingModule
  ],

  exports: [
    NavComponent,
    FooterComponent,
    EqualLengthDirective
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
