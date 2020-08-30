
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
 * Returns the empty string. 
 */
export const emptyString: string = '';

/**
 * Returns true if the specified `possDescendant` is descendant from the specified `ancestorName`; 
 * otherwise, false. 
 * @param possDescendant Possible descendant. 
 * @param ancestorName Ancestor name. 
 * Example in usage: 
 *  if (isDescendant(target.componentType.__proto__, InputControl.name)) { ... }
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
