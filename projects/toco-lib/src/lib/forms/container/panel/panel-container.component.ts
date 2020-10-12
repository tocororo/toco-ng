
import { Component, OnInit, Input } from '@angular/core';

import { ContainerContent, ContainerControl } from '../container.control';

/**
 * An interface that represents the content of a panel control. 
 */
export interface PanelContent extends ContainerContent
{
    /**
     * In this case, the `label?: string` field inherited from `FormFieldContent` is interpreted as: 
     * Returns the control's title. 
     * By default, its value is `''`. Each control sets its own label (title). 
     */

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
        this.init('');
    }

    /**
     * Initializes the `content` input property. 
     * @param label The default label to use. It is used if the `content.label` is not specified. 
     */
    protected init(label: string): void
    {
        /* Sets the default values. */

        super.init(label);

        /* The `content.description`, and `content.iconName` fields 
        have the `undefined` value by default. */
    }
}
