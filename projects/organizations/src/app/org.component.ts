
import { Component } from '@angular/core';
import { HttpParams } from '@angular/common/http';
import { PageEvent } from '@angular/material';

import { Organization, SearchResponse } from '@toco/tools/entities';
import { SearchService } from '@toco/tools/backend';

@Component({
	selector: 'toco-org-root',
	templateUrl: './org.component.html',
	styleUrls: ['./org.component.scss']
})
export class OrgRootComponent
{
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

	public constructor(private _searchService: SearchService)
	{ }

	public ngOnInit(): void
	{
		this.params = new HttpParams();
		this.getRecords();
	}

	public pageChange(event?: PageEvent): void
	{
		this.pageSize = event.pageSize;
		this.pageIndex = event.pageIndex;
		this.getRecords();
	}

	public getRecords(): void
	{
		this.params = this.params.set('size', this.pageSize.toString(10));
		this.params = this.params.set('page', (this.pageIndex + 1).toString(10));

		this._searchService.getOrganizations(this.params).subscribe(
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
