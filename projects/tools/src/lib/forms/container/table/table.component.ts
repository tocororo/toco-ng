
import { Component, OnInit, OnDestroy, ViewChild, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MatTableDataSource, MatSort, MatPaginator, Sort } from '@angular/material';
import { Observable, Subscription, Subject, combineLatest } from 'rxjs';
import { startWith, switchMap, finalize, debounceTime, distinctUntilChanged, filter } from 'rxjs/operators';

import { Page, SortDirection, Params, BackendDataSourceFunction, SimpleFilter } from '@toco/tools/core';

import { InputContent, TextInputAppearance } from '../../input/input.control';
import { TextAlign, IconValue, IconSource, ContentPosition, HintValue, HintPosition } from '../../form-field.control';

/**
 * A collection of CSS styles. 
 */
export type CssStyles = Params<string>;

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
 * The generic parameter T always refers to the type of data that it is dealing with. 
 * The generic parameter F always refers to the type of object that contains the filter model. 
 */
export interface TableContent<T, F extends Params<any>>
{
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
     * Returns the property name of the data contained in `page` that is used to identify that data. 
     * By default, its value is `''`. 
     */
    propertyNameToIdentify?: string;



    /**
     * The current filter state. 
     * By default, its value is `{}`. 
     */
    filter?: F;

    /**
     * The current sort state. 
     * By default, its value is `{ 'active': propertyNameToIdentify, 'direction': SortDirection.asc }`. 
     */
    sort?: Sort;

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



    /**
     * Returns the function that is used to get the data source from backend. 
     * The generic parameter T always refers to the type of data that it is dealing with. 
     * The generic parameter F always refers to the type of object that contains the filter model. 
     * By default, its value is `undefined`. 
     */
    endpoint?: BackendDataSourceFunction<T, F>;

    actions?: TableAction[];
}

/**
 * Returns a new object that represents the default `TableContent`. 
 */
export function defaultTableContent(): TableContent<any, SimpleFilter>
{
    return {
        'columnsObjectProperty': [],
        'columnsHeaderText': [],
        'columnsWidth': [],
        'columnContentWrap': [],
        'createCssClassesForRow': undefined,

        'propertyNameToIdentify': '',

        'filter': {},
        'sort': {
            'active': this._content.propertyNameToIdentify,
            'direction': SortDirection.asc
        },
        'length': 0,
        'pageIndex': 0,
        'pageSize': 50,
        'pageSizeOptions': [10, 20, 50],
        'hidePageSize': false,
        'showFirstLastButtons': false,

        'endpoint': undefined
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
export class TableComponent implements OnInit, OnDestroy
{
    /**
     * Returns true if it is loading the data source; otherwise, false. 
     * In this way, it shows/hides the loading progress control. 
     * By default, its value is `false`. 
     */
    private _loading: boolean;
    private _countBackendSubscriptions: number;

    private _content: TableContent<any, SimpleFilter>;
    private readonly _page: Subject<Page<any>>;  /* Stream that emits when a new data array is set on the data source. */
    private _pageAsObservable: Observable<Page<any>>;
    private _dataSource: MatTableDataSource<any>;
    private static readonly _defaultDataSource: MatTableDataSource<any> = new MatTableDataSource([ { } ]);  /* Returns a data source with only one empty element. */
    private _selectedRow: number;  /* Represents the selected row. */

	public filter_content: InputContent = {
        'width': '65%',

        'label': 'Write a text to filter',

        'textAlign': TextAlign.left,
        'ariaLabel': 'Filter',

        'appearance': TextInputAppearance.standard,

        'prefixIcon': new IconValue(IconSource.external, ContentPosition.prefix, 'search'),

        'startHint': new HintValue(HintPosition.start, 'Filters when typing stops.')
    };
    
    /**
     * Stream that emits when a new filter is set on the data source. 
     * Because of the behavior and appearance of the component, it is necessary to use 
     * `Subject` instead of `BehaviorSubject` to represent the `_filterChange`. 
     */
    private readonly _filterChange: Subject<SimpleFilter>;
    private _filterValue: SimpleFilter;

    @ViewChild(MatSort, { static: true })
    private _sort: MatSort;

    @ViewChild(MatPaginator, { static: true })
    private _paginator: MatPaginator;

    /**
     * Subscription to the changes that should trigger an update to the table's rendered rows, such 
     * as filtering, sorting, or pagination. 
     */
    private _renderChangesSubscription: Subscription;

    public constructor(private _router: Router, private _activatedRoute: ActivatedRoute)
    {
        this._loading = false;  /* By default, its value is `false`. */
        this._countBackendSubscriptions = 0;

        this._page = new Subject<Page<any>>();
        this._pageAsObservable = this._page.asObservable();

        this._dataSource = new MatTableDataSource();

        this._selectedRow = undefined;

        this._filterChange = new Subject<SimpleFilter>();
        this._filterValue = undefined;

        this._renderChangesSubscription = Subscription.EMPTY;
    }

    public ngOnInit(): void
    {
        /* Sets the default values only if the `_content` has not been set yet. */
        if (this._content == undefined)
        {
            this.init();
        }
    }

    public ngOnDestroy(): void
    {
        /* Disposes the resources held by the subscription. */
        this._renderChangesSubscription.unsubscribe();
    }

    /**
     * Returns true if the data source is empty; otherwise, false. 
     */
    public get isEmpty(): boolean
    {
        return (this._dataSource.data.length == 0);
    }

    /**
     * Initializes the component. 
     */
    protected init(): void
    {
        this._initContent();

        this._updateChangeSubscription();
    }

    /**
     * Initializes the `content` input property. 
     */
    private _initContent(): void
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

        /**************************** `filter` properties. ********************************/
        if (this._content.filter == undefined) this._content.filter = {};

        /***************************** `sort` properties. *********************************/
        if (this._content.sort == undefined) this._content.sort = {
            'active': this._content.propertyNameToIdentify,
            'direction': SortDirection.asc
        };

        /************************* `mat-paginator` properties. ****************************/
        if (this._content.length == undefined) this._content.length = 0;
        if (this._content.pageIndex == undefined) this._content.pageIndex = 0;
        if (this._content.pageSize == undefined) this._content.pageSize = 50;
        if (this._content.pageSizeOptions == undefined) this._content.pageSizeOptions = [10, 20, 50];
        if (this._content.hidePageSize == undefined) this._content.hidePageSize = false;
        if (this._content.showFirstLastButtons == undefined) this._content.showFirstLastButtons = false;

        /************************** Internal control properties. **************************/

        /******************************* Other properties. ********************************/
        if (this._content.endpoint == undefined) this._content.endpoint = undefined;

        /************************ Must be the last initialization. ************************/
    }

    /**
     * Subscribes to changes that should trigger an update to the table's rendered rows. When the 
     * changes occur, process the current state of the filter, sort, and pagination along with 
     * the provided base data and send it to the table for rendering. 
     */
    private _updateChangeSubscription(): void
    {
        if (this._content.endpoint == undefined) return;

        /* Disposes the resources held by the subscription. */
        this._renderChangesSubscription.unsubscribe();

        /* The `_filterChange` is always present; although the user decides if it is used or not. 
         * Also, `MatSort` and `MatPaginator` are always present because they are managed by the component completely. 
         * Subscribes to get the values when there is a change in the filtering, sorting, or pagination of the data. */
        this._renderChangesSubscription = combineLatest([
            this._filterChange.pipe(
                /* Waits 500ms after each keystroke before considering the term. */
                debounceTime(500),
                /* Ignores new term if same as previous term. */
                distinctUntilChanged(),
                /* Emits the first value. Filters using the initial values. The operators must be called in this order. */
                startWith((this._filterValue = this._content.filter))
            ),
            this._sort.sortChange.pipe(
                /* When the table is empty and it is not loading, then clicking the table header 
                 * does not generate any request to the backend, except the first time. */
                filter(_ => {
                    return (this.isLoading || !this.isEmpty);
                }),
                /* Emits the first value. Sorts using the initial values. The operators must be called in this order. */
                startWith(this._content.sort)
            ),
            this._paginator.page.pipe(
                /* Emits the first value. Paginates using the initial values. */
                startWith({
                    'pageIndex': this._content.pageIndex,
                    'pageSize': this._content.pageSize,
                    'length': 0  /* In the first value, it is not important. */
                })
            )
        ]).pipe(
            /* Switches to new search observable each time the term changes. */
            switchMap(([filterEvent, sortEvent, pageEvent]): Observable<Page<any>> => {

                /* It begins the loading of the data. In this way, it shows the loading progress control. */
                this._loading = true;
                this._countBackendSubscriptions++;
                console.log('Call _countBackendSubscriptions: ', this._countBackendSubscriptions);
    
                /* Erases the page from the table. */
                // this._setPage({
                //     'data': [],
                //     'totalData': pageEvent.length,
                //     'pageIndex': pageEvent.pageIndex,
                //     'pageSize': pageEvent.pageSize
                // });
                this._setPage(null);

                return this._content.endpoint({
                    'filter': filterEvent,
                    'sort': sortEvent,
                    'paginator': pageEvent
                }).pipe(
                    finalize(() => {
                        this._countBackendSubscriptions--;
                        /* It ends the loading of the data. In this way, it hides the loading progress control. */
                        if (this._countBackendSubscriptions == 0) this._loading = false;
                    })
                );
            })
        ).subscribe((response: Page<any>): void => {
            //console.log('Endpoint Response: ', response);

            /* Sets the new page on the table. */
            this._setPage(response);

            this._page.next(response);
        });
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
        return this._loading;
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
    public get content(): TableContent<any, SimpleFilter>
    {
        return this._content;
    }

	/**
	 * Sets the input field that contains the content of this class (the table control content to show). 
     * @param newContent The new content to set. 
     * If the value is null, sets to `defaultTableContent`. 
	 */
    public set content(newContent: TableContent<any, SimpleFilter> | null)
    {
        this._content = newContent;
        this.init();
    }

    /**
     * Returns the stream that emits the page that should be rendered by the table, 
     * when there is a change in the filtering, sorting, or pagination of the data. Each object 
     * in the `data` field represents one row. 
     */
    public get page(): Observable<Page<any>>
    {
        return this._pageAsObservable;
    }

	/**
	 * Sets the page that should be rendered by the table, where each object in the `newPage.data` 
     * represents one row. For internal use only. 
     * If the value is null, sets to `{ 'data': [], 'totalData': this._content.length, 'pageIndex': this._content.pageIndex, 'pageSize': this._content.pageSize }`. 
     * @param newPage The new page to set. 
	 */
    private _setPage(newPage: Page<any> | null): void
    {
        newPage = newPage || { 'data': [], 'totalData': this._content.length, 'pageIndex': this._content.pageIndex, 'pageSize': this._content.pageSize };  /* The default data does not contain element. */

        /* Updates the data only. */
        this._dataSource.data = newPage.data;

        this._content.length = newPage.totalData;
        this._content.pageIndex = newPage.pageIndex;

        this.checkColumn();
    }

    /**
     * Returns the data source to render. If the data source is empty, then returns the default data source 
     * that contains only one empty element (it is used to show one row that contains the empty 
     * table information). For internal use only. 
     */
    public get _getDataSource(): MatTableDataSource<any>
    {
        if (this.isEmpty) return TableComponent._defaultDataSource;

        return this._dataSource;
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

    /**
     * Applies the filter model that should be used to filter out objects from the data source. 
     * Assumes that the backend will call the `trim()` method over its properties. 
     * This method is accepting a partial representation of the filter model. 
     * It combines the specified filter with the last one. This way old filter properties 
     * won't be overridden when only one property is updated. 
     * @param filter The partial representation of the filter model to combine. 
     */
    public applyFilter(filter: Partial<SimpleFilter>): void
    {
        /* This method is accepting a partial representation of the filter model. 
         * It combines the specified filter with the last one by accessing the `BehaviorSubject<SimpleFilter>` 
         * and merging both filters via the spread operator. This way old filter properties 
         * won't be overridden when only one property is updated. 
         * It is not necessary to call the `trim()` method over its properties because it is called 
         * in the backend internally. */

        this._filterValue = { ...this._filterValue, ...filter };

        this._filterChange.next(this._filterValue);
    }
}
