/*
 *   Copyright (c) 2020 Universidad de Pinar del Río "Hermanos Saíz Montes de Oca"
 *   All rights reserved.
 */

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthenticationService } from '@toco/tools/authentication/authentication.service';
import { NotificationListComponent } from '@toco/tools/notification';

import { JournalInclusionComponent } from '@toco/tools/sources/journal-inclusion/journal-inclusion.component';
import { SourceViewComponent } from 'projects/catalog/src/app/source-view/source-view.component';
import { SourceResolver } from 'projects/catalog/src/app/source-resolver';
import { SourceEditComponent } from 'projects/catalog/src/app/source-edit/source-edit.component';
import { SourcesComponent } from 'projects/catalog/src/app/sources/sources.component';
import { HomeComponent } from './home/home.component';
import { StaticPagesComponent } from './static-pages/static-pages.component';
import { CatalogComponent } from 'projects/catalog/src/app/catalog/catalog.component';
import { UserProfileComponent } from './user-profile/user-profile.component';


const routes: Routes = [
    {
        path: '',
        component: HomeComponent
    },
    {
        path: 'directory',
        component: CatalogComponent,
    },
    {
        path: 'faq',
        component: StaticPagesComponent,
        data: {src: 'assets/markdown/faq.md', title: 'FAQ'}
    },
    {
        path: 'about',
        component: StaticPagesComponent,
        data: {src: 'assets/markdown/about.md', title: 'Sobre Nosotros'}
    },
    {
        path: 'help',
        component: StaticPagesComponent,
        data: {src: 'assets/markdown/help.md', title: 'Ayuda'}
    },
    {
        path: 'contact',
        component: StaticPagesComponent,
        data: {src: 'assets/markdown/contact.md', title: 'Contacto'}
    },
    {
        path: 'userprofile',
        component: UserProfileComponent,
        canActivate: [AuthenticationService]
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
                    record: SourceResolver
                }
            },
            {
                path: ':uuid/edit',
                component: SourceEditComponent,
                resolve: {
                  record: SourceResolver
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
    {
        path: '**',
        redirectTo: ''
    }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { scrollPositionRestoration: 'enabled' })],
  exports: [RouterModule],
  providers: [
      SourceResolver
  ]
})
export class AppRoutingModule { }
