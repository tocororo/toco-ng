
import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

import { TextInputControl } from './text-input.control';
import { Common } from '@toco/tools/core';

/**
 * Represents a control that allows the writing of a text. 
 */
@Component({
    selector: 'text-input',
    templateUrl: '../text-input/text-input.component.html',
    styleUrls: ['../text-input/text-input.component.scss']
})
export class TextInputComponent extends TextInputControl implements OnInit
{
    public constructor()
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
