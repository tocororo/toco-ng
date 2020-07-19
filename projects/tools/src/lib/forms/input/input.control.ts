/*
 *   Copyright (c) 2020 Universidad de Pinar del Río "Hermanos Saíz Montes de Oca"
 *   All rights reserved.
 */


import { Input, ViewChild } from '@angular/core';
import { Validators, ValidationErrors, FormControl } from '@angular/forms';

import { Common } from '@toco/tools/core';

import { ContentPosition, IconValue, HintPosition, HintValue,
    FormFieldContent, FormFieldControl, cloneFormFieldContent } from '../form-field.control';

/**
 * An enum that represents the appearance style of an `InputControl`. 
 */
export enum TextInputAppearance
{
    /**
     * The `standard` appearance is the default style. It shows the input box with an underline underneath it. 
     */
    standard = 'standard',

    /**
     * The `fill` appearance displays the form field with a filled background box in addition to the underline. 
     */
    fill = 'fill',

    /**
     * The `outline` appearance shows the form field with a border all the way around, not just an underline. 
     */
    outline = 'outline'
}

/**
 * A base interface that represents the content of an `InputControl`. 
 */
export interface InputContent extends FormFieldContent
{
	/**
	 * Tracks the value and validity state of the internal control that contains the text input. 
     * Implementation notes: There are two cases: 
     *  - You only have the `content.formControl` field as the `InputEmailComponent` class. 
     *  - You have the `content.formControl` and `InputControl.internalComponent` fields as the `InputIssnComponent` class. 
     *  - It must be specified; otherwise, an exception is thrown. 
	 */
    formControl?: FormControl;



    /**
     * Returns the control's appearance. 
     * By default, its value is `TextInputAppearance.standard`. 
     */
    appearance?: TextInputAppearance;



    /**
     * Returns the control's prefix icon. 
     * By default, its value is `undefined`. 
     */
    prefixIcon?: IconValue;

    /**
     * Returns the control's suffix icon. 
     * By default, its value is `undefined`. 
     */
    suffixIcon?: IconValue;



    /**
     * Returns the control's prefix text. 
     * By default, its value is `undefined`. 
     */
    prefixText?: string;

    /**
     * Returns the control's suffix text. 
     * By default, its value is `undefined`. 
     */
    suffixText?: string;



	/**
	 * Returns the control's start hint. 
	 * By default, its value is `undefined`. 
	 */
    startHint?: HintValue;

	/**
	 * Returns the control's end hint. 
	 * By default, its value is `undefined`. 
	 */
    endHint?: HintValue;



    /**
     * Returns the function that clones a `InputContent` object. 
     * It clones the object smartly depending on the type of property. 
     * By default, its value is `cloneInputContent` global function. 
     * Almost never the user need to set this field, therefore it is almost always set 
     * internally to `cloneInputContent` global function. 
     */
    cloneContent?: (target: InputContent) => InputContent;
}

/**
 * Returns a new object that represents the clone of the specified `FormControl` target. 
 * @param target The `FormControl` object to clone. 
 */
export function cloneFormControl(target: FormControl): FormControl
{
    //TODO: Hacer este method copiando el control y los validadores de `target`. 
    return undefined;
}

/**
 * Returns a new object that represents the clone of the specified `InputContent` target. 
 * It clones the object smartly depending on the type of property. 
 * @param target The `InputContent` object to clone. 
 */
export function cloneInputContent(target: InputContent): InputContent
{
    let result: InputContent = cloneFormFieldContent(target);

    /* If `target.formControl` field is `undefined`, then it will be defined later. */
    if (target.formControl != undefined) result.formControl = cloneFormControl(target.formControl);

    if (target.appearance != undefined) result.appearance = target.appearance;

    if (target.prefixIcon != undefined) result.prefixIcon = target.prefixIcon;
    if (target.suffixIcon != undefined) result.suffixIcon = target.suffixIcon;

    if (target.prefixText != undefined) result.prefixText = target.prefixText;
    if (target.suffixText != undefined) result.suffixText = target.suffixText;

    if (target.startHint != undefined) result.startHint = target.startHint;
    if (target.endHint != undefined) result.endHint = target.endHint;

    result.cloneContent = cloneInputContent;

    return result;
}

/**
 * An interface which allows to manipulate the internal component that contains the text input. 
 * This interface is implemented when it is created a custom `MatFormFieldControl`. 
 */
export interface IInternalComponent
{
	/**
	 * Tracks the value and validity state of the internal control that contains the text input. 
	 */
    readonly formControl: FormControl;

	/**
	 * Returns or sets the value of the control. 
	 */
    value: any | undefined;

	/**
	 * Returns true if the control is empty; otherwise, false. 
	 */
	readonly empty: boolean;

    /**
     * Returns true if the control is in an error state; otherwise, false. 
     */
    readonly errorState: boolean;

    /**
     * Returns an error string if the control is in an error state; otherwise, empty string. 
     */
    getErrorMessage(): string;
}

/**
 * Represents the base abstract class for a control that allows the writing/selection of a text.
 */
export abstract class InputControl extends FormFieldControl
{
    /**
	 * Tracks the value and validity state of the internal component that contains the text input. 
     * Implementation notes: There are two cases: 
     *  - You only have the `content.formControl` field as the `InputEmailComponent` class. 
     *  - You have the `content.formControl` and `internalComponent` fields as the `InputIssnComponent` class. 
	 */
	@ViewChild('internalComponent', { static: true })
    protected readonly internalComponent: IInternalComponent;

    /**
     * Represents the validation error of required. 
     */
    protected validationError_required: string;

    /**
     * Input field that contains the content of this class. 
     */
    @Input()
    public content: InputContent;

    /**
     * Constructs a new instance of this class. 
     */
    public constructor()
    {
        super();

        this.validationError_required = '';
    }

    /**
     * Initializes the `content` input property. 
     * @param label The label to set. If the value is `undefined`, sets the label to `content.label`. 
     * @param isAbbreviation If it is true then the `label` argument represents an abbreviation; otherwise, false. 
     * @param alwaysHint If it is true then there is always at leat one hint start-aligned. 
     */
    protected init(label: string | undefined, isAbbreviation: boolean, alwaysHint: boolean): void
    {
        if (this.content.formControl == undefined)
        {
            if (this.internalComponent == undefined) throw new Error('There is not reference to the internal control; it must be a `FormControl`.');

            this.content.formControl = this.internalComponent.formControl;
        }

        /* Sets the default values. */

        super.init(label, isAbbreviation, alwaysHint);

        let temp: string = (isAbbreviation) ? this.content.label : this.content.label.toLowerCase();
        this.validationError_required = `You must write a valid ${ temp }.`;

        /************************** `mat-form-field` properties. **************************/
        if (this.content.appearance == undefined) this.content.appearance = TextInputAppearance.standard;

        /***************************** `mat-icon` properties. *****************************/
        if (this.content.prefixIcon != undefined) this.content.prefixIcon.setDefaultValueIfUndefined_setPosition(ContentPosition.prefix);
        if (this.content.suffixIcon != undefined) this.content.suffixIcon.setDefaultValueIfUndefined_setPosition(ContentPosition.suffix);

        /***************************** `mat-hint` properties. *****************************/
        if (alwaysHint && (this.content.startHint == undefined) && (this.content.endHint == undefined))
        {
            this.content.startHint = new HintValue(HintPosition.start, `Write a valid ${ temp }.`);
        }
        else
        {
            if (this.content.startHint != undefined) this.content.startHint.setDefaultValueIfUndefined_setPosition(HintPosition.start);
            if (this.content.endHint != undefined) this.content.endHint.setDefaultValueIfUndefined_setPosition(HintPosition.end);
        }

        /* Sets its `cloneContent` method. */
        this.content.cloneContent = cloneInputContent;

        /* Adds this control as a child to the `content.parentFormSection`. It must be called at the end. */
        if (this.content.parentFormSection != undefined)
        {
            console.log('addAsChildControl(this.content.formControl)');

            this.addAsChildControl(this.content.formControl);
        }
    }

	/**
	 * Initializes the control's value. It uses the `content.value` and it is already different of `undefined`. 
     * It also checks if the specified `content.value` is correct. For internal use only. 
	 */
	protected initValue(): void
	{
        /* In this way, checks if the specified `content.value` is correct. */
        this.content.formControl.setValue(this.content.value);

        /* Marks the control as `touched`. */
        this.content.formControl.markAsTouched({
            onlySelf: true
        });
	}

	/**
	 * Returns true if the control is empty; otherwise, false. 
	 */
	public get empty(): boolean
	{
        if (this.internalComponent == undefined) return (!this.content.formControl.value);
        return this.internalComponent.empty;
    }

    /**
     * Returns true if the control is in a hint state; otherwise, false. 
     */
    public get hintState(): boolean
    {
        return this.empty;
    }

    /**
     * Returns true if the control is in an error state; otherwise, false. 
     */
    public get errorState(): boolean
    {
        /* The control does not display errors before the user has a 
         * chance to edit the form. The checks for dirty and touched prevent errors 
         * from showing until the user does one of two things: changes the value, 
         * turning the control dirty; or blurs the form control element, setting the 
         * control to touched. 
         * Thus, it reveals an error message only if the control is invalid and 
         * the control is either dirty or touched. */
        if (this.internalComponent == undefined) return ((this.content.formControl.invalid) && (this.content.formControl.dirty || this.content.formControl.touched));
        return this.internalComponent.errorState;
    }

	/**
	 * Handler method that is called when the control's value changes in the UI. For internal use only. 
     * If a derived class wants to do some specific handling then it must overwrite 
     * the `handleSpecificInput` method. 
	 */
	public handleInput(): void
	{
        /* Calls the specific handling of the input that the derived class wants to do. */
        this.handleSpecificInput();

        // TODO: hacer la salva del valor del control para `this.content.value` de una mejor forma 
        // porque hacerlo aquí genera inconsistencias. Una mejor forma sería proporcionar un method que 
        // haga la función de salvar el valor y entonces es llamado cuando haga falta. 
        /* If the control does not have error ... */
        if (!this.errorState)
        {
            /* ... sets the new value of the control in the `content`. */
            this.content.value = this.content.formControl.value;
        }

        /* If the control is not marked as `touched` ... */
        if (this.content.formControl.untouched)
        {
            /* ... marks the control as `touched`. */
            this.content.formControl.markAsTouched({
                onlySelf: true
           });
        }
    }

	/**
	 * Returns the control's default value. 
     * This function can be overwrite in the derived class. 
	 */
    public get getDefaultValue(): any
    {
        /* By default, its implementation is returning the empty string. */

        return Common.emptyString;
    }

    /**
     * Returns an error string if the control is in an error state; otherwise, empty string. 
     * This function can be overwrite in the derived class. 
     */
    public getErrorMessage(): string
	{
        /* By default, its implementation is returning the error of the `internalComponent.getErrorMessage` 
         * method or returning the text errors. */

        if (this.internalComponent != undefined) return this.internalComponent.getErrorMessage();

        let validationErrors: ValidationErrors = this.content.formControl.errors;

        /* Shows the text errors. */
        if (validationErrors)
        {
            if (validationErrors[Validators.required.name])
            {
                return this.validationError_required;
            }
        }

        return Common.emptyString;
	}
    
	/**
	 * Handler method that is called by the internal logic when the control's value changes in the UI. 
     * This method contains the specific handling of the input that the derived class wants to do. 
     * This function can be overwrite in the derived class. 
	 */
    public handleSpecificInput(): void
	{
        /* By default, its implementation has nothing to do. */
    }
}
