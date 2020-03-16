/*
 *   Copyright (c) 2020 Universidad de Pinar del Río "Hermanos Saíz Montes de Oca"
 *   All rights reserved.
 */



import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InstitutionSelectorComponent } from './institution-selector/institution-selector.component';
import { ListCountSourcesByTermComponent } from './list-count-sources-by-term/list-count-sources-by-term.component';
import { SharedModule } from '../shared';
import { TocoFormsModule } from '../forms';
import { ExtraInstitutionSelectorComponent } from './extra-institution-selector/extra-institution-selector.component';



@NgModule({
  declarations: [
    InstitutionSelectorComponent,
    ListCountSourcesByTermComponent,
    ExtraInstitutionSelectorComponent
  ],
  imports: [
    CommonModule,
    SharedModule, 
    TocoFormsModule
  ],
  exports: [
    ListCountSourcesByTermComponent,
    InstitutionSelectorComponent
  ]
})
export class InstitutionsModule { }
