
import { Input } from '@angular/core';

import { IconValue, HintValue, FormFieldContent, FormFieldControl, ContentPosition, HintPosition } from '../form-field.control';

/**
 * An enum that represents the operation action. 
 */
export enum OperationAction
{
    back = 'back',
    cancel = 'cancel',
    reset = 'reset',
    delete = 'delete',
    submit = 'submit'
}

export function clickDefault(sender: any): void
{ /* This function does nothing by default. */ }

/**
 * A base interface that represents the content of an `ActionControl`. 
 */
export interface ActionContent extends FormFieldContent
{
    /**
     * Returns the control's icon. 
     * By default, its value is `undefined`. 
     */
    icon?: IconValue;

	/**
	 * Returns the control's tooltip. 
	 * By default, its value is `undefined`. 
	 */
    tooltip?: HintValue;

    /**
     * Returns the function that is executed when the user clicks the control. 
     * By default, its value is `clickDefault`. 
     */
    click?: (sender: any) => void;
}

/**
 * Represents the base abstract class for a control that executes actions. 
 */
export abstract class ActionControl extends FormFieldControl
{
    /**
     * Input field that contains the content of this class. 
     */
    @Input()
    public content: ActionContent;

    /**
     * Constructs a new instance of this class. 
     */
    public constructor()
    {
        super();
    }

    /**
     * Initializes the `content` input property. 
     * @param label The label to set. If the value is `undefined`, sets the label to `content.label`. 
     * @param alwaysHint If it is true then there is always a hint start-aligned. 
     */
    protected init(label: string | undefined, alwaysHint: boolean): void
    {
        /* Sets the default values. */

        super.init(label, false, alwaysHint);

        /***************************** `mat-icon` properties. *****************************/
        if (this.content.icon != undefined) this.content.icon.setDefaultValueIfUndefined_setPosition(ContentPosition.prefix);

        /************************** `mat-form-field` properties. **************************/
        // if (this.content.appearance == undefined) this.content.appearance = TextInputAppearance.standard;

        /**************************** `matTooltip` properties. ****************************/
        if (alwaysHint && (this.content.tooltip == undefined))
        {
            this.content.tooltip = new HintValue(HintPosition.start, this.content.label);
        }

        if (this.content.click == undefined) this.content.click = clickDefault;
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
    public get getInstance()
    {
        return this;
    }
}
