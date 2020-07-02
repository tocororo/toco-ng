
import { Component, OnInit } from '@angular/core';
import { FormGroup, ControlContainer } from '@angular/forms';

import { InputControl, InputContent } from '../input.control';
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
export class InputIdentifiersComponent extends InputControl implements OnInit
{
	public constructor(/*private controlContainer: ControlContainer*/)
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
		//TODO: Make a cycle over the list of identifiers calling the line below.

        /* Sets the default values. */
        this.init(IdentifierValue.identifier_Label, false, true);
	}
}
