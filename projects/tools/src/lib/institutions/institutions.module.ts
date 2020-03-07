import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InstitutionSelectorComponent } from './institution-selector/institution-selector.component';
import { ListCountSourcesByTermComponent } from './list-count-sources-by-term/list-count-sources-by-term.component';
import { SharedModule } from '../shared';



@NgModule({
  declarations: [
    InstitutionSelectorComponent,
    ListCountSourcesByTermComponent
  ],
  imports: [
    CommonModule,
    SharedModule
  ],
  exports: [
    ListCountSourcesByTermComponent
  ]
})
export class InstitutionsModule { }
