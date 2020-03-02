
import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';

import { SourceService } from '@toco/tools/backend';
import { Common } from '@toco/tools/core';
import { Response, Source } from '@toco/tools/entities';
import { TableContent, TableComponent, CellContentWrap } from '@toco/tools/forms';
import { PageEvent } from '@angular/material';

@Component({
    selector: 'toco-sources',
    templateUrl: './sources.component.html',
    styleUrls: ['./sources.component.scss']
})
export class SourcesComponent implements OnInit, OnDestroy {
    public data: { count: number, sources: Source[] } = { count: 0, sources: [] };
    pageIndex = 0;
    pageSize = 10;

    private _journalsObserver = {
        next: (event: PageEvent) => {
            console.log(event);
            this.pageIndex = event.pageIndex;
            this.pageSize = event.pageSize;
            this._tableControl.loading = true;
            this._souceService.getMySources(this.pageSize, this.pageIndex + 1)
                .subscribe(
                    (response: Response<any>) => {
                        console.log(response);
                        this.data = response.data.sources;


                        this._tableControl.data = this.data.sources;
                        this._tableControl.content.length = this.data.count;
                        // this._tableControl.content. = this.sources.count;

                        // this.content.pageIndex = this.pageIndex;
                        // this.content.pageSize = this.pageSize;
                        // this.content.length = this.sources.count;

                        // this._tableControl.content.dataSource.paginator.length = this.sources.count;
                    },
                    (err: any) => {
                        Common.logError('initializing journals', SourcesComponent.name, err);
                    },
                    () => {
                        /* It finished the loading of the data. In this way, it hides the loading progress control. */
                        this._tableControl.loading = false;

                        Common.logComplete('initializing journals', SourcesComponent.name);
                    }
                );
        },
        error: (event) => {
            console.log(event);
        },
        complete: (event) => {
            console.log(event);
        }
    };

    private _journalsSubscription: Subscription = null;

    @ViewChild(TableComponent, { static: true })
    private _tableControl: TableComponent;

    /**
     * The journals list.
     * Use this field to initialize only; to change value use the `_tableControl` field.
     */
    public content: TableContent;

    public constructor(private _souceService: SourceService) { }

    public ngOnInit(): void {

        /* It begins the loading of the data. In this way, it shows the loading progress control. */
        this._tableControl.loading = true;
        this.content = this.getTableContent();

        /* Gets the journals list. */
        this._souceService.getMySources(3000000, this.pageIndex + 1)
            .subscribe(
                (value: Response<any>) => {
                    console.log(value);
                    this.data = value.data.sources;
                    /* Initializes the `data`. */
                    //this._tableControl.data = [];
                    this._tableControl.data = this.data.sources;
                    this._tableControl.content.length = this.data.count;

                    // this._tableControl.content.length = this.sources.count;

                    // this._journalsSubscription = this._tableControl.content.dataSource.paginator.page.subscribe(this._journalsObserver
                    // );

                },
                (err: any) => {
                    Common.logError('initializing journals', SourcesComponent.name, err);
                },
                () => {
                    /* It finished the loading of the data. In this way, it hides the loading progress control. */
                    this._tableControl.loading = false;

                    Common.logComplete('initializing journals', SourcesComponent.name);
                }
            );


    }

    public ngOnDestroy(): void {
        /* Disposes the resources held by the subscription. */
        if (this._journalsSubscription) {
            this._journalsSubscription.unsubscribe();
        }
    }

    getTableContent(): TableContent {
        return {
            'columnsObjectProperty': ['name', 'source_status', 'version_to_review'],
            'columnsHeaderText': ['Nombre', 'Estatus', 'Acciones'],
            'columnsWidth': ['60%', '22%', '18%'],
            'columnContentWrap': [CellContentWrap.ellipsis, CellContentWrap.ellipsis, CellContentWrap.responsible],
            'createCssClassesForRow': (rowData: any) => {
                return {
                    'new-release': rowData['version_to_review'],
                    'selected-row': (rowData[this.content.propertyNameToIdentify]) == this._tableControl.selectedRow
                };
            },
            'propertyNameToIdentify': 'uuid',
            'pageSize': this.pageSize,
            'pageIndex': this.pageIndex,
            'length': this.data.count,
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


