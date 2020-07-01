
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { OrgListComponent, OrgEditComponent, OrgViewComponent, OrgAddComponent } from '@toco/tools/organizations';

import { OrganizationDetailResolverService } from './organization-detail-resolver.service.ts';

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
        component: OrgAddComponent
    },
	{
		path:'organizaciones',
		component: OrgListComponent,
	},
	{
		path: '',
		redirectTo: '/organizaciones',
		pathMatch: 'full'
	},
	{
		path: '**',
		redirectTo: '/organizaciones',
		pathMatch: 'full'
		//TODO: Hacer un componente 'PageNotFoundComponent' para mostrarlo aquí. 
		//component: PageNotFoundComponent
	}
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule]
})
export class OrgRoutingModule
{ }
