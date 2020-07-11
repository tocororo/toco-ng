
import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

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
    public constructor()
    {
        super();
    }

    public ngOnInit(): void
    {
        console.log('Debuguear esto...');

        /* Sets this `content.formControl` by default. */
        if (this.content.formControl == undefined) this.content.formControl = new FormControl(Common.emptyString);

        /* Sets the default values. */
        this.init(undefined, false, true);
    }
}
