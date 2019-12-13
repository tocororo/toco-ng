
/**
 * Data structure for holding an email. 
 */
export class EmailValue
{
	/**
	 * Represents the email label. 
	 */
	public static readonly email_Label: string = 'Email';

	/**
	 * The email value.
	 */
	public email: string;

	public constructor(e: string)
	{
		this.email = e;
	}

    /**
     * Returns a string representation of this `EmailValue` object. 
     */
	 public toString(): string
	 {
		return EmailValue.email_Label + ' ' + this.email;
	 }
}
