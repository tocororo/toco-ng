
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HarvesterComponent } from './harvester/harvester.component';
import { RepositoriesComponent } from './repositories/repositories.component';

const routes: Routes = [{
    path: '',
    component: HarvesterComponent,
    children: [
        {
            path: '',
            component: RepositoriesComponent,
            data: {
                title: 'Revistas'
            }
        }
    ]
}];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class HarvesterRoutingModule
{ }
