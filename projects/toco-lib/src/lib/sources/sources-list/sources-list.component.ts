/*
 *   Copyright (c) 2020 Universidad de Pinar del Río "Hermanos Saíz Montes de Oca"
 *   All rights reserved.
 */


import { Component, OnInit, ViewChild } from '@angular/core';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { merge, of as observableOf } from 'rxjs';
import { startWith, switchMap, map, catchError } from 'rxjs/operators';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

import { MetadataService } from '@toco/core';
import { Journal, JournalData, ISSN } from '@toco/entities';
import { FilterHttpMap, FiltersService } from '@toco/filters';

import { EnvService } from '@tocoenv/env.service';

import { CatalogService } from '@toco/backend';
import { CatalogFiltersComponent } from '../catalog-filters/catalog-filters.component';

@Component({
    selector: 'toco-sources-list',
    templateUrl: './sources-list.component.html',
    styleUrls: ['./sources-list.component.scss'],
    animations: [
        trigger('detailExpand', [
            state('collapsed', style({ height: '0px', minHeight: '0', display: 'none' })),
            state('expanded', style({ height: '*' })),
            transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
        ]),
    ],
})
export class SourcesListComponent implements OnInit
{
    journalList: Journal[] = [];
    private loading = true;
    dataSource = new MatTableDataSource<Journal>();
    columnsToDisplay = ['title', 'rnps', 'p-issn'];
    expandedElement: Journal;
    length = 0;
    pageSize = 5;
    pageSizeOptions: number[] = [5, 10, 15, 20];
    pageEvent: PageEvent;
    params: Array<FilterHttpMap>;
    sceibaHost = '';
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
    currentlayout = this.layoutPosition[1];

    constructor(private service: CatalogService, private metadata: MetadataService, private filterService: FiltersService, private env: EnvService) {
        this.sceibaHost = env.sceibaHost + '/catalog';
    }

    @ViewChild(MatPaginator, { static: true })
    paginator: MatPaginator;

    @ViewChild(CatalogFiltersComponent, { static: true })
    filter_component: CatalogFiltersComponent;

    ngOnInit() {
        this.metadata.setTitleDescription('Catálogo de Revistas Científicas', '');
        this.paginator.firstPage();
        this.paginator.pageSize = 5;
        this.service.getJournalsCount().subscribe(response => {
            this.length = response.data.count;
        });
        this.fetchJournalData();
        this.filterService.paramsChanged.subscribe(params => {
            this.params = params;
            this.fetchJournalData();
        });
    }

    // onPaginatorChanged(){
    //   this.filterService.changeFilter('count',this.paginator.pageSize, false);
    //   this.filterService.changeFilter('page',this.paginator.pageIndex);
    // }

    fetchJournalData() {
        this.loading = true;
        // this.dataSource.data = this.service.getJournalsPage(this.count, this.page);
        const arr = new Array<Journal>();

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
            this.length = response.data.sources.count;
            response.data.sources.data.forEach(item => {
                const j = new Journal();
                j.id = item.id;
                j.uuid = item.uuid;
                const info = new JournalData();
                info.url = item.data != null ? item.data.url : '';
                info.title = item.name;
                info.subtitle = item.subtitle;
                info.shortname = item.shortname;
                const issn = new ISSN();
                issn.e = item.data != null ? item.data.issn.e : '';
                issn.l = item.data != null ? item.data.issn.l : '';
                issn.p = item.data != null ? item.data.issn.p : '';
                info.issn = issn;
                info.rnps = item.data != null ? item.data.rnps : '';
                info.logo = item.data != null ? item.data.logo : '';
                info.purpose = item.purpose;
                info.description = item.data != null ? item.data.description : '';
                j.data = info;
                arr.push(j);
            });
            return arr;
        }),
        catchError(error => {
            this.loading = false;
            console.log('ERRORRR ' + error);
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

    openme(): boolean
    {
        const a = navigator.userAgent.match(/Android/i);
        const b = navigator.userAgent.match(/BlackBerry/i);
        const apple = navigator.userAgent.match(/iPhone|iPad|iPod/i);
        const o = navigator.userAgent.match(/Opera Mini/i);
        const i = navigator.userAgent.match(/IEMobile/i);

        if (a != null || b != null || apple != null || o != null || i != null)
        {
            return false;
        }
        return true;
    }

    changeLayoutPosition(index: number)
    {
        this.currentlayout = this.layoutPosition[index];
    }
}
