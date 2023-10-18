/*
 *   Copyright (c) 2020 Universidad de Pinar del Río "Hermanos Saíz Montes de Oca"
 *   All rights reserved.
 */


import { Input, Type, Directive } from '@angular/core';
import { UntypedFormGroup, UntypedFormArray, AbstractControl, UntypedFormControl } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';

import { Params } from '../core/utils/helpers';
import { IconService } from '../core/services/icon.service';

import { ContainerControl } from './container/container.control';

/**
 * Defines a form section that represents the `FormGroup` or `FormArray` class. 
 */
export type FormSection = UntypedFormGroup | UntypedFormArray;

/**
 * A collection of key/value elements, where the key is the validator name and the value is the value 
 * that the validator needs to check. 
 */
 export type ValidatorArguments = Params<any>;

/**
 * An enum that describes how inline contents of a block are horizontally aligned if the contents 
 * do not completely fill the line box. 
 */
export enum TextAlign
{
    /**
     * The inline contents are aligned to the left edge of the line box. In vertical text, 
     * `left` aligns to the edge of the line box that would be the start edge for left-to-right text. 
     */
    left = 'left',

    /**
     * The inline contents are centered within the line box. 
     */
    center = 'center',

    /**
     * The inline contents are aligned to the right edge of the line box. In vertical text, 
     * `right` aligns to the edge of the line box that would be the end edge for left-to-right text. 
     */
    right = 'right',

    /**
     * The text is justified. 
     */
    justify = 'justify'
}

/**
 * An enum that represents the content position of an element inside of a `FormFieldControl`. 
 */
export enum ContentPosition
{
    /**
     * Adding the `prefix` option to an element will designate it as the prefix. 
     */
    prefix = 'matPrefix',

    /**
     * Adding the `suffix` option to an element will designate it as the suffix. 
     */
    suffix = 'matSuffix',

    /**
     * Adding the `none` option to an element will not show it. 
     */
    none = 'none'
}

/**
 * An enum that represents the icon source type. 
 */
export enum IconSource
{
    /**
     * The icon is obtained from an internal source. In this case, it uses an icon that was copied to 
     * the 'assets' folder of the project, and it was registered using the `IconService.registerIcons` method. 
     */
    internal = 'internal',

    /**
     * The icon is obtained from an external source. In this case, 
     * it uses a 'Material Icon' from 'https://fonts.googleapis.com/icon?family=Material+Icons'. 
     */
    external = 'external'
}

/**
 * Data structure for holding an icon. 
 */
export class IconValue
{
    /**
     * Returns the icon source type. 
     * By default, its value is `IconSource.internal`. 
     */
    public source: IconSource;

    /**
     * Returns the icon position type. 
     * By default, its value is `ContentPosition.prefix`. 
     */
    public position: ContentPosition;

    /**
     * Returns the icon name. 
     * By default, its value is `IconService.defaultIconName`. 
     */
    public name: string;

    /**
     * Creates a new instance of the `IconValue` class. 
     * @param s The icon source type. By default, its value is `IconSource.internal`. 
     * @param p The icon position type. By default, its value is `ContentPosition.prefix`. 
     * @param n The icon name. By default, its value is `IconService.defaultIconName`. 
     */
    public constructor(
        s: IconSource = IconSource.internal,
        p: ContentPosition = ContentPosition.prefix,
        n: string = IconService.defaultIconName)
	{
        this.source = s;
        this.position = p;
        this.name = n;

        this.setDefaultValueIfUndefined();
    }

    /**
     * Sets the default value for each undefined value. 
     */
    public setDefaultValueIfUndefined(): void
    {
        if (this.source == undefined) this.source = IconSource.internal;
        if (this.position == undefined) this.position = ContentPosition.prefix;
        if (this.name == undefined) this.name = IconService.defaultIconName;
    }

    /**
     * Sets the default value for each undefined value, but the icon position is always set to the specified value. 
     * @param iconPosition The icon position to set. 
     */
    public setDefaultValueIfUndefined_setPosition(iconPosition: ContentPosition): void
    {
        if (this.source == undefined) this.source = IconSource.internal;
        this.position = iconPosition;
        if (this.name == undefined) this.name = IconService.defaultIconName;
    }
}

/**
 * An enum that represents the hint position of a `HintValue`. 
 */
export enum HintPosition
{
    /**
     * Adding the `start` option to a `HintValue` will designate it as start-aligned. 
     */
    start = 'start',

    /**
     * Adding the `end` option to a `HintValue` will designate it as end-aligned. 
     */
    end = 'end',

    /**
     * Adding the `none` option to a `HintValue` will not show it. 
     */
    none = 'none'
}

/**
 * Data structure for holding a hint. 
 * A hint label is additional descriptive text that appears below the control's underline. 
 */
export class HintValue
{
    /**
     * Returns the hint position type. 
     * By default, its value is `HintPosition.none`. 
     */
    public position: HintPosition;

    /**
     * Returns the hint label. 
     * By default, its value is `''`. 
     */
    public label: string;

    /**
     * Creates a new instance of the `HintValue` class. 
     * @param p The hint position type. By default, its value is `HintPosition.none`. 
     * @param l The hint label. By default, its value is `''`. 
     */
    public constructor(
        p: HintPosition = HintPosition.none,
        l: string = '')
	{
        this.position = p;
        this.label = l;

        this.setDefaultValueIfUndefined();
    }

    /**
     * Sets the default value for each undefined value. 
     */
    public setDefaultValueIfUndefined(): void
    {
        if (this.position == undefined) this.position = HintPosition.none;
        if (this.label == undefined) this.label = '';
    }

    /**
     * Sets the default value for each undefined value, but the hint position is always set to the specified value. 
     * @param hintPosition The hint position to set. 
     */
    public setDefaultValueIfUndefined_setPosition(hintPosition: HintPosition): void
    {
        this.position = hintPosition;
        if (this.label == undefined) this.label = '';
    }
}

/**
 * This enum is deprecated. 
 * Represents a form field type. 
 */
export enum FormFieldType
{
    /** A button control. */
    action_button = 'action_button',



    /** A container control that is showed as a panel. */
    container_panel = 'container_panel',

    /** A container control that is showed very simple. */
    container_simple = 'container_simple',



    /** A container control that allows the writing of a name of something in different language. */
    container_label_diff_lang = 'container_label_diff_lang',



    /** A text control. */
    text = 'text',

    /** A textarea control. */
    textarea = 'textarea',

    /** A datapicker control. */
    datepicker = 'datepicker',

    /** A checkbox control. */
    checkbox = 'checkbox',

    /** A url control. */
    url = 'url',

    /** An email control. */
    email = 'email',

    /** An identifier control. */
    identifier = 'identifier',

    /** An issn control. */
    issn = 'issn',

    /** A rnps control. */
    rnps = 'rnps',

    /** A vocabulary control. */
    vocabulary = 'vocabulary',

    vocabulary_tree = 'toco-vocabulary-tree',

    /** A term parent control. */
    term_parent = 'term_parent',

    /** A select control. */
    select = 'select',

    /** A select control. */
    select_expr = 'select_expr',

    /** A select with a filter control. */
    select_filter = 'select_filter',

    /** A select with a filter control. */
    select_tree = 'select_tree'
}

/**
 * A base interface that represents the content of a `FormFieldControl`. 
 */
export interface FormFieldContent
{
    /**
     * Returns the parent `ContainerControl` of this control. 
     * It is always set internally. 
     * By default, its value is `undefined`. 
     */
    parentContainerControl?: ContainerControl;



    /**
     * Returns the parent `FormSection` that represents the parent `FormGroup` or `FormArray` of this control. 
     * It is always set internally. 
     * By default, its value is `undefined`. 
     */
    parentFormSection?: FormSection;



    /**
     * Returns the control's minimum width. 
     * The minimum width of the content area, padding area or border area (depending on `box-sizing`) 
     * of certain boxes. Allows authors to constrain content width to a centain range. 
     * By default, its value is `'15em'`. 
     */
    minWidth?: string;

    /**
     * Returns the control's width. 
     * The width of the content area, padding area or border area (depending on `box-sizing`) of certain boxes. 
     * By default, its value is `minWidth`. 
     */
    width?: string;



    /**
     * Returns the control's label. 
     * See the `ContainerContent` for the particular interpretation of this field. 
     * See the `ActionContent` for the particular interpretation of this field. 
     * By default, its value is `''`. Each control sets its own label. 
     */
    label?: string;

    /**
     * Returns the control's placeholder. 
     * By default, its value is `''`. Each control sets its own placeholder. 
     */
    placeholder?: string;



    /**
     * Returns true if the control is required; otherwise, false. 
     * See the `ContainerContent` for the particular interpretation of this field. 
     * By default, its value is `false`. 
     */
    required?: boolean;

    /**
     * Returns the control's text align. 
     * By default, its value is `TextAlign.left`. 
     */
    textAlign?: TextAlign;

    /**
     * Returns the control's aria-label. 
     * Defines a string value that labels the current element. 
     * By default, its value is `'Text Input'`. Each control sets its own aria-label. 
     */
    ariaLabel?: string;

    /**
     * The control's value. 
     * By default, its value is `undefined`. 
     */
    value?: any;



    /**
     * This `type` field is deprecated, you must use the `controlType` field. 
     * Returns the control's type that is used to create the control. 
     * Implementation notes: 
     *  - It must be specified; otherwise, an exception is thrown. 
     */
    type?: FormFieldType;

    /**
     * Returns the control's type that is used to create the control. 
     * Implementation notes: 
     *  - It must be specified; otherwise, an exception is thrown. 
     */
    controlType?: Type<any>;

	/**
	 * Returns the control's name that is used to save the control's value as a name/value pair. 
     * Implementation notes: 
     *  - It can be used with a JSON string. 
     *  - It must be specified; otherwise, an exception is thrown. 
	 */
    name?: string;

    /**
     * The control's extra content. For any other content needed by an specific `FormFieldControl`. 
     * By default, its value is `undefined`. 
     */
    extraContent?: any;
}

/**
 * Returns a new object that represents the clone of the specified `FormControl` target. 
 * @param target The `FormControl` object to clone. 
 */
export function cloneFormControl(target: UntypedFormControl): UntypedFormControl
{
    return new UntypedFormControl(target.value, target.validator, target.asyncValidator);
}

/**
 * Returns a new object that represents the clone of the specified `FormSection` target. 
 * @param target The `FormSection` object to clone. 
 */
export function cloneFormSection(target: FormSection): FormSection
{
    if (target instanceof UntypedFormGroup)
    {
        /* Creates an empty `FormGroup` with its validators. */
        let result: UntypedFormGroup = new UntypedFormGroup({ }, target.validator, target.asyncValidator);

        /* Adds the controls to `FormGroup`. */
        for(let ctr in target.controls)
        {
            if((target.controls[ctr]) instanceof UntypedFormControl) result.addControl(ctr, cloneFormControl((target.controls[ctr]) as UntypedFormControl));
            else result.addControl(ctr, cloneFormSection((target.controls[ctr]) as FormSection));
        }

        return result;
    }
    else
    {
        /* Creates an empty `FormArray` with its validators. */
        let result: UntypedFormArray = new UntypedFormArray([ ], target.validator, target.asyncValidator);

        /* Adds the controls to the `FormArray`. */
        for(let ctr of target.controls)
        {
            if(ctr instanceof UntypedFormControl) result.push(cloneFormControl(ctr));
            else result.push(cloneFormSection(ctr as FormSection));
        }

        return result;
    }
}

/**
 * Represents the base abstract class for a control that is treated as a form field. 
 */
@Directive()
export abstract class FormFieldControl
{
    /**
     * Represents the `ContentPosition` enum for internal use. 
     */
    public readonly contentPosition: typeof ContentPosition;

    /**
     * Represents the `IconSource` enum for internal use. 
     */
    public readonly iconSource: typeof IconSource;

    /**
     * Input field that contains the content of this class. 
     */
    @Input()
    public content: FormFieldContent;

    /**
     * Returns the language currently used. 
     * This is a static field. 
     */
    protected static currentLang: string = '';

    /**
     * Returns true if the translation is built by the control; otherwise, false. 
     * It is used to select the way the translation is built for the control. 
     * By default, its value is `false`. 
     * As an example of usage for this field, the `InputNumberComponent` class implements the logic when this value is `true`. 
     */
    public isTranslationBuiltByControl: boolean;

    /**
     * Constructs a new instance of this class. 
     */
    public constructor()
    {
        this.contentPosition = ContentPosition;
        this.iconSource = IconSource;

        /* It must be initialize. */
        this.content = undefined;

        this.isTranslationBuiltByControl = false;
    }

    /**
     * Sets the new language. 
     * @param transServ The `TranslateService` instance injected. 
     */
    protected setNewLanguage(transServ: TranslateService): void
    {
        /* The `FormFieldControl.currentLang != transServ.currentLang` test is NOT necessary here because it is done in the non-abstract child classes. */

        FormFieldControl.currentLang = transServ.currentLang;
    }

    /**
     * Initializes the `content` input property. 
     * @param label The default label to use. It is used if the `content.label` is not specified. 
     * @param placeholder The default placeholder to use. It is used if the `content.placeholder` is not specified. 
     */
    protected init(label: string, placeholder: string = ''): void
    {
        /* Sets the default values. */

        if (this.content == undefined)
        {
            throw new Error(`For the '${ FormFieldControl.name }' control, the 'content' value can not be undefined.`);
        }

        if (this.content.name == undefined)
        {
            throw new Error(`For the '${ FormFieldControl.name }' control, the 'content.name' value can not be undefined.`);
        }

        if (this.content.controlType == undefined)
        {
            throw new Error(`For the '${ this.content.name }' control, the 'content.controlType' value can not be undefined.`);
        }

        if (label == undefined)
        {
            if (this.content.label == undefined)
            {
                throw new Error(`For the '${ this.content.name }' control, the 'content.label' value can not be undefined. \n
                    You can specify: \n
                    - A default label value when overwriting the 'init' method in the component that represents the control. \n
                    - A label value when defining the content object for the control.`);
            }

            label = this.content.label;
        }
        else
        {
            if (this.content.label)
            {
                label = this.content.label;
            }
        }

        /************************** `mat-form-field` properties. **************************/
        if (this.content.minWidth == undefined) this.content.minWidth = '15em';
        if (this.content.width == undefined) this.content.width = this.content.minWidth;

        /**************************** `mat-label` properties. *****************************/
        if (this.content.label == undefined) this.content.label = label;
        if (this.content.placeholder == undefined) this.content.placeholder = placeholder;

        /************************** Internal control properties. **************************/
        if (this.content.textAlign == undefined) this.content.textAlign = TextAlign.left;
        if (this.content.ariaLabel == undefined) this.content.ariaLabel = label;
        if (this.content.value != undefined)  /* It does not set the default value here (does not call `getDefaultValue` method here) because in this way it is more consistent. */
        {
            /* It also checks if the specified `content.value` is correct. */
            this.initValue();
        }

        /******************************* Other properties. ********************************/
    }

	/**
	 * Initializes the control's value. It uses the `content.value` and it is already different of `undefined`. 
     * It also checks if the specified `content.value` is correct. For internal use only. 
	 */
    protected abstract initValue(): void;

    /**
     * Returns this instance. 
     */
    public abstract get getInstance(): FormFieldControl;

    /**
     * Returns the parent `ContainerControl` of this control. 
     * It is always set internally. 
     */
    public get parentContainerControl(): ContainerControl
    {
        return this.content.parentContainerControl;
    }

	/**
	 * Adds the specified `control`/`internalControl` as a child 
     * to the `content.containerControlChildren`/`content.parentFormSection` respectively. 
     * @param control Form control to be added (descendant from `FormFieldControl`). 
     * @param internalControl Internal form control to be added (`FormControl`, `FormGroup`, or `FormArray`). 
	 */
	protected addAsChildControl(control: any, internalControl: AbstractControl): void
	{
        /* Adds the specified `control` as a child to the `content.containerControlChildren`. */

        this.content.parentContainerControl.content.containerControlChildren.push(control);

        /* Adds the specified `internalControl` as a child to the `content.parentFormSection`. */

        if(this.content.parentContainerControl.isFormArray)  /* `content.parentFormSection` is an instance of `FormArray`. */
        {
            /* The `internalControl`'s name is already correct, that is, 
            `content.name` equals the `content.parentFormSection`'s last position 
            (because the `internalControl` has a `FormArray` as its parent). */

            (this.content.parentFormSection as UntypedFormArray).push(internalControl);
        }
        else  /* `content.parentFormSection` is an instance of `FormGroup`. */
        {
            (this.content.parentFormSection as UntypedFormGroup).addControl(this.content.name, internalControl);
        }
	}

    /**
     * Returns true if the specified `IconValue` has the specified `ContentPosition` value; otherwise, false. 
     * @param icon The `IconValue` to check. 
     * @param contentPosition The `ContentPosition` value to check. 
     */
    public iconPositionState(icon: IconValue, contentPosition: ContentPosition): boolean
    {
        return (icon.position == contentPosition);
    }

    /**
     * Returns true if the specified `IconValue` has the specified `IconSource` value; otherwise, false. 
     * @param icon The `IconValue` to check. 
     * @param iconSource The `IconSource` value to check. 
     */
    public iconSourceState(icon: IconValue, iconSource: IconSource): boolean
    {
        return (icon.source == iconSource);
    }
}
