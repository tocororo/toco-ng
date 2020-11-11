
import { Component, OnInit, Input } from '@angular/core';

import { ContainerContent, ContainerControl } from '../container.control';



export interface FormContainerAction {
  doit(data: any): void;
}



/**
 * An interface that represents the content of a panel control.
 */
export interface PanelActionContent extends ContainerContent
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

      /**
     * Returns the action and action labels for each panel.
     */
    action?: FormContainerAction;
    actionLabel?: string;
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
	selector: 'container-panel-action',
	templateUrl: './panel-action-container.component.html',
	styleUrls: ['./panel-action-container.component.scss'],
	host: {
		'[style.minWidth]': 'content.minWidth',
		'[style.width]': 'content.width'
	}
})
export class ContainerPanelActionComponent extends ContainerControl implements OnInit
{
    /**
     * Input field that contains the content of this class.
     */
    @Input()
	public content: PanelActionContent;

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
    public doAction(): void {

      // const data = {};
      // this.content..formSectionContent.forEach(element => {
      //   element
      // });
      // this.panelsContent.forEach((panel) => {
      //   panel.formSectionContent.forEach((controlContent) => {
      //     data[controlContent.name] = controlContent.value;
      //   });
      // });

      if (this.content.action) {
        this.content.action.doit(this.content.value);
      }


    }
}

