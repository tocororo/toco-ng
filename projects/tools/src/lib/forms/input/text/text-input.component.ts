
import { Component, OnInit } from '@angular/core';
import { FormControl, ControlContainer } from '@angular/forms';

import { InputControl } from '../input.control';
import { Common } from '@toco/tools/core';

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
    public constructor(private controlContainer: ControlContainer)
    {
        super(
            /* Constructs a new `FormControl` instance. */
            new FormControl(Common.emptyString)
        );
    }

    public ngOnInit(): void
    {
        /* Sets the default values. */
        this.init(undefined, false, true);
    }
}
