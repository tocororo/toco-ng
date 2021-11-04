
import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, ValidationErrors } from '@angular/forms';

import { ValidatorArguments } from '../../form-field.control';

import { InputControl } from '../input.control';

/**
 * Represents a control that allows the writing of a number. 
 */
@Component({
    selector: 'input-number',
    templateUrl: '../text/text-input.component.html',
    styleUrls: ['../text/text-input.component.scss'],
    host: {
        '[style.minWidth]': 'content.minWidth',
        '[style.width]': 'content.width'
    }
})
export class InputNumberComponent extends InputControl implements OnInit
{
    // TODO: Puedo hacer que este control sea más general, que permita la entrada de valores 
    // enteros y doubles haciendo las siguientes modificaciones: 
    //  * Inicializar el `Validators.pattern('----')` con un patrón para double values según valor que recibe en 
    //    `validatorArguments` que dice si integer o double. 
    //  * Hacer tratamiento de error correctamente em método `getErrorMessage()`. 

    /**
     * Returns a `FormControl` by default. 
     * It is used to initialized the `InputNumberComponent`'s `content.formControl` value by default. 
     * @param validatorArguments A collection of key/value elements, where the key is the validator name 
     * and the value is the value that the validator needs to check. 
     * In the `validatorArguments` argument, you can specify an object with the minimum and maximum possible 
     * values for the number that holds the control. 
     * For example: If the minimum possible value is 0 and maximum is 50, you can call the `getFormControlByDefault` 
     * method in this way: 
     * InputNumberComponent.getFormControlByDefault({ 'min': 0, 'max': 50 });
     */
    public static getFormControlByDefault(validatorArguments: ValidatorArguments = undefined): FormControl
    {
        return new FormControl(0, [
            Validators.pattern('^-?[0-9]+$'),
            Validators.min(((validatorArguments) && (validatorArguments.min != undefined)) ? validatorArguments.min : Number.MIN_SAFE_INTEGER),
            Validators.max(((validatorArguments) && (validatorArguments.max != undefined)) ? validatorArguments.max : Number.MAX_SAFE_INTEGER),
        ]);
    }

    public constructor()
    {
        super();
    }

    public ngOnInit(): void
    {
        /* Sets the default values. */
        this.init('', false, false);
    }

    /**
     * Returns an error string if the control is in an error state; otherwise, empty string. 
     */
    public getErrorMessage(): string
    {
        let validationErrors: ValidationErrors = this.content.formControl.errors;

        /* Shows the code errors. */
        if (validationErrors)
        {
            if (validationErrors[Validators.required.name])
            {
                return this.validationError_required;
            }

            if (validationErrors[Validators.pattern.name])
            {
                return 'The number is invalid.';
            }

            if (validationErrors[Validators.min.name])
            {
                return 'The minimum number that can hold is: ' + validationErrors[Validators.min.name].min + '.';
            }

            if (validationErrors[Validators.max.name])
            {
                return 'The maximum number that can hold is: ' + validationErrors[Validators.max.name].max + '.';
            }
        }

        return '';
    }
}
