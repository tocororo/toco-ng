/*
 *   Copyright (c) 2020 Universidad de Pinar del Río "Hermanos Saíz Montes de Oca"
 *   All rights reserved.
 */


import { Input } from '@angular/core';
import { FormGroup, FormArray, AbstractControl } from '@angular/forms';

import { Common } from '@toco/tools/core';
import { IconService } from '@toco/tools/core';

/**
 * Defines a form section that represents the `FormGroup` or `FormArray` class. 
 */
export type FormSection = FormGroup | FormArray;

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
        l: string = Common.emptyString)
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
        if (this.label == undefined) this.label = Common.emptyString;
    }

    /**
     * Sets the default value for each undefined value, but the hint position is always set to the specified value. 
     * @param hintPosition The hint position to set. 
     */
    public setDefaultValueIfUndefined_setPosition(hintPosition: HintPosition): void
    {
        this.position = hintPosition;
        if (this.label == undefined) this.label = Common.emptyString;
    }
}

/**
 * Represents a form field type. 
 */
export enum FormFieldType
{
    /** A list of identifier controls. */
    identifiers = 'identifiers',


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
    
    /** An rnps control. */
    rnps = 'rnps',

    /** An vocabulary control. */
    vocabulary = 'vocabulary',

    /** An term parent control. */
    term_parent = 'term_parent',

    /** Generic select control. */
    select = 'select',

    /** Generic select with a filter control. */
    select_filter = 'select_filter',

    /** Generic select with a filter control. */
    select_tree = 'select_tree'
}

/**
 * A base interface that represents the content of a `FormFieldControl`. 
 */
export interface FormFieldContent
{
    /**
     * Returns the `FormSection` that represents the `FormGroup` or `FormArray` which this control belongs to. 
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
     * By default, its value is `''`. Each control sets its own label. 
     */
    label?: string;



    /**
     * Returns true if the control is required; otherwise, false. 
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
     * Returns the control's type. 
     * By default, its value is `FormFieldType.text`. 
     */
    type?: FormFieldType;

	/**
	 * Returns the name that is used to save the control's value as a name/value pair. 
     * It can be used with a JSON string. 
	 * By default, its value is `'name'`. Each control sets its own name. 
	 */
    name?: string;

    /**
     * The control's extra content. For any other content needed by an specific `FormFieldControl`. 
     * By default, its value is `undefined`. 
     */
    extraContent?: any;
}

/**
 * Returns a new object that represents the default `FormFieldContent`. 
 */
export function defaultFormFieldContent(): FormFieldContent
{
    return {
        'parentFormSection': undefined,

        'minWidth': '15em',
        'width': '15em',

        'label': Common.emptyString,

        'required': false,
        'textAlign': TextAlign.left,
        'ariaLabel': 'Text Input',
        'value': undefined,

        'type': FormFieldType.text,
        'name': 'name',
        'extraContent': undefined
    };
}

/**
 * Represents the base abstract class for a control that is treated as a form field. 
 */
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
     * Constructs a new instance of this class. 
     */
    public constructor()
    {
        this.contentPosition = ContentPosition;
        this.iconSource = IconSource;

        this.content = undefined;
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

        if (this.content == undefined) this.content = { };

        if (label == undefined)
        {
            if (this.content.label == undefined) {
                console.log(this.content);
                throw new Error("The control's label is not specified.");
            }

            label = this.content.label;
        }

        /************************** `mat-form-field` properties. **************************/
        if (this.content.minWidth == undefined) this.content.minWidth = '15em';
        if (this.content.width == undefined) this.content.width = this.content.minWidth;

        /**************************** `mat-label` properties. *****************************/
        if (this.content.label == undefined) this.content.label = label;

        /************************** Internal control properties. **************************/
        if (this.content.required == undefined) this.content.required = false;
        if (this.content.textAlign == undefined) this.content.textAlign = TextAlign.left;
        if (this.content.ariaLabel == undefined) this.content.ariaLabel = label;
        if (this.content.value != undefined)  /* It does not set the default value here (does not call `getDefaultValue` method here) because in this way it is more consistent. */
        {
            /* It also checks if the specified `content.value` is correct. */
            this.initValue();
        }

        /******************************* Other properties. ********************************/
        if (this.content.type == undefined) this.content.type = FormFieldType.text;
        if (this.content.name == undefined) this.content.name = label.toLowerCase().replace(/ /g, '_');  /* Sets the `name` in lowercase and replaces the spaces by underscores. */
    }

	/**
	 * Initializes the control's value. It uses the `content.value` and it is already different of `undefined`. 
     * It also checks if the specified `content.value` is correct. For internal use only. 
	 */
	protected abstract initValue(): void;

	/**
	 * Adds the specified control as a child to the `content.parentFormSection`. 
     * @param control Form control to be added. 
	 */
	protected addAsChildControl(control: AbstractControl): void
	{
        console.log('Added childInputControl: ', control);

        if(this.content.parentFormSection instanceof FormGroup)  /* `content.parentFormSection` is an instance of `FormGroup`. */
        {
            this.content.parentFormSection.addControl(this.content.name, control);
        }
        else  /* `content.parentFormSection` is an instance of `FormArray`. */
        {
            /* Updates the control's name to the correct name because the control has a `FormArray` as its parent. */
            this.content.name = this.content.parentFormSection.length.toString(10);

            this.content.parentFormSection.push(control);
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
