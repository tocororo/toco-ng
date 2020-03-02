
import { Component, OnInit, OnDestroy, ViewChild, AfterViewInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { switchMap } from 'rxjs/operators';

import { SourceService } from '@toco/tools/backend';
import { Common } from '@toco/tools/core';
import { Response } from '@toco/tools/entities';
import { TableContent, TableComponent, CellContentWrap } from '@toco/tools/forms';

import { UserService, Page, User } from './user.service';

@Component({
    selector: 'toco-sources',
    templateUrl: './sources.component.html',
    styleUrls: ['./sources.component.scss']
})
export class SourcesComponent implements OnInit, AfterViewInit, OnDestroy
{
    private _sourcesObserver = {
        //next: (response: Response<any>) => {
        next: (response: Page<User>) => {
            console.log('_sourcesObserver: ', response);

            /* Initializes the `page`. */
            //this._tableControl.page = [];
            //this._tableControl.page = { 'data': response.data.sources.sources, 'totalData': response.data.sources.count };
            this._tableControl.page = { 'data': response.content, 'totalData': response.totalElements };
        },
        error: (err: any) => {
            Common.logError('initializing sources', SourcesComponent.name, err);
        },
        complete: () => {
            /* It finished the loading of the data. In this way, it hides the loading progress control. */
            this._tableControl.loading = false;

            Common.logComplete('initializing sources', SourcesComponent.name);
        }
    };

    private _sourcesSubscription: Subscription = null;

    @ViewChild(TableComponent, { static: true })
    private _tableControl: TableComponent;

    /**
     * The sources list.
     * Use this field to initialize only; to change value use the `_tableControl` field.
     */
    public content: TableContent;

    //public constructor(private _souceService: SourceService) { }
    public constructor(private _userService: UserService) { }

    //{ size: number = 10, page: number = 1 }
    //getMySources({ 'size': 10, 'page': 1 }): Observable<Response<any>>;
    //getMySources<T>(args: { [arg: string]: any }): Observable<T>;

    public ngOnInit(): void
    {
        console.log('ngOnInit: SourcesComponent');

        /* It begins the loading of the data. In this way, it shows the loading progress control. */
        //this._tableControl.loading = true;
        this.content = this.initTableContent();
    }

    countTemp: number = 0;
    public ngAfterViewInit(): void
    {
        console.log('ngAfterViewInit: SourcesComponent');

        /* Gets the sources list. */
        //this._tableControl.aaa_123(this._souceService.getMySources);
//        this._tableControl.aaa_123();
        // this._tableControl.aaa_123().pipe(
        //     switchMap((paginator) => {
        //         console.log('Call _userService', this.countTemp++);
                
        //         //return this._souceService.getMySources(paginator.pageSize, (paginator.pageIndex + 1));
        //         return this._userService.page(
        //             {
        //                 page: paginator.pageIndex,
        //                 size: paginator.pageSize,
        //                 sort: { property: 'id', order: 'desc' }
        //             },
        //             {
        //                 search: '',
        //                 registration: undefined
        //             }
        //         );
        //     })
        // )
        // .subscribe(this._sourcesObserver);
    }

    public ngOnDestroy(): void {
        /* Disposes the resources held by the subscription. */
        if (this._sourcesSubscription) {
            this._sourcesSubscription.unsubscribe();
        }
    }

    private initTableContent(): TableContent {
        return {
            'endpoint' : this._userService.page.bind(this._userService),
            //'columnsObjectProperty': ['name', 'source_status', 'version_to_review'],
            'columnsObjectProperty': ['id', 'name', 'registration'],
            //'columnsHeaderText': ['Nombre', 'Estatus', 'Acciones'],
            'columnsHeaderText': ['id', 'name', 'registration'],
            'columnsWidth': ['60%', '22%', '18%'],
            'columnContentWrap': [CellContentWrap.ellipsis, CellContentWrap.ellipsis, CellContentWrap.responsible],
            'createCssClassesForRow': (rowData: any) => {
                return {
                    'new-release': rowData['version_to_review'],
                    'selected-row': (rowData[this.content.propertyNameToIdentify]) == this._tableControl.selectedRow
                };
            },
            //'propertyNameToIdentify': 'uuid',
            'propertyNameToIdentify': 'id',

//            'length': this.page.count,
            'pageIndex': 0,
            'pageSize': 5,
            'pageSizeOptions': [5, 10, 20, 50],
            //'hidePageSize': true,
            'showFirstLastButtons': true,

            actions: [
                { icon: 'visibility', route: 'view', tooltip: 'Ver' },
                { icon: 'edit', route: 'edit', tooltip: 'Editar' },
            ]
        };
    }
}
