
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PagesComponent } from './pages/pages.component';
import { PageViewComponent } from './page-view/page-view.component';
import { PageResolver } from './page.resolver';

const routes: Routes = [
    {
        path: '',
        component: PagesComponent,
        children: [
            {
                path: ':slug',
                component: PageViewComponent,
                resolve: {
                    page: PageResolver
                }

            }
        ]
    }];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
    providers: [
        PageResolver
    ]
})
export class PagesRoutingModule
{ }
