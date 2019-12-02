import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VocabulariesComponent, VocabularyDialogComponent } from './vocabularies/vocabularies.component';
import { TaxonomyService } from './taxonomy.service';
import { HttpClientModule } from '@angular/common/http';
import { SharedModule } from '@toco/shared/shared.module';
import { FormsModule } from '@toco/forms/forms.module';
import { TermsComponent } from './terms/terms.component';
import { MatTreeModule } from '@angular/material/tree';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { TaxonomyComponent } from './taxonomy/taxonomy.component';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { LayoutModule } from '@angular/cdk/layout';
import { TermGenericComponent } from './term-generic/term-generic.component';



@NgModule({
  declarations: [
    VocabulariesComponent,
    VocabularyDialogComponent,
    TermsComponent,
    TaxonomyComponent,
    TermGenericComponent
  ],
  entryComponents: [
    VocabularyDialogComponent,
    TermGenericComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    SharedModule,
    FormsModule,
    MatTreeModule,
    MatIconModule,
    MatButtonModule,
    MatGridListModule,
    MatCardModule,
    MatMenuModule,
    LayoutModule
  ],
  exports: [
    TaxonomyComponent,
    VocabulariesComponent
  ],
  providers: [
    TaxonomyService
  ]
})
export class TaxonomyModule { }
