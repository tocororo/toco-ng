
/**
 * Data structure for holding an url. 
 */
export class UrlValue
{
	/**
	 * Represents the url label. 
	 */
	public static readonly url_Label: string = 'Url';

	/**
	 * Represents the url placeholder.
	 */
	public static readonly url_Placeholder: string = 'https://www.google.com/';

	/**
	 * The url value.
	 */
	public url: string;

	public constructor(u: string)
	{
		this.url = u;
	}

    /**
     * Returns a string representation of this `UrlValue` object. 
     */
	 public toString(): string
	 {
		return UrlValue.url_Label + ' ' + this.url;
	 }
}
