
import { Component, OnInit } from '@angular/core';

import { ActionControl } from '../action.control';

/**
 * Represents a control that executes actions. 
 */
@Component({
	selector: 'action-button',
	templateUrl: './button-action.component.html',
	styleUrls: ['./button-action.component.scss'],
    host: {
        '[style.minWidth]': 'content.minWidth',
        '[style.width]': 'content.width'
    }
})
export class ActionButtonComponent extends ActionControl implements OnInit
{
    public constructor()
    {
        super();
    }

    public ngOnInit(): void
    {
        /* Sets the default values. */
        this.init('', true);
    }
}
