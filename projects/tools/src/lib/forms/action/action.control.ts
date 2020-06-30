
import { IconValue, HintValue, FormFieldContent, defaultFormFieldContent } from '../form-field.control';

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

/**
 * An interface that represents the content of an `ActionControl`. 
 */
export interface ActionContent extends FormFieldContent
{
    /**
     * Returns the control's icon. 
     * By default, its value is `null`. 
     */
    icon?: IconValue;

	/**
	 * Returns the control's hint. 
	 * By default, its value is `null`. 
	 */
    hint?: HintValue;
}

/**
 * Returns a new object that represents the default `ActionContent`. 
 */
export function defaultActionContent(): ActionContent
{
    let result: ActionContent = defaultFormFieldContent();

    result.icon = null;
    result.hint = null;

    return result;
}
