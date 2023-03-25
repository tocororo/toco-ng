/*
 *   Copyright (c) 2020 Universidad de Pinar del Río "Hermanos Saíz Montes de Oca"
 *   All rights reserved.
 */


import { Input, ViewChild, ViewContainerRef, ComponentFactoryResolver, ComponentRef, Directive } from '@angular/core';
import { FormArray, FormGroup } from '@angular/forms';

import { Params } from '../../core/utils/helpers';
import { GetViewContainerDirective } from '../../core/utils/get-view-container.directive';

import { FormSection, FormFieldContent, FormFieldControl, cloneFormControl, cloneFormSection } from '../form-field.control';

/**
 * A base interface that represents the content of a `ContainerControl`. 
 */
export interface ContainerContent extends FormFieldContent
{
    /**
     * Returns an array of controls that represents the `ContainerControl`'s child controls that are 
     * stored in the `content.formSection`; that is, `content.containerControlChildren` and `content.formSection` 
     * have the same length. 
     * It is always set internally. 
     * By default, its value is `[]`. 
     */
    containerControlChildren?: any[];



	/**
	 * Returns the `FormSection` that tracks the value and validity state of the internal 
     * child controls that contains this control. 
     * Implementation notes: 
     *  - Represents the `FormGroup` or `FormArray` that contains the child controls. 
     *  - The `content.containerControlChildren` and `content.formSection` have the same length. 
     *  - It must be specified; otherwise, an exception is thrown. 
	 */
    formSection?: FormSection;

    /**
     * Returns an array of contents that represents the `ContainerControl`'s child controls that are 
     * stored in the `ViewContainer`; that is, `content.formSectionContent` and container's `ViewContainer` 
     * have the same length. 
     * Implementation notes: 
     *  - It must be specified, and must have at least one element; otherwise, an exception is thrown. 
     *  - If the `content.formSection` field represents a `FormArray`, then the `name` field 
     * of all elements in the `content.formSectionContent` array represents the position 
     * in the array like string. 
     */
    formSectionContent?: Params<any>[];



    /**
     * Returns true if the container control has a dynamic length, that is, the `content.formSection` field 
     * represents a `FormArray` and its length is not fixed; otherwise, false. 
     * This field has sense only when the `content.formSection` field represents a `FormArray`. 
     * By default, its value is `true`. 
     */
    isDynamic?: boolean;

    /**
     * In this case, the `label?: string` field inherited from `FormFieldContent` is interpreted as: 
     * Returns the control's title. 
     * By default, its value is `''`. Each control sets its own label (title). 
     */

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
@Directive()
export abstract class ContainerControl extends FormFieldControl
{
    /**
     * Returns a `FormGroup` by default. 
     * Its value is empty object, and does not have validators. 
     */
    public static getFormGroupByDefault(): FormGroup
    {
        return new FormGroup({ }, [ ]);
    }

    /**
     * Returns a `FormArray` by default. 
     * Its value is empty array, and does not have validators. 
     */
    public static getFormArrayByDefault(): FormArray
    {
        return new FormArray([ ], [ ]);
    }

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
     * The `content.formSectionContent` and container's `_viewContainerRef` have the same length. 
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
     * a pattern content that is `content.formSectionContent` value; otherwise, returns `undefined`. 
     * It is shared among controls. 
     * It is used for adding a new element in the `content.formSectionContent`, that is, 
     * for adding a new control in the `FormArray`. 
     * By default, its value is `[]`. 
     */
    private _formArrayPatternContent: Params<any>[];

    /**
     * If the `content.formSection` represents a `FormArray`, then this field returns 
     * a pattern value that is a copy of one value that can contain the `content.value` array, and sets all 
     * its properties/values of built-in type to `undefined`; otherwise, returns `undefined`. 
     * It is used for adding a new element in the `content.formSectionContent`, that is, 
     * for adding a new control in the `FormArray`. 
     * By default, its value is `undefined`. 
     */
    private _formArrayPatternValue: any;

    /**
     * Returns the current `FormArray` length. 
     * This field has sense only when the `content.formSection` field represents a `FormArray`. 
     * By default, its value is `0`. 
     */
    private _formArrayLength: number;

    /**
     * Constructs a new instance of this class. 
     */
    public constructor()
    {
        super();

        this._isFormArray = false;
        this._formArrayPatternContent = [ ];
        this._formArrayPatternValue = undefined;
        this._formArrayLength = 0;
    }

    /**
     * Initializes the `content` input property. 
     * @param label The default label to use. It is used if the `content.label` is not specified. 
     * @param placeholder It is NOT used here. Fix that. 
     */
    protected init(label: string, placeholder: string = ''): void
    {
        /* Sets the default values. */

        super.init(label, placeholder);

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

        /* Initializes the `content.containerControlChildren`. */
        this.content.containerControlChildren = [ ];

        if (this._isFormArray)
        {
            if (this.content.value == undefined)
            {
                throw new Error(`The '${ this.content.name }' control is constructed dynamically using 'FormArray'. Its 'content.value' array can not be undefined.`);
            }

            if ((this.content.value.length == 0) && (!this.content.isDynamic) && (this.content.required))
            {
                throw new Error(`The '${ this.content.name }' control has not sense because its 'content.value' array length is zero, and its 'content.isDynamic' value is false, and its 'content.required' value is true.`);
            }

            this.initFormSectionContentToFormArray();
        }
        else
        {
            /* Sets the parent control to its children. */
            this.setParentToChildren();
        }

        // let temp: string = (isAbbreviation) ? this.content.label : this.content.label.toLowerCase();
        // this.validationError_required = `The ${ temp } can not be empty.`;

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
        this.createChildComponents(this.content.formSectionContent);
    }

    /**
     * Initializes the `content.formSectionContent` array correctly depending on the `content.value`. 
     * In this case, `content.value` is an array. For each element in the `content.value`, a cloning 
     * is done to the `_formArrayPatternContent` array, and it is added in the `content.formSectionContent`; 
     * therefore one element is added in the `content.formSection` `FormArray`. 
     */
    protected initFormSectionContentToFormArray(): void
    {
        /* At this point, `content.formSectionContent` has at least one element. */

        /* Saves the pattern content, that is, `content.formSectionContent`. 
        It is shared among controls. */
        this._formArrayPatternContent = this.content.formSectionContent;
        /* The `FormArray` is empty initially. */
        this.content.formSectionContent = [ ];

        /* Saves the pattern value, that is, creates the pattern value following the `_formArrayPatternContent` structure. 
        The result value represents a copy of one value that can contain the `content.value` array, and 
        sets all its properties/values of built-in type to `undefined`. 
        It does not clone a value from the `content.value` array because the array can be empty. 
        It creates in deep until the next `FormArray`, then the next `FormArray` creates in deep until the next `FormArray`, and so on. 
        It is the first time that the `_formArrayPatternContent` is travelled, therefore the `createValueToUndefined` method does verifications. */
        this._formArrayPatternValue = this.createValueToUndefined();

        /* If the `content.required` field is true, then the container control must have one child control at least. */
        if ((this.content.required) && (this.content.value.length == 0))
        {
            /* It can push the `_formArrayPatternValue` and does not push its clone because 
            both values have the same properties and there is not problem. */
            this.content.value[0] = this._formArrayPatternValue;
        }

        /* The `FormArray` will contain one element for each element in the `content.value`. */
        for(let val of this.content.value)
        {
            this._initElemFormSectionContentToFormArray(val);
        }
    }

    /**
     * Sets the parent control to its children. 
     */
    protected setParentToChildren(): void
    {
        this.content.formSectionContent.forEach(this.setParentToChild, this);
    }

    /**
     * Sets the parent control to one child. 
     * @param ffc The child to set the parent control. 
     */
    protected setParentToChild(ffc: FormFieldContent): void
    {
        /* Sets the parent `ContainerControl` to its children. */
        ffc.parentContainerControl = this;

        /* Sets the parent `FormSection` to its children if they have got nothing. */
        ffc.parentFormSection = this.content.formSection;
    }

    /**
     * Returns a new value that is created following the `_formArrayPatternContent` structure. 
     * It also sets all its properties/values of built-in type to `undefined`. 
     * It creates the value smartly depending on the type of content. 
     * It creates in deep until the next `FormArray`, then the next `FormArray` creates in deep until the next `FormArray`, and so on. 
     * It is the first time that the `_formArrayPatternContent` is travelled, therefore the `createValueToUndefined` method does verifications. 
     */
    protected createValueToUndefined(): any
    {
        let result: any;
        /* The `_formArrayPatternContent` array can have one element only with the `content.formSection` field. */
        let alreadyHasFormSection: boolean = false;

        for(let content of this._formArrayPatternContent)
        {
            if (content.formControl)
            {
                if (alreadyHasFormSection) throw new Error(`For the '${ this.content.name }' control, the 'content.formSectionContent' array can have one element only with the 'content.formControl' or 'content.formSection' field.`);

                alreadyHasFormSection = true;
                result = undefined;
            }
            else if (content.formSection)
            {
                if (alreadyHasFormSection) throw new Error(`For the '${ this.content.name }' control, the 'content.formSectionContent' array can have one element only with the 'content.formControl' or 'content.formSection' field.`);

                alreadyHasFormSection = true;
                result = this._createValueToUndefined(content);
            }
            /* The rest of `content`s do not contain a `value` field of interest. */
        }

        if (!alreadyHasFormSection) throw new Error(`For the '${ this.content.name }' control, the 'content.formSectionContent' array must have one element only among all with the 'content.formControl' or 'content.formSection' field.`);
        return result;
    }

    private _createValueToUndefined(target: Params<any>): any
    {
        if (target.formSection instanceof FormArray)
        {
            return [ ];
        }
        else
        {
            let result: any = { };

            for(let content of target.formSectionContent)
            {
                if (content.formControl) result[content.name] = undefined;
                else if (content.formSection) result[content.name] = this._createValueToUndefined(content);
                /* The rest of `content`s do not contain a `value` field of interest. */
            }

            return result;
        }
    }

    /**
     * Initializes and returns a clone of the `_formArrayPatternContent` array correctly 
     * depending on the specified `value`. 
     * This clone is also added in the `content.formSectionContent` array. 
     * @param value The initial `value` field of each content representing a `FormControl`. 
     */
    private _initElemFormSectionContentToFormArray(value: any): Params<any>[]
    {
        /* The content array cloned. */
        let result: Params<any>[] = [ ];
        let refContent: Params<any>;

        for(let content of this._formArrayPatternContent)
        {
            /* Clones in deep until the next `FormArray`, then the next `FormArray` clones in deep until the next `FormArray`, and so on. */
            if (content.formSection instanceof FormArray)
            {
                /* This `content.formSectionContent` will not be cloned because it belongs to a `FormArray` and it will be cloned when the `FormArray` is analyzed in the `ContainerControl` class. */
                refContent = this._cloneContent(content, undefined/* It is not used in this case. */, false);
                refContent.value = value;
            }
            else
            {
                refContent = this._cloneContent(content, value, true);
            }

            /* Sets the parent control to its child. */
            this.setParentToChild(refContent);

            /* Overwrites some properties for the content cloned. */
            refContent.name = this._formArrayLength.toString(10);  /* The element is added in the `FormArray` after the last position. */
            /* Overwrites some properties for the content cloned if it contains the `content.formControl` or `content.formSection` field. */
            if ((content.formControl) || (content.formSection))
            {
                // refContent.label = ((refContent.label == undefined) ? (refContent.name) : (refContent.label + refContent.name));
                // refContent.ariaLabel = refContent.label;
            }

            /* Save the content cloned. */
            this.content.formSectionContent.push(refContent);
            result.push(refContent);
        }

        this._formArrayLength++;
        return result;
    }

    /**
     * Returns a new content that represents the clone of the specified content target. 
     * It also sets the initial `value` field of each content representing a `FormControl`. 
     * It clones the content smartly depending on the type of property. 
     * It clones in deep until the next `FormArray`, then the next `FormArray` clones in deep until the next `FormArray`, and so on. 
     * @param target The content object to clone. 
     * @param value The initial `value` field of each content representing a `FormControl`. 
     * @param canClone It is true if the function can clone the `formSectionContent` field; otherwise, false. 
     */
    private _cloneContent(target: Params<any>, value: any, canClone: boolean): any
    {
        /* The content cloned. */
        let result: any = { };

        for(let prop in target)
        {
            switch(prop)
            {
                /* The `formControl` property special case. */
                case 'formControl':
                {
                    result[prop] = cloneFormControl(target.formControl);

                    /* If this content (`result`) represents a `FormControl`, then the `value` field is initialized. */
                    result['value'] = value;

                    break;
                }

                /* The `formSection` property special case. */
                case 'formSection':
                {
                    result[prop] = cloneFormSection(target.formSection);

                    break;
                }

                /* The `formSectionContent` property special case. */
                case 'formSectionContent':
                {
                    if (canClone)  /* Clones the `target.formSectionContent`. */
                    {
                        result[prop] = [ ];

                        for(let content of target.formSectionContent)
                        {
                            if (content.formSection instanceof FormArray)
                            {
                                content.value = value[content.name];
                                /* This `content.formSectionContent` will not be cloned because it belongs to a `FormArray` and it will be cloned when the `FormArray` is analyzed in the `ContainerControl` class. */
                                result[prop].push(this._cloneContent(content, undefined/* It is not used in this case. */, false));
                                content.value = undefined;
                            }
                            else
                            {
                                result[prop].push(this._cloneContent(content, value[content.name], canClone));
                            }
                        }
                    }
                    else  /* Takes the same `target.formSectionContent` reference because `target` is a `FormArray` and its `formSectionContent` will be taken like a pattern. */
                    {
                        result[prop] = target.formSectionContent;
                    }

                    break;
                }

                /* Copies the property without problem. */
                default:
                {
                    result[prop] = target[prop];

                    break;
                }
            }
        }

        return result;
    }

    /**
     * Creates the child components. 
     * @param componentsContent Components content array for creating the components. 
     */
    protected createChildComponents(componentsContent: Params<any>[]): void
    {
        for (let componentContent of componentsContent)
        {
            /* Creates a child component. */
            this.createChildComponent(componentContent);
        }
    }

    /**
     * Creates a child component. 
     * @param componentContent Component content for creating the component. 
     */
    protected createChildComponent(componentContent: Params<any>): void
    {
        this._cr = this._viewContainerRef.createComponent(
            this._componentFactoryResolver.resolveComponentFactory(componentContent.controlType)
        );
        (this._cr.instance as FormFieldControl).content = componentContent;
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
	 * Returns true if an element can be removed from the `content.formSection`; otherwise, false. 
     * Use along with `removeFromFormArray` and `clearFormArray` methods. 
     * The `content.formSection` must be an instance of `FormArray`. 
	 */
	public get canRemoveFromFormArray(): boolean
	{
        /* The method uses the `_formArrayLength` instead of `content.formSection` because 
        the first one field is updated first and it has the answer more accurate than the second one field. */

        if (this.content.required)
        {
            return (this._formArrayLength > 1);
        }
        else
        {
            return (this._formArrayLength != 0);
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
            this.createChildComponents(
                this._initElemFormSectionContentToFormArray(this._formArrayPatternValue)
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
            //TODO: la variable `formArrayPatternContentLength` podría ser un campo de la clase. 
            let formArrayPatternContentLength: number = this._formArrayPatternContent.length;
            let i: number, j: number, k: number;

            this.content.containerControlChildren.splice(index, 1);
            this.content.formSectionContent.splice((index * formArrayPatternContentLength), formArrayPatternContentLength);
            (this.content.formSection as FormArray).removeAt(index);
            for (i = formArrayPatternContentLength, j = index * formArrayPatternContentLength; i != 0; i--)
            { this._viewContainerRef.remove(j); }
            this._formArrayLength--;

            /* Updates the elements' index in the `content.formSectionContent` array from 
            the specified `index` onwards. */
            for (k = (i = index * formArrayPatternContentLength) + formArrayPatternContentLength, j = this.content.formSectionContent.length; i < j; i++)
            {
                if (i == k) { index++; k += formArrayPatternContentLength; }
                this.content.formSectionContent[i].name = index.toString(10);
            }
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
            this._formArrayLength = 0;

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
