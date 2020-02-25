
import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';

import { SourceService } from '@toco/tools/backend';
import { Common } from '@toco/tools/core';
import { Response } from '@toco/tools/entities';
import { TableContent, TableComponent, CellContentWrap } from '@toco/tools/forms';

@Component({
    selector: 'toco-sources',
    templateUrl: './sources.component.html',
    styleUrls: ['./sources.component.scss']
})
export class SourcesComponent implements OnInit, OnDestroy
{
	private _journalsObserver = {
		next: (value: Response<any>) => {
            //console.log(value.data);

            /* Initializes the `data`. */
            //this._tableControl.data = [];
            this._tableControl.data = value.data.sources;
		},
        error: (err: any) => { Common.logError('initializing journals', SourcesComponent.name, err); },
        complete: () => {
            /* It finished the loading of the data. In this way, it hides the loading progress control. */
            this._tableControl.loading = false;

            Common.logComplete('initializing journals', SourcesComponent.name);
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

    public constructor(private _souceService: SourceService)
    { }

    public ngOnInit(): void
    {
        /* It begins the loading of the data. In this way, it shows the loading progress control. */
        this._tableControl.loading = true;

        this.content = {
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
            'pageSize': 10,
            'pageSizeOptions': [5, 10, 20, 50],
            //'hidePageSize': true,
            'showFirstLastButtons': true,
            actions: [
                {icon: 'visibility', route: 'view', tooltip: 'Ver'},
                {icon: 'edit', route: 'edit', tooltip: 'Editar'},
            ]
        };

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
