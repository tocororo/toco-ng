
import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { ContainerControl } from '../input.control';
import { IdentifierValue } from '../identifier/identifier-value';

/**
 * Represents a control that contains a list of identifiers. 
 */
@Component({
	selector: 'input-identifiers',
	templateUrl: './identifiers-input.component.html',
	styleUrls: ['./identifiers-input.component.scss'],
	host: {
		'[style.minWidth]': 'content.minWidth',
		'[style.width]': 'content.width'
	}
})
export class InputIdentifiersComponent extends ContainerControl implements OnInit
{
	public constructor()
	{
        super(
            /* Constructs a new `FormGroup` instance. */
            new FormGroup({ }, [
//                Validators.pattern('^[a-zA-Z\-\_]*$')
            ])
        );
	}

	public ngOnInit(): void
	{
		/* Sets the default values. */
        this.init(IdentifierValue.identifier_Label, false, true);
	}
}
