
import { Directive, Input } from '@angular/core';
import { AbstractControl, ValidatorFn, ValidationErrors, Validator, NG_VALIDATORS } from '@angular/forms';

/**
 * @description
 * Provides a set of extra validators that can be used by form controls. 
 *
 * A validator is a function that processes a `FormControl` or collection of 
 * controls and returns an error map or null. A null map means that validation has passed. 
 *
 * @see [Form Validation](/guide/form-validation)
 */
export class ExtraValidators
{
    /**
     * @description 
     * Validator that requires the length of the control's value to be equal to the 
     * provided length. This validator is used with Reactive Forms; if you want to use 
     * an equivalent validator with Template-driven Form you must use the `equalLength` attribute. 
     *
     * @usageNotes 
     *
     * ### Validates that the field has a length of 4 characters: 
     *
     * ```typescript 
     * const control = new FormControl('ng', ExtraValidators.equalLength(4)); 
     *
     * console.log(control.errors); // { equalLength: { requiredLength: 4, actualLength: 2 } } 
     * ``` 
     *
     * ```html 
     * <input equalLength="4"> 
     * ``` 
     *
     * @returns A validator function that returns an error map with the 
     * `equalLength` if the validation check fails, otherwise `null`. 
     */
    public static equalLength(equalLength: number): ValidatorFn
    {
        return (control: AbstractControl): ValidationErrors | null => {
            const len = control.value ? control.value.length : 0;

            return (len != equalLength) 
                ? { 'equalLength': { 'requiredLength': equalLength, 'actualLength': len } } 
                : null;
        };
    }
}

/**
 * 
 */
@Directive({
    selector: '[equalLength]',
    providers: [{ 
        provide: NG_VALIDATORS, 
        useExisting: ForbiddenValidatorDirective, 
        multi: true
    }]
})
export class ForbiddenValidatorDirective implements Validator
{
    /**
     * Input variable that contains the length to check. 
     */
    @Input() public equalLength: string;

    /**
     * @description
     * Method that performs synchronous validation against the provided control. 
     *
     * @param control The control to validate against. 
     *
     * @returns A map of validation errors if validation fails; otherwise, null. 
     */    
    public validate(control: AbstractControl): ValidationErrors | null
    {
        return (this.equalLength) 
            ? ExtraValidators.equalLength(parseInt(this.equalLength, 10))(control) 
            : null;
    }
}
