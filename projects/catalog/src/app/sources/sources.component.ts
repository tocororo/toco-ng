
import { Component, OnInit, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { PageRequest, Page, SimpleFilter, UserService, SortDirection } from '@toco/tools/core';
import { SourceService } from '@toco/tools/backend';
import { TableContent, TableComponent, CellContentWrap } from '@toco/tools/forms';
import { Response } from '@toco/tools/entities';

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
    public content: TableContent<any, SimpleFilter>;

    //public constructor(private _souceService: SourceService)
    public constructor(private _userService: UserService)
    { }

    public ngOnInit(): void
    {
        this.content = this._initTableContent();

        this._tableControl.page.subscribe((value) => console.log('page', value));
    }

    private _initTableContent(): TableContent<any, SimpleFilter> {
        return {
            //'columnsObjectProperty': ['name', 'source_status', 'version_to_review'],
            'columnsObjectProperty': ['id', 'name', 'registrationDate'],
            //'columnsHeaderText': ['Nombre', 'Estatus', 'Acciones'],
            'columnsHeaderText': ['id', 'name', 'registrationDate'],
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

            'filter': {
                'search': '',
                //'registration': undefined
            },
            'sort': {
                'active': 'id',
                'direction': SortDirection.desc
            },
            'pageIndex': 0,
            'pageSize': 5,
            'pageSizeOptions': [5, 10, 20, 50],
            //'hidePageSize': true,
            'showFirstLastButtons': true,

            //'endpoint': this._getMySources.bind(this),
            'endpoint': this._userService.page.bind(this._userService),

            actions: [
                { icon: 'visibility', route: 'view', tooltip: 'Ver' },
                { icon: 'edit', route: 'edit', tooltip: 'Editar' },
            ]
        };
    }

    // private _getMySources(pageRequest: PageRequest<SimpleFilter>): Observable<Page<any>>
    // {
    //     return this._souceService.getMySources(pageRequest.paginator.pageSize, (pageRequest.paginator.pageIndex + 1)).pipe(
    //         map((response: Response<any>): Page<any> => {
    //             console.log('Sources Response: ', response);

    //             return {
    //                 'data': response.data.sources.sources,
    //                 'totalData': response.data.sources.count,
    //                 'pageIndex': pageRequest.paginator.pageIndex,
    //                 'pageSize': pageRequest.paginator.pageSize
    //             };
    //         })
    //     );
    // }
}
