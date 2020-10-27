
import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/public-api';

import { PersonComponent } from './person/person.component';
import { PersonViewComponent } from './person-view/person-view.component';

@NgModule({
    declarations: [
        PersonComponent,
        PersonViewComponent
    ],

    imports: [
        SharedModule
    ],

    exports: [
        PersonComponent,
        PersonViewComponent
    ]
})
export class PersonModule
{ }
