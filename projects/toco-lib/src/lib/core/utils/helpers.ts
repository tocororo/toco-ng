
import { HttpEventType } from '@angular/common/http';
import { isArray, isDate, isError, isObject, isRegExp } from 'is-what';

/**
 * A file with constants and functions that are helpers.
 */


/**
 * Corresponds to `Number.MAX_SAFE_INTEGER`. Moved out into a variable here due to
 * flaky browser support and the value not being defined in Closure's typings.
 */
export const MAX_SAFE_INTEGER: number = 9007199254740991;

/**
 * The markdown file extension.
 */
export const MARKDOWN_FILE_EXTENSION: string = '.md';

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
    edit = 'edit',

    /**
     * New action.
     */
     new = 'new',

    /**
     * Clone action.
     */
     clone = 'clone',
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
 * An enum that represents the language texts.
 */
export enum LanguageTexts
{
    /**
     * The Spanish language.
     */
    Español = 'Español',

    /**
     * The English language.
     */
    English = 'English',
}

/**
 * An enum that represents the language text abbreviations.
 */
export enum LanguageAbbrs
{
    /**
     * The Spanish language abbreviation.
     */
    es = 'es',

    /**
     * The English language abbreviation.
     */
    en = 'en',
}

/**
 * The list of language texts.
 */
export const LANGUAGE_TEXTS_LIST: LanguageTexts[] = [LanguageTexts.Español, LanguageTexts.English];

/**
 * The list of language text abbreviations.
 */
export const LANGUAGE_ABBRS_LIST: LanguageAbbrs[] = [LanguageAbbrs.es, LanguageAbbrs.en];

/**
 * Converts the language representation from string to number.
 * If the string specified is not registered as a language, then returns -1 number value.
 * The Spanish language is: 0 as number, and 'es' as string.
 * The English language is: 1 as number, and 'en' as string.
 * In other words, it follows the order of `LANGUAGE_TEXTS_LIST` and `LANGUAGE_ABBRS_LIST` enums.
 * @param lang The language text abbreviation to be used.
 * @returns Returns the language as a number based on its representation as string.
 * If the string specified is not registered as a language, then returns -1 number value.
 */
export function convertLangFromStringToNumber(lang: string | LanguageAbbrs): number
{
    switch (lang)
    {
        case LanguageAbbrs.es:  /* Spanish */
            {
                return 0;
            }

        case LanguageAbbrs.en:  /* English */
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
 * In other words, it follows the order of `LANGUAGE_TEXTS_LIST` and `LANGUAGE_ABBRS_LIST` enums.
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
                return LanguageAbbrs.es;
            }

        case 1:  /* English */
            {
                return LanguageAbbrs.en;
            }
    }

    return '';
}

/**
 * Returns a string that is the result of concatenating the specified `path` argument,
 * the language extension, and the markdown file extension.
 * @param path The path to markdown file without the language extension and the markdown file extension.
 * @param lang The language text abbreviation to be used.
 * @returns Returns the correct path to the markdown file.
 */
export function getPathWithLangExtension(path: string, lang: string | LanguageAbbrs): string
{
    return (path + '.' + lang + MARKDOWN_FILE_EXTENSION);
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
 * Returns a new value that represents the clone of the specified `target` value.
 * Implementation notes:
 *  - If `target` is `undefined`, then returns `undefined`.
 *  - If `target` is an object, then returns a cloned object with all its properties cloned.
 *  - If `target` is an array, then returns a cloned array with all its values cloned.
 * @param target The target value to clone.
 */
export function cloneValue(target: any): any
{
    if (isArray(target))
    {
        return _cloneValue(target, [ ]);
    }
    else if (isRegExp(target))
    {
        return target;  /* It can return `target` directly because all fields in a `RegExp` are read-only. */
    }
    else if (isDate(target))
    {
        return new Date(target);
    }
    else if (isError(target))
    {
        return target;  /* It can return `target` directly because an `Error` is extremely dependent of the place where it is created. */
    }
    else if (isObject(target))
    {
        return _cloneValue(target, { });
    }
    else
    {
        return target;
    }
}

function _cloneValue(target: any, container: any): any
{
    let temp: any;

    for (let prop in target)
    {
        temp = target[prop];

        if (isArray(temp))
        {
            container[prop] = _cloneValue(temp, [ ]);
        }
        else if (isRegExp(temp))
        {
            container[prop] = temp;  /* It can return `temp` directly because all fields in a `RegExp` are read-only. */
        }
        else if (isDate(temp))
        {
            container[prop] = new Date(temp);
        }
        else if (isError(temp))
        {
            container[prop] = temp;  /* It can return `temp` directly because an `Error` is extremely dependent of the place where it is created. */
        }
        else if (isObject(temp))
        {
            container[prop] = _cloneValue(temp, { });
        }
        else
        {
            container[prop] = temp;
        }
    }

    return container;
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
    else if (isRegExp(target))
    {
        return undefined;
    }
    else if (isDate(target))
    {
        return undefined;
    }
    else if (isError(target))
    {
        return undefined;
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
        else if (isRegExp(target))
        {
            container[prop] = undefined;
        }
        else if (isDate(target))
        {
            container[prop] = undefined;
        }
        else if (isError(target))
        {
            container[prop] = undefined;
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
    // console.log(`The observable got an error '${ operation }' in '${ place }': ${ err }.`);
}

/**
 * Logs a complete notification message to the console.
 * @param operation The operation during the complete occurs.
 * @param place The place where the complete occurs.
 */
export function logComplete(operation: string, place: string): void
{
    // console.log(`The observable got a complete notification '${ operation }' in '${ place }'.`);
}

/**
 * Returns a string representation of `HttpEventType` specified.
 * @param httpEventType Type enumeration for the different kinds of `HttpEvent`.
 */
export function getHttpEventTypeToString(httpEventType: HttpEventType): string
{
    switch (httpEventType)
    {
        /* The request was sent out over the wire. */
        case HttpEventType.Sent:
            return "'Sent (0)'";

        /* An upload progress event was received. */
        case HttpEventType.UploadProgress:
            return "'UploadProgress (1)'";

        /* The response status code and headers were received. */
        case HttpEventType.ResponseHeader:
            return "'ResponseHeader (2)'";

        /* A download progress event was received. */
        case HttpEventType.DownloadProgress:
            return "'DownloadProgress (3)'";

        /* The full response including the body was received. */
        case HttpEventType.Response:
            return "'Response (4)'";

        /* A custom event from an interceptor or a backend. */
        case HttpEventType.User:
            return "'User (5)'";

        default:
            return "'It does not know the code'";
    }
}
