
import { Injectable } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';

/**
 * A service that registers custom svg icons in order to use them through the `mat-icon` component. 
 * Which simply registers the custom icons with the `MatIconRegistry` service provided by Angular Material. 
 */
@Injectable({
	providedIn: 'root'
})
export class IconService
{
	/**
	 * Returns the default icon name. It represents a blank icon. 
	 * It is used by controls that want to have occupied the icon space, but nothing is showed. 
	 */
	public static readonly defaultIconName: string = 'outlined-blank-24px';

	public constructor(private _matIconRegistry: MatIconRegistry, private _domSanitizer: DomSanitizer)
	{ }

	/**
	 * Registers an array of icons. 
	 * @param iconNames Array of names under which the icons should be registered. 
	 * @param iconUrl The relative URL path pointing to the location of the icons. 
	 */
	public registerIcons(iconNames: string[], iconUrl: string): void
	{
		iconNames.forEach(iconName => {
		  this._matIconRegistry.addSvgIcon(
			  iconName, 
			  this._domSanitizer.bypassSecurityTrustResourceUrl(`${ iconUrl }/${ iconName }.svg`));
		});
	}
}
