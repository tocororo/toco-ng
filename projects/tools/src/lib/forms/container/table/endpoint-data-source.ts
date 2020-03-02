
import { DataSource } from '@angular/cdk/table';
import { _isNumberValue } from '@angular/cdk/coercion';
import { MatSort, SortDirection, MatPaginator } from '@angular/material';
import { Observable, Subject, BehaviorSubject, Subscription, combineLatest, merge, of } from 'rxjs';
import { map } from 'rxjs/operators';

/**
 * Corresponds to `Number.MAX_SAFE_INTEGER`. Moved out into a variable here due to 
 * flaky browser support and the value not being defined in Closure's typings. 
 */
const MAX_SAFE_INTEGER: number = 9007199254740991;

/**
 * Data source that accepts a client-side data array and includes native support of filtering, 
 * sorting (using `MatSort`), and pagination (using `MatPaginator`). 
 *
 * Allows for sort customization by overriding `sortingDataAccessor`, which defines how data 
 * properties are accessed. Also allows for filter customization by overriding `filterTermAccessor`, 
 * which defines how row data is converted to a string for filter matching. 
 *
 * **Note:** This class is meant to be a simple data source to help you get started. As such 
 * it isn't equipped to handle some more advanced cases like robust i18n support or server-side 
 * interactions. If your app needs to support more advanced use cases, consider implementing your 
 * own `DataSource`. 
 * @template T The type of data that is managed. 
 */
class EndpointDataSource<T> extends DataSource<T>
{
    /**
     * Stream that emits when a new data array is set on the data source. 
     */
    private readonly _data: BehaviorSubject<T[]>;

    /**
     * Stream emitting render data to the table (depends on ordered data changes). 
     */
    private readonly _renderData: BehaviorSubject<T[]>;

    /**
     * Stream that emits when a new filter string is set on the data source. 
     */
    private readonly _filter: BehaviorSubject<string>;

    /**
     * Used to react to internal changes of the paginator that are made by the data source itself. 
     */
    private readonly _internalPageChanges: Subject<void>;

    /**
     * Subscription to the changes that should trigger an update to the table's rendered rows, such 
     * as filtering, sorting, pagination, or base data changes. 
     */
    private _renderChangesSubscription: Subscription;

    private _sort: MatSort | null;

    private _paginator: MatPaginator | null;

    /**
     * The filtered set of data that has been matched by the filter string, or all the data if there 
     * is no filter. Useful for knowing the set of data the table represents. 
     * For example, a `selectAll()` function would likely want to select the set of filtered data 
     * shown to the user rather than all the data. 
     */
    public filteredData: T[];

    /**
     * Data accessor function that is used for accessing data properties for sorting through 
     * the default `sortData` function. 
     * This default function assumes that the sort header IDs (which defaults to the column name) 
     * matches the data's properties (e.g. column Xyz represents data['Xyz']). 
     * May be overridden for a custom implementation of different behavior. 
     * @param data Data object that is being accessed. 
     * @param sortHeaderId The name of the column that represents the data. 
     */
    public sortingDataAccessor: (data: T, sortHeaderId: string) => string | number;

    /**
     * Gets a sorted copy of the data array based on the state of the `MatSort`. Called 
     * after changes are made to the filtered data or when sort changes are emitted from `MatSort`. 
     * By default, the function retrieves the active sort and its direction and compares data 
     * by retrieving data using the `sortingDataAccessor`. 
     * May be overridden for a custom implementation of data ordering. 
     * @param data The array of data that should be sorted. 
     * @param sort The connected `MatSort` that holds the current sort state. 
     */
    public sortData: (data: T[], sort: MatSort) => T[];

    /**
     * Checks if a data object matches the data source's filter string. By default, each data object 
     * is converted to a string of its properties and returns true if the filter has 
     * at least one occurrence in that string. By default, the filter string has its whitespace 
     * trimmed and the match is case-insensitive. 
     * May be overridden for a custom implementation of filter matching. 
     * @param data Data object used to check against the filter. 
     * @param filter Filter string that has been set on the data source. 
     * @return Returns true whether the filter matches against the data; otherwise, false. 
     */
    public filterPredicate: (data: T, filter: string) => boolean;

    constructor(initialData: T[] = [])
    {
        super();

        this._renderData = new BehaviorSubject<T[]>([]);
        this._filter = new BehaviorSubject<string>('');
        this._internalPageChanges = new Subject<void>();
        this._renderChangesSubscription = Subscription.EMPTY;

        this.sortingDataAccessor = (data: T, sortHeaderId: string): string | number => {
            const value: any = data[sortHeaderId];

            if (_isNumberValue(value))
            {
                const numberValue: number = Number(value);

                /* Numbers beyond `MAX_SAFE_INTEGER` can't be compared reliably so we 
                 * leave them as strings. For more info: https://goo.gl/y5vbSg. */
                return (numberValue < MAX_SAFE_INTEGER ? numberValue : value);
            }

            return value;
        };

        this.sortData = (data: T[], sort: MatSort): T[] => {
            const active: string = sort.active;
            const direction: SortDirection = sort.direction;

            if (!active || direction == '') return data;

            return data.sort((a: T, b: T): number => {
                let valueA: string | number = this.sortingDataAccessor(a, active);
                let valueB: string | number = this.sortingDataAccessor(b, active);

                /**
                 * If both `valueA` and `valueB` exist (truthy), then compare the two. Otherwise, checks if 
                 * one value exists while the other doesn't. In this case, existing value should come last. 
                 * This avoids inconsistent results when comparing values to undefined/null. 
                 * If neither value exists, returns 0 (equal). 
                 */

                let comparatorResult: number = 0;

                if ((valueA != null) && (valueB != null))
                {
                    /* Checks if one value is greater than the other one; if equal, `comparatorResult` should remain 0. */

                    if (valueA > valueB) comparatorResult = 1;
                    else if (valueA < valueB) comparatorResult = -1;
                }
                else if (valueA != null) comparatorResult = 1;
                else if (valueB != null) comparatorResult = -1;

                return comparatorResult * ((direction == 'asc') ? 1 : -1);
            });
        };

        this.filterPredicate = (data: T, filter: string): boolean => {
            /* Transforms the data into a lowercase string of all property values. */
            const dataStr: string = Object.keys(data).reduce((
                (currentTerm, key): string => {
                    /* Use an obscure Unicode character to delimit the words in the concatenated string. 
                     * This avoids matches where the values of two columns combined will match the user's query 
                     * (e.g. `Flute` and `Stop` will match `Test`). The character is intended to be something 
                     * that has a very low chance of being typed in by somebody in a text field. This one in 
                     * particular is "White up-pointing triangle with dot" from 
                     * https://en.wikipedia.org/wiki/List_of_Unicode_characters. */
                    return currentTerm + data[key] + '◬';
                }), '').toLowerCase();

            /* Transforms the filter by converting it to lowercase and removing whitespace. */
            const transformedFilter: string = filter.trim().toLowerCase();

            return (dataStr.indexOf(transformedFilter) != -1);
        };

        this._data = new BehaviorSubject<T[]>(initialData); //TODO: este será mi 'endpoint' que suministra mis datos. 
        this._updateChangeSubscription();
    }

    /**
     * Array of data that should be rendered by the table, where each object represents one row.
     * @return {?}
     */
    get data() { return this._data.value; }
    /**
     * @param {?} data
     * @return {?}
     */
    set data(data) { this._data.next(data); }

    /**
     * Filter term that should be used to filter out objects from the data array. To override how 
     * data objects match to this filter string, provide a custom function for `filterPredicate`. 
     */
    public get filter(): string
    {
        return this._filter.value;
    }

    /**
     * @param filter New filter term that should be used to filter out objects from the data array. 
     */
    public set filter(filter: string)
    {
        this._filter.next(filter);
    }

    /**
     * Instance of the `MatSort` directive used by the table to control its sorting. 
     * Sort changes emitted by the `MatSort` will trigger an update to the table's rendered data. 
     * @return Returns the instance of the `MatSort` directive used by the table 
     * to control its sorting; or null if is not defined. 
     */
    public get sort(): MatSort | null
    {
        return this._sort;
    }

    /**
     * @param sort New instance of the `MatSort` directive used by the table to control its sorting. 
     */
    public set sort(sort: MatSort | null)
    {
        this._sort = sort;
        this._updateChangeSubscription();
    }

    /**
     * Instance of the `MatPaginator` component used by the table to control what page of the data is 
     * displayed. Page changes emitted by the `MatPaginator` will trigger an update to the 
     * table's rendered data. 
     *
     * Note that the data source uses the paginator's properties to calculate which page of data 
     * should be displayed. If the paginator receives its properties as template inputs, 
     * e.g. `[pageLength]=100` or `[pageIndex]=1`, then be sure that the paginator's view has been 
     * initialized before assigning it to this data source. 
     * @return Returns the instance of the `MatPaginator` component used by the table to control 
     * what page of the data is displayed; or null if is not defined. 
     */
    public get paginator(): MatPaginator | null
    {
        return this._paginator;
    }

    /**
     * @param paginator New instance of the `MatPaginator` component used by the table to control 
     * what page of the data is displayed.
     */
    public set paginator(paginator: MatPaginator | null)
    {
        this._paginator = paginator;
        this._updateChangeSubscription();
    }

    /**
     * Subscribes to changes that should trigger an update to the table's rendered rows. When the 
     * changes occur, process the current state of the filter, sort, and pagination along with 
     * the provided base data and send it to the table for rendering. 
     */
    private _updateChangeSubscription(): void
    {
        /* Sorting and/or pagination should be watched if `MatSort` and/or `MatPaginator` are provided. 
         * The events should emit whenever the component emits a change or initializes, or if no 
         * component is provided, a stream with just a null event should be provided. 
         * The `sortChange` and `pageChange` acts as a signal to the `combineLatests` below so that the 
         * pipeline can progress to the next step. Note that the value from these streams are not used, 
         * they purely act as a signal to progress in the pipeline. */
        const sortChange = this._sort
            ? merge(this._sort.sortChange, this._sort.initialized)
            : of(null);
        const pageChange = this._paginator
            ? merge(this._paginator.page, this._internalPageChanges, this._paginator.initialized)
            : of(null);

        /* Watches for base data or filter changes to provide a filtered set of data. */
        const filteredData = combineLatest([this._data, this._filter]).pipe(
            map((
                ([data]) => this._filterData(data))
            )
        );

        /* Watches for filtered data or sort changes to provide an ordered set of data. */
        const orderedData = combineLatest([filteredData, sortChange]).pipe(
            map((
                ([data]) => this._orderData(data))
            )
        );

        /* Watches for ordered data or page changes to provide a paged set of data. */
        const paginatedData = combineLatest([orderedData, pageChange]).pipe(
            map((
                ([data]) => this._pageData(data))
            )
        );

        /* Watches for paged data changes and sends the result (to such as a table) to render. */
        this._renderChangesSubscription.unsubscribe();
        this._renderChangesSubscription = paginatedData
            .subscribe(
                (data => this._renderData.next(data))
            );
    }

    /**
     * Returns a filtered data array where each filter object contains the filter string within 
     * the result of the `filterTermAccessor` function. If no filter is set, returns the data array 
     * as provided. 
     * @param data The array of data that should be filtered. 
     */
    private _filterData(data: T[]): T[]
    {
        /* If there is a filter string, filters out data that does not contain it. 
         * Each data object is converted to a string using the function defined by `filterTermAccessor`. 
         * May be overridden for customization. */
        this.filteredData = (!this.filter) ? data : data.filter((
            (obj: T): boolean => this.filterPredicate(obj, this.filter)));

        if (this.paginator)
        {
            this._updatePaginator(this.filteredData.length);
        }

        return this.filteredData;
    }

    /**
     * Returns a sorted copy of the data if `MatSort` has a sort applied, otherwise just returns the 
     * data array as provided. Uses the default data accessor for data lookup, unless a 
     * `sortDataAccessor` function is defined. 
     * @param data The data to sort. 
     */
    private _orderData(data: T[]): T[]
    {
        /* If there is no active sort or direction, returns the data without trying to sort. */
        if (!this.sort)
        {
            return data;
        }

        return this.sortData(data.slice(), this.sort);
    }

    /**
     * Returns a paged slice of the provided data array according to the provided `MatPaginator`'s page 
     * index and length. If there is no paginator provided, returns the data array as provided. 
     * @param data The data to page. 
     */
    private _pageData(data: T[]): T[]
    {
        if (!this.paginator)
        {
            return data;
        }

        const startIndex: number = this.paginator.pageIndex * this.paginator.pageSize;
        return data.slice(startIndex, (startIndex + this.paginator.pageSize));
    }

    /**
     * Updates the paginator to reflect the length of the filtered data, and makes sure that the page 
     * index does not exceed the paginator's last page. Values are changed in a resolved promise to 
     * guard against making property changes within a round of change detection. 
     * @param filteredDataLength The filtered data length. 
     */
    private _updatePaginator(filteredDataLength: number): void
    {
        Promise.resolve().then((/**
            * @return {?}
            */
            () => {
                const paginator: MatPaginator = this.paginator;
                if (!paginator) return;

                paginator.length = filteredDataLength;

                /* If the page index is set beyond the page, reduce it to the last page. */
                if (paginator.pageIndex > 0)
                {
                    const lastPageIndex: number = Math.ceil(paginator.length / paginator.pageSize) - 1 || 0;
                    const newPageIndex: number = Math.min(paginator.pageIndex, lastPageIndex);

                    if (newPageIndex != paginator.pageIndex)
                    {
                        paginator.pageIndex = newPageIndex;
                        /* Since the paginator only emits after user-generated changes, 
                        * we need our own stream so we know to should re-render the data. */
                        this._internalPageChanges.next();
                    }
                }
            }
        ));
    }

    /**
     * Connects a collection viewer (such as a data-table) to this data source. 
     * Called when it connects to the data source. 
     * @returns Observable that emits a new value when the data changes. 
     */
    public connect(): Observable<T[]>
    {
        /* Note that the stream provided will be accessed during change detection 
         * and should not directly change values that are bound in template views. */

        return this._renderData;
    }

    /**
     * Disconnects a collection viewer (such as a data-table) from this data source. 
     * Called when it is destroyed. No-op. 
     */
    public disconnect(): void
    {
        /* Can be used to perform any clean-up or tear-down operations when a view 
         * is being destroyed. No-op. */
    }
}
