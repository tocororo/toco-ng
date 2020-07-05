/*
 *   Copyright (c) 2020 Universidad de Pinar del Río "Hermanos Saíz Montes de Oca"
 *   All rights reserved.
 */

import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material';
import { SearchService } from '@toco/tools/backend';
import { HttpParams } from '@angular/common/http';
import { SearchResponse, HitList, Record } from '@toco/tools/entities';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

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
  sr: SearchResponse<Record>;
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
    this.params = this.params.set('size', this.pageSize.toString(10));
    this.params = this.params.set('page', ( this.pageIndex + 1 ).toString(10));


    this.searchService.getRecords(this.params).subscribe(
      (response: SearchResponse<Record>) => {
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
