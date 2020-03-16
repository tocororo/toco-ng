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
<<<<<<< HEAD
import { RouterModule } from '@angular/router';
=======
import { InstitutionHierarchyViewerComponent } from './institution-hierarchy-viewer/institution-hierarchy-viewer.component';
>>>>>>> 2d6c8dd7911f6e238c32196e25eac22d40e8d49c



@NgModule({
  declarations: [
    InstitutionSelectorComponent,
    ListCountSourcesByTermComponent,
    ExtraInstitutionSelectorComponent,
    InstitutionHierarchyViewerComponent
  ],
  imports: [
    CommonModule,
    SharedModule, 
    TocoFormsModule,
    RouterModule
  ],
  exports: [
    ListCountSourcesByTermComponent,
    InstitutionSelectorComponent,
    ExtraInstitutionSelectorComponent,
    InstitutionHierarchyViewerComponent
  ]
})
export class InstitutionsModule { }
