import { Component } from '@angular/core';
import { HttpParams } from '@angular/common/http';
import { SearchResponse } from '@toco/tools/entities';
import { Organization } from '@toco/tools/entities/organization.entity';
import { SearchService } from '@toco/tools/backend';
import { PageEvent } from '@angular/material';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

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

  pageChange(event?: PageEvent){
    this.pageSize = event.pageSize;
    this.pageIndex = event.pageIndex;
    this.getRecords();
  }
  getRecords() {
    this.params = this.params.set('size', this.pageSize.toString());
    this.params = this.params.set('page', ( this.pageIndex + 1 ).toString());


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
