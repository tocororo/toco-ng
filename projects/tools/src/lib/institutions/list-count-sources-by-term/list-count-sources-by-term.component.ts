import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { MatPaginatorIntl, MatPaginator } from '@angular/material';
import { SourceService } from '@toco/tools/backend';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';

export interface CountSourcesByTerm{
    name: string;
    count: number;
}

@Component({
    selector: 'toco-list-count-sources-by-term',
    templateUrl: './list-count-sources-by-term.component.html',
    styleUrls: ['./list-count-sources-by-term.component.scss'],
    providers: [
        { provide: MatPaginatorIntl, useValue: customPaginatorLabel() }
    ]
})
export class ListCountSourcesByTermComponent implements OnInit {

    @Input() public uuid: string

    private sourceList: Array<CountSourcesByTerm>;

    public data: Array<CountSourcesByTerm>;
    public data1: Array<CountSourcesByTerm>;
    public data2: Array<CountSourcesByTerm>;

    public paginatorLength: number;

    public paginatorPageSize: number;

    paginatorPageIndex: number;

    @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
    constructor( private service: SourceService) { }

    ngOnInit() {

        this.paginatorLength = 0;
        this.paginator.length = this.paginatorLength;

        this.paginator.pageSize = 12;
        this.paginatorPageSize = this.paginator.pageSize;

        this.paginatorPageIndex = 0;
        this.paginator.firstPage();

        this.data = new Array<CountSourcesByTerm>();
        this.data1 = new Array<CountSourcesByTerm>();
        this.data2 = new Array<CountSourcesByTerm>();

        if (this.uuid != undefined){
            this.sourceList = new Array<CountSourcesByTerm>();
            this.loadData();
            this.sourceList.push({ name: 'Universidad de Pinar del Rio', count: 2});
            this.sourceList.push({ name: 'Universidad de 1', count: 5});
            this.sourceList.push({ name: 'Universidad de 2', count: 7});
            this.sourceList.push({ name: 'Universidad de 3', count: 8});
            this.sourceList.push({ name: 'Universidad de 4', count: 25});
            this.sourceList.push({ name: 'Universidad de 5', count: 2});
            this.sourceList.push({ name: 'Universidad de Matanzas', count: 3});
            this.sourceList.push({ name: 'Universidad de 6', count: 2});
            this.sourceList.push({ name: 'Universidad de 7', count: 2});
            this.sourceList.push({ name: 'Universidad de 8', count: 2});
            this.sourceList.push({ name: 'Universidad de 9', count: 2});
            this.sourceList.push({ name: 'Universidad de la Habaan', count: 20});
            this.sourceList.push({ name: 'Universidad de 10', count: 2});
            this.sourceList.push({ name: 'Universidad de 11', count: 2});
            this.sourceList.push({ name: 'Universidad de 12', count: 2});
            this.sourceList.push({ name: 'Universidad de 13', count: 2});
            this.sourceList.push({ name: 'Universidad de 14', count: 2});
            this.sourceList.push({ name: 'Universidad de 5', count: 2});
            this.sourceList.push({ name: 'Universidad de Matanzas', count: 3});
            this.sourceList.push({ name: 'Universidad de 6', count: 2});
            this.sourceList.push({ name: 'Universidad de 7', count: 2});
            this.sourceList.push({ name: 'Universidad de 8', count: 2});
            this.sourceList.push({ name: 'Universidad de 9', count: 2});
            this.sourceList.push({ name: 'Universidad de la Habaan', count: 20});
            this.sourceList.push({ name: 'Universidad de 10', count: 2});
            this.sourceList.push({ name: 'Universidad de 11', count: 2});
            this.sourceList.push({ name: 'Universidad de 12', count: 2});
            this.sourceList.push({ name: 'Universidad de 13', count: 2});
            this.sourceList.push({ name: 'Universidad de 14', count: 2});
            this.sourceList.push({ name: 'Universidad de 5', count: 2});
            this.sourceList.push({ name: 'Universidad de Matanzas', count: 3});
            this.sourceList.push({ name: 'Universidad de 6', count: 2});
            this.sourceList.push({ name: 'Universidad de 7', count: 2});
            this.sourceList.push({ name: 'Universidad de 8', count: 2});
            this.sourceList.push({ name: 'Universidad de 9', count: 2});
            this.sourceList.push({ name: 'Universidad de la Habaan', count: 20});
            this.sourceList.push({ name: 'Universidad de 10', count: 2});
            this.sourceList.push({ name: 'Universidad de 11', count: 2});
            this.sourceList.push({ name: 'Universidad de 12', count: 2});
            this.sourceList.push({ name: 'Universidad de 13', count: 2});
            this.sourceList.push({ name: 'Universidad de 14', count: 2});
            this.sourceList.push({ name: 'Universidad de 14', count: 2});
            this.sourceList.push({ name: 'Universidad de 14', count: 2});

            this.paginatorLength = this.sourceList.length;
            this.paginator.length = this.paginatorLength;

            this.paginator.pageSize = 12;
            this.paginatorPageSize = this.paginator.pageSize;

            this.paginatorPageIndex = 0;
            this.paginator.firstPage();

            this.service.getSourcesByTermUUID(this.uuid)
            .pipe(
                catchError((err) => {
                    console.log(err);
                    
                    return of(null)
                })
            )
            .subscribe(
                {
                    next: (response) => {
                        console.log(response);
                        this.loadData();
                    },
                    error: (err) => {
                        console.log("error",err);
                    }
                }
            );
        }

    }

    loadData() {

        const start = this.paginator.pageIndex * this.paginator.pageSize;
        // const end =  this.paginator.pageIndex * this.paginator.pageSize + this.paginator.pageSize;

        this.data = this.sourceList.slice(start, start + 4);
        this.data1 = this.sourceList.slice(start + 4, start + 8);
        this.data2 = this.sourceList.slice(start + 8, start + 12);

        // console.log(this.data , this.data1, this.data2);
    }

}
export function customPaginatorLabel(): MatPaginatorIntl {
    const customPaginatorIntl = new MatPaginatorIntl();

    customPaginatorIntl.itemsPerPageLabel = 'Elementos por página:';

    return customPaginatorIntl;
}
