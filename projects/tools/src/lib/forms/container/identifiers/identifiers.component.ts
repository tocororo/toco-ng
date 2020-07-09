
import { Component, OnInit } from '@angular/core';

import { ContainerControl } from '../../input/input.control';
import { IdentifierValue } from '../../input/identifier/identifier-value';

/**
 * Represents a control that contains a list of identifiers. 
 */
@Component({
	selector: 'container-identifiers',
	templateUrl: './identifiers.component.html',
	styleUrls: ['./identifiers.component.scss'],
	host: {
		'[style.minWidth]': 'content.minWidth',
		'[style.width]': 'content.width'
	}
})
export class IdentifiersComponent extends ContainerControl implements OnInit
{
	public constructor()
	{
        super();
	}

	public ngOnInit(): void
	{
		/* Sets the default values. */
        this.init('Identifiers', false, false);
	}
}
