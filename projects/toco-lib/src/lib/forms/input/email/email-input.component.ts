
import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, ValidationErrors } from '@angular/forms';

import { InputControl } from '../input.control';
import { ValidatorArguments } from '../../form-field.control';
import { EmailValue } from './email-value';

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
    /**
     * Returns a `FormControl` by default. 
     * It is used to initialized the `InputEmailComponent`'s `content.formControl` value by default. 
     * In this case, the `validatorArguments` argument is always `undefined`. 
     */
    public static getFormControlByDefault(validatorArguments: ValidatorArguments = undefined): FormControl
    {
        return new FormControl('', [
            Validators.email
        ]);
    }

    public constructor()
    {
        super();
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
        let validationErrors: ValidationErrors = this.content.formControl.errors;

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

        return '';
    }
}
