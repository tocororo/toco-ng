/*
 *   Copyright (c) 2020 Universidad de Pinar del Río "Hermanos Saíz Montes de Oca"
 *   All rights reserved.
 */


import { Input, ViewChild, ViewContainerRef, ComponentFactoryResolver, ComponentRef } from '@angular/core';
import { FormArray } from '@angular/forms';

import { cloneValueToUndefined, GetViewContainerDirective } from '@toco/tools/core';

import { FormSection, FormFieldContent, FormFieldControl, createValueToUndefined, cloneContent } from '../form-field.control';

/**
 * A base interface that represents the content of a `ContainerControl`. 
 */
export interface ContainerContent extends FormFieldContent
{
    /**
     * Returns an array of controls that represents the `ContainerControl`'s child controls. 
     * It is always set internally. 
     * By default, its value is `[]`. 
     */
    containerControlChildren?: any[];



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
     *  - If the `content.formSection` field represents a `FormArray`, then the `name` field 
     * of all elements in the `content.formSectionContent` array represents the position 
     * in the array like string. 
     */
    formSectionContent?: any[];



    /**
     * Returns true if the container control has a dynamic length, that is, the `content.formSection` field 
     * represents a `FormArray` and its length is not fixed; otherwise, false. 
     * This field has sense only when the `content.formSection` field represents a `FormArray`. 
     * By default, its value is `true`. 
     */
    isDynamic?: boolean;

    /**
     * In this case, the `required?: boolean` field inherited from `FormFieldContent` is interpreted as: 
     * Returns true if the container control must have one child control at least; otherwise, false. 
     * This field has sense only when the `content.formSection` field represents a `FormArray`. 
     * By default, its value is `false`. 
     */
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
     * Returns the helper directive to mark valid insertion point in the `ContainerControl`'s template. 
     */
    @ViewChild(GetViewContainerDirective, { static: true })
    protected _componentHost: GetViewContainerDirective;

    /**
     * Returns the view container of the element that will host the child components in the `ContainerControl`'s template. 
     * This field can only be assigned in the `ContainerControl` class. 
     */
    protected _viewContainerRef: ViewContainerRef;

    /**
     * Returns the factory for a given component type. 
     * This field can only be assigned in the `ContainerControl` class. 
     */
    protected _componentFactoryResolver: ComponentFactoryResolver;

    /**
     * Returns the component created by a `ComponentFactory`. 
     * For only internal use by the `createChildComponent` method. 
     */
    protected _cr: ComponentRef<any>;



    /**
     * Returns true if the container control is a `FormArray`, that is, the `content.formSection` field 
     * represents a `FormArray`; otherwise, false. 
     * By default, its value is `false`. 
     */
    private _isFormArray: boolean;

    /**
     * If the `content.formSection` represents a `FormArray`, then this field returns 
     * a pattern content that is `content.formSectionContent[0]` value; otherwise, returns `undefined`. 
     * It is shared among controls. 
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

        this._isFormArray = false;
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

        this._isFormArray = this.content.formSection instanceof FormArray;
        if (this._isFormArray)
        {
            if (this.content.isDynamic == undefined) this.content.isDynamic = true;  /* By default, its value is `true`. */
            if (this.content.required == undefined) this.content.required = false;   /* By default, its value is `false`. */
        }
        else
        {
            if (this.content.isDynamic != undefined) throw new Error(`For the '${ this.content.name }' control, the 'content.isDynamic' value must not exist because the 'content.formSection' value is a 'FormGroup'.`);
            if (this.content.required != undefined) throw new Error(`For the '${ this.content.name }' control, the 'content.required' value must not exist because the 'content.formSection' value is a 'FormGroup'.`);
            if (this.content.value != undefined) throw new Error(`For the '${ this.content.name }' control, the 'content.value' value must not exist because the 'content.formSection' value is a 'FormGroup'.`);
        }

        this._viewContainerRef = this._componentHost.viewContainerRef;
        this._componentFactoryResolver = this._componentHost.componentFactoryResolver;

        this._setParentToChildren();

        if (this._isFormArray)
        {
            if (this.content.value == undefined)
            {
                throw new Error(`The '${ this.content.name }' control is constructed dynamically using 'FormArray'. Its 'content.value' array can not be undefined.`);
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

        /* Adds this control as a child to the `content.parentFormSection`. 
        It must be called at the end before calling `createChildComponents` method. */
        if (this.content.parentFormSection != undefined)
        {
            this.addAsChildControl(this, this.content.formSection);
        }

        /* Creates the child components. */
        this.createChildComponents();
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

        /* Saves the pattern content, that is, `content.formSectionContent[0]`. 
        It is shared among controls. */
        this._formArrayPatternContent = this.content.formSectionContent[0];
        /* The `FormArray` is empty initially. */
        this.content.formSectionContent = [ ];

        /* Saves the pattern value. */
        if (this.content.value.length == 0)  /* The container control is empty initially, that is, the `content.value` value is `[]`. */
        {
            /* Creates the pattern value following the `_formArrayPatternContent` structure, and 
            sets all its properties/values of built-in type to `undefined`. */
            this._formArrayPatternValue = createValueToUndefined(this._formArrayPatternContent);

            /* If the `content.required` field is true, then the container control must have one child control at least. */
            if (this.content.required)
            {
                /* It can push the `_formArrayPatternValue` and does not push its clone because 
                both values have the same properties and there is not problem. */
                this.content.value[0] = this._formArrayPatternValue;
            }
        }
        else
        {
            /* Saves the pattern value, that is, `content.value[0]`. 
            Creates a new value that represents the clone of the specified `content.value[0]` value, and 
            sets all its properties/values of built-in type to `undefined`. */
            this._formArrayPatternValue = cloneValueToUndefined(this.content.value[0]);
        }

        /* The `FormArray` will contain one element for each element in the `content.value`. */
        for(let val of this.content.value)
        {
            this._initOneElemFormSectionContentToFormArray(val);
        }
    }

    /**
     * Initializes and returns one element in the `content.formSectionContent` correctly 
     * depending on the specified `value`. 
     * @param value The initial `value` field of each content representing a `FormControl`. 
     */
    private _initOneElemFormSectionContentToFormArray(value: any): any
    {
        /* Clones in deep until the next `FormArray`, then the next `FormArray` clones in deep until the next `FormArray`, and so on. */
        let refContent: any = cloneContent(this._formArrayPatternContent, value, true);

        /* Overwrites some properties for the cloned content. */
        refContent.name = this.content.formSectionContent.length.toString(10);  /* The element is added in the array after the last position. */
        // refContent.label = ((refContent.label == undefined) ? (refContent.name) : (refContent.label + refContent.name));
        // refContent.ariaLabel = refContent.label;

        this.content.formSectionContent.push(refContent);

        return refContent;
    }

    /**
     * Sets the parent control to its children. 
     */
    private _setParentToChildren(): void
    {
        /* Initializes the `content.containerControlChildren`. */
        this.content.containerControlChildren = [ ];

        this.content.formSectionContent.forEach(
            (ffc: FormFieldContent): void => {
                /* Sets the parent `ContainerControl` to its children. */
                ffc.parentContainerControl = this;

                /* Sets the parent `FormSection` to its children if they have got nothing. */
                ffc.parentFormSection = this.content.formSection;
            }
        );
    }

    /**
     * Creates the child components. 
     */
    protected createChildComponents(): void
    {
        for (let componentContent of this.content.formSectionContent)
        {
            /* Creates a child component. */
            this.createChildComponent(componentContent);
        }
    }

    /**
     * Creates a child component. 
     * @param componentContent Component content for creating the component. 
     */
    protected createChildComponent(componentContent: any): void
    {
        this._cr = this._viewContainerRef.createComponent(
            this._componentFactoryResolver.resolveComponentFactory(componentContent.componentType)
        );
        (this._cr.instance as FormFieldControl).content = componentContent;
    }

    /**
     * Updates the elements' index in the `content.formSectionContent` array from 
     * the specified `index` onwards. 
     * @param index Index in the array to begin updating. 
     */
    private _updateIndex(index: number): void
    {
        const length: number = this.content.formSectionContent.length;

        while(index < length)
        {
            this.content.formSectionContent[index].name = index.toString(10);
            index++;
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
     * Returns this instance. 
     */
    public get getInstance(): ContainerControl
    {
        return this;
    }

    /**
     * Returns an array of controls that represents the `ContainerControl`'s child controls. 
     * It is always set internally. 
     */
    public get containerControlChildren(): any[]
    {
        return this.content.containerControlChildren;
    }

    /**
     * If the `content.formSection` represents a `FormArray`, then this field returns 
     * a pattern content that is `content.formSectionContent[0]` value; otherwise, returns `undefined`. 
     * It is shared among controls. 
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
     * Returns true if the container control has a dynamic length, that is, the `content.formSection` field 
     * represents a `FormArray` and its length is not fixed; otherwise, false. 
     * This property has sense only when the `content.formSection` field represents a `FormArray`. 
     */
    public get isDynamic(): boolean
    {
        return this.content.isDynamic;
    }

    /**
     * Returns true if the container control is a `FormArray`, that is, the `content.formSection` field 
     * represents a `FormArray`; otherwise, false. 
     */
    public get isFormArray(): boolean
    {
        return this._isFormArray;
    }

	/**
	 * Returns true if this container is empty; otherwise, false. 
	 */
	public get isEmpty(): boolean
	{
		return (this.content.formSectionContent.length == 0);
    }

	/**
	 * Returns true if an element can be removed in the `content.formSectionContent`; otherwise, false. 
     * Use along with `removeFromFormArray` and `clearFormArray` methods. 
     * The `content.formSection` must be an instance of `FormArray`. 
	 */
	public get canRemoveFromFormArray(): boolean
	{
        if (this.content.required)
        {
            return (this.content.formSectionContent.length > 1)
        }
        else
        {
            return (this.content.formSectionContent.length != 0);
        }
    }

    /**
     * Adds an empty element at the end of the `content.formSectionContent`; therefore one element 
     * is added at the end of the `content.formSection` `FormArray`. 
     * The `content.formSection` must be an instance of `FormArray`. 
     */
	public addToFormArray(): void
	{
        console.log('addToFormArray');

        if (this._isFormArray)
        {
            /* Prepares the `_formArrayPatternContent` because it is shared among controls. */
            this._formArrayPatternContent.parentContainerControl = this;
            this._formArrayPatternContent.parentFormSection = this.content.formSection;

            this.createChildComponent(
                this._initOneElemFormSectionContentToFormArray(this._formArrayPatternValue)
            );
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

        if (this._isFormArray)
        {
            this.content.containerControlChildren.splice(index, 1);
            this.content.formSectionContent.splice(index, 1);
            (this.content.formSection as FormArray).removeAt(index);
            this._viewContainerRef.remove(index);

            this._updateIndex(index);
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

        if (this._isFormArray)
        {
            this.content.containerControlChildren = [ ];
            this.content.formSectionContent = [ ];
            (this.content.formSection as FormArray).clear();
            this._viewContainerRef.clear();

            if (this.content.required)
            {
                /* The `FormArray` always has one element at least. */
                this.addToFormArray();
            }
        }
        else
        {
            throw new Error(`For the '${ this.content.name }' control, the 'content.formSection' value must be an instance of 'FormArray'.`);
        }
    }
}
