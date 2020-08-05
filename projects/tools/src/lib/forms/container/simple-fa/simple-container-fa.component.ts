
import { Component, OnInit } from '@angular/core';

import { ContainerControl } from '../container.control';

/**
 * Represents a container control that is showed very simple using `FormArray`. 
 * It is similar to `ContainerSimpleComponent`, but using `FormArray`. 
 */
@Component({
	selector: 'container-simple-fa',
	templateUrl: './simple-container-fa.component.html',
	styleUrls: ['./simple-container-fa.component.scss'],
	host: {
		'[style.minWidth]': 'content.minWidth',
		'[style.width]': 'content.width'
	}
})
export class ContainerSimpleFaComponent extends ContainerControl implements OnInit
{
	public constructor()
	{
		super();
	}

	public ngOnInit(): void
	{
		/* Sets the default values. */
        this.init(undefined, false, false);
	}

    /**
     * Initializes the `content` input property. 
     * @param label The label to set. If the value is `undefined`, sets the label to `content.label`. 
     * @param isAbbreviation If it is true then the `label` argument represents an abbreviation; otherwise, false. 
     * @param alwaysHint If it is true then there is always at leat one hint start-aligned. 
     */
    protected init(label: string | undefined, isAbbreviation: boolean, alwaysHint: boolean): void
    {
		/* Sets the default values. */
		
		console.log('ContainerSimpleFaComponent init.');

		super.init(label, isAbbreviation, alwaysHint);
	}
}
