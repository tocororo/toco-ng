
import { Component } from '@angular/core';
import { HttpParams } from '@angular/common/http';
import { PageEvent } from '@angular/material';

import { Organization, SearchResponse } from '@toco/tools/entities';
import { SearchService } from '@toco/tools/backend';
import { InputContent, FormFieldType, TextInputAppearance } from '@toco/tools/forms';

@Component({
	selector: 'toco-org-root',
	templateUrl: './org.component.html',
	styleUrls: ['./org.component.scss']
})
export class OrgRootComponent
{
	//TODO: esto debe ser una función que retorna el valor de "viewContent" correcto 
	// cuando se da click en una organización en la lista de organizaciones, todo esto 
	// saldrá mediante enrutamiento usando "router-outlet". 
    /**
     * Returns the view's content. 
     */
    public viewContent: InputContent[] = [
		{
			name: "wikipedia_url",
			label: "URL of the wikipedia page for the institute",
			type: FormFieldType.url,
			required: false,
			value: "www.wiki.elitaute.com",
			width: "45%",
			appearance: TextInputAppearance.outline,
			ariaLabel: "URL of the wikipedia page for the institute"
		},
		{
			name: "email_address",
			label: "Contact email address for the institute",
			type: FormFieldType.email,
			required: true,
			value: 'first@gmail.com',
			width: "45%",
			appearance: TextInputAppearance.outline,
			ariaLabel: "Contact email address for the institute"
		},
		// {
		//   name: "name",
		//   label: "Nombre",
		//   type: FormFieldType.text,
		//   required: true,
		//   value: this.institution.name ? this.institution.name : null,
		//   width: "100%"
		// },
		// {
		//   name: "description",
		//   label: "Descripción",
		//   type: FormFieldType.textarea,
		//   required: false,
		//   value: this.institution.description ? this.institution.description : null,
		//   width: "100%"
		// },
		// {
		//   name: "address",
		//   label: "Dirección",
		//   type: FormFieldType.textarea,
		//   required: false,
		//   value: this.institution.data["address"] ? this.institution.data["address"] : null,
		//   width: "100%"
		// }
	];

	// begin Layout stuff
	layoutPosition = [
		{
			name: 'Derecha',
			layout: 'row-reverse',
			aling: 'center baseline',
			width: '22'
		},
		{
			name: 'Izquierda',
			layout: 'row',
			aling: 'center baseline',
			width: '22'
		},
		{
			name: 'Arriba',
			layout: 'column',
			aling: 'center center',
			width: '90'
		},
		{
			name: 'Abajo',
			layout: 'column-reverse',
			aling: 'center center',
			width: '90'
		}
	];
	currentlayout = this.layoutPosition[0];
	public changeLayoutPosition(index: number) {
		this.currentlayout = this.layoutPosition[index];
	}
	// end Layout stuff

	// begin paginator stuff
	length = 100;
	pageSize = 5;
	pageIndex = 0;
	pageSizeOptions: number[] = [5, 10, 25, 100];
	// end paginator stuff

	params: HttpParams;
	sr: SearchResponse<Organization>;
	constructor(
		private searchService: SearchService,
	) {

	}

	ngOnInit() {
		this.params = new HttpParams();
		this.getRecords();
	}

	pageChange(event?: PageEvent) {
		this.pageSize = event.pageSize;
		this.pageIndex = event.pageIndex;
		this.getRecords();
	}
	getRecords() {
		this.params = this.params.set('size', this.pageSize.toString());
		this.params = this.params.set('page', (this.pageIndex + 1).toString());


		this.searchService.getOrganizations(this.params).subscribe(
			(response: SearchResponse<Organization>) => {
				console.log(response);
				// this.pageEvent.length = response.hits.total;
				this.sr = response;
			},
			(error: any) => {

			},
			() => {

			}
		);
	}
}
