
import { _isNumberValue } from '@angular/cdk/coercion';
import { Sort } from '@angular/material';

/**
 * Corresponds to `Number.MAX_SAFE_INTEGER`. Moved out into a variable here due to 
 * flaky browser support and the value not being defined in Closure's typings. 
 */
const MAX_SAFE_INTEGER: number = 9007199254740991;

/**
 * An interface that represents the requested page. 
 * The generic parameter T always refers to the type of data that it is dealing with. 
 */
export interface Page/*<T>*/
{
    /**
     * Returns the list of items. 
     * By default, its value is `[]`. 
     */
    data: any[];

    /**
     * Returns the total number of items being paged. 
     * By default, its value is `0`. 
     */
    totalData: number;

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
}

/**
 * The data sort direction. 
 */
export enum SortDirection
{
    /**
     * Sorts the data in the ascending order. 
     */
    asc = 'asc',

    /**
     * Sorts the data in the descending order. 
     */
    desc = 'desc',

    /**
     * Sorts the data in the original order or does not sort them. 
     */
    orig = ''
};

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
export function filterPredicate<T>(data: T, filter: string): boolean
{
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
}

/**
 * Data accessor function that is used for accessing data properties for sorting through 
 * the default `sortData` function. 
 * This default function assumes that the sort header IDs (which defaults to the column name) 
 * matches the data's properties (e.g. column Xyz represents data['Xyz']). 
 * May be overridden for a custom implementation of different behavior. 
 * @param data Data object that is being accessed. 
 * @param sortHeaderId The name of the column that represents the data. 
 */
export function sortingDataAccessor<T>(data: T, sortHeaderId: string): string | number
{
    const value: any = data[sortHeaderId];

    if (_isNumberValue(value))
    {
        const numberValue: number = Number(value);

        /* Numbers beyond `MAX_SAFE_INTEGER` can't be compared reliably so we 
         * leave them as strings. For more info: https://goo.gl/y5vbSg. */
        return (numberValue < MAX_SAFE_INTEGER ? numberValue : value);
    }

    return value;
}

/**
 * Gets a sorted copy of the data array based on the state of the `MatSort`. Called 
 * after changes are made to the filtered data or when sort changes are emitted from `MatSort`. 
 * By default, the function retrieves the active sort and its direction and compares data 
 * by retrieving data using the `sortingDataAccessor`. 
 * May be overridden for a custom implementation of data ordering. 
 * @param data The array of data that should be sorted. 
 * @param sort The connected `MatSort` that holds the current sort state. 
 */
export function sortData<T>(data: T[], sort: Sort): T[]
{
    const active: string = sort.active;
    const direction: SortDirection = sort.direction as SortDirection;

    if ((!active) || (direction == SortDirection.orig)) return data;

    return data.sort((a: T, b: T): number => {
        let valueA: string | number = sortingDataAccessor(a, active);
        let valueB: string | number = sortingDataAccessor(b, active);

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

        return comparatorResult * ((direction == SortDirection.asc) ? 1 : -1);
    });
}
