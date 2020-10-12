
import { Component, OnInit } from '@angular/core';

import { ContainerControl } from '../container.control';

/**
 * Represents a container control that is showed very simple. 
 * Usage notes: 
 *  - It can be used as: 
 * <container-simple [content]="simpleContent"></container-simple> 
 * Where `content.formSection` is created, for example, as this: 
 * this.content.formSection = new FormGroup({ }, [ ]); 
 */
@Component({
	selector: 'container-simple',
	templateUrl: './simple-container.component.html',
	styleUrls: ['./simple-container.component.scss'],
	host: {
		'[style.minWidth]': 'content.minWidth',
		'[style.width]': 'content.width'
	}
})
export class ContainerSimpleComponent extends ContainerControl implements OnInit
{
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
    }
}
