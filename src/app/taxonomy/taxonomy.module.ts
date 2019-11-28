import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VocabulariesComponent } from './vocabularies/vocabularies.component';
import { TaxonomyService } from './taxonomy.service';
import { HttpClientModule } from '@angular/common/http';
import { SharedModule } from '@toco/shared/shared.module';



@NgModule({
  declarations: [VocabulariesComponent],
  imports: [
    CommonModule, 
    HttpClientModule, 
    SharedModule
],
  exports:[
    VocabulariesComponent
  ],
  providers: [
    TaxonomyService
  ]
})
export class TaxonomyModule { }
