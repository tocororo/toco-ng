import { convertLangFromNumberToString } from "../core/public-api";

/**
 * An enum that represents the query param key. 
 */
export enum QueryParamKey
{
    /**
     * The query param for the current language. 
     */
    lang = 'lang',

    /**
     * The query param for the page size. 
     */
    size = 'size',

    /**
     * The query param for the page index. 
     */
    page = 'page',

    /**
     * The query param for the query. 
     */
    q = 'q',

    /**
     * The query param for the aggregations selection. 
     */
    aggrsSel = 'aggrsSel'
}
