
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { SharedModule } from '../shared/shared.module';
import { FormFieldsComponent } from './form-fields/form-fields.component';
import { FormContainerComponent } from './form-container/form-container.component';
import { FormsService } from './forms.service';

import { IssnFormFieldInternalComponent } from './form-field-issn/issn-form-field-internal/issn-form-field-internal.component';
import { FormFieldIssnComponent } from './form-field-issn/form-field-issn.component';
import { FormFieldRnpsComponent } from './form-field-rnps/form-field-rnps.component';

import { FormFieldEmailComponent } from './form-field-email/form-field-email.component';
import { FormFieldVocabularyComponent } from './form-field-vocabulary/form-field-vocabulary.component';
import { FormFieldTermParentComponent } from './form-field-term-parent/form-field-term-parent.component';

@NgModule({
  declarations: [
    FormFieldsComponent,
    FormContainerComponent,
    FormFieldEmailComponent,
    IssnFormFieldInternalComponent,
    FormFieldIssnComponent,
    FormFieldRnpsComponent,
    FormFieldVocabularyComponent,
    FormFieldTermParentComponent
  ],

  imports: [
    CommonModule,
    SharedModule,
    ReactiveFormsModule
  ],
  exports: [
    FormFieldsComponent,
    FormContainerComponent,
    FormFieldEmailComponent,
    FormFieldIssnComponent,
    FormFieldRnpsComponent,
    FormFieldVocabularyComponent,
    FormFieldTermParentComponent
  ],
  providers: [
    FormsService
  ]
})
export class FormsModule { }
