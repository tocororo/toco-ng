
import { Component, Input } from '@angular/core';

import { Address } from '@toco/tools/entities';

@Component({
	selector: 'toco-org-view-addresses',
	templateUrl: './org-view-addresses.component.html',
	styleUrls: ['./org-view-addresses.component.scss']
})
export class OrgViewAddressesComponent
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
