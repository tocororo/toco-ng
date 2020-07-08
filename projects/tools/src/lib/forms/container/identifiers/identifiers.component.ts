
import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

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
        super(
            /* Constructs a new `FormGroup` instance. */
//             new FormGroup({ }, [
// //                Validators.pattern('^[a-zA-Z\-\_]*$')
//             ])
        );
	}

	public ngOnInit(): void
	{
		/* Sets the default values. */
        this.init(IdentifierValue.identifier_Label, false, true);
	}
}
