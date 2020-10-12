
import { Component, Input } from '@angular/core';

import { Address } from '@toco/entities';

@Component({
	selector: 'toco-org-view-address',
	templateUrl: './org-view-address.component.html',
	styleUrls: ['./org-view-address.component.scss']
})
export class OrgViewAddressComponent
{
	/**
	 * An address associated with the organization. 
     * By default, its value is `undefined`. 
	 */
	@Input()
	public value: Address;

	public constructor()
	{
		this.value = undefined;
	}
}
