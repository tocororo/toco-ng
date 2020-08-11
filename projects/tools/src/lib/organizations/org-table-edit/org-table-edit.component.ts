import { Component, OnInit, ViewChild } from '@angular/core';
import { ContainerContent, TableContent, FormFieldType, TextInputAppearance, HintValue, HintPosition, InputContent, TextAlign, IconValue, IconSource, ContentPosition, CellContentWrap, TableComponent } from '@toco/tools/forms';
import { FormGroup } from '@angular/forms';
import { SortDirection, PageRequest, Page } from '@toco/tools/core';
import { Observable } from 'rxjs';
import { Organization } from '@toco/tools/entities';
import { ENDPOINT_APIS, OrganizationService } from '@toco/tools/backend';
import { map } from 'rxjs/operators';
import { Router, ActivatedRoute } from '@angular/router';

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
        this.identifiersContent = this._initIdentifiersContent();
        // this.identifiersContent_Complex = this._initIdentifiersContent_Complex();

        /* Sets an initial search value. */
        //this._inputSearch.formControl.setValue('cl');

        /***************************/

        // this.searchContent = this._initSearchContent();
        this.tableContent = this._initTableContent();

        /***************************/

        // this._tableControl.page.subscribe((value) => console.log('page', value));
    }

    /**
     * Returns the identifiers' content. 
     */
    private _initIdentifiersContent(): ContainerContent
    {
        return {
            'formSection': new FormGroup({ }, [ ]),
            'name': 'identifiers',
            'label': 'Organization Identifiers, different from GRID mapping',
            'type': FormFieldType.container_simple,
            'required': true,
            'value': undefined,
            'width': '100%',
//            'appearance': TextInputAppearance.outline,
            'ariaLabel': 'Organization Identifiers, different from GRID mapping',
            'formSectionContent': [
                {
                    'name': 'isni',   //idtype
                    'label': 'isni',  //idtype
                    'type': FormFieldType.identifier,
                    'required': true,
                    'value': 'Un_id_isni',
                    'width': '50%',
                    'appearance': TextInputAppearance.outline,
                    'ariaLabel': 'Identificador isni',
                    'startHint': new HintValue(HintPosition.start, 'Un identificador es una secuencia de letras')
                },
                {
                    'name': 'grid',   //grid
                    'label': 'grid',  //grid
                    'type': FormFieldType.identifier,
                    'required': true,
                    'value': 'Un_id_grid',
                    'width': '50%',
                    'appearance': TextInputAppearance.outline,
                    'ariaLabel': 'Identificador grid',
                    'startHint': new HintValue(HintPosition.start, 'Un identificador es una secuencia de letras')
                },
                {
                    'name': 'issn',   //grid
                    'label': 'ISSN',  //grid
                    'type': FormFieldType.issn,
                    'required': true,
                    //'value': 'Un_id_grid',
                    'width': '50%',
                    'appearance': TextInputAppearance.outline,
                    'ariaLabel': 'ISSN',
                    'startHint': new HintValue(HintPosition.start, 'Un ISSN!')
                },
            ]
        };
    }

    private _initIdentifiersContent_Complex(): ContainerContent
    {
        return {
            'formSection': new FormGroup({ }, [ ]),
            'name': 'identifiers_1',
            'label': 'Organization Identifiers 1, different from GRID mapping',
            'type': FormFieldType.container_simple,
            'required': true,
            'value': undefined,
            'width': '100%',
//            'appearance': TextInputAppearance.outline,
            'ariaLabel': 'Organization Identifiers 1, different from GRID mapping',
            'formSectionContent': [
                {
                    'name': 'isni',   //idtype
                    'label': 'isni',  //idtype
                    'type': FormFieldType.identifier,
                    'required': true,
                    'value': 'Un_id_isni',
                    'width': '50%',
                    'appearance': TextInputAppearance.outline,
                    'ariaLabel': 'Identificador isni',
                    'startHint': new HintValue(HintPosition.start, 'Un identificador es una secuencia de letras')
                },
                {
                    'name': 'grid',   //grid
                    'label': 'grid',  //grid
                    'type': FormFieldType.identifier,
                    'required': true,
                    'value': 'Un_id_grid',
                    'width': '50%',
                    'appearance': TextInputAppearance.outline,
                    'ariaLabel': 'Identificador grid',
                    'startHint': new HintValue(HintPosition.start, 'Un identificador es una secuencia de letras')
                },
                {
                    'formSection': new FormGroup({ }, [ ]),
                    'name': 'identifiers_2',
                    'label': 'Organization Identifiers 2, different from GRID mapping',
                    'type': FormFieldType.container_simple,
                    'required': true,
                    'value': undefined,
                    'width': '100%',
        //            'appearance': TextInputAppearance.outline,
                    'ariaLabel': 'Organization Identifiers 2, different from GRID mapping',
                    'formSectionContent': [
                        {
                            'name': 'isni',   //idtype
                            'label': 'isni',  //idtype
                            'type': FormFieldType.identifier,
                            'required': true,
                            'value': 'Un_id_isni',
                            'width': '50%',
                            'appearance': TextInputAppearance.outline,
                            'ariaLabel': 'Identificador isni',
                            'startHint': new HintValue(HintPosition.start, 'Un identificador es una secuencia de letras')
                        },
                        {
                            'name': 'grid',   //grid
                            'label': 'grid',  //grid
                            'type': FormFieldType.identifier,
                            'required': true,
                            'value': 'Un_id_grid',
                            'width': '50%',
                            'appearance': TextInputAppearance.outline,
                            'ariaLabel': 'Identificador grid',
                            'startHint': new HintValue(HintPosition.start, 'Un identificador es una secuencia de letras')
                        },
                    ]
                }
            ]
        };
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
        console.log('identifiersContent.parentFormSection: ', this.identifiersContent.parentFormSection);
        console.log('identifiersContent.formSection: ', this.identifiersContent.formSection);
        // console.log('identifiersContent.parentFormSection: ', this.identifiersContent_Complex.parentFormSection);
        // console.log('identifiersContent.formSection: ', this.identifiersContent_Complex.formSection);

		this._router.navigate(['organizaciones/adicionar']);
	}

}