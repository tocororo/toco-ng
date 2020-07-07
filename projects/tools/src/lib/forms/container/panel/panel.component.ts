
import { Component, OnInit, Input } from '@angular/core';

import { ContainerControl, ContainerContent } from '../../input/input.control';
import { FormContainerAction } from '../form-container/form-container.component';
import { FormGroup } from '@angular/forms';

/**
 * An interface that represents the content of a panel. 
 */
export interface PanelContent extends ContainerContent
{
    /**
     * Returns the panel's title. 
     */
    title: string;

    /**
     * Returns the panel's description. 
     */
    description: string;

    /**
     * Returns the panel's icon name. 
     */
    iconName: string;

    /**
     * Returns the action and action labels for each panel. 
     */
    action?: FormContainerAction;
    actionLabel?: string;

    /**
     * Returns true is the panel is open; otherwise, false. 
     */
    open?: boolean;
}

/**
 * Represents a control that contains a panel. 
 */
@Component({
	selector: 'container-panel',
	templateUrl: './panel.component.html',
	styleUrls: ['./panel.component.scss'],
	host: {
		'[style.minWidth]': 'content.minWidth',
		'[style.width]': 'content.width'
	}
})
export class PanelComponent extends ContainerControl implements OnInit
{
    /**
     * Input field that contains the content of this class. 
     */
    @Input()
	public content: PanelContent;

	public constructor()
	{
        super(
            /* Constructs a new `FormGroup` instance. */
            new FormGroup({ }, [ ])
        );
	}

	public ngOnInit(): void
	{
		/* Sets the default values. */
        this.init(undefined, false, false);
	}
}
