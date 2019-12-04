import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { FormFieldsComponent } from './form-fields/form-fields.component';
import { FormContainerComponent } from './form-container/form-container.component';
import { FormsService } from './forms.service';
import { FormFieldVocabularyComponent } from './form-field-vocabulary/form-field-vocabulary.component';
import { FormFieldIssnComponent } from './form-field-issn/form-field-issn.component';
import { IssnFormFieldInternalComponent } from './form-field-issn/issn-form-field-internal/issn-form-field-internal.component';
import { ReactiveFormsModule } from '@angular/forms';
@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    ReactiveFormsModule
  ],
  declarations: [
    FormFieldsComponent,
    FormContainerComponent,
    FormFieldVocabularyComponent
  ],
  exports: [
    FormFieldsComponent,
    FormContainerComponent
  ],
  providers: [
    FormsService
  ]
})
export class FormsModule { }
