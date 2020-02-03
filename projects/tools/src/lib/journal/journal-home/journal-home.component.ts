
import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material';
import { Subscription } from 'rxjs';

import { SourceService } from '@toco/tools/backend';
import { Common } from '@toco/tools/core';
import { Response } from '@toco/tools/entities';
import { TableContent, TableComponent } from '@toco/tools/forms';

export interface PeriodicElement
{
    titulo: string;
    issn: number;
}

const ELEMENT_DATA: PeriodicElement[] = [
    { titulo: 'Hydrogen', issn: 1 },
    { titulo: 'Helium', issn: 2 },
    { titulo: 'Lithium', issn: 3 },
    { titulo: 'Beryllium', issn: 4 },
    { titulo: 'Boron', issn: 5 },
    { titulo: 'Carbon', issn: 6 },
    { titulo: 'Nitrogen', issn: 7 },
    { titulo: 'Oxygen', issn: 8 },
    { titulo: 'Fluorine', issn: 9 },
    { titulo: 'Neon', issn: 10}
];

@Component({
    selector: 'toco-journal-home',
    templateUrl: './journal-home.component.html',
    styleUrls: ['./journal-home.component.scss']
})
export class JournalHomeComponent implements OnInit, OnDestroy
{
	private _journalsObserver = {
		next: (value: Response<any>) => {
            console.log(value)

            console.log(value.data);

            this.content = {
                'dataSource': new MatTableDataSource([]),
                //'dataSource': new MatTableDataSource(value.data.sources),
                'columnsObjectProperty': ['name', 'source_status', 'version_to_review'],
                'columnsHeaderText': ['Nombre', 'Estatus', 'Cambios a Revisar'],
                'propertyNameToNavigate': "uuid",
                'pageSize': 5,
                'pageSizeOptions': [5, 10, 20, 50],
                //'hidePageSize': true,
                'showFirstLastButtons': true
            };

            /* Initializes the `dataSource`. */
            //this.content.dataSource = new MatTableDataSource([]);
            //this.content.dataSource = new MatTableDataSource(value.data.sources);
		},
        error: (err: any) => { Common.logError('initializing journals', JournalHomeComponent.name, err); },
        complete: () => {
            /* It finished the loading of the data. */
            this._tableControl.loading = false;

            // this.content = {
            //     'dataSource': this.content.dataSource,
            //     'columnsObjectProperty': this.content.columnsObjectProperty,
            //     'columnsHeaderText': this.content.columnsHeaderText,
            //     'propertyNameToNavigate': this.content.propertyNameToNavigate,
            //     'pageSize': this.content.pageSize,
            //     //'hidePageSize': true,
            //     'showFirstLastButtons': this.content.showFirstLastButtons
            // };

            Common.logComplete('initializing journals', JournalHomeComponent.name);
        }
	};
	
    private _journalsSubscription: Subscription = null;

    @ViewChild(TableComponent, { static: true })
    private _tableControl: TableComponent;

    /**
     * The journals list. 
     */
    public content: TableContent;

    public constructor(private _souceService: SourceService)
    { }

    public ngOnInit(): void
    {
        /* It begins the loading of the data. */
        this._tableControl.loading = true;

        // this.content = {
        //     'columnsObjectProperty': ['name', 'source_status', 'version_to_review'],
        //     'columnsHeaderText': ['Nombre', 'Estatus', 'Cambios a Revisar'],
        //     'propertyNameToNavigate': "uuid",
        //     'pageSize': 10,
        //     //'hidePageSize': true,
        //     'showFirstLastButtons': true
        // };

        /* Gets the journals list. */
        this._journalsSubscription = this._souceService.getMySources()
            .subscribe(this._journalsObserver);
    }

    public ngOnDestroy(): void
    {
		/* Disposes the resources held by the subscription. */
		if (this._journalsSubscription)
		{
			this._journalsSubscription.unsubscribe();
		}
    }
}
