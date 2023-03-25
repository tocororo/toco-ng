
import { Component, OnInit } from '@angular/core';
import { UntypedFormControl, Validators, ValidationErrors } from '@angular/forms';

import { InputControl } from '../input.control';
import { ValidatorArguments } from '../../form-field.control';

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
    /**
     * Returns a `FormControl` by default. 
     * It is used to initialized the `InputTextComponent`'s `content.formControl` value by default. 
     * @param validatorArguments An object that has only one field of `pattern` name and its value is a string. 
     * The `pattern` name is the validator name and the value is the value that the validator needs to check. 
     * For example, you can call the `getFormControlByDefault` method in this way: 
     * InputTextComponent.getFormControlByDefault({ 'pattern': '^[a-zA-Z][a-zA-Z\-\_\ 0-9]*$' });
     * If this argument is not specified, by default its value is `undefined`. 
     */
    public static getFormControlByDefault(validatorArguments: ValidatorArguments = undefined): UntypedFormControl
    {
        return new UntypedFormControl('', (((validatorArguments) && (validatorArguments.pattern)) ? [Validators.pattern(validatorArguments.pattern)] : [ ]));
    }

    public constructor()
    {
        super();
    }

    public ngOnInit(): void
    {
        /* Sets the default values. */
        this.init('', '', false, true);
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
                return 'TOCO_NG_ERROR_MSG_TEXTO_INVAL';
            }
        }

        return '';
    }
}
