
import { Component, OnInit } from '@angular/core';
import { UntypedFormControl, Validators, ValidationErrors } from '@angular/forms';

import { UrlValue } from './url-value';
import { InputControl } from '../input.control';
import { ValidatorArguments } from '../../form-field.control';

/**
 * Represents a control that allows the writing of a url.
 * It uses the `UrlValue.url_Label` as a label if the `content.label` is not specified. 
 * It uses the `UrlValue.url_Placeholder` as a placeholder if the `content.placeholder` is not specified. 
 */
@Component({
    selector: 'input-url',
    templateUrl: '../text/text-input.component.html',
    styleUrls: ['../text/text-input.component.scss'],
    host: {
        '[style.minWidth]': 'content.minWidth',
        '[style.width]': 'content.width'
    }
})
export class InputUrlComponent extends InputControl implements OnInit
{
    /**
     * Returns a `FormControl` by default. 
     * It is used to initialized the `InputUrlComponent`'s `content.formControl` value by default. 
     * In this case, the `validatorArguments` argument is always `undefined`. 
     */
    public static getFormControlByDefault(validatorArguments: ValidatorArguments = undefined): UntypedFormControl
    {
        // const reg = '/(^|\s)((https?:\/\/)?[\w-]+(\.[\w-]+)+\.?(:\d+)?(\/\S*)?)/gi';
        // const reg2 = '[a-z.]*';
        const reg3 = '(https?://)?([\\da-z.-]+)\\.([a-z.]{2,6})[/\\w .-]*/?';
        return new UntypedFormControl('', [
            Validators.pattern(reg3)
            // Validators.pattern('/(^|\s)((https?:\/\/)?[\w-]+(\.[\w-]+)+\.?(:\d+)?(\/\S*)?)/i')
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
        this.init(UrlValue.url_Label, UrlValue.url_Placeholder, false, true);
    }

    /**
     * Returns an error string if the control is in an error state; otherwise, empty string.
     */
    public getErrorMessage(): string
    {
        let validationErrors: ValidationErrors = this.content.formControl.errors;

        /* Shows the url errors. */
        if (validationErrors)
        {
            if (validationErrors[Validators.required.name])
            {
                return this.validationError_required;
            }
            else
            {
                /* It is `validationErrors[Validators.pattern.name]`. */
                return 'TOCO_NG_ERROR_MSG_URL_INVAL';
            }
        }

        return '';
    }
}
