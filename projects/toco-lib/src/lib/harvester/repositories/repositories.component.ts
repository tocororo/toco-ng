
import { Component, OnInit, ViewChild } from '@angular/core';
import {animate, state, style, transition, trigger} from '@angular/animations';
import {merge,of as observableOf} from 'rxjs';
import { startWith, switchMap, map, catchError } from 'rxjs/operators';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

import { CatalogService } from '@toco/backend';
import { MetadataService } from '@toco/core';
import { Journal, JournalData, ISSN } from '@toco/entities';
import { FilterHttpMap, FiltersService } from '@toco/filters';

import { EnvService } from '@toco/backend/env.service';

import { HarvesterFiltersComponent } from '../harvester-filters/harvester-filters.component';

@Component({
    selector: 'toco-repositories',
    templateUrl: './repositories.component.html',
    styleUrls: ['./repositories.component.scss'],
    animations: [
        trigger('detailExpand', [
            state('collapsed', style({height: '0px', minHeight: '0', display: 'none'})),
            state('expanded', style({height: '*'})),
            transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
        ]),
    ],
})
export class RepositoriesComponent implements OnInit {

    journalList: Journal[] = [];
    private loading: boolean = true;
    dataSource = new MatTableDataSource<Journal>();
    columnsToDisplay = ['title'];
    expandedElement: Journal;
    length = 0;
    pageSize = 5;
    pageSizeOptions: number[] = [5, 10, 20, 40, 60, 80, 100];
    pageEvent: PageEvent;
    params: Array<FilterHttpMap>;

    sceibaHost = ''
    currentlayout = {
        name: 'Izquierda',
        layout: 'row',
        aling: 'center baseline',
        width:  '22'
    }

    constructor(private service: CatalogService,
        private metadata: MetadataService,
        private filterService : FiltersService,
        private env: EnvService)
    {
        this.sceibaHost = env.sceibaHost + "/catalog"
    }

    @ViewChild(MatPaginator, { static: true })
    paginator: MatPaginator;

    @ViewChild(HarvesterFiltersComponent, { static: true })
    filter_component : HarvesterFiltersComponent;

    ngOnInit() {

        this.metadata.setTitleDescription("Catálogo de Revistas Científicas", "");
        this.paginator.firstPage();
        this.paginator.pageSize = this.pageSize;
        this.service.getJournalsCount().subscribe(response =>{
            this.length = response.data.count;
        });
        this.fetchJournalData();

        this.filterService.paramsChanged.subscribe(params =>{
            this.params = params;
            this.fetchJournalData();
        })
    }

    // onPaginatorChanged(){
    //   this.filterService.changeFilter('count',this.paginator.pageSize, false);
    //   this.filterService.changeFilter('page',this.paginator.pageIndex);
    // }

    fetchJournalData() {
        this.loading = true;
        //this.dataSource.data = this.service.getJournalsPage(this.count, this.page);
        let arr = new Array<Journal>();
        merge().pipe(
            startWith({}),
            switchMap(() => {
                this.loading = true;
                return this.service!.getJournalsPage(this.paginator.pageSize, this.paginator.pageIndex, this.params);
            }),
            map(response => {
                // Flip flag to show that loading has finished.
                this.loading = false;
                // this.isRateLimitReached = false;
                // this.resultsLength = response.total_count;
                this.length = response.data.sources.count
                response.data.sources.data.forEach(item =>{
                    let j = new Journal();
                    j.id = item.id;
                    j.uuid = item.uuid;
                    j.source_type = item.source_type;
                    // j.harvest_type = item.harvest_type;
                    j.data.oaiurl = item.harvest_endpoint;


                        let info = new JournalData();
                        info.url = item.data!= null ? item.data.url: "";
                        info.title = item.name;
                        info.subtitle = item.subtitle;
                        info.shortname  = item.shortname;
                            let issn = new ISSN();
                            issn.e = item.data!= null ? item.data.issn.e : "";
                            issn.l = item.data!= null ? item.data.issn.l : "";
                            issn.p = item.data!= null ? item.data.issn.p : "";
                        info.issn = issn;
                        info.rnps = item.data!= null ? item.data.rnps : "";
                        info.logo = item.data!= null ? item.data.logo : "";
                        info.purpose  = item.purpose;
                        info.description  = item.data!= null ? item.data.description : "";
                    j.data = info;
                    arr.push(j);
                });
                return arr;
            }),
            catchError(error => {
                this.loading = false;
                console.log("ERRORRR  "+error)
                // Catch if the GitHub API has reached its rate limit. Return empty data.
                // this.isRateLimitReached = true;
                return observableOf([]);
            })
        ).subscribe(data => this.dataSource.data = data);

    }

    onScrollUp() {
        // console.log("scrolled up!!");
    }

    isEmpty() {
        if (this.journalList.length == 0) {
            this.loading = false;
            return true;
        }
        return false;
    }

    isLoading() {
        return this.loading;
    }

    currentJournals(){
        console.log(this.dataSource.data)
    }
}
