
import { Component, OnInit, ViewChild } from '@angular/core';

import { TableContent, TableComponent, CellContentWrap } from '@toco/tools/forms';

import { UserService } from './user.service';

@Component({
    selector: 'toco-sources',
    templateUrl: './sources.component.html',
    styleUrls: ['./sources.component.scss']
})
export class SourcesComponent implements OnInit
{
    @ViewChild(TableComponent, { static: true })
    private _tableControl: TableComponent;

    /**
     * The sources list.
     * Use this field to initialize only; to change value use the `_tableControl` field.
     */
    public content: TableContent;

    //public constructor(private _souceService: SourceService) { }
    public constructor(private _userService: UserService)
    { }

    //{ size: number = 10, page: number = 1 }
    //getMySources({ 'size': 10, 'page': 1 }): Observable<Response<any>>;
    //getMySources<T>(args: { [arg: string]: any }): Observable<T>;

    public ngOnInit(): void
    {
        this.content = this._initTableContent();
    }

    private _initTableContent(): TableContent {
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
