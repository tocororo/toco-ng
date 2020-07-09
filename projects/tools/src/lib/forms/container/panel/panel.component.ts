
import { Component, OnInit, Input } from '@angular/core';

import { ContainerControl, ContainerContent } from '../../input/input.control';
import { FormContainerAction } from '../form-container/form-container.component';

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
}

/**
 * Represents a control that contains a panel. 
 * Usage notes: 
 * - If the `PanelComponent` is not within a `ContainerControl`, it can be used as: 
 * <container-panel [formSection]="formSection" [content]="identifiersContent"></container-panel>
 * Where `formSection` is created in the constructor, for example, as this: 
 * this.formSection = new FormGroup({ }, [ ]);
 * - If the `PanelComponent` is within a `ContainerControl`, it must be used as: 
 * <container-panel [parentFormSection]="parentFormSection" [formSection]="formSection" [content]="identifiersContent"></container-panel>
 * Where `parentFormSection` is the `PanelComponent`'s parent `FormSection`, 
 * and `formSection` is created in the constructor, for example, as this: 
 * this.formSection = new FormGroup({ }, [ ]);
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
        super();
	}

	public ngOnInit(): void
	{
		/* Sets the default values. */
        this.init(undefined, false, false);
	}
}
