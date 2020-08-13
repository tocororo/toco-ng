
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
     * The control's appearance. 
     * By default, its value is `'outline'`. 
     */
	@Input()
	public appearance: string;

	/**
	 * The control's description. 
	 * By default, its value is `undefined` and it is not showed. 
	 */
	@Input()
	public desc: string;

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
