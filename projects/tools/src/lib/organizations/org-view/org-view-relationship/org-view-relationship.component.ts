
import { Component, Input } from '@angular/core';
import { RelationshipsValue } from '../org-view.component';



@Component({
	selector: 'toco-org-view-relationship',
	templateUrl: './org-view-relationship.component.html',
	styleUrls: ['./org-view-relationship.component.scss']
})
export class OrgViewRelationshipComponent
{
	/**
	 * A relationship the organization has to other. 
     * By default, its value is `undefined`. 
	 */
	@Input()
	public value: RelationshipsValue;

	public constructor()
	{
		this.value = undefined;
	}
}
