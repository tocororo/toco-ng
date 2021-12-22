
/**
 * Data structure for holding an identifier. 
 */
export class IdentifierValue
{
	/**
	 * Represents the identifier label. 
	 */
	public static readonly identifier_Label: string = 'TOCO_NG_ID';

	/**
	 * The identifier value.
	 */
	public identifier: string;

	public constructor(id: string)
	{
		this.identifier = id;
	}

    /**
     * Returns a string representation of this `IdentifierValue` object. 
     */
	 public toString(): string
	 {
		return IdentifierValue.identifier_Label + ' ' + this.identifier;
	 }
}
