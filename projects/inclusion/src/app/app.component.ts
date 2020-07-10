
import { Component, OnInit, ViewChild } from '@angular/core';

import { BrowserSessionStorageService, UserService, SortDirection } from '@toco/tools/core';
import { TableContent, TableComponent, CellContentWrap, InputContent, TextAlign, TextInputAppearance, IconValue, IconSource, HintPosition, HintValue, ContentPosition, InputTextComponent } from '@toco/tools/forms';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit
{
    title = 'Registro de Publicaciones Científicas';

    // TODO: Parametrizar usando el vocabulario 'organismos', en el primer nivel tiene los organismos de nivel
    // superior, en principio esta app puede usarse para otros osde
    organization = 'Ministerio de Educación Superior';

    /**
     * The search filter. 
     */
	public searchContent: InputContent;

    @ViewChild('input_search', { static: true })
    private _inputSearch: InputTextComponent;

    /**
     * The sources list.
     * Use this field to initialize only; to change value use the `_tableControl` field.
     */
    public tableContent: TableContent<any>;

    @ViewChild(TableComponent, { static: true })
    private _tableControl: TableComponent;

    public constructor(private _userService: UserService, private _browserSessionStorageService: BrowserSessionStorageService)
    {
        // Delete this ...
        _browserSessionStorageService.set('green123', 'green0123456789');
        let test: string = _browserSessionStorageService.get('green123');
        console.log('The result is: ' + test);
        console.log('Good!');
    }

    public ngOnInit(): void
    {

        /* Sets an initial search value. */
        //this._inputSearch.internalControl.setValue('cl');

        /***************************/

        this.searchContent = this._initSearchContent();
        this.tableContent = this._initTableContent();

        /***************************/

        // this._tableControl.page.subscribe((value) => console.log('page', value));
    }

    private _initSearchContent(): InputContent
    {
        return {
            'width': '65%',

            'label': 'Write a text to search',
    
            'textAlign': TextAlign.left,
            'ariaLabel': 'Search',
    
            'appearance': TextInputAppearance.outline,
    
            'prefixIcon': new IconValue(IconSource.external, ContentPosition.prefix, 'search'),
    
            'startHint': new HintValue(HintPosition.start, 'Searches when typing stops.')
        };
    }

    private _initTableContent(): TableContent<any>
    {
        return {
            'columnsObjectProperty': ['id', 'name', 'registrationDate'],
            'columnsHeaderText': ['id', 'name', 'registrationDate'],
            'columnsWidth': ['60%', '22%', '18%'],
            'columnContentWrap': [CellContentWrap.ellipsis, CellContentWrap.ellipsis, CellContentWrap.responsible],
            'createCssClassesForRow': (rowData: any) => {
                return {
                    'new-release': rowData['version_to_review'],
                    'selected-row': (rowData[this.tableContent.propertyNameToIdentify]) == this._tableControl.selectedRow
                };
            },
            'propertyNameToIdentify': 'id',

            'filter': {
                'search': this._inputSearch,
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

            'endpoint': this._userService.page.bind(this._userService),

            actions: [
                { icon: 'visibility', route: 'view', tooltip: 'Ver' },
                { icon: 'edit', route: 'edit', tooltip: 'Editar' },
            ]
        };
    }
}
