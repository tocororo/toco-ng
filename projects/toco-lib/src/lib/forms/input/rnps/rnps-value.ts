
/**
 * Data structure for holding an RNPS. 
 * An RNPS (Registro Nacional de Publicaciones Seriadas) is an 4-digit code used to control 
 * las publicaciones seriadas autorizadas a editarse, imprimirse y circular en Cuba. 
 * For more information follow the link: http://www.seriadas.cult.cu/. 
 */
export class RnpsValue
{
	/**
	 * Represents the RNPS placeholder.
	 */
	public static readonly rnps_Placeholder: string = 'XXXX';

	/**
	 * The amount of digits in the code. 
	 */
	public static readonly codeLength: number = 4;

	/**
	 * The amount of digits in the code as string value. 
	 */
	public static readonly codeLengthAsString: string = RnpsValue.codeLength.toString(10);

	/**
	 * Represents the RNPS abbreviation. 
	 */
	public static readonly rnps_Abbreviation: string = 'RNPS';

	/**
	 * Represents the RNPS label. 
	 */
	public static readonly rnps_Label: string = 'TOCO_NG_RNPS';

	/**
	 * The code of `RnpsValue.codeLength` digits.
	 */
	public code: string;

	public constructor(c: string)
	{
		this.code = c;
	}

	/**
	 * Returns true if the RNPS is complete; otherwise, false. 
	 * It is complete if the code of digits has the correct length. It does not check if the RNPS has 
	 * the correct digits. 
	 */
	public isComplete(): boolean
	{
		return (this.code.length == RnpsValue.codeLength);
	}

    /**
     * Returns a string representation of this `RnpsValue` object. 
     */
	 public toString(): string
	 {
		return RnpsValue.rnps_Abbreviation + ' ' + this.code;
	 }
}
