import { isObject, isArray } from 'util';

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
 * A class with static methods that are commonly used. 
 */
export class Common
{
    /**
	 * Returns the empty string. 
	 */
    public static readonly emptyString: string = '';

    /**
     * Returns a new value that represents the clone of the specified `target` value, and 
     * sets all its properties/values of built-in type to `undefined`. 
     * Implementation notes: 
     *  - If `target` is `undefined`, then returns `undefined`. 
     *  - If `target` is an object, then returns an object with all its properties of built-in type to `undefined`. 
     *  - If `target` is an array, then returns an array with all its values of built-in type to `undefined`. 
     * if this value is an array or object sets all its properties to `undefined`. 
     * @param target The target value to clone. 
     */
    public static cloneValueToUndefined(target: any): any
    {
        if (isArray(target))
        {
            return Common._cloneValueToUndefined(target, [ ]);
        }
        else if (isObject(target))
        {
            return Common._cloneValueToUndefined(target, { });
        }
        else
        {
            return undefined;
        }
    }

    private static _cloneValueToUndefined(target: any, container: any): any
    {
        let temp: any;

        for(let prop in target)
        {
            temp = target[prop];

            if (isArray(temp))
            {
                container[prop] = Common._cloneValueToUndefined(temp, [ ]);
            }
            else if (isObject(temp))
            {
                container[prop] = Common._cloneValueToUndefined(temp, { });
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
    public static logError(operation: string, place: string, err: any): void
    {
        console.log(`The observable got an error '${ operation }' in '${ place }': ${ err }.`);
    }

    /**
     * Logs a complete notification message to the console. 
     * @param operation The operation during the complete occurs. 
     * @param place The place where the complete occurs. 
     */
    public static logComplete(operation: string, place: string): void
    {
        console.log(`The observable got a complete notification '${ operation }' in '${ place }'.`);
    }
}
