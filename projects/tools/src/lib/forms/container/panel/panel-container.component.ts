
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
 *  - It can be used as: 
 * <container-panel [content]="panelContent"></container-panel> 
 * Where `content.formSection` is created, for example, as this: 
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
        this.init(undefined);
    }

    /**
     * Initializes the `content` input property. 
     * @param label The label to set. If the value is `undefined`, sets the label to `content.label`. 
     */
    protected init(label: string | undefined): void
    {
        /* Sets the default values. */

        super.init(label);

        /* The `content.title`, `content.description`, and `content.iconName` fields 
        have the `undefined` value by default. */
    }
}
