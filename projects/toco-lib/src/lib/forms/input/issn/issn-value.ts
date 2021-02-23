
/**
 * Represents the abbreviation for an ISSN type. 
 */
export enum IssnType_Abbreviation
{
	/**
	 * The ISSN abbreviation by default. 
	 */
	ISSN = 'ISSN',

	/**
	 * The ISSN abbreviation for the print media (paper) version of a serial. 
	 * Usually it is the "default media", so the "default ISSN". 
	 */
	p_ISSN = 'p-ISSN',

	/**
	 * The ISSN abbreviation for the electronic media (online) version of a serial. 
	 */
	e_ISSN = 'e-ISSN',

	/**
	 * The ISSN abbreviation for the linking ISSN. 
	 * It is a specific ISSN that groups the different media of the same serial publication. 
	 * A single ISSN-L is designated for all media of a serial publication, irrespective of how many there are. 
	 * A serial publication is associated with a single ISSN-L. 
	 */
	ISSN_L = 'ISSN-L'
}

/**
 * Represents the label for an ISSN type. 
 */
export enum IssnType_Label
{
	/**
	 * The ISSN label. 
	 */
	ISSN = 'International Standard Serial Number',

	/**
	 * The ISSN label for the print ISSN. 
	 */
	p_ISSN = 'Print ISSN',

	/**
	 * The ISSN label for the electronic ISSN. 
	 */
	e_ISSN = 'Electronic ISSN',

	/**
	 * The ISSN label for the linking ISSN. 
	 */
	ISSN_L = 'Linking ISSN'
}

/**
 * Data structure for holding an ISSN. 
 * An ISSN (International Standard Serial Number) is an 8-digit code. 
 * This control stores the code as a string of length 11, with the form 'XXXX – XXXX'. 
 * It is used to identify newspapers, journals, magazines and periodicals 
 * of all kinds and on all media–print and electronic. For more information 
 * follow the link: https://www.issn.org/understanding-the-issn/what-is-an-issn/. 
 */
export class IssnValue
{
	/**
	 * The amount of characters in the code. 
	 */
	public static readonly codeLength: number = 11;

	/**
	 * The amount of characters in the code as string value. 
	 */
	public static readonly codeLengthAsString: string = IssnValue.codeLength.toString(10);

	/**
	 * The character that represents the code group separator. 
	 */
	public static readonly codeGroupSeparator: string = '–';

	/**
	 * The string that represents the code group separator with space. 
	 */
	public static readonly codeGroupSeparatorWithSpace: string = ' ' + IssnValue.codeGroupSeparator + ' ';

	/**
	 * The regular expression that matches an ISSN code as a string of length 11, with the form 'XXXX – XXXX'. 
	 */
	public static readonly regExpIssnWithLength_11: string = '^[0-9]{4} ' + IssnValue.codeGroupSeparator + ' [0-9]{3}[0-9xX]$';

	/**
	 * The regular expression that matches an ISSN code as a string of length 9, with the form 'XXXX–XXXX'. 
	 */
	public static readonly regExpIssnWithLength_9: string = '^[0-9]{4}' + IssnValue.codeGroupSeparator + '[0-9]{3}[0-9xX]$';

	/**
	 * The regular expression that matches an ISSN code as a string of length 8, with the form 'XXXXXXXX'. 
	 */
	public static readonly regExpIssnWithLength_8: string = '^[0-9]{7}[0-9xX]$';

	/**
	 * General purpose method. 
	 * Converts the specified ISSN code to a code with length 11 with the form 'XXXX – XXXX'. 
	 * @param code The code to convert. 
	 */
	public static convertIssnToLength_11(code: string): string
	{
		let fg: string;
		let sg: string;

		if (code.length == 8)
		{
			fg = code.slice(0, 4);
			sg = code.slice(4, 7);

			return (fg + ' ' + IssnValue.codeGroupSeparator + ' ' + sg + ((code[7] == 'x') ? 'X' : code[7]));
		}
		else if (code.length == 9)
		{
			fg = code.slice(0, 4);
			sg = code.slice(5, 8);

			return (fg + ' ' + IssnValue.codeGroupSeparator + ' ' + sg + ((code[8] == 'x') ? 'X' : code[8]));
		}
		else  /* The code length is 11. */
		{
			fg = code.slice(0, 5);
			sg = code.slice(6, 10);

			return (fg + IssnValue.codeGroupSeparator + sg + ((code[10] == 'x') ? 'X' : code[10]));
		}
	}

	/**
	 * General purpose method. 
	 * Converts the specified ISSN code to a code with length 9 with the form 'XXXX–XXXX'. 
	 * @param code The code to convert. 
	 */
	public static convertIssnToLength_9(code: string): string
	{
		let fg: string;
		let sg: string;

		if (code.length == 8)
		{
			fg = code.slice(0, 4);
			sg = code.slice(4, 7);

			return (fg + IssnValue.codeGroupSeparator + sg + ((code[7] == 'x') ? 'X' : code[7]));
		}
		else if (code.length == 9)
		{
			fg = code.slice(0, 4);
			sg = code.slice(5, 8);

			return (fg + IssnValue.codeGroupSeparator + sg + ((code[8] == 'x') ? 'X' : code[8]));
		}
		else  /* The code length is 11. */
		{
			fg = code.slice(0, 4);
			sg = code.slice(7, 10);

			return (fg + IssnValue.codeGroupSeparator + sg + ((code[10] == 'x') ? 'X' : code[10]));
		}
	}

	/**
	 * General purpose method. 
	 * Converts the specified ISSN code to a code with length 8 with the form 'XXXXXXXX'. 
	 * @param code The code to convert. 
	 */
	public static convertIssnToLength_8(code: string): string
	{
		let fg: string;
		let sg: string;

		if (code.length == 9)
		{
			fg = code.slice(0, 4);
			sg = code.slice(5, 8);

			return (fg + sg + ((code[8] == 'x') ? 'X' : code[8]));
		}
		if (code.length == 11)
		{
			fg = code.slice(0, 4);
			sg = code.slice(7, 10);

			return (fg + sg + ((code[10] == 'x') ? 'X' : code[10]));
		}
		else  /* The code length is 8. */
		{
			return code;
		}
	}

	/**
	 * The code of `IssnValue.codeLength` characters. 
	 */
	public code: string;

	public constructor(c: string)
	{
		this.code = IssnValue.convertIssnToLength_11(c);
	}

	/**
	 * Returns true if the ISSN is complete; otherwise, false. 
	 * It is complete if the code of characters has the correct length. It does not check if the ISSN has 
	 * the correct digits. 
	 */
	public isComplete(): boolean
	{
		return (this.code.length == IssnValue.codeLength);
	}

	/**
	 * Returns a string representation of this `IssnValue` object. 
	 * @param acronym The acronym to use. 
	 */
	public toString(acronym: IssnType_Abbreviation | IssnType_Label): string
	{
		return acronym + ' ' + this.code;
	}
}
