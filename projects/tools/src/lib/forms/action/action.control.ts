
import { IconValue, HintValue, FormFieldContent } from '../form-field.control';

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
 * A base interface that represents the content of an `ActionControl`. 
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
