
import { Component, OnInit, Input } from '@angular/core';

import { ContainerContent, ContainerControl } from '../container.control';

/**
 * An interface that represents the content of a panel control. 
 * Implementation notes: 
 *  - Maybe the 'label' and 'title' fields have the same values, but they are different fields 
 * with different functionalities; you need both in the implementation code. 
 */
export interface PanelContent extends ContainerContent
{
    /**
     * Returns the panel's title. 
     * By default, its value is `undefined`. 
     */
    title?: string;

    /**
     * Returns the panel's description. 
     * By default, its value is `undefined`. 
     */
    description?: string;

    /**
     * Returns the panel's icon name. 
     * By default, its value is `undefined`. 
     */
    iconName?: string;
}

/**
 * Represents a container control that is showed as a panel. 
 * Usage notes: 
 *  - If the `ContainerPanelComponent` is not within a `ContainerControl`, it can be used as: 
 * <container-panel [content]="panelContent"></container-panel>
 * Where `content.formSection` is created, for example, as this: 
 * this.content.formSection = new FormGroup({ }, [ ]);
 *  - If the `ContainerPanelComponent` is within a `ContainerControl`, it must be used as: 
 * <container-panel [content]="panelContent"></container-panel>
 * Where `content.parentFormSection` is the `ContainerPanelComponent`'s parent `FormSection`, 
 * and `content.formSection` is created, for example, as this: 
 * this.content.formSection = new FormGroup({ }, [ ]);
 */
@Component({
	selector: 'container-panel',
	templateUrl: './panel-container.component.html',
	styleUrls: ['./panel-container.component.scss'],
	host: {
		'[style.minWidth]': 'content.minWidth',
		'[style.width]': 'content.width'
	}
})
export class ContainerPanelComponent extends ContainerControl implements OnInit
{
    /**
     * Input field that contains the content of this class. 
     */
    @Input()
	public content: PanelContent;

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

        /* The `content.title`, `content.description`, and `content.iconName` fields 
        have the `undefined` value by default. */
    }
}