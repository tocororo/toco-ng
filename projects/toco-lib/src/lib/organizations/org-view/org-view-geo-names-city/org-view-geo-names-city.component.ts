
import { Component, Input } from '@angular/core';

import { Params } from '../../../core';
import { GeoNamesCity } from '../../../entities';

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

	private _geonames_admin1: Params<any>[];
	private _geonames_admin2: Params<any>[];
	private _nuts_level1: Params<any>[];
	private _nuts_level2: Params<any>[];
	private _nuts_level3: Params<any>[];

	public constructor()
	{
		this.appearance = 'outline';
		this.desc = undefined;
		this.value = undefined;

		this._geonames_admin1 = [];
		this._geonames_admin2 = [];
		this._nuts_level1 = [];
		this._nuts_level2 = [];
		this._nuts_level3 = [];
	}

	public ngOnInit(): void
	{
		if (this.value)
		{
			if (this.value.geonames_admin1) this._createValueAsArray(this.value.geonames_admin1, this._geonames_admin1);
			if (this.value.geonames_admin2) this._createValueAsArray(this.value.geonames_admin2, this._geonames_admin2);
			if (this.value.nuts_level1) this._createValueAsArray(this.value.nuts_level1, this._nuts_level1);
			if (this.value.nuts_level2) this._createValueAsArray(this.value.nuts_level2, this._nuts_level2);
			if (this.value.nuts_level3) this._createValueAsArray(this.value.nuts_level3, this._nuts_level3);
		}
	}

	private _createValueAsArray(objFromCopy: Params<any>, arrayToFill: Params<any>[]): void
	{
		Object.keys(objFromCopy).forEach((key: string): void => {
			arrayToFill.push({
				'property': key,
				'value': objFromCopy[key]
			});
		});
	}

	/**
	 * Returns the `geonames_admin1` value as an array for using by `StaticTableComponent`. 
	 */
	public get getGeoNamesAdmin1(): Params<any>[]
	{
		return this._geonames_admin1;
	}

	/**
	 * Returns the `geonames_admin2` value as an array for using by `StaticTableComponent`. 
	 */
	public get getGeoNamesAdmin2(): Params<any>[]
	{
		return this._geonames_admin2;
	}

	/**
	 * Returns the `nuts_level1` value as an array for using by `StaticTableComponent`. 
	 */
	public get getNutsLevel1(): Params<any>[]
	{
		return this._nuts_level1;
	}

	/**
	 * Returns the `nuts_level2` value as an array for using by `StaticTableComponent`. 
	 */
	public get getNutsLevel2(): Params<any>[]
	{
		return this._nuts_level2;
	}

	/**
	 * Returns the `nuts_level3` value as an array for using by `StaticTableComponent`. 
	 */
	public get getNutsLevel3(): Params<any>[]
	{
		return this._nuts_level3;
	}
}
