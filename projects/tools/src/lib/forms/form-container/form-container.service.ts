
import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Response } from '@toco/tools/entities';

import { EnvService } from '@tocoenv/tools/env.service';

@Injectable({
	providedIn: 'root'
})
export class FormContainerService {
	
	private httpOptions = {
		headers: new HttpHeaders(
			{ 
				'Content-Type': 'application/json',
				'Authorization': 'Bearer '
			})
	};

	public constructor(private httpClient: HttpClient, private env: EnvService)
	{ }

	/**
	 * Sends data to the server.
	 * @param endPoint The data end point. For example, `/add_new`.
	 * @param token The autorization token.
	 * @param data The data to send, must be parsed.
	 */
	public sendPostData(endPoint: string, token: string, data: any ): Observable<Response<any>> {
		
		this.httpOptions.headers = this.httpOptions.headers.set('Authorization', 'Bearer ' + token);

		return this.httpClient.post<Response<any>>( this.env.sceibaApi+endPoint, data, this.httpOptions );
	}
}
