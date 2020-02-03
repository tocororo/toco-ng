
import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MatTableDataSource, MatSort, MatPaginator } from '@angular/material';

/**
 * An interface that represents the content of a table control.
 */
export interface TableContent
{
    /**
     * Returns the data source. 
     * By default, its value is `MatTableDataSource([])`. 
     */
    dataSource?: MatTableDataSource<any>;



    /**
     * Returns the array of strings that indicates the object property name of the columns. 
     * By default, its value is `[]`. 
     */
    columnsObjectProperty?: string[];

    /**
     * Returns the array of strings that indicates the header text of the columns. 
     * By default, its value is `[]`. 
     */
    columnsHeaderText?: string[];

    /**
     * Returns a function that creates the list of CSS classes to apply to the table rows. 
     * In order to take effect these classes, the table CSS file must have defined these classes. 
     * By default, its value is `undefined`. 
     * @param rowData The data that is contained in the row. 
     */
    createCssClassesForRow?: (rowData: any) => { [className: string]: boolean; };



    /**
     * Returns the property name of the data contained in `dataSource` that is used to identify that data. 
     * By default, its value is `''`. 
     */
    propertyNameToIdentify?: string;

    /**
     * Returns the property name of the data contained in `dataSource` that is used to navigate 
     * to the view and shows information about that data. 
     * By default, its value is `''`. 
     */
    propertyNameToNavigate?: string;



    /**
     * Returns the length of the total number of items that are being paginated. 
     * By default, its value is `0`. 
     */
    length?: number;

    /**
     * Returns the zero-based page index of the displayed list of items. 
     * By default, its value is `0`. 
     */
    pageIndex?: number;

    /**
     * Returns the number of items to display on a page. 
     * By default, its value is `50`. 
     */
    pageSize?: number;

    /**
     * Returns the set of provided page size options to display to the user. 
     * By default, its value is `[10, 20, 50]`. 
     */
    pageSizeOptions?: number[];

    /**
     * Returns true if it hides the page size selection UI from the user; otherwise, false. 
     * By default, its value is `false`. 
     */
    hidePageSize?: boolean;

    /**
     * Returns true if it shows the first/last buttons UI to the user; otherwise, false. 
     * By default, its value is `false`. 
     */
    showFirstLastButtons?: boolean;
}

/**
 * Returns a new object that represents the default `TableContent`. 
 */
export function defaultTableContent(): TableContent
{
    return {
        'dataSource': new MatTableDataSource([]),  /* The default data source does not contain element. */

        'columnsObjectProperty': [],
        'columnsHeaderText': [],
        'createCssClassesForRow': undefined,

        'propertyNameToIdentify': '',
        'propertyNameToNavigate': '',

        'length': 0,
        'pageIndex': 0,
        'pageSize': 50,
        'pageSizeOptions': [10, 20, 50],
        'hidePageSize': false,
        'showFirstLastButtons': false
    };
}

/**
 * @description
 * Represents a table control. 
 */
@Component({
    selector: 'toco-table',
    templateUrl: './table.component.html',
    styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit
{
    /**
     * Returns true if it is loading the data source; otherwise, false. 
     * By default, its value is `false`. 
     */
    public loading: boolean;

    private _content: TableContent;
    private static readonly _defaultDataSource: MatTableDataSource<any> = new MatTableDataSource([ { } ]);  /* Returns a data source with only one empty element. */
    private _selectedRow: number;  /* Represents the selected row. */

    /**
     * Returns true if the data source is empty; otherwise, false. 
     */
    public isEmpty: boolean;

    @ViewChild(MatSort, { static: true })
    private _sort: MatSort;

    @ViewChild(MatPaginator, { static: true })
    private _paginator: MatPaginator;

    public constructor(private _router: Router, private _activatedRoute: ActivatedRoute)
    { }

    public ngOnInit()
    {
        /* Sets the default values only if the `_content` has not been set yet. */
        if (this._content == undefined) this.init();
    }

    /**
     * Returns true if the data source is empty; otherwise, false. 
     */
    private get _isEmpty(): boolean
    {
        return (this._content.dataSource.data.length == 0);
    }

    /**
     * Initializes the `content` input property. 
     */
    protected init(): void
    {
        /* Sets the default values. */

        if (this._content == undefined) this._content = { };  /* This code line must be here. */

        /**************************** `mat-cell` properties. ******************************/
        if (this._content.columnsObjectProperty == undefined) this._content.columnsObjectProperty = [];
        if (this._content.columnsHeaderText == undefined) this._content.columnsHeaderText = [];
        if (this._content.createCssClassesForRow == undefined) this._content.createCssClassesForRow = this.defaultCreateCssClassesForRow.bind(this);

        /**************************** `mat-row` properties. *******************************/
        if (this._content.propertyNameToIdentify == undefined) this._content.propertyNameToIdentify = '';
        if (this._content.propertyNameToNavigate == undefined) this._content.propertyNameToNavigate = '';

        /************************* `mat-paginator` properties. ****************************/
        if (this._content.length == undefined) this._content.length = 0;
        if (this._content.pageIndex == undefined) this._content.pageIndex = 0;
        if (this._content.pageSize == undefined) this._content.pageSize = 50;
        if (this._content.pageSizeOptions == undefined) this._content.pageSizeOptions = [10, 20, 50];
        if (this._content.hidePageSize == undefined) this._content.hidePageSize = false;
        if (this._content.showFirstLastButtons == undefined) this._content.showFirstLastButtons = false;

        /************************** Internal control properties. **************************/

        /******************************* Other properties. ********************************/

        /*********** (Must be the last initialization) `mat-table` properties. ************/
        this.data = (this._content.dataSource && this._content.dataSource.data);  /* By default, its value is set to `[]` because the default data does not contain element. */
    }

    /**
     * Returns the list of CSS classes to apply to the table rows. This method must be only overwrite, 
     * but must never be called for performance reason; it is called in the correct places internally. 
     * In order to take effect these classes, the table CSS file must have defined these classes. 
     * @param rowData The data that is contained in the row. 
     */
    protected defaultCreateCssClassesForRow(rowData: any): { [className: string]: boolean; }
    {
        return {
            'selected-row': (rowData[this._content.propertyNameToIdentify]) == this._selectedRow
        };
    }

    /**
     * Returns true if it is loading the data source; otherwise, false. 
     */
    public get isLoading(): boolean
    {
        return this.loading;
    }

    /**
     * Returns the selected row. 
     */
    public get selectedRow(): number
    {
        return this._selectedRow;
    }

    /**
     * Returns the input field that contains the content of this class (the table control content to show). 
     */
    @Input()
    public get content(): TableContent
    {
        return this._content;
    }

	/**
	 * Sets the input field that contains the content of this class (the table control content to show). 
     * @param newContent The new content to set. 
     * If the value is null, sets the `defaultTableContent`. 
	 */
    public set content(newContent: TableContent | null)
    {
        this._content = newContent;
        this.init();
    }

    /**
     * Returns the array of data that should be rendered by the table, where each object represents one row. 
     * By default, its value is `[]`. 
     */
    public get data(): any[]
    {
        return this._content.dataSource.data;
    }

	/**
	 * Sets the array of data that should be rendered by the table, where each object represents one row. 
     * If the value is null, sets the `[]`. 
     * @param newData The new data to set. 
	 */
    public set data(newData: any[] | null)
    {
        newData = newData || [];  /* The default data does not contain element. */

        if (this._content.dataSource == undefined) this._content.dataSource = new MatTableDataSource(newData);
        else this._content.dataSource.data = newData;

        if (this._content.dataSource.sort == undefined) this._content.dataSource.sort = this._sort;
        if (this._content.dataSource.paginator == undefined) this._content.dataSource.paginator = this._paginator;

        this.checkColumn();

        /* Sets the `isEmpty` field depending on the `_content.dataSource` value. */
        this.isEmpty = this._isEmpty;
    }

    /**
     * Returns the data source. If the data source is empty, then returns the default data source 
     * that contains only one empty element (it is used to show one row that contains the empty 
     * table information). For internal use only. 
     */
    public get _getDataSource(): MatTableDataSource<any>
    {
        if (this.isEmpty) return TableComponent._defaultDataSource;

        return this._content.dataSource;
    }

    /**
     * Checks column. Logs a warn to the console is the array of columns is empty. 
     */
    public checkColumn(): void
    {
        if ((this._content.columnsObjectProperty.length == 0) || (this._content.columnsHeaderText.length == 0))
        {
            console.warn("The 'columnsObjectProperty' or 'columnsHeaderText' fields are empty.");
        }
    }

    /**
     * Navigates to the view that shows information about the specified `rowData`. 
     * @param rowData The data that is contained in the row. 
     */
    public navigateTo(rowData: any): void
    {
        /* Saves the selected row. */
        this._selectedRow = rowData[this._content.propertyNameToIdentify];

        /* Navigates to the specified view. */
        this._router.navigate([ rowData[this._content.propertyNameToNavigate] ], { relativeTo: this._activatedRoute });
    }
}
