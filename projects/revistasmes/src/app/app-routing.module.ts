/*
 *   Copyright (c) 2020 Universidad de Pinar del Río "Hermanos Saíz Montes de Oca"
 *   All rights reserved.
 */

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthenticationService } from '@toco/tools/authentication/authentication.service';
import { NotificationListComponent } from '@toco/tools/notification';

import { SourceViewComponent } from 'projects/catalog/src/app/source-view/source-view.component';
import { SourceResolver, SourceResolverAuth } from 'projects/catalog/src/app/source-resolver';
import { SourceEditComponent } from 'projects/catalog/src/app/source-edit/source-edit.component';
import { SourcesComponent } from 'projects/catalog/src/app/sources/sources.component';
import { HomeComponent } from './home/home.component';
import { StaticPagesComponent } from './static-pages/static-pages.component';
import { CatalogComponent } from 'projects/catalog/src/app/catalog/catalog.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { SourceViewReadComponent } from 'projects/catalog/src/app/catalog/source-view-read/source-view-read.component';
import { MysourcesComponent } from 'projects/catalog/src/app/mysources/mysources.component';
import { SourceInclusionComponent } from 'projects/catalog/src/app/source-inclusion/source-inclusion.component';
// import { SourceInclusionAcceptComponent } from 'projects/catalog/src/app/source-inclusion/source-inclusion.component';


const routes: Routes = [
    {
        path: '',
        component: HomeComponent
    },
    {
        path: 'directory',
        children: [
          {
              path: ':uuid',
              component: SourceViewReadComponent,
              resolve: {
                  record: SourceResolver
              }
          },
          {
              path: '',
              component: CatalogComponent,
          }
      ],
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
                        component: SourceInclusionComponent,
                    }
                ]
            },
            {
                path: ':uuid/view',
                component: SourceViewComponent,
                resolve: {
                    source: SourceResolverAuth
                }
            },
            {
                path: ':uuid/edit',
                component: SourceEditComponent,
                resolve: {
                  source: SourceResolverAuth
                }
            },
            {
                path: '',
                component: MysourcesComponent,
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
      SourceResolver,
      SourceResolverAuth
  ]
})
export class AppRoutingModule { }
