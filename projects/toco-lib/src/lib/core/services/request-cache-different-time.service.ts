
import { Injectable } from '@angular/core';
import { HttpRequest, HttpResponse } from '@angular/common/http';

import { EnvService } from '../../backend/env.service';

import { MessageService } from './message.service';
import { Cachable, RequestCache } from './request-cache.service';

/**
 * A service that implements the cachable URL request. 
 */
@Injectable({
	providedIn: 'root'
})
export class CachableUrl implements Cachable
{
	public constructor(private _env: EnvService)
	{ }

    /**
     * Returns a number greater than zero if the specified request is cachable; 
	 * that number represents the maximum cache age in milliseconds. 
	 * Return zero if the specified request is NOT cachable. 
     * @param req The outgoing request object to handle. 
     */
    public isCachable(req: HttpRequest<any>): number
    {
        /* Only GET requests are cachable. */
		if (req.method != 'GET') return 0;

		Object.keys(this._env.cachableUrls).forEach(
			(url: string) => {
				/* Verifies if the request cache is cachable. */
				if (req.url.indexOf(url) > -1) return this._env.cachableUrls[url];
			}
		);

		/* It is not cachable. */
		return 0;
    }
}

/**
 * Represents the request cache entry. 
 */
export interface RequestCacheEntry
{
	/**
	 * Returns the request URL. 
	 */
	url: string;

	/**
	 * Returns the request cache. 
	 */
	response: HttpResponse<any>;

	/**
	 * Returns the maximum cache age in milliseconds. 
	 */
	maxAgeInCache: number;

	/**
	 * Returns the last read of the request URL. 
	 */
	lastRead: number;
}

/**
 * A service that implements the request cache with the different time using `Map` collection. 
 */
@Injectable({
	providedIn: 'root'
})
export class RequestCacheDifferentTimeWithMap implements RequestCache
{
	private _cache: Map<string, RequestCacheEntry>;

	public constructor(private _messageService: MessageService)
	{
		this._cache = new Map<string, RequestCacheEntry>();
	}

	public get(req: HttpRequest<any>): HttpResponse<any> | undefined
	{
		const cached: RequestCacheEntry = this._cache.get(req.urlWithParams);

		if (!cached)
		{
			return undefined;
		}

		if ((cached.lastRead + cached.maxAgeInCache) < Date.now())  /* Found expired cached. */
		{
			this._messageService.add(`Found expired cached response for '${ req.urlWithParams }'.`);
			return undefined;
		}
		else
		{
			this._messageService.add(`Found cached response for '${ req.urlWithParams }'.`);
			return cached.response;
		}
	}

	public set(req: HttpRequest<any>, maxAgeInCache: number, response: HttpResponse<any>): void
	{
		const url: string = req.urlWithParams;
		this._messageService.add(`Caching response from '${ url }'.`);

		this._cache.set(url, { url, response, maxAgeInCache, lastRead: Date.now() });

		/* Removes expired cache entries. */
		this._cache.forEach(
			(entry: RequestCacheEntry) => {
				if (entry.lastRead < Date.now() - entry.maxAgeInCache)
				{
					this._cache.delete(entry.url);
				}
			}
		);

		this._messageService.add(`Request cache size: ${ this._cache.size }.`);
	}
}

/**
 * A provider for the cachable URL request. 
 */
export const CACHABLE_URL_PROVIDER = [
    { 'provide': Cachable, 'useClass': CachableUrl, 'multi': false }
];

/**
 * A provider for the request cache with the different time using `Map` collection. 
 */
export const REQUEST_CACHE_DIFFERENT_TIME_WITH_MAP_PROVIDER = [
    { 'provide': RequestCache, 'useClass': RequestCacheDifferentTimeWithMap, 'multi': false }
];
