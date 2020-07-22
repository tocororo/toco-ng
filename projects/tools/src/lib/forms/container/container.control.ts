/*
 *   Copyright (c) 2020 Universidad de Pinar del Río "Hermanos Saíz Montes de Oca"
 *   All rights reserved.
 */


import { Input } from '@angular/core';
import { FormArray } from '@angular/forms';

import { Common } from '@toco/tools/core';

import { FormSection, FormFieldContent, FormFieldControl, cloneContent } from '../form-field.control';

/**
 * A base interface that represents the content of a `ContainerControl`. 
 */
export interface ContainerContent extends FormFieldContent
{
	/**
	 * Returns the `FormSection` that tracks the value and validity state of the internal 
     * child controls that contains this control. 
     * Implementation notes: 
     *  - Represents the `FormGroup` or `FormArray` that contains the child controls. 
     *  - It must be specified; otherwise, an exception is thrown. 
	 */
    formSection?: FormSection;



    /**
     * Returns an array of contents that represents the `FormSection`'s child controls. 
     * Implementation notes: 
     *  - It must be specified, and must have at least one element; otherwise, an exception is thrown. 
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
     * If the `content.formSection` represents a `FormArray`, then this field returns 
     * a pattern content that is `content.formSectionContent[0]` value; otherwise, returns `undefined`. 
     * It is used for adding a new element in the `content.formSectionContent`, that is, 
     * for adding a new control in the `FormArray`. 
     * By default, its value is `undefined`. 
     */
    private _formArrayPatternContent: any;

    /**
     * If the `content.formSection` represents a `FormArray`, then this field returns 
     * a pattern value that is a clone of the `content.value[0]` value, and sets all 
     * its properties/values of built-in type to `undefined`; otherwise, returns `undefined`. 
     * It is used for adding a new element in the `content.formSectionContent`, that is, 
     * for adding a new control in the `FormArray`. 
     * By default, its value is `undefined`. 
     */
    private _formArrayPatternValue: any;

    /**
     * Constructs a new instance of this class. 
     */
    public constructor()
    {
        super();

        this._formArrayPatternContent = undefined;
        this._formArrayPatternValue = undefined;
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
            throw new Error(`For the '${ this.content.name }' control, the 'content.formSection' value can not be undefined; it must be a 'FormGroup' or 'FormArray' value.`);
        }

        if ((this.content.formSectionContent == undefined) || (this.content.formSectionContent.length == 0))
        {
            throw new Error(`For the '${ this.content.name }' control, the 'content.formSectionContent' array can not be undefined, and must have at least one element.`);
        }

        this._setParentFormSectionToChildren();

        if (this.content.formSection instanceof FormArray)
        {
            if ((this.content.value == undefined) || (this.content.value.length == 0))
            {
                throw new Error(`The '${ this.content.name }' control is constructed dynamically using 'FormArray'. Its 'content.value' array can not be undefined, and must have at least one element.`);
            }

            this.initFormSectionContentToFormArray();
        }

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
    }

    /**
     * Initializes the `content.formSectionContent` correctly depending on the `content.value`. 
     * In this case, `content.value` is an array; for each element in the `content.value`, one element 
     * is added in the `content.formSectionContent`; therefore one element is added 
     * in the `content.formSection` `FormArray`. 
     */
    protected initFormSectionContentToFormArray(): void
    {
        /* At this point, `content.formSectionContent` has one element, 
        and `content.value` has at least one element. */

        /* Saves the pattern content, that is, `content.formSectionContent[0]`. */
        this._formArrayPatternContent = this.content.formSectionContent[0];
        /* The `FormArray` is empty initially. */
        this.content.formSectionContent = [ ];

        /* Saves the pattern value, that is, `content.value[0]`. 
        Creates a new value that represents the clone of the specified `content.value[0]` value, and 
        sets all its properties/values of built-in type to `undefined`. */
        this._formArrayPatternValue = Common.cloneValueToUndefined(this.content.value[0]);

        //TODO: Poner la lógica del campo `alwaysShowFirstElement` ...

        /* The `FormArray` will contain one element for each element in the `content.value`. */
        for(let val of this.content.value)
        {
            this._initOneElemFormSectionContentToFormArray(val);
        }
    }

    /**
     * Initializes one element in the `content.formSectionContent` correctly depending on the specified `value`. 
     * @param value The initial `value` field of each content representing a `FormControl`. 
     */
    private _initOneElemFormSectionContentToFormArray(value: any): void
    {
        let refContent: any = cloneContent(this._formArrayPatternContent, value);

        /* Overwrites some properties for the cloned content. */
        refContent.name = this.content.formSectionContent.length.toString(10);  /* The element is added in the array after the last position. */
        refContent.label = ((refContent.label == undefined) ? (refContent.name) : (refContent.label + refContent.name));
        refContent.ariaLabel = refContent.label;

        this.content.formSectionContent.push(refContent);
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
     * If the `content.formSection` represents a `FormArray`, then this field returns 
     * a pattern content that is `content.formSectionContent[0]` value; otherwise, returns `undefined`. 
     * It is used for adding a new element in the `content.formSectionContent`, that is, 
     * for adding a new control in the `FormArray`. 
     * By default, its value is `undefined`. 
     */
    public get formArrayPatternContent(): any
    {
        return this._formArrayPatternContent;
    }

    /**
     * If the `content.formSection` represents a `FormArray`, then this field returns 
     * a pattern value that is a clone of the `content.value[0]` value, and sets all 
     * its properties/values of built-in type to `undefined`; otherwise, returns `undefined`. 
     * It is used for adding a new element in the `content.formSectionContent`. 
     * By default, its value is `undefined`. 
     */
    public get formArrayPatternValue(): any
    {
        return this._formArrayPatternValue;
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
     * Adds an empty element at the end of the `content.formSectionContent`; therefore one element 
     * is added at the end of the `content.formSection` `FormArray`.  
     * The `content.formSection` must be an instance of `FormArray`. 
     */
	public addToFormArray(): void
	{
        console.log('addToFormArray');

        if (this.content.formSection instanceof FormArray)
        {
            this._initOneElemFormSectionContentToFormArray(this._formArrayPatternValue);
        }
        else
        {
            throw new Error(`For the '${ this.content.name }' control, the 'content.formSection' value must be an instance of 'FormArray'.`);
        }
	}

    /**
     * Removes the element at the given `index` in the `content.formSectionContent`; therefore 
     * the element at the given `index` is removed in the `content.formSection` `FormArray`. 
     * The `content.formSection` must be an instance of `FormArray`. 
     * @param index Index in the array to remove the element. 
     */
	public removeFromFormArray(index: number): void
	{
        console.log('removeFromFormArray', index);

        if (this.content.formSection instanceof FormArray)
        {
            this.content.formSectionContent.splice(index, 1);
            this.content.formSection.removeAt(index);
        }
        else
        {
            throw new Error(`For the '${ this.content.name }' control, the 'content.formSection' value must be an instance of 'FormArray'.`);
        }
    }

    /**
     * Removes all elements in the `content.formSectionContent`; therefore 
     * all elements are removed in the `content.formSection` `FormArray`. 
     * The `content.formSection` must be an instance of `FormArray`. 
     */
	public clearFormArray(): void
	{
        console.log('clearFormArray');

        if (this.content.formSection instanceof FormArray)
        {
            this.content.formSectionContent = [ ];
            this.content.formSection.clear();
        }
        else
        {
            throw new Error(`For the '${ this.content.name }' control, the 'content.formSection' value must be an instance of 'FormArray'.`);
        }
    }
}
