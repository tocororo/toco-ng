
import { Component, OnInit } from '@angular/core';

import { ContainerControl } from '../../input/input.control';

/**
 * Represents a container control that allows the writing of a name of something in different language. 
 */
@Component({
	selector: 'container-label-diff-lang',
	templateUrl: './label-diff-lang-container.component.html',
	styleUrls: ['./label-diff-lang-container.component.scss'],
    host: {
        '[style.minWidth]': 'content.minWidth',
        '[style.width]': 'content.width'
    }
})
export class ContainerLabelDiffLangComponent extends ContainerControl implements OnInit
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

        super.init(label, isAbbreviation, alwaysHint);
    }
}
