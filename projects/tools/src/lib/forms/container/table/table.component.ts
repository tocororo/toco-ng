
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
     * By default, its value is `MatTableDataSource([ ])`. 
     */
    dataSource?: MatTableDataSource<any>;



    /**
     * Returns the array of strings that indicates the object property name of the columns. 
     * By default, its value is `['column1', 'column2', 'column3']`. 
     */
    columnsObjectProperty?: string[];

    /**
     * Returns the array of strings that indicates the header text of the columns. 
     * By default, its value is `['Column 1', 'Column 2', 'Column 3']`. 
     */
    columnsHeaderText?: string[];



    /**
     * Returns the property name of the data contained in `dataSource`; it is used to navigate 
     * to the view that shows information about that data. 
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
        'dataSource': new MatTableDataSource([ ]),  /* The default data source does not contain element. */

        'columnsObjectProperty': ['column1', 'column2', 'column3'],  /* Contains three possible columns. */
        'columnsHeaderText': ['Column 1', 'Column 2', 'Column 3'],  /* Contains three possible columns. */

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
    private _content: TableContent;
    private static readonly _defaultDataSource: MatTableDataSource<any> = new MatTableDataSource([ { } ]);  /* Returns a data source with only one empty element. */

    /**
     * Returns true if the data source is empty; otherwise, false. 
     */
    public isEmpty: boolean;

    @ViewChild(MatSort, { static: true })
    private sort: MatSort;

    @ViewChild(MatPaginator, { static: true })
    private paginator: MatPaginator;

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

        /**************************** `mat-table` properties. *****************************/
        if (this._content.dataSource == undefined) this._content.dataSource = new MatTableDataSource([ ]);  /* The default data source does not contain element. */
        this._content.dataSource.sort = this.sort;
        this._content.dataSource.paginator = this.paginator;
        /* Sets the `isEmpty` field depending on the `_content.dataSource` value. */
        this.isEmpty = this._isEmpty;

        /**************************** `mat-cell` properties. ******************************/
        if (this._content.columnsObjectProperty == undefined) this._content.columnsObjectProperty = ['column1', 'column2', 'column3'];  /* Contains three possible columns. */
        if (this._content.columnsHeaderText == undefined) this._content.columnsHeaderText = ['Column 1', 'Column 2', 'Column 3'];  /* Contains three possible columns. */

        /**************************** `mat-row` properties. *******************************/
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
     * If the value is null, sets the `defaultTableContent`. 
	 * @param newContent The new content to set. 
	 */
    public set content(newContent: TableContent | null)
    {
        this._content = newContent;
        this.init();
    }

    /**
     * Returns the data source. If the data source is empty, then returns the default data source 
     * that contains only one empty element (it is used to show one row that contains the empty 
     * table information). 
     */
    public get getDataSource(): MatTableDataSource<any>
    {
        if (this.isEmpty) return TableComponent._defaultDataSource;

        return this._content.dataSource;
    }

    /**
     * Navigates to the view that shows information about the specified `rowData`. 
     * @param rowData The data that is contained in the row. 
     */
    public navigateTo(rowData: any): void
    {
        this._router.navigate([ rowData[this._content.propertyNameToNavigate] ], { relativeTo: this._activatedRoute });
    }
}
