import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PersonRoutingModule } from './person-routing.module';
import { PersonComponent } from './person/person.component';
import { PersonViewComponent } from './person-view/person-view.component';

@NgModule({
  imports: [
    CommonModule,
    PersonRoutingModule
  ],
  declarations: [PersonComponent, PersonViewComponent]
})
export class PersonModule { }
