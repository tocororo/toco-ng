
import { Directive, OnChanges, Input, SimpleChanges } from '@angular/core';
import { AbstractControl, FormGroup, ValidatorFn, ValidationErrors, Validator, NG_VALIDATORS } from '@angular/forms';

import { IssnValue } from '../../forms/form-field-issn/issn-value';

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
     * <input name="firstName" ngModel equallength="4"> 
     * ``` 
     *
     * @returns A validator function that returns an error map with the `equalLength` 
     * if the validation check fails, otherwise `null`. 
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

    /**
     * @description
     * Validator that requires the control's value pass an ISSN validation test (confirm the check digit). 
     * The ISSN value is divided in two groups, therefore the control has two child controls and its names 
     * are arguments of the validator method. 
     * The validator exists only as a function and not as a directive. 
     *
     * @usageNotes
     *
     * ### Validates that the field matches a valid ISSN pattern (confirms the check digit): 
     *
     * ```typescript 
     * const control = new FormGroup({
     *     'fg': new FormControl('2049'), 
     *     'sg': new FormControl('3635')}, 
     *     ExtraValidators.issnConfirmCheckDigit('fg', 'sg')); 
     *
     * console.log(control.errors); // { issnConfirmCheckDigit: true } 
     * ``` 
     *
     * @returns A validator function that returns an error map with the `issnConfirmCheckDigit` 
     * if the validation check fails, otherwise `null`. 
     */
    public static issnConfirmCheckDigit(controlName_firstGroup: string, controlName_secondGroup: string): ValidatorFn
    {
        return (control: FormGroup): ValidationErrors | null => {
            if ((control.get(controlName_firstGroup).value.length == IssnValue.groupLength) && (control.get(controlName_secondGroup).value.length == IssnValue.groupLength))
            {
                let groupValue: string = control.get(controlName_firstGroup).value;

                let result: number = (groupValue.charCodeAt(0) - 48) * 8;
                result += (groupValue.charCodeAt(1) - 48) * 7;
                result += (groupValue.charCodeAt(2) - 48) * 6;
                result += (groupValue.charCodeAt(3) - 48) * 5;

                result += ((groupValue = control.get(controlName_secondGroup).value).charCodeAt(0) - 48) * 4;
                result += (groupValue.charCodeAt(1) - 48) * 3;
                result += (groupValue.charCodeAt(2) - 48) * 2;
                result += ((groupValue[3] == 'x') || (groupValue[3] == 'X')) ? 10 : groupValue.charCodeAt(3) - 48;

                return (result % 11) 
                    ? { 'issnConfirmCheckDigit': true } 
                    : null;
            }

            return null;
        };
    }
}

/**
 * @description
 * A directive that represents a validator that requires the length of the control's value 
 * to be equal to the provided length. The control must be marked with the `equalLength` attribute. 
 * The directive is provided with the `NG_VALIDATORS` mult-provider list. 
 * This validator is used with Template-driven Form; if you want to use an equivalent validator 
 * with Reactive Forms you must use the `ExtraValidators.equalLength` method. 
 *
 * @usageNotes
 *
 * ### Validates that the field has a length of 4 characters: 
 *
 * The following example shows how to add an equal length validator to an input attached to an 
 * ngModel binding. 
 *
 * ```html 
 * <input name="firstName" ngModel equallength="4"> 
 * ``` 
 */
@Directive({
    selector: '[equalLength]',
    providers: [{ 
        provide: NG_VALIDATORS, 
        useExisting: EqualLengthDirective, 
        multi: true
    }]
})
export class EqualLengthDirective implements OnChanges, Validator
{
    /**
     * @description
     * Input variable that contains the length to check. 
     */
    @Input() public equalLength: string;

    private _validator: ValidatorFn;
    private _onChange: () => void;

    /**
     * @description
     * A lifecycle hook method that is called when the directive's inputs change. For internal use only. 
     *
     * @param changes An object of key/value pairs for the set of changed inputs. 
     */
    public ngOnChanges(changes: SimpleChanges): void
    {
        if('equalLength' in changes)
        {
            this._validator = ExtraValidators.equalLength(parseInt(this.equalLength, 10));

            if(this._onChange) this._onChange();
        }
    }    

    /**
     * @description
     * Method that performs synchronous validation against the provided control. It requires the length 
     * of the control's value to be equal to the provided `equalLength`. 
     *
     * @param control The control to validate against. 
     *
     * @returns A map of validation errors if validation fails; otherwise, null. 
     */    
    public validate(control: AbstractControl): ValidationErrors | null
    {
        return (this.equalLength) 
            ? this._validator(control) 
            : null;
    }

    /**
     * @description
     * Registers a callback function to call when the validator inputs change. 
     *
     * @param fn The callback function to register. 
     */
    public registerOnValidatorChange(fn: () => void): void
    {
        this._onChange = fn;
    }
}
