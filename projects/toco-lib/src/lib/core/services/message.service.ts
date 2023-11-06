
import { Injectable } from '@angular/core';

@Injectable({
	providedIn: 'root'
})
export class MessageService
{
	/**
	 * Cache of messages.
	 */
	public messages: string[] = [];

	public constructor()
	{ }

	/**
	 * Adds the specified message.
	 * @param msg The message to add.
	 */
	public add(msg: string): void
	{
		// console.log(msg);
		this.messages.push(msg);
	}

	/**
	 * Deletes all messages.
	 */
	public clear(): void
	{
		this.messages = [];
	}
}
