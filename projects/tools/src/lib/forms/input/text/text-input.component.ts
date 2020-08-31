
import { Component, OnInit } from '@angular/core';

import { InputControl } from '../input.control';

/**
 * Represents a control that allows the writing of a text. 
 */
@Component({
    selector: 'input-text',
    templateUrl: './text-input.component.html',
    styleUrls: ['./text-input.component.scss'],
    host: {
        '[style.minWidth]': 'content.minWidth',
        '[style.width]': 'content.width'
    }
})
export class InputTextComponent extends InputControl implements OnInit
{
    public constructor()
    {
        super();
    }

    public ngOnInit(): void
    {
        /* Sets the default values. */
        this.init(undefined, false, true);
    }
}
