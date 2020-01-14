
import { NgModule } from '@angular/core';
import { SharedModule } from '@toco/tools/shared';

import { PersonRoutingModule } from './person-routing.module';
import { PersonComponent } from './person/person.component';
import { PersonViewComponent } from './person-view/person-view.component';

@NgModule({
    declarations: [
        PersonComponent,
        PersonViewComponent
    ],

    imports: [
        SharedModule,
        PersonRoutingModule
    ],

    exports: [
        PersonComponent,
        PersonViewComponent
    ]
})
export class PersonModule
{ }
