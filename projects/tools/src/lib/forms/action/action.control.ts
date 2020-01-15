
import { FormFieldContent, IconValue, HintValue } from '../form-field.control';

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
