/*
 *   Copyright (c) 2020 Universidad de Pinar del Río "Hermanos Saíz Montes de Oca"
 *   All rights reserved.
 */


import { Input } from '@angular/core';
import { FormArray, AbstractControl } from '@angular/forms';

import { FormSection, FormFieldContent, FormFieldControl } from '../form-field.control';

/**
 * A base interface that represents the content of a `ContainerControl`. 
 */
export interface ContainerContent extends FormFieldContent
{
	/**
	 * Returns the `FormSection` that tracks the value and validity state of the internal child controls 
     * that contains this control. 
     * Implementation notes: 
     *  - Represents the `FormGroup` or `FormArray` that contains the child controls. 
     *  - It must be specified; otherwise, an exception is thrown. 
	 */
    formSection?: FormSection;



    /**
     * Returns an array of contents that represents the `FormSection`'s child controls. 
     * By default, its value is `[]`. 
     */
    formSectionContent?: any[];
}

/**
 * Represents the base abstract class for a control that contains one or more controls. 
 */
export abstract class ContainerControl extends FormFieldControl
{
    /**
     * Input field that contains the content of this class. 
     */
    @Input()
    public content: ContainerContent;

    /**
     * If the `content.formSection` represents a `FormArray`, then this field returns a pattern content 
     * that is added in the `content.formSectionContent` for each element that is added in the `FormArray`; 
     * otherwise, returns `undefined`. 
     * By default, its value is `undefined`. 
     */
    private _formArrayPatternContent: any;

    /**
     * Constructs a new instance of this class. 
     */
    public constructor()
    {
        super();

        this._formArrayPatternContent = undefined;
    }

    /**
     * Initializes the `content` input property. 
     * @param label The label to set. If the value is `undefined`, sets the label to `content.label`. 
     * @param isAbbreviation If it is true then the `label` argument represents an abbreviation; otherwise, false. 
     * @param alwaysHint If it is true then there is always at leat one hint start-aligned. 
     */
    protected init(label: string | undefined, isAbbreviation: boolean, alwaysHint: boolean): void
    {
        /* Sets the default values. */

        super.init(label, isAbbreviation, alwaysHint);

        if (this.content.formSection == undefined)
        {
            throw new Error('There is not reference to the internal control (FormSection); it must be a `FormGroup` or `FormArray`.');
        }

        if (this.content.formSectionContent == undefined) this.content.formSectionContent = [ ];
        this._setParentFormSectionToChildren();

        // let temp: string = (isAbbreviation) ? this.content.label : this.content.label.toLowerCase();
        // this.validationError_required = `You must write a valid ${ temp }.`;

        /************************** `mat-form-field` properties. **************************/
        // if (this.content.appearance == undefined) this.content.appearance = TextInputAppearance.standard;

        /***************************** `mat-hint` properties. *****************************/
        // if (alwaysHint && (this.content.startHint == undefined) && (this.content.endHint == undefined))
        // {
        //     this.content.startHint = new HintValue(HintPosition.start, `Write a valid ${ temp }.`);
        // }
        // else
        // {
        //     if (this.content.startHint != undefined) this.content.startHint.setDefaultValueIfUndefined_setPosition(HintPosition.start);
        //     if (this.content.endHint != undefined) this.content.endHint.setDefaultValueIfUndefined_setPosition(HintPosition.end);
        // }

        /* Adds this control as a child to the `content.parentFormSection`. It must be called at the end. */
        if (this.content.parentFormSection != undefined)
        {
            this.addAsChildControl(this.content.formSection);
        }

        if (this.content.formSection instanceof FormArray)
        {
            this.initFormSectionContentToFormArray();
        }
    }

    /**
     * Initializes the `content.formSectionContent` correctly depending on the `content.value`. 
     * In this case, `content.value` is an array; for each element in the `content.value`, one element 
     * is added in the `content.formSectionContent`, therefore one element is added 
     * in the `content.formSection` `FormArray`. 
     */
    protected initFormSectionContentToFormArray(): void
    {
        // Hacer la clonación
        // this._formArrayPatternContent = Clonar el `content.formSectionContent[0]`. 


        /* In this case, `content.value` is an array. */

        if ((this.content.value != undefined) && (this.content.value.length != 0))
        {
            /* The `FormArray` will contain one element for each element in the `content.value`. */

            //TODO...
            //this.content.formSectionContent = Clonar el `this._formArrayPatternContent`;
            // Poniendo algunas propiedades especificas para cada uno. 
        }
        else
        {
            /* The `FormArray` will be empty. */
            this.content.formSectionContent = [ ];
        }
    }

	/**
	 * Initializes the control's value. It uses the `content.value` and it is already different of `undefined`. 
     * It also checks if the specified `content.value` is correct. For internal use only. 
	 */
	protected initValue(): void
	{
        /* It does not need to do something because the child controls are already initialized. */

        // /* In this way, checks if the specified `content.value` is correct. */
        // this.content.formControl.setValue(this.content.value);

        // /* Marks the control as `touched`. */
        // this.content.formControl.markAsTouched({
        //     onlySelf: true
        // });
    }

    /**
     * If the `content.formSection` represents a `FormArray`, then this field returns a pattern content 
     * that is added in the `content.formSectionContent` for each element that is added in the `FormArray`; 
     * otherwise, returns `undefined`. 
     * By default, its value is `undefined`. 
     */
    public get FormArrayPatternContent(): any
    {
        return this._formArrayPatternContent;
    }

    /**
     * Sets the parent `FormSection` to its children if they have got nothing. 
     */
    private _setParentFormSectionToChildren(): void
    {
        this.content.formSectionContent.forEach(
            (ffc: FormFieldContent): void => {
                /* Sets the parent `FormSection` to its children if they have got nothing. */
                if (ffc.parentFormSection == undefined) ffc.parentFormSection = this.content.formSection;
            }
        );
    }

    /**
     * Adds a new `AbstractControl` at the end of the `content.formSection`. 
     * The `content.formSection` must be an instance of `FormArray`. 
     * @param control Form control to be added at the end of the array. 
     */
	public addToFormArray(control: AbstractControl): void
	{
        console.log('addToFormArray', control);

        if (this.content.formSection instanceof FormArray)
        {
            this.content.formSection.push(control);
        }
        else
        {
            throw new Error('The `content.formSection` must be an instance of `FormArray`.');
        }
	}

    /**
     * Removes the control at the given `index` in the `content.formSection`. 
     * The `content.formSection` must be an instance of `FormArray`. 
     * @param index Index in the array to remove the control. 
     */
	public removeFromFormArray(index: number): void
	{
        console.log('removeFromFormArray', index);

        if (this.content.formSection instanceof FormArray)
        {
            this.content.formSection.removeAt(index);
        }
        else
        {
            throw new Error('The `content.formSection` must be an instance of `FormArray`.');
        }
    }

    /**
     * Removes all controls in the `content.formSection`. 
     * The `content.formSection` must be an instance of `FormArray`. 
     */
	public clearFormArray(): void
	{
        console.log('clearFormArray');

        if (this.content.formSection instanceof FormArray)
        {
            this.content.formSection.clear();
        }
        else
        {
            throw new Error('The `content.formSection` must be an instance of `FormArray`.');
        }
    }
    
    /**
     * This is one of the way how clear units fields.
     */
    // clearAllUnits()
    // {
    //     const control = <FormArray>this.exampleForm.controls['units'];

    //     while (control.length)
    //     {
    //         control.removeAt(control.length - 1);
    //     }
    //     control.clearValidators();
    //     control.push(this.getUnit());
    // }

    /**
     * Create form unit
     */
    // private getUnit()
    // {
    //     const numberPatern = '^[0-9.,]+$';

    //     return this.formBuilder.group({
    //         unitName: ['', Validators.required],
    //         qty: [1, [Validators.required, Validators.pattern(numberPatern)]],
    //         unitPrice: ['', [Validators.required, Validators.pattern(numberPatern)]],
    //         unitTotalPrice: [{ value: '', disabled: true }]
    //     });
    // }
}
