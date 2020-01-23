
import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, ValidationErrors } from '@angular/forms';

import { InputControl } from '../input.control';
import { RnpsValue } from './rnps-value';
import { ExtraValidators } from '@toco/tools/core';
import { Common } from '@toco/tools/core';

/**
 * Represents a control that allows the writing of an RNPS. 
 * An RNPS (Registro Nacional de Publicaciones Seriadas) is an 4-digit code used to control 
 * las publicaciones seriadas autorizadas a editarse, imprimirse y circular en Cuba. 
 * For more information follow the link: http://www.seriadas.cult.cu/. 
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
	 * It is used by `handleSpecificInput` method. 
	 */
    private _codeOldValue: string;

    public constructor()
    {
        super(
            /* Constructs a new `FormControl` instance. */
            new FormControl(Common.emptyString, [
                ExtraValidators.equalLength(RnpsValue.codeLength),
                Validators.pattern('^[0-9]*$')
            ])
        );

        this._codeOldValue = this.internalControl.value;
    }

    public ngOnInit(): void
    {
        /* Sets the default values. */
        this.init(RnpsValue.rnps_Abbreviation, true, true);
    }

    /**
     * Returns an error string if the control is in an error state; otherwise, empty string. 
     */
    public getErrorMessage(): string
    {
        let result: string = Common.emptyString;
        let result_alreadyHaveErrorInfo: boolean = false;
        let validationErrors: ValidationErrors = this.internalControl.errors;

        /* Shows the code errors. */
        if (validationErrors)
        {
            if ((validationErrors[ExtraValidators.equalLength.name]) || (validationErrors[Validators.required.name]))
            {
                result += 'Its length must be ' + RnpsValue.codeLengthAsString;
                result_alreadyHaveErrorInfo = true;
            }

            if (validationErrors[Validators.pattern.name])
            {
                if (result_alreadyHaveErrorInfo)
                {
                    result += ', and all positions have digits';
                }
                else
                {
                    result += 'All positions must have digits';
                }

                result_alreadyHaveErrorInfo = true;
            }

            result += '.';
        }

        return result;
    }

	/**
	 * Handler method that is called by the internal logic when the control's value changes in the UI. 
     * This method contains the specific handling of the input that the derived class wants to do. 
	 */
	public handleSpecificInput(): void
	{
		if (this.internalControl.value.length > RnpsValue.codeLength)
		{
			/* Sets the old value. */
			this.internalControl.setValue(this._codeOldValue);
        }
        else
        {
            /* Updates the old values. */
            this._codeOldValue = this.internalControl.value;
        }
    }
}
