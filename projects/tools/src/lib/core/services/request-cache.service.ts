
import { Injectable } from '@angular/core';
import { HttpRequest, HttpResponse } from '@angular/common/http';

import { MessageService } from './message.service';

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
 * Represents the base abstract class for all services that implement the request cache. 
 * See `RequestCacheWithMap` service. 
 */
export abstract class RequestCache
{
	abstract get(req: HttpRequest<any>): HttpResponse<any> | undefined;

	abstract set(req: HttpRequest<any>, response: HttpResponse<any>): void
}

/**
 * Returns the maximum cache age in milliseconds. 
 */
const maxAge: number = 30000;

/**
 * A service that implements the request cache using `Map` collection. 
 */
@Injectable({
	providedIn: 'root'
})
export class RequestCacheWithMap implements RequestCache
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

		if ((cached.lastRead + maxAge) < Date.now())  /* Found expired cached. */
		{
			/* Removes expired cache entry. */
			this._cache.delete(req.urlWithParams);

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
		this._messageService.add(`Caching response from '${ req.urlWithParams }'.`);

		this._cache.set(req.urlWithParams, { url: req.urlWithParams, response, lastRead: Date.now() });

		this._messageService.add(`Request cache size: ${ this._cache.size }.`);
	}
}
