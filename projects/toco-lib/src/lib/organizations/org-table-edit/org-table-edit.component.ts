
import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { UserService, SortDirection, PageRequest, Page } from '../../core/public-api';
import { ENDPOINT_APIS, OrganizationService } from '../../backend/public-api';
import { Organization } from '../../entities/public-api';
import { TableContent, TableComponent, CellContentWrap, InputContent, TextAlign, 
    TextInputAppearance, IconValue, IconSource, HintPosition, HintValue, ContentPosition, 
    ContainerContent, InputTextComponent } from '../../forms/public-api';

@Component({
  selector: 'toco-org-table-edit',
  templateUrl: './org-table-edit.component.html',
  styleUrls: ['./org-table-edit.component.scss']
})
export class OrgTableEditComponent implements OnInit {

    /**
     * Contains the content of the identifiers section. 
     */
    public identifiersContent: ContainerContent;
    // public identifiersContent_Complex: ContainerContent;

    /**
     * The search filter. 
     */
	// public searchContent: InputContent;

    // @ViewChild('input_search', { static: true })
    // private _inputSearch: InputTextComponent;

    /**
     * The sources list.
     * Use this field to initialize only; to change value use the `_tableControl` field.
     */
    public tableContent: TableContent<any>;

    @ViewChild(TableComponent, { static: true })
    private _tableControl: TableComponent;

    public constructor(private _router: Router, private _activatedRoute: ActivatedRoute, private _organizationService: OrganizationService)
    //public constructor(private _userService: UserService)
	{ }

	public ngOnInit(): void
	{
        /* Sets an initial search value. */
        //this._inputSearch.formControl.setValue('cl');

        /***************************/

        // this.searchContent = this._initSearchContent();
        this.tableContent = this._initTableContent();

        /***************************/

        // this._tableControl.page.subscribe((value) => console.log('page', value));
    }

    private _initSearchContent(): InputContent
    {
        return {
            'formControl': InputTextComponent.getFormControlByDefault(),
            'width': '65%',

            'label': 'Write a text to search',
            'controlType': InputTextComponent,
    
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
            'columnsObjectProperty': ['name', 'status', 'email_address'],
            //'columnsObjectProperty': ['id', 'name', 'registrationDate'],
            'columnsHeaderText': ['Nombre', 'Estatus', 'Dirección de Correo'],
            //'columnsHeaderText': ['id', 'name', 'registrationDate'],
            'columnsWidth': ['60%', '22%', '18%'],
            'columnContentWrap': [CellContentWrap.ellipsis, CellContentWrap.ellipsis, CellContentWrap.responsible],
            'createCssClassesForRow': (rowData: any) => {
                return {
                    //'new-release': rowData['email_address'],
                    'selected-row': (rowData[this.tableContent.propertyNameToIdentify]) == this._tableControl.selectedRow
                };
            },
            'propertyNameToIdentify': 'id',
            //'propertyNameToIdentify': 'id',

            // 'filter': {
            //     'search': this._inputSearch,
            //     //'registration': undefined
            // },
            'sort': {
                'active': 'id',
                'direction': SortDirection.desc
            },
            'pageIndex': 0,
            'pageSize': 5,
            'pageSizeOptions': [5, 10, 20, 50],
            //'hidePageSize': true,
            'showFirstLastButtons': true,

            'endpoint': this._getMySources.bind(this),
            //'endpoint': this._userService.page.bind(this._userService),

            actions: [
                { icon: 'visibility', route: 'ver', tooltip: 'Ver' },
                { icon: 'edit', route: 'editar', tooltip: 'Editar' },
            ]
        };
    }

    private _getMySources(pageRequest: PageRequest): Observable<Page<any>>
    {
        return this._organizationService.get<Organization[]>(ENDPOINT_APIS.organizations, []).pipe(
            map((response: Organization[]): Page<Organization> => {
                console.log('Organizations Response: ', response);
                // if (response && response.status != ResponseStatus.ERROR){
                    return {
                        'data': response,
                        'totalData': response.length,
                        'pageIndex': pageRequest.paginator.pageIndex,
                        'pageSize': pageRequest.paginator.pageSize
                    };
                // }
                
            })
        );
	}
	
	public doOperation(): void
	{
		this._router.navigate(['organizaciones/adicionar']);
	}

}
