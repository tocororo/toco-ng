
import { Component, Input } from '@angular/core';

import { GeoNamesCity } from '@toco/tools/entities';

@Component({
	selector: 'toco-org-view-geo-names-city',
	templateUrl: './org-view-geo-names-city.component.html',
	styleUrls: ['./org-view-geo-names-city.component.scss']
})
export class OrgViewGeoNamesCityComponent
{
	/**
	 * A linked GeoNames data associated with the organization. 
     * By default, its value is `undefined`. 
	 */
	@Input()
	public value: GeoNamesCity;

	public constructor()
	{
		this.value = undefined;
	}
}
