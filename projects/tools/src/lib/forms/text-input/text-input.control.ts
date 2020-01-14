
import { Input, ViewChild } from '@angular/core';
import { AbstractControl, Validators, ValidationErrors } from '@angular/forms';

import { IconService } from '@toco/tools/core';
import { Common } from '@toco/tools/core';

import { FormFieldContent, FormFieldControl } from '../form-container/form-container.component';

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
 * An enum that represents the appearance style of a `TextInputControl`. 
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
 * An enum that represents the content position of an element inside of a `TextInputControl`. 
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
 * An interface that represents the content of a `TextInputControl`. 
 */
export interface TextInputContent extends FormFieldContent
{
    /**
     * Returns the control's type. 
     */
//    type: FormFieldType;



    /**
     * Returns the control's width. 
     * The width of the content area, padding area or border area (depending on `box-sizing`) of certain boxes. 
     * By default, its value is `'310px'`. 
     */
    width?: string;  /* '285px' */

    /**
     * Returns the control's appearance. 
     * By default, its value is `TextInputAppearance.standard`. 
     */
    appearance?: TextInputAppearance;



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
     * Returns the control's prefix icon. 
     * By default, its value is `null`. 
     */
    prefixIcon?: IconValue;

    /**
     * Returns the control's suffix icon. 
     * By default, its value is `null`. 
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
	 * By default, its value is `null`. 
	 */
    startHint?: HintValue;

	/**
	 * Returns the control's end hint. 
	 * By default, its value is `null`. 
	 */
    endHint?: HintValue;



	/**
	 * Returns the name that is used to save the control's value as a name/value pair. 
     * It can be used with a JSON string. 
	 * By default, its value is `'name'`. Each control sets its own name. 
	 */
    name?: string;

    // /** For any other input needed by an specific `TextInputControl`. */
    // input?: any;
}

/**
 * Returns a new object that represents the default `TextInputContent`.
 */
export function defaultTextInputContent(): TextInputContent
{
    return {
        'width': '310px',
        'appearance': TextInputAppearance.standard,

        'label': Common.emptyString,

        'required': false,
        'textAlign': TextAlign.left,
        'ariaLabel': 'Text Input',
        'value': undefined,

        'prefixIcon': null,
        'suffixIcon': null,

        'prefixText': undefined,
        'suffixText': undefined,

        'startHint': null,
        'endHint': null,

        'name': 'name'
    };
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
    readonly internalControl: AbstractControl;

	/**
	 * Returns or sets the value of the control. 
	 */
    value: any | null;

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
 * Represents the base abstract class for a control that allows the writing of a text.
 */
export abstract class TextInputControl extends FormFieldControl
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
	 * Tracks the value and validity state of the internal control that contains the text input. 
     * Implementation notes: There are two cases: 
     *  - You only have the `internalControl` field as the `EmailInputComponent` class. 
     *  - You have the `internalControl` and `internalComponent` fields as the `IssnInputComponent` class. 
	 */
    public internalControl: AbstractControl;

	/**
	 * Tracks the value and validity state of the internal component that contains the text input. 
     * Implementation notes: There are two cases: 
     *  - You only have the `internalControl` field as the `EmailInputComponent` class. 
     *  - You have the `internalControl` and `internalComponent` fields as the `IssnInputComponent` class. 
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
    public content: TextInputContent;

    /**
     * Constructs a new instance of this class. 
     * @param ic An instance that extends the `AbstractControl` class. It tracks the value and 
     * validity state of the internal control that contains the text input. 
     */
    public constructor(ic: AbstractControl = null)
    {
        super();

        this.contentPosition = ContentPosition;
        this.iconSource = IconSource;
        this.internalControl = ic;
    }

    /**
     * Initializes the `content` input property. 
     * @param label The label to set. If the value is `undefined`, sets the label to `content.label`. 
     * @param isAbbreviation If it is true then the `label` argument represents an abbreviation; otherwise, false. 
     * @param alwaysHint If it is true then there is always at leat one hint start-aligned. 
     */
    protected init(label: string | undefined, isAbbreviation: boolean, alwaysHint: boolean): void
    {
        console.log(1234567);

        if (this.internalControl == undefined)
        {
            if (this.internalComponent == undefined) throw new Error('There is not reference to the internal control.');

            this.internalControl = this.internalComponent.internalControl;
        }

        /* Sets the default values. */

        if (this.content == undefined) this.content = { };

        if (label == undefined)
        {
            if (this.content.label == undefined) throw new Error("The control's label is not specified.");

            label = this.content.label;
        }

        let temp: string = (isAbbreviation) ? label : label.toLowerCase();
        this.validationError_required = `You must write a valid ${ temp }.`;

        /************************** `mat-form-field` properties. **************************/
        if (this.content.width == undefined) this.content.width = '310px';
        if (this.content.appearance == undefined) this.content.appearance = TextInputAppearance.standard;

        /**************************** `mat-label` properties. *****************************/
        if (this.content.label == undefined) this.content.label = label;

        /************************** Internal control properties. **************************/
        if (this.content.required == undefined) this.content.required = false;
        if (this.content.textAlign == undefined) this.content.textAlign = TextAlign.left;
        if (this.content.ariaLabel == undefined) this.content.ariaLabel = label;
        if (this.content.value != undefined)  /* It does not set the default value here (does not call `getDefaultValue` method here) because in this way it is more consistent. */
        {
            /* In this way, checks if the specified `content.value` is correct. */

            this.internalControl.setValue(this.content.value);

            /* Marks the control as `touched`. */
            this.internalControl.markAsTouched({
                onlySelf: true
            });
        }

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

        /******************************* Other properties. ********************************/
        if (this.content.name == undefined) this.content.name = label.toLowerCase().replace(/ /g, '_');  /* Sets the `name` in lowercase and replaces the spaces by underscores. */
    }

	/**
	 * Returns true if the control is empty; otherwise, false. 
	 */
	public get empty(): boolean
	{
        if (this.internalComponent == undefined) return (!this.internalControl.value);
        return this.internalComponent.empty;
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
        if (this.internalComponent == undefined) return ((this.internalControl.invalid) && (this.internalControl.dirty || this.internalControl.touched));
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
            this.content.value = this.internalControl.value;
        }

        /* If the control is not marked as `touched` ... */
        if (this.internalControl.untouched)
        {
            /* ... marks the control as `touched`. */
            this.internalControl.markAsTouched({
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

        let validationErrors: ValidationErrors = this.internalControl.errors;

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
