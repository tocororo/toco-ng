
import { Directive, OnChanges, Input, SimpleChanges } from '@angular/core';
import { AbstractControl, FormControl, ValidatorFn, ValidationErrors, Validator, NG_VALIDATORS, FormGroup } from '@angular/forms';

/**
 * Represents a class that contains a boolean property named `required`. 
 */
export interface RequiredProperty
{
    /**
     * Returns true if the control is required; otherwise, false. 
     */
    readonly required: boolean;
}

/**
 * @description
 * Provides a set of extra validators that can be used by form controls. 
 *
 * A validator is a function that processes a `FormControl` or collection of 
 * controls and returns an error map or `null`. A `null` map means that validation has passed. 
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
        const rest = (control: AbstractControl): ValidationErrors | null => {
            const len: number = control.value ? control.value.length : 0;

            return ((len != 0) && (len != equalLength)) 
                ? { 'equalLength': { 'requiredLength': equalLength, 'actualLength': len } } 
                : null;
        };
        return rest
    }

    /**
     * @description
     * Validator that is applied to a control that has an array of child controls. 
     * It receives an object that fits the `RequiredProperty` interface and an array of child controls. 
     * The behavior of the validator is the following: 
     * If the control's value is required, then 
     *   - all child controls must be different of empty. 
     * If the control's value is not required, then 
     *   - all child controls can be empty. 
     *   - if there is at least one child control not empty, then all child controls must be different of empty. 
     * The validator exists only as a function and not as a directive. 
     *
     * @usageNotes
     *
     * ### Validates that the control does not have an empty child control: 
     *
     * ```typescript 
     * const control = new FormGroup({
     *     'fg': (firstGroup = new FormControl('2049')), 
     *     'sg': (secondGroup = new FormControl(''))}, 
     *     ExtraValidators.requiredAndNotEmpty(this, [firstGroup, secondGroup])); 
     *
     * console.log(control.errors); // { requiredAndNotEmpty: { required: true, pos: 1 } } 
     * ``` 
     *
     * @returns A validator function that returns an error map with the `requiredAndNotEmpty` 
     * if the validation check fails, otherwise `null`. 
     */
    public static requiredAndNotEmpty(requiredProperty: RequiredProperty, childControls: FormControl[]): ValidatorFn
    {
        const rest = (control: AbstractControl): ValidationErrors | null => {
            let i: number = 0;
            let controlsGroupLength: number = childControls.length;

            if (requiredProperty.required)
            {
                /* Only iterates to the first empty element. */
                for (; i < controlsGroupLength; i++)
                {
                    if (!childControls[i].value) break;
                }

                return (i == controlsGroupLength) 
                    ? null 
                    : { 'requiredAndNotEmpty': { 'required': true, 'pos': i } };
            }
            else
            {
                let hasControlNotEmpty: boolean = false;
                let minEmptyPos: number = -1;

                /* Iterates to the first empty element. */
                for (; i < controlsGroupLength; i++)
                {
                    if (childControls[i].value)
                    {
                        if (minEmptyPos != -1) break;
                        hasControlNotEmpty = true;
                    }
                    else
                    {
                        if (minEmptyPos == -1) minEmptyPos = i;
                        if (hasControlNotEmpty) break;
                    }
                }

                return (i == controlsGroupLength)
                    ? null
                    : { 'requiredAndNotEmpty': { 'required': true, 'pos': minEmptyPos } };
            }
        };
        return rest;
    }

    /**
     * @description
     * Validator that requires the control's value pass an ISSN validation test (confirm the check digit). 
     * The ISSN value is divided in two groups, therefore the control has two child controls and they are 
     * arguments of the validator method. 
     * The validator exists only as a function and not as a directive. 
     *
     * @usageNotes
     *
     * ### Validates that the field matches a valid ISSN pattern (confirms the check digit): 
     *
     * ```typescript 
     * const control = new FormGroup({
     *     'fg': (firstGroup = new FormControl('2049')), 
     *     'sg': (secondGroup = new FormControl('3635'))}, 
     *     ExtraValidators.issnConfirmCheckDigit(firstGroup, secondGroup, 4)); 
     *
     * console.log(control.errors); // { issnConfirmCheckDigit: true } 
     * ``` 
     *
     * @returns A validator function that returns an error map with the `issnConfirmCheckDigit` 
     * if the validation check fails, otherwise `null`. 
     */
    public static issnConfirmCheckDigit(firstGroup: FormControl, secondGroup: FormControl, groupLength: number): ValidatorFn
    {
        const rest = (control: AbstractControl): ValidationErrors | null => {
            if ((firstGroup.value.length == groupLength) && (secondGroup.value.length == groupLength))
            {
                let groupValue: string = firstGroup.value;

                let result: number = (groupValue.charCodeAt(0) - 48) * 8;
                result += (groupValue.charCodeAt(1) - 48) * 7;
                result += (groupValue.charCodeAt(2) - 48) * 6;
                result += (groupValue.charCodeAt(3) - 48) * 5;

                result += ((groupValue = secondGroup.value).charCodeAt(0) - 48) * 4;
                result += (groupValue.charCodeAt(1) - 48) * 3;
                result += (groupValue.charCodeAt(2) - 48) * 2;
                result += ((groupValue[3] == 'x') || (groupValue[3] == 'X')) ? 10 : groupValue.charCodeAt(3) - 48;

                return (result % 11) 
                    ? { 'issnConfirmCheckDigit': true } 
                    : null;
            }

            return null;
        };
        return rest;
    }

    public static issnValidator(internalFormGroup: FormGroup): ValidatorFn
    {
        const rest = (control: AbstractControl): ValidationErrors | null => {
            return (!internalFormGroup.valid) 
                ? { 'issnValidator': { 'requiredValid': internalFormGroup.valid } } 
                : null;
        };
        return rest;
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
    @Input()
    public equalLength: string;

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
     * @returns A map of validation errors if validation fails; otherwise, `null`. 
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
