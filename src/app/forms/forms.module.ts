import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { FormFieldsComponent } from './form-fields/form-fields.component';
import { FormContainerComponent } from './form-container/form-container.component';
import { FormsService } from './forms.service';
import { FormFieldVocabularyComponent } from './form-field-vocabulary/form-field-vocabulary.component';
import { ReactiveFormsModule } from '@angular/forms';
import { FormFieldTermParentComponent } from './form-field-term-parent/form-field-term-parent.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    ReactiveFormsModule
  ],
  declarations: [
    FormFieldsComponent,
    FormContainerComponent,
    FormFieldVocabularyComponent,
    FormFieldTermParentComponent
  ],
  exports: [
    FormFieldsComponent,
    FormContainerComponent
  ],
  providers: [
    FormsService
  ]
})
export class FormsModule
{ }
