
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { PersonViewComponent } from './person-view/person-view.component';
import { PersonComponent } from './person/person.component';



@NgModule({
    declarations: [
        PersonComponent,
        PersonViewComponent
    ],

    imports: [
      CommonModule,
    ],

    exports: [
        PersonComponent,
        PersonViewComponent
    ]
})
export class PersonModule
{ }
