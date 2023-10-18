
import { Component, OnInit } from '@angular/core';
import { UntypedFormControl, Validators, ValidationErrors } from '@angular/forms';

import { ExtraValidators } from '../../../core/utils/validator';

import { RnpsValue } from './rnps-value';
import { InputControl } from '../input.control';
import { ValidatorArguments } from '../../form-field.control';

/**
 * Represents a control that allows the writing of an RNPS. 
 * An RNPS (Registro Nacional de Publicaciones Seriadas) is an 4-digit code used to control 
 * the serial publications authorized to be edited, printed and circulated in Cuba. 
 * For more information follow the link: http://www.seriadas.cult.cu/. 
 * It uses the `RnpsValue.rnps_Abbreviation` as a label if the `content.label` is not specified. 
 * It uses the `RnpsValue.rnps_Placeholder` as a placeholder if the `content.placeholder` is not specified. 
 */
@Component({
    selector: 'input-rnps',
    templateUrl: '../text/text-input.component.html',
    styleUrls: ['../text/text-input.component.scss'],
    host: {
        '[style.minWidth]': 'content.minWidth',
        '[style.width]': 'content.width'
    }
})
export class InputRnpsComponent extends InputControl implements OnInit
{
    /**
     * Returns a `FormControl` by default. 
     * It is used to initialized the `InputRnpsComponent`'s `content.formControl` value by default. 
     * In this case, the `validatorArguments` argument is always `undefined`. 
     */
    public static getFormControlByDefault(validatorArguments: ValidatorArguments = undefined): UntypedFormControl
    {
        return new UntypedFormControl('', [
            ExtraValidators.equalLength(RnpsValue.codeLength),
            Validators.pattern('^[0-9]*$')
        ]);
    }

	/**
	 * It is used by `handleSpecificInput` method. 
	 */
    private _codeOldValue: string;

    public constructor()
    {
        super();

        this._codeOldValue = undefined;
    }

    public ngOnInit(): void
    {
        /* Sets the default values. */

        this.init(RnpsValue.rnps_Abbreviation, RnpsValue.rnps_Placeholder, true, true);

        /* The '_codeOldValue' must be set after the 'content.formControl.value' is set. */
        this.handleSpecificInput();
    }

    /**
     * Returns an error string if the control is in an error state; otherwise, empty string. 
     */
    public getErrorMessage(): string
    {
        let result: string = '';
        let result_alreadyHaveErrorInfo: boolean = false;
        let validationErrors: ValidationErrors = this.content.formControl.errors;

        /* Shows the code errors. */
        if (validationErrors)
        {
            if ((validationErrors[ExtraValidators.equalLength.name]) || (validationErrors[Validators.required.name]))
            {
                result = 'TOCO_NG_ERROR_MSG_RNPS_LONG_INVAL';
                result_alreadyHaveErrorInfo = true;
            }

            if (validationErrors[Validators.pattern.name])
            {
                if (result_alreadyHaveErrorInfo)
                {
                    result = 'TOCO_NG_ERROR_MSG_RNPS_LONG_Y_DIG_INVAL';
                }
                else
                {
                    result = 'TOCO_NG_ERROR_MSG_RNPS_DIG_INVAL';
                }

                result_alreadyHaveErrorInfo = true;
            }
        }

        return result;
    }

	/**
	 * Handler method that is called by the internal logic when the control's value changes in the UI. 
     * This method contains the specific handling of the input that the derived class wants to do. 
	 */
	public handleSpecificInput(): void
	{
		if (this.content.formControl.value.length > RnpsValue.codeLength)
		{
			/* Sets the old value. */
			this.content.formControl.setValue(this._codeOldValue);
        }
        else
        {
            /* Updates the old values. */
            this._codeOldValue = this.content.formControl.value;
        }
    }
}
