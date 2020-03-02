
import { Component, OnInit, ViewChild, Input, EventEmitter, Output } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MatTableDataSource, MatSort, MatPaginator, PageEvent } from '@angular/material';

/**
 * A collection of CSS styles. 
 */
export type CssStyles = {
    [styleName: string]: string;
};

/**
 * An enum that represents how to wrap the content of a table cell. 
 */
export enum CellContentWrap
{
    /**
     * The `break` wrap breaks the content when reaching the end of a line. 
     */
    break,

    /**
     * The `ellipsis` wrap clips the remaining content and renders an ellipsis ("...") to represent the clipped content. 
     */
    ellipsis,

    /**
     * The `responsible` wrap is the default style. It only applies the responsible styles that are defined in the table. 
     */
    responsible
}

export interface TableAction {
    icon: string;
    route: string;
    tooltip: string;
}

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
     * Returns the array of strings that indicates the width of the columns. 
     * By default, its value is `[]`. 
     */
    columnsWidth?: string[];

    /**
     * Returns the array of `CellContentWrap` that indicates how to wrap the content of the columns. 
     * By default, its value is `[]`. 
     */
    columnContentWrap?: CellContentWrap[];

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

    actions?: TableAction[];
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
        'columnsWidth': [],
        'columnContentWrap': [],
        'createCssClassesForRow': undefined,

        'propertyNameToIdentify': '',

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
        if (this._content.columnsWidth == undefined) this._content.columnsWidth = [];
        if (this._content.columnContentWrap == undefined) this._content.columnContentWrap = [];
        if (this._content.createCssClassesForRow == undefined) this._content.createCssClassesForRow = this.defaultCreateCssClassesForRow.bind(this);

        /**************************** `mat-row` properties. *******************************/
        if (this._content.propertyNameToIdentify == undefined) this._content.propertyNameToIdentify = '';

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
     * Returns the list of CSS styles to apply to the table headers. This method must never be called 
     * because it is for internal use only; it is called in the correct places internally. 
     * @param pos The column position. 
     */
    public _createCssStylesForHeader(pos: number): CssStyles
    {
        let result: CssStyles = {};

        this._addCssStyles_CellWidth(result, pos);

        return result;
    }

    /**
     * Returns the list of CSS styles to apply to the table cells. This method must never be called 
     * because it is for internal use only; it is called in the correct places internally. 
     * @param pos The column position. 
     */
    public _createCssStylesForCell(pos: number): CssStyles
    {
        let result: CssStyles = {};

        this._addCssStyles_CellWidth(result, pos);
        this._addCssStyles_CellContentWrap(result, pos);

        return result;
    }

    private _addCssStyles_CellWidth(cssStyles: CssStyles, pos: number): void
    {
        cssStyles['flex'] = '0 0 ' + this._content.columnsWidth[pos];
        cssStyles['width'] = this._content.columnsWidth[pos];
    }

    private _addCssStyles_CellContentWrap(cssStyles: CssStyles, pos: number): void
    {
        switch(this._content.columnContentWrap[pos])
        {
            case CellContentWrap.break:
            {
                cssStyles['word-wrap'] = 'break-word' /*!important*/;
                cssStyles['white-space'] = 'unset' /*!important*/;
                cssStyles['overflow-wrap'] = 'break-word';
                cssStyles['word-break'] = 'break-word';
                
                cssStyles['-ms-hyphens'] = 'auto';
                cssStyles['-moz-hyphens'] = 'auto';
                cssStyles['-webkit-hyphens'] = 'auto';
                cssStyles['hyphens'] = 'auto';

                break;
            }
            case CellContentWrap.ellipsis:
            {
                cssStyles['overflow'] = 'hidden';
                cssStyles['text-overflow'] = 'ellipsis';
                cssStyles['white-space'] = 'nowrap';

                break;
            }
            default: /* CellContentWrap.responsible */
            {
                /* The `responsible` wrap is the default style. It only applies the responsible styles 
                 * that are defined in the table. */

                break;
            }
        }
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

        console.log(this._content.dataSource);
        
        // if (this._content.dataSource.paginator == undefined) {
            console.log("UNDEFINED", this._paginator);
            
            this._content.dataSource.paginator = this._paginator;
        // }

        
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
        const len: number = this._content.columnsObjectProperty.length;

        if ((len == 0)
            || (len != this._content.columnsHeaderText.length)
            || (len != this._content.columnsWidth.length)
            || (len != this._content.columnContentWrap.length))
        {
            console.warn("The 'columnsObjectProperty', 'columnsHeaderText', 'columnsWidth' and 'columnContentWrap' arrays must be different of empty, and must have the same amount of elements.");
        }
    }

    /**
     * Navigates to the view that shows information about the specified `rowData`. 
     * @param relativeUrl The relative URL to navigate. 
     * @param rowData The data that is contained in the row. 
     */
    public navigateTo(relativeUrl: string, rowData: any): void
    {
        /* Selects the specified row. */
        this.selectRow(rowData);

        /* Navigates to the specified view. */
        this._router.navigate([ rowData[this._content.propertyNameToIdentify], relativeUrl ], { relativeTo: this._activatedRoute });
    }

    /**
     * Selects the specified row. 
     * @param rowData The data that is contained in the row. 
     */
    public selectRow(rowData: any): void
    {
        /* Saves the selected row. */
        this._selectedRow = rowData[this._content.propertyNameToIdentify];
    }

    

}
