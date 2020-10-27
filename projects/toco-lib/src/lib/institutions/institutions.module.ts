/*
 *   Copyright (c) 2020 Universidad de Pinar del Río "Hermanos Saíz Montes de Oca"
 *   All rights reserved.
 */



import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InstitutionHierarchySelectorComponent } from './institution-hierarchy-selector/institution-hierarchy-selector.component';
import { ListCountSourcesByTermComponent } from './list-count-sources-by-term/list-count-sources-by-term.component';
import { SharedModule } from '../shared/public-api';
import { TocoFormsModule } from '../forms/public-api';
import { ExtraInstitutionSelectorComponent } from './extra-institution-selector/extra-institution-selector.component';
import { RouterModule } from '@angular/router';
import { InstitutionHierarchyViewerComponent } from './institution-hierarchy-viewer/institution-hierarchy-viewer.component';
import { ExtraInstitutionViewerComponent } from './extra-institution-viewer/extra-institution-viewer.component';
import { TaxonomyModule } from '../taxonomy/public-api';



@NgModule({
  declarations: [
    InstitutionHierarchySelectorComponent,
    ListCountSourcesByTermComponent,
    ExtraInstitutionSelectorComponent,
    InstitutionHierarchyViewerComponent,
    ExtraInstitutionViewerComponent
  ],
  imports: [
    CommonModule,
    SharedModule, 
    TocoFormsModule,
    TaxonomyModule,
    RouterModule
  ],
  exports: [
    ListCountSourcesByTermComponent,
    InstitutionHierarchySelectorComponent,
    ExtraInstitutionSelectorComponent,
    ExtraInstitutionViewerComponent,
    InstitutionHierarchyViewerComponent,

  ]
})
export class InstitutionsModule { }
