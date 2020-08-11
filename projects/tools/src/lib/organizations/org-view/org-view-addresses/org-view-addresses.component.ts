
import { Component, Input } from '@angular/core';

import { Relationships } from '@toco/tools/entities';

@Component({
	selector: 'toco-org-view-addresses',
	templateUrl: './org-view-addresses.component.html',
	styleUrls: ['./org-view-addresses.component.scss']
})
export class OrgViewAddressesComponent
{
	/**
	 * The array of data that should be rendered by the accordion, where each object represents one row. 
     * By default, its value is `undefined`. 
	 */
	@Input()
	public value: Relationships;

	public constructor()
	{
		this.value = undefined;
	}
}
