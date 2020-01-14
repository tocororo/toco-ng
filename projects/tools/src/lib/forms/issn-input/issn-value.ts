
import { Common } from '@toco/tools/core';

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
 * An ISSN (International Standard Serial Number) is an 8-digit code used to identify 
 * newspapers, journals, magazines and periodicals of all kinds and on all media–print 
 * and electronic. For more information follow the link: https://www.issn.org/understanding-the-issn/what-is-an-issn/. 
 */
export class IssnValue
{
	/**
	 * The amount of digits in a group. 
	 */
	public static readonly groupLength: number = 4;

	/**
	 * The amount of digits in a group as string value. 
	 */
	public static readonly groupLengthAsString: string = IssnValue.groupLength.toString(10);

	/**
	 * The default ISSN value. 
	 */
	public static readonly defaultIssnValue: IssnValue = new IssnValue(Common.emptyString, Common.emptyString);

	/**
	 * The first group of `IssnValue.groupLength` digits.
	 */
	public firstGroup: string;

	/**
	 * The second group of `IssnValue.groupLength` digits.
	 */
	public secondGroup: string;

	public constructor(fg: string, sg: string)
	{
		this.firstGroup = fg;
		this.secondGroup = sg.replace('x', 'X');
	}

	/**
	 * Returns true if the ISSN is complete; otherwise, false. 
	 * It is complete if all group of digits have the correct length. It does not check if the ISSN has 
	 * the correct check digit. 
	 */
	public isComplete(): boolean
	{
		return ((this.firstGroup.length == IssnValue.groupLength) && (this.secondGroup.length == IssnValue.groupLength));
	}

	 /**
	  * Returns a string representation of this `IssnValue` object. 
	  * @param acronym The acronym to use. 
	  */
	 public toString(acronym: IssnType_Abbreviation | IssnType_Label): string
	 {
		return acronym + ' ' + this.firstGroup + '-' + this.secondGroup;
	 }
}
