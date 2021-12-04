
import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, ValidationErrors } from '@angular/forms';

import { InputControl } from '../input.control';
import { ValidatorArguments } from '../../form-field.control';
import { IdentifierValue } from './identifier-value';

/**
 * Represents a control that allows the writing of an identifier. 
 */
@Component({
    selector: 'input-identifier',
    templateUrl: '../text/text-input.component.html',
    styleUrls: ['../text/text-input.component.scss'],
    host: {
        '[style.minWidth]': 'content.minWidth',
        '[style.width]': 'content.width'
    }
})
export class InputIdentifierComponent extends InputControl implements OnInit
{
    /**
     * Returns a `FormControl` by default. 
     * It is used to initialized the `InputIdentifierComponent`'s `content.formControl` value by default. 
     * @param validatorArguments An object that has only one field of `pattern` name and its value is a string. 
     * The `pattern` name is the validator name and the value is the value that the validator needs to check. 
     * For example, you can call the `getFormControlByDefault` method in this way: 
     * InputIdentifierComponent.getFormControlByDefault({ 'pattern': '^[a-zA-Z\_][a-zA-Z\-\_0-9]*$' });
     * If this argument is not specified, by default its value is { 'pattern': '^[a-zA-Z\-\_]*$' }. 
     */
    public static getFormControlByDefault(validatorArguments: ValidatorArguments = undefined): FormControl
    {
        return new FormControl('', [
            (((validatorArguments) && (validatorArguments.pattern)) ? Validators.pattern(validatorArguments.pattern) : Validators.pattern('^[a-zA-Z\-\_]*$'))
            // Validators.pattern(/((([A-Za-z]{3,9}:(?:\/\/)?)(?:[\-;:&=\+\$,\w]+@)?[A-Za-z0-9\.\-]+|(?:www\.|[\-;:&=\+\$,\w]+@)[A-Za-z0-9\.\-]+)((?:\/[\+~%\/\.\w\-_]*)?\??(?:[\-\+=&;%@\.\w_]*)#?(?:[\.\!\/\\\w]*))?)/i)
        ]);
    }

    public constructor()
    {
        super();
    }

    public ngOnInit(): void
    {
        /* Sets the default values. */
        this.init(IdentifierValue.identifier_Label, false, true);
    }

    /**
     * Returns an error string if the control is in an error state; otherwise, empty string. 
     */
    public getErrorMessage(): string
    {
        let validationErrors: ValidationErrors = this.content.formControl.errors;

        /* Shows the identifier errors. */
        if (validationErrors)
        {
            if (validationErrors[Validators.required.name])
            {
                return this.validationError_required;
            }
            else
            {
                /* It is `validationErrors[Validators.pattern.name]`. */
                return 'The identifier is wrong.';
            }
        }

        return '';
    }
}
