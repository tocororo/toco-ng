
import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { timer, Subscription } from 'rxjs';

import { Common } from '@toco/tools/core';
import { TableContent, TableComponent } from '@toco/tools/forms';

export interface PeriodicElement
{
    titulo: string;
    issn: number;
    status: boolean;
}

const ELEMENT_DATA: PeriodicElement[] = [
    { titulo: 'Hydrogen', issn: 1, status: false },
    { titulo: 'Helium', issn: 2, status: false },
    { titulo: 'Lithium', issn: 3, status: true },
    { titulo: 'Beryllium', issn: 4, status: true },
    { titulo: 'Boron', issn: 5, status: false },
    { titulo: 'Carbon', issn: 6, status: true },
    { titulo: 'Nitrogen', issn: 7, status: false },
    { titulo: 'Oxygen', issn: 8, status: false },
    { titulo: 'Fluorine', issn: 9, status: true },
    { titulo: 'Neon', issn: 10, status: true },
    { titulo: 'Hydrogen', issn: 11, status: false },
    { titulo: 'Helium', issn: 12, status: false },
    { titulo: 'Lithium', issn: 13, status: false },
    { titulo: 'Beryllium', issn: 14, status: false },
    { titulo: 'Boron', issn: 15, status: true },
    { titulo: 'Carbon', issn: 16, status: false },
    { titulo: 'Nitrogen', issn: 17, status: false },
    { titulo: 'Oxygen', issn: 18, status: false },
    { titulo: 'Fluorine', issn: 19, status: false },
    { titulo: 'Neon', issn: 20, status: true }
];

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy
{
    title = 'Registro de Publicaciones Científicas';

    // TODO: Parametrizar usando el vocabulario 'organismos', en el primer nivel tiene los organismos de nivel
    // superior, en principio esta app puede usarse para otros osde
    organization = 'Ministerio de Educación Superior';

	private _journalsObserver = {
		next: (value: number) => {
            /* Initializes the `data`. */
            //this._tableControl.data = [];
            this._tableControl.data = ELEMENT_DATA;
		},
        error: (err: any) => { Common.logError('initializing journals', AppComponent.name, err); },
        complete: () => {
            /* It finished the loading of the data. In this way, it hides the loading progress control. */
            this._tableControl.loading = false;

            Common.logComplete('initializing journals', AppComponent.name);
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

    public constructor()
    { }

    public ngOnInit(): void
    {
        /* It begins the loading of the data. In this way, it shows the loading progress control. */
        this._tableControl.loading = true;

        this.content = {
            'columnsObjectProperty': ['titulo', 'issn', 'status'],
            'columnsHeaderText': ['Título', 'ISSN', 'Status'],
            'createCssClassesForRow': (rowData: any) => {
                return {
                    'new-release': rowData['status'],
                    'selected-row': (rowData[this.content.propertyNameToIdentify]) == this._tableControl.selectedRow
                };
            },
            'propertyNameToIdentify': 'issn',
            'propertyNameToNavigate': 'uuid',
            'pageSize': 10,
            //'hidePageSize': true,
            'showFirstLastButtons': true
        };

        this._journalsSubscription = timer(1500)
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
