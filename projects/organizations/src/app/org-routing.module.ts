
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { OrgListComponent, OrgEditComponent, OrgViewComponent, OrgAddComponent } from '@toco/tools/organizations';

import { OrganizationDetailResolverService } from './organization-detail-resolver.service.ts';

const routes: Routes = [
	{
		path:':id/ver',
		component: OrgViewComponent,
		resolve: {
			'org': OrganizationDetailResolverService
		}
	},
	{
		path:':id/editar',
		component: OrgEditComponent,
		resolve: {
			'org': OrganizationDetailResolverService
		}
    },
    {
        path: ':adicionar',
        component: OrgAddComponent
    },
	{
		path:'',
		component: OrgListComponent,
	},
	// {
	// 	path: '',
	// 	redirectTo: '',
	// 	pathMatch: 'full'
	// },
	{
		path: '**',
		redirectTo: '',
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
