
import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, ValidationErrors, ControlContainer } from '@angular/forms';

import { InputControl } from '../input.control';
import { EmailValue } from './email-value';
import { Common } from '@toco/tools/core';

/**
 * Represents a control that allows the writing of an email. 
 */
@Component({
    selector: 'input-email',
    templateUrl: '../text/text-input.component.html',
    styleUrls: ['../text/text-input.component.scss'],
    host: {
        '[style.minWidth]': 'content.minWidth',
        '[style.width]': 'content.width'
    }
})
export class InputEmailComponent extends InputControl implements OnInit
{
    public constructor(private controlContainer: ControlContainer)
    {
        super(
            /* Constructs a new `FormControl` instance. */
            new FormControl(Common.emptyString, [
                Validators.email
            ])
        );
    }

    public ngOnInit(): void
    {
        /* Sets the default values. */
        this.init(EmailValue.email_Label, false, true);
    }

    /**
     * Returns an error string if the control is in an error state; otherwise, empty string. 
     */
    public getErrorMessage(): string
    {
        let validationErrors: ValidationErrors = this.internalControl.errors;

        /* Shows the email errors. */
        if (validationErrors)
        {
            if (validationErrors[Validators.required.name])
            {
                return this.validationError_required;
            }
            else
            {
                /* It is `validationErrors[Validators.email.name]`. */
                return 'The email is wrong.';
            }
        }

        return Common.emptyString;
    }
}
