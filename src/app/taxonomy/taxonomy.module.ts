import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VocabulariesComponent, DialogComponent } from './vocabularies/vocabularies.component';
import { TaxonomyService } from './taxonomy.service';
import { HttpClientModule } from '@angular/common/http';
import { SharedModule } from '@toco/shared/shared.module';
import { FormsModule } from '@toco/forms/forms.module'



@NgModule({
  declarations: [
    VocabulariesComponent,
    DialogComponent
  ],entryComponents: [
    DialogComponent
  ],
  imports: [
    CommonModule, 
    HttpClientModule, 
    SharedModule,
    FormsModule
],
  exports:[
    VocabulariesComponent
  ],
  providers: [
    TaxonomyService
  ]
})
export class TaxonomyModule { }
