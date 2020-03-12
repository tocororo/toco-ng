
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
