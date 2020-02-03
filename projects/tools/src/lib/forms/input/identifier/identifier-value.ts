
/**
 * Data structure for holding an identifier. 
 */
export class IdentifierValue
{
	/**
	 * Represents the identifier label. 
	 */
	public static readonly identifier_Label: string = 'Identifier';

	/**
	 * The identifier value.
	 */
	public identifier: string;

	public constructor(u: string)
	{
		this.identifier = u;
	}

    /**
     * Returns a string representation of this `IdentifierValue` object. 
     */
	 public toString(): string
	 {
		return IdentifierValue.identifier_Label + ' ' + this.identifier;
	 }
}
