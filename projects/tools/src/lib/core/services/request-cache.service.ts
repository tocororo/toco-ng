
import { Injectable } from '@angular/core';
import { HttpRequest, HttpResponse } from '@angular/common/http';

import { MessageService } from './message.service';

/**
 * Returns a constant that is used in the `HttpHeaders` to do request although the request exists in cache. 
 */
export const REFRESH_X_CACHE: string = 'refresh-x-cache';

/**
 * Represents the base abstract class for all services that implement the cachable request. 
 * See `CachableNpmPackage` service. 
 */
export abstract class Cachable
{
    /**
     * Returns true is the specified request is cachable; otherwise, false. 
     * @param req The outgoing request object to handle. 
     */
    abstract isCachable(req: HttpRequest<any>): boolean
}

/**
 * Represents the base abstract class for all services that implement the request cache. 
 * See `RequestCacheSameTimeWithMap` service. 
 */
export abstract class RequestCache
{
	abstract get(req: HttpRequest<any>): HttpResponse<any> | undefined;

	abstract set(req: HttpRequest<any>, response: HttpResponse<any>): void
}

/**
 * Returns the npm package search URL. 
 * TODO: Get this from configuration. 
 */
export const NPM_PACKAGE_SEARCH_URL: string = 'https://npmsearch.com/query';

/**
 * A service that implements the cachable npm package request. 
 */
@Injectable({
	providedIn: 'root'
})
export class CachableNpmPackage implements Cachable
{
    /**
     * Returns true is the specified request is cachable; otherwise, false. 
     * @param req The outgoing request object to handle. 
     */
    public isCachable(req: HttpRequest<any>): boolean
    {
        /* Only GET requests are cachable. */
        return (req.method == 'GET')
            /* Only npm package search is cachable in this app. */
            && (req.url.indexOf(NPM_PACKAGE_SEARCH_URL) > -1);
    }
}

/**
 * Returns the maximum cache age in milliseconds. 
 * TODO: Get this from configuration. 
 */
const maxAgeInCache: number = 30000;

/**
 * Represents the request cache entry. 
 */
export interface RequestCacheEntry
{
	url: string;
	response: HttpResponse<any>;
	lastRead: number;
}

/**
 * A service that implements the request cache with the same time using `Map` collection. 
 */
@Injectable({
	providedIn: 'root'
})
export class RequestCacheSameTimeWithMap implements RequestCache
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

		if ((cached.lastRead + maxAgeInCache) < Date.now())  /* Found expired cached. */
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

	public set(req: HttpRequest<any>, response: HttpResponse<any>): void
	{
		const url: string = req.urlWithParams;
		this._messageService.add(`Caching response from '${ url }'.`);

		this._cache.set(url, { url, response, lastRead: Date.now() });

		/* Removes expired cache entries. */
		const expired: number = Date.now() - maxAgeInCache;
		this._cache.forEach(entry => {
			if (entry.lastRead < expired)
			{
				this._cache.delete(entry.url);
			}
		});

		this._messageService.add(`Request cache size: ${ this._cache.size }.`);
	}
}

/**
 * A provider for the cachable npm package request. 
 */
export const CACHABLE_NPM_PACKAGE_PROVIDER = [
    { 'provide': Cachable, 'useClass': CachableNpmPackage, 'multi': false }
];

/**
 * A provider for the request cache with the same time using `Map` collection. 
 */
export const REQUEST_CACHE_SAME_TIME_WITH_MAP_PROVIDER = [
    { 'provide': RequestCache, 'useClass': RequestCacheSameTimeWithMap, 'multi': false }
];
