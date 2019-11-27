import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { FormFieldsComponent } from './form-fields/form-fields.component';
import { FormContainerComponent } from './form-container/form-container.component';
@NgModule({
  imports: [
    CommonModule,
    SharedModule,
  ],
  declarations: [
    FormFieldsComponent,
    FormContainerComponent
  ],
  exports: [
    FormFieldsComponent,
    FormContainerComponent
  ],
  providers: [
  ]
})
export class FormsModule { }
