
import { Component, OnInit } from '@angular/core';

import { InputControl } from '../input.control';

/**
 * Represents a control that allows the writing of a name of something in different language. 
 */
@Component({
	selector: 'input-label-diff-lang',
	templateUrl: './label-diff-lang-input.component.html',
	styleUrls: ['./label-diff-lang-input.component.scss'],
    host: {
        '[style.minWidth]': 'content.minWidth',
        '[style.width]': 'content.width'
    }
})
export class InputLabelDiffLangComponent extends InputControl implements OnInit
{
	public constructor()
	{
		super();
	}

    public ngOnInit(): void
    {
		//TODO:...
    }
}
