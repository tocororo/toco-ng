
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { FormFieldsComponent } from './form-fields/form-fields.component';
import { SharedModule } from './shared/shared.module';
import { FormContainerComponent } from '@toco/form-container/form-container.component';

@NgModule({
  declarations: [
    AppComponent,
    FormFieldsComponent,
    FormContainerComponent
  ],
  imports: [
    CommonModule,
    SharedModule
  ],
  providers: [
  ],
})
export class AppModule { }
