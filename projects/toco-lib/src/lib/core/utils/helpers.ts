
import { isObject, isArray } from 'util';

/**
 * A file with constants and functions that are helpers. 
 */


/**
 * Corresponds to `Number.MAX_SAFE_INTEGER`. Moved out into a variable here due to 
 * flaky browser support and the value not being defined in Closure's typings. 
 */
export const MAX_SAFE_INTEGER: number = 9007199254740991;

/**
 * A collection of key/value elements, where the keys are strings. 
 */
export type Params<T> = {
    [key: string]: T;
};

/**
 * An enum that describes an action through a text. 
 */
export enum ActionText
{
    /**
     * Viewing action. 
     */
    view = 'view',

    /**
     * Adding action. 
     */
    add = 'add',

    /**
     * Editing action. 
     */
    edit = 'edit'
}

/**
 * An object of paths that is used to get the child controls in a `FormGroup`/`FormArray` control. 
 * The value of its properties is a dot-delimited string value or an array of string/number values 
 * that define the path to a child control. 
 */
export type ChildControlsPath = {
    [key: string]: Array<string | number> | string;
};

/**
 * Converts the language representation from string to number. 
 * If the string specified is not registered as a language, then returns -1 number value. 
 * The Spanish language is: 0 as number, and 'es' as string. 
 * The English language is: 1 as number, and 'en' as string. 
 * @param lang The language representation as string. 
 * @returns Returns the language as a number based on its representation as string. 
 * If the string specified is not registered as a language, then returns -1 number value. 
 */
export function convertLangFromStringToNumber(lang: string): number
{
    switch (lang)
    {
        case 'es':  /* Spanish */
            {
                return 0;
            }

        case 'en':  /* English */
            {
                return 1;
            }
    }

    return -1;
}

/**
 * Converts the language representation from number to string. 
 * If the number specified is not registered as a language, then returns empty string value. 
 * The Spanish language is: 0 as number, and 'es' as string. 
 * The English language is: 1 as number, and 'en' as string. 
 * @param index The language representation as number. 
 * @returns Returns the language as a string based on its representation as number. 
 * If the number specified is not registered as a language, then returns empty string value. 
 */
export function convertLangFromNumberToString(index: number): string
{
    switch (index)
    {
        case 0:  /* Spanish */
            {
                return 'es';
            }

        case 1:  /* English */
            {
                return 'en';
            }
    }

    return '';
}

/**
 * Returns true if the specified `possDescendant` is descendant from the specified `ancestorName`; 
 * otherwise, false. 
 * @param possDescendant Possible descendant. 
 * @param ancestorName Ancestor name. 
 * Example in usage: 
 *  if (isDescendant(target.controlType.__proto__, InputControl.name)) { ... }
 */
export function isDescendant(possDescendant: any, ancestorName: string): boolean
{
    do
    {
        if (possDescendant.name == ancestorName) return true;
    }
    while((possDescendant = possDescendant.__proto__).name != '');

    return false;
}

/**
 * Returns a new value that represents the clone of the specified `target` value, and 
 * sets all its properties/values of built-in type to `undefined`. 
 * Implementation notes: 
 *  - If `target` is `undefined`, then returns `undefined`. 
 *  - If `target` is an object, then returns an object with all its properties of built-in type to `undefined`. 
 *  - If `target` is an array, then returns an array with all its values of built-in type to `undefined`. 
 * @param target The target value to clone. 
 */
export function cloneValueToUndefined(target: any): any
{
    if (isArray(target))
    {
        return _cloneValueToUndefined(target, [ ]);
    }
    else if (isObject(target))
    {
        return _cloneValueToUndefined(target, { });
    }
    else
    {
        return undefined;
    }
}

function _cloneValueToUndefined(target: any, container: any): any
{
    let temp: any;

    for(let prop in target)
    {
        temp = target[prop];

        if (isArray(temp))
        {
            container[prop] = _cloneValueToUndefined(temp, [ ]);
        }
        else if (isObject(temp))
        {
            container[prop] = _cloneValueToUndefined(temp, { });
        }
        else
        {
            container[prop] = undefined;
        }
    }

    return container;
}

/**
 * Logs an error notification message to the console. 
 * @param operation The operation during the error occurs. 
 * @param place The place where the error occurs. 
 * @param err The error that occurs. 
 */
export function logError(operation: string, place: string, err: any): void
{
    console.log(`The observable got an error '${ operation }' in '${ place }': ${ err }.`);
}

/**
 * Logs a complete notification message to the console. 
 * @param operation The operation during the complete occurs. 
 * @param place The place where the complete occurs. 
 */
export function logComplete(operation: string, place: string): void
{
    console.log(`The observable got a complete notification '${ operation }' in '${ place }'.`);
}
