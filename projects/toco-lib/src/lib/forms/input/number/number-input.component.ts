
import { Component, OnInit } from '@angular/core';
import { UntypedFormControl, Validators, ValidationErrors } from '@angular/forms';
import { LangChangeEvent, TranslateService } from '@ngx-translate/core';

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
    public static getFormControlByDefault(validatorArguments: ValidatorArguments = undefined): UntypedFormControl
    {
        return new UntypedFormControl(0, [
            Validators.pattern('^-?[0-9]+$'),
            Validators.min(((validatorArguments) && (validatorArguments.min != undefined)) ? validatorArguments.min : Number.MIN_SAFE_INTEGER),
            Validators.max(((validatorArguments) && (validatorArguments.max != undefined)) ? validatorArguments.max : Number.MAX_SAFE_INTEGER),
        ]);
    }

    protected static toco_ng_Error_Msg_Num_Inval: string = '';
    protected static toco_ng_Error_Msg_Num_Minimo: string = '';
    protected static toco_ng_Error_Msg_Num_Maximo: string = '';

    public constructor(private _transServ: TranslateService)
    {
        super();

        /* The translation is built by the control. */
        this.isTranslationBuiltByControl = true;
    }

    public ngOnInit(): void
    {
        /* This needs to be called at first. */
        this.setNewLanguage(this._transServ);

        /* Sets the default values. */
        this.init('', '', false, false);

		/* Changes the translation when the language changes. */
		this._transServ.onLangChange.subscribe((params: LangChangeEvent) => {
			this.setNewLanguage(this._transServ);
		});
    }

    /**
     * Sets the new language. 
     * @param transServ The `TranslateService` instance injected. 
     */
    protected setNewLanguage(transServ: TranslateService): void
    {
        /* First, do this test for optimization. */
        if (InputNumberComponent.currentLang != transServ.currentLang)
        {
            super.setNewLanguage(transServ);

            /* The `InputNumberComponent.currentLang` value is updated correctly in the parent class. */

            transServ.get(['TOCO_NG_ERROR_MSG_NUM_INVAL', 'TOCO_NG_ERROR_MSG_NUM_MINIMO', 'TOCO_NG_ERROR_MSG_NUM_MAXIMO']).subscribe((res: any) => {
                InputNumberComponent.toco_ng_Error_Msg_Num_Inval = res.TOCO_NG_ERROR_MSG_NUM_INVAL;
                InputNumberComponent.toco_ng_Error_Msg_Num_Minimo = res.TOCO_NG_ERROR_MSG_NUM_MINIMO;
                InputNumberComponent.toco_ng_Error_Msg_Num_Maximo = res.TOCO_NG_ERROR_MSG_NUM_MAXIMO;
            });
        }
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
                return InputNumberComponent.toco_ng_Error_Msg_Requerido;
            }

            if (validationErrors[Validators.pattern.name])
            {
                return InputNumberComponent.toco_ng_Error_Msg_Num_Inval;
            }

            if (validationErrors[Validators.min.name])
            {
                return InputNumberComponent.toco_ng_Error_Msg_Num_Minimo + validationErrors[Validators.min.name].min + '.';
            }

            if (validationErrors[Validators.max.name])
            {
                return InputNumberComponent.toco_ng_Error_Msg_Num_Maximo + validationErrors[Validators.max.name].max + '.';
            }
        }

        return '';
    }
}
