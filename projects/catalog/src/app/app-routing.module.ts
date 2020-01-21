
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CatalogComponent } from '@toco/tools/catalog';
import { TaxonomyComponent } from '@toco/tools/taxonomy';
import { AuthenticationService } from '@toco/tools/authentication/authentication.service';

const routes: Routes = [
    { 
        path: '',
        component: CatalogComponent 
    },
    { 
        path: 'mysources',
        component: TaxonomyComponent,
        canActivate: [AuthenticationService]
    },
    {
        path: '**',
        redirectTo: ''
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
