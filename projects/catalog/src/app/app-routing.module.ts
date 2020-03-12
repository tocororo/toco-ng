/*
 *   Copyright (c) 2020 Universidad de Pinar del Río "Hermanos Saíz Montes de Oca"
 *   All rights reserved.
 */


import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CatalogComponent } from '@toco/tools/catalog';
import { AuthenticationService } from '@toco/tools/authentication/authentication.service';
import { NotificationListComponent } from '@toco/tools/notification';

import { JournalInclusionComponent } from '@toco/tools/journal/journal-inclusion/journal-inclusion.component';
import { SourceViewComponent } from './source-view/source-view.component';
import { SourceResolver } from './source-resolver'
import { SourcesComponent } from './sources/sources.component';
import { SourceEditComponent } from './source-edit/source-edit.component';
const routes: Routes = [
    {
        path: '',
        component: CatalogComponent
    },
    {
        path: 'sources',
        // loadChildren: () => import('@toco/tools/journal').then(mod => mod.JournalModule),
        children: [
            {
                path: 'new',
                children:[
                    {
                        path: 'journal',
                        component: JournalInclusionComponent,
                    }
                ]
            },
            {
                path: ':uuid/view',
                component: SourceViewComponent,
                resolve: {
                    resolver: SourceResolver
                }
            },
            {
                path: ':uuid/edit',
                component: SourceEditComponent,
                resolve: {
                    resolver: SourceResolver
                }
            },
            {
                path: '',
                component: SourcesComponent,
            }
        ],
        canActivate: [AuthenticationService]
    },
    {
        path: 'notifications',
        component: NotificationListComponent,
        canActivate: [AuthenticationService]
    },
    // {
    //     path: '**',
    //     redirectTo: ''
    // }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
    providers: [
        SourceResolver
    ]
})
export class AppRoutingModule { }
