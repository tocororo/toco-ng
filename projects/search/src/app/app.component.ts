import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material';
import { SearchService } from '@toco/tools/backend';
import { HttpParams } from '@angular/common/http';
import { SearchResponse, HitList } from '@toco/tools/entities';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{

  // begin Layout stuff
  layoutPosition = [
    {
        name: 'Derecha',
        layout: 'row-reverse',
        aling: 'center baseline',
        width:  '22'
    },
    {
        name: 'Izquierda',
        layout: 'row',
        aling: 'center baseline',
        width:  '22'
    },
    {
        name: 'Arriba',
        layout: 'column',
        aling: 'center center',
        width:  '90'
    },
    {
        name: 'Abajo',
        layout: 'column-reverse',
        aling: 'center center',
        width:  '90'
    }
  ];
  currentlayout = this.layoutPosition[0];
  public changeLayoutPosition(index: number) {
    this.currentlayout = this.layoutPosition[index];
  }
  // end Layout stuff

  //begin paginator stuff
  length = 100;
  pageSize = 10;
  pageSizeOptions: number[] = [5, 10, 25, 100];
  pageEvent: PageEvent;

  //end paginator stuff

  params = new HttpParams();
  hits: HitList;
  constructor(
    private searchService: SearchService,
  ){ 

  }

  ngOnInit(){
    
    this.params = this.params.set('size', this.pageSize.toString());
    this.params = this.params.set('page', '1');
    console.log(this.params);
    
    this.searchService.getRecords(this.params).subscribe(
      (response: SearchResponse) => {
        this.hits = response.hits;
      },
      (error: any) => {
        
      },
      () => {
        
      }
    );
  }

}
