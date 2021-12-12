
import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, ValidationErrors } from '@angular/forms';

import { ExtraValidators } from '../../../core/utils/validator';

import { IssnType_Abbreviation, IssnValue } from './issn-value';
import { InputControl } from '../input.control';
import { ValidatorArguments } from '../../form-field.control';

/**
 * Represents a control that allows the writing of an ISSN. 
 * An ISSN (International Standard Serial Number) is an 8-digit code. 
 * This control stores the code as a string of length 11, with the form 'XXXX – XXXX'. 
 * It is used to identify newspapers, journals, magazines and periodicals 
 * of all kinds and on all media–print and electronic. For more information 
 * follow the link: https://www.issn.org/understanding-the-issn/what-is-an-issn/. 
 * It uses the `IssnType_Abbreviation.ISSN` as a label if the `content.label` is not specified. 
 * It uses the `IssnValue.issn_Placeholder` as a placeholder if the `content.placeholder` is not specified. 
 */
@Component({
    selector: 'input-issn',
    templateUrl: '../text/text-input.component.html',
    styleUrls: ['../text/text-input.component.scss'],
    host: {
        '[style.minWidth]': 'content.minWidth',
        '[style.width]': 'content.width'
    }
})
export class InputIssnComponent extends InputControl implements OnInit
{
    /* Note: Before, this control worked well with a 'width' = '310px' or '285px'. */

    /**
     * Returns a `FormControl` by default. 
     * It is used to initialized the `InputIssnComponent`'s `content.formControl` value by default. 
     * In this case, the `validatorArguments` argument is always `undefined`. 
     */
    public static getFormControlByDefault(validatorArguments: ValidatorArguments = undefined): FormControl
    {
        let res: FormControl = new FormControl('', [
            ExtraValidators.equalLength(IssnValue.codeLength),
            Validators.pattern(IssnValue.regExpIssnWithLength_11),
            ExtraValidators.issnConfirmCheckDigitOneField(IssnValue.codeLength)
        ]);

        return res;
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

        this.init(IssnType_Abbreviation.ISSN, IssnValue.issn_Placeholder, true, true);

        if ((typeof this.content.value !== 'string') && (typeof this.content.value !== 'undefined'))
        {
            throw new Error(`For the '${ this.content.name }' control, the 'content.value' value must be of string type.`);
        }

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
                result = 'TOCO_NG_ERROR_MSG_ISSN_LONG_INVAL';
                result_alreadyHaveErrorInfo = true;
            }

            if (validationErrors[Validators.pattern.name])
            {
                if (result_alreadyHaveErrorInfo)
                {
                    result = 'TOCO_NG_ERROR_MSG_ISSN_LONG_Y_DIG_INVAL';
                }
                else
                {
                    result = 'TOCO_NG_ERROR_MSG_ISSN_DIG_INVAL';
                }

                result_alreadyHaveErrorInfo = true;
            }
        }

		/* Only shows the `issnConfirmCheckDigitOneField` error if there isn't any previous error. */
		if (!result_alreadyHaveErrorInfo)
		{
            if (validationErrors)
			{
				if (validationErrors[ExtraValidators.issnConfirmCheckDigitOneField.name])
				{
					result = 'TOCO_NG_ERROR_MSG_ISSN_DIG_CHEQUEO_INVAL';
					result_alreadyHaveErrorInfo = true;
				}
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
        /* Forma de entrada del código ISSN por parte del usuario: 
         * El control ISSN permite copiar códigos ISSN con el separador de menos (-) o con 
         * el separador de raya (–), y son copiados correctamente para un código ISSN 
         * con el separador de raya (–); es decir, los siguientes ejemplos muestran 
         * el resultado de copiar una forma de código en particular. 
         *  - Si se copia 01234560, entonces se muestra 0123 – 4560
         *  - Si se copia 0123-4560, entonces se muestra 0123 – 4560
         *  - Si se copia 0123 - 4560, entonces se muestra 0123 – 4560
         *  - Si se copia 0123–4560, entonces se muestra 0123 – 4560
         *  - Si se copia 0123 – 4560, entonces se muestra 0123 – 4560
         *  - Si se copia 0123 – 45601, entonces se muestra 0123 – 4560
         *  - Si se copia un código ISSN con más de 8 dígitos en la forma que sea, 
         *    entonces no se copia y se sigue mostrando el código anterior. 
         * Recuerde que el caracter 'x' or 'X' puede aparecer solamente en la última 
         * posición del código ISSN. Además, aunque los dos caracteres significan lo mismo, 
         * siempre se trata de mostrar el caracter 'X' en mayúscula. 
         */

        let tempCode: string = this.content.formControl.value;
        let len: number = tempCode.length;

        /* Checks that the code length can not be longer than `IssnValue.codeLength`. */
		if (len > IssnValue.codeLength)  /* This case is used for code with length 11. */
		{
			/* Sets the old value. */
            this.content.formControl.setValue(this._codeOldValue);
            return;
        }

        let i: number;
        let newCode: string = '';
        let alreadyHasSpace: boolean = false;
        let count: number = 0;

        for (i = 0; i < len; i++)
        {
            switch(tempCode[i])
            {
                case '0': case '1': case '2': case '3': case '4':
                case '5': case '6': case '7': case '8': case '9':
                {
                    if (((++count) == 4) && (!alreadyHasSpace))
                    {
                        alreadyHasSpace = true;
                        newCode += tempCode[i] + IssnValue.codeGroupSeparatorWithSpace;
                    }
                    else
                    {
                        newCode += tempCode[i];
                    }
                    break;
                }

                case 'x': case 'X':
                {
                    if ((i + 1) == len)  /* The 'x' or 'X' character can only appear in the last position. */
                    {
                        count++;
                        newCode += 'X';
                    }
                    break;
                }

                case ' ':
                {
                    if (!alreadyHasSpace)
                    {
                        alreadyHasSpace = true;
                        newCode += IssnValue.codeGroupSeparatorWithSpace;
                    }
                    break;
                }
            }
        }

        /* Checks that the code length can not be longer than `IssnValue.codeLength`. */
        if (count > 8)  /* This case is used for code with length 8 and 9. */
		{
			/* Sets the old value. */
            this.content.formControl.setValue(this._codeOldValue);
        }
        else
        {
            /* Sets the new value, and updates the old value. */
            this.content.formControl.setValue((this._codeOldValue = newCode));
        }
    }
}
