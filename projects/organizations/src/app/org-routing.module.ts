
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { OrgListComponent, OrgEditComponent, OrgViewComponent } from '@toco/tools/organizations';

import { OrganizationDetailResolverService } from './organization-detail-resolver.service.ts';
import { of } from 'rxjs';

const routes: Routes = [
	{
		path:'organizaciones/:id/ver',
		component: OrgViewComponent,
		resolve: {
			'org': OrganizationDetailResolverService
		}
	},
	{
		path:'organizaciones/:id/editar',
		component: OrgEditComponent,
		resolve: {
			'org': OrganizationDetailResolverService
		}
    },
    {
        path: 'organizaciones/adicionar',
        component: OrgEditComponent,
		resolve: {
			'org': OrganizationDetailResolverService
		}
    },
	{
		path:'organizaciones',
		component: OrgListComponent,
		// resolve: {
		// 	'org': OrganizationDetailResolverService
		// }
	},
	{
		path: '',
		redirectTo: '/organizaciones',
		pathMatch: 'full'
	},
	// {
	// 	path: '**',
	// 	component: PageNotFoundComponent
	// }
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule]
})
export class OrgRoutingModule
{ }
