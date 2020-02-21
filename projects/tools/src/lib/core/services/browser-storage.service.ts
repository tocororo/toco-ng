

import { Injectable, InjectionToken, Inject, inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

/**
 * Creates a token that provides the `sessionStorage` browser API. It can be used in a DI Provider. 
 */
export const BROWSER_SESSION_STORAGE: InjectionToken<Storage> = new InjectionToken<Storage>(
    'Browser Session Storage',
    {
        providedIn: 'root',
        factory: () => {

            let platformId: Object = inject(PLATFORM_ID);

            if (isPlatformBrowser(platformId))
            {
                /* Client only code. */
                return sessionStorage;
            }

            // if (isPlatformServer(platformId))
            // {
            //     /* Server only code. */
            // }

            return undefined;
        }
    }
);

/**
 * Creates a token that provides the `localStorage` browser API. It can be used in a DI Provider. 
 */
export const BROWSER_LOCAL_STORAGE: InjectionToken<Storage> = new InjectionToken<Storage>(
    'Browser Local Storage',
    {
        providedIn: 'root',
        factory: () => {

            let platformId: Object = inject(PLATFORM_ID);

            if (isPlatformBrowser(platformId))
            {
                /* Client only code. */
                return localStorage
            }

            // if (isPlatformServer(platformId))
            // {
            //     /* Server only code. */
            // }

            return undefined;
        }
    }
);

/**
 * A class that allows access to the Web Storage API. 
 * It is the base class for services `BrowserSessionStorageService` and `BrowserLocalStorageService`. 
 */
class BrowserStorageService
{
    private _storage: Storage;

    public constructor(storage: Storage)
    {
        if (storage == undefined) throw new Error('Sorry, your browser does not support web storage.');

        this._storage = storage;
    }

    /**
     * Returns the number of key/value pairs currently present in the list associated with the object. 
     */
    public get length(): number
    {
        return this._storage.length;
    }

    /**
     * Returns the value for the specified `key`, or null if the `key` does not exist. 
     * @param key The key to look for. 
     */
    public get(key: string): string | null
    {
        return this._storage.getItem(key);
    }

    /**
     * Returns the name of the nth key in the list, or null if n is greater than or 
     * equal to the number of key/value pairs in the object. 
     * @param index The index to look for. 
     */
    public key(index: number): string | null
    {
        return this._storage.key(index);
    }

    /**
     * Creates a new data item, and (if the data item already exists) updates existing value. 
     * @param key The key to set. 
     * @param value The value to set. 
     */
    public set(key: string, value: string): void
    {
        try
        {
            this._storage.setItem(key, value);
        }
        catch (e)
        {
            if ((e instanceof DOMException) &&
                /* Everything excepts Firefox. */
                (e.code == 22 ||
                /* Firefox. */
                e.code == 1014 ||

                /* Tests the name field too, because the code might not be present. */

                /* Everything excepts Firefox. */
                e.name == 'QuotaExceededError' ||
                /* Firefox. */
                e.name == 'NS_ERROR_DOM_QUOTA_REACHED') &&

                /* Acknowledges the `QuotaExceededError` only if there's something already stored. */
                (this._storage && this._storage.length != 0))
            {
                throw new Error('Sorry, you has gotten a QuotaExceededError that means you are likely out of disk space.');
            }
            else
            {
                throw e;
            }
        }
    }

    /**
     * Removes the value for the specified `key`. 
     * @param key The key to look for. 
     */
    public remove(key: string): void
    {
        this._storage.removeItem(key);
    }

    /**
     * Empties the list associated with the object of all key/value pairs, if there are any. 
     */
    public clear(): void
    {
        this._storage.clear();
    }
}

/**
 * A service that allows access to the Session Storage API. 
 */
@Injectable({
    providedIn: 'root'
})
export class BrowserSessionStorageService extends BrowserStorageService
{
    public constructor(@Inject(BROWSER_SESSION_STORAGE) storage: Storage)
    {
        super(storage);
    }
}

/**
 * A service that allows access to the Local Storage API. 
 */
@Injectable({
    providedIn: 'root'
})
export class BrowserLocalStorageService extends BrowserStorageService
{
    public constructor(@Inject(BROWSER_LOCAL_STORAGE) storage: Storage)
    {
        super(storage);
    }
}
