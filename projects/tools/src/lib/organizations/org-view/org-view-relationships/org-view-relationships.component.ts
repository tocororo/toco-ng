
import { Component, Input } from '@angular/core';

import { Relationship } from '@toco/tools/entities';

@Component({
	selector: 'toco-org-view-relationships',
	templateUrl: './org-view-relationships.component.html',
	styleUrls: ['./org-view-relationships.component.scss']
})
export class OrgViewRelationshipsComponent
{
	/**
	 * A relationship the organization has to other. 
     * By default, its value is `undefined`. 
	 */
	@Input()
	public value: Relationship;

	public constructor()
	{
		this.value = undefined;
	}
}
