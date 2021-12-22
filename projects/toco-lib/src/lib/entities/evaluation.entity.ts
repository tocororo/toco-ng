
import { Params } from '../core/utils/helpers';
import { SelectOption } from '../forms/input/select/select-input.component';
import { InputContent } from '../forms/input/input.control';
import { EntityBase, Entity } from './common';
/**
 * An enum that represents the type of an `CategoryQuestion`. 
 */
 export enum CategoryQuestionType
 {
    /**
     * The `bool` type is the default type. It shows a boolean control. 
     */
    bool = 'bool',

    /**
     * It shows a numeric control. 
     */
    integer = 'integer',

    /**
     * It shows a select control. 
     */
    select = 'select'
}

/**
 * Entity for CategoryQuestion based on schema `...-v1.0.0.json`. 
 * Represents a survey section category question. 
 */
export class CategoryQuestion extends EntityBase
{
    /**
     * Question type. 
     */
    type: CategoryQuestionType;
    /**
     * Question id. 
     */
    id: string;
    /**
     * Question description. 
     */
    desc: string;
    /**
     * Question hint. 
     */
    hint: string;
    /**
     * Question answer. 
     */
    answer: any;
    /**
     * Possible minimum value. It is used if `type` == CategoryQuestionType.integer. 
     */
    min?: number;
    /**
     * Possible maximum value. It is used if `type` == CategoryQuestionType.integer. 
     */
    max?: number;
	/**
     * Options list that can be selected. It is used if `type` == CategoryQuestionType.select. 
	 */
    selectOptions?: SelectOption[];
    /**
     * This field is filled internally. 
     * For internal use only. 
     */
    _inputContent?: InputContent = undefined;
}

/**
 * Entity for SectionCategory based on schema `...-v1.0.0.json`. 
 * Represents a survey section category. 
 */
export class SectionCategory extends EntityBase
{
    /**
     * Category title. 
     */
    title: string;
    /**
     * Category desription. 
     */
    desc: string;
    /**
     * An array of questions associated with the category. 
     */
    questions: Array<CategoryQuestion>;
}

/**
 * Entity for SurveySection based on schema `...-v1.0.0.json`. 
 * Represents a survey section. 
 */
export class SurveySection extends EntityBase
{
    /**
     * Section title. 
     */
    title: string;
    /**
     * An array of categories associated with the section. 
     */
    categories: Array<SectionCategory>;
}

/**
 * Entity for JournalGeneralData based on schema `...-v1.0.0.json`. 
 * Represents the journal general data that a user fills in the first step. 
 */
 export class JournalGeneralData extends EntityBase
 {
    /**
     * Journal name. 
     */
     name: string;
     /**
      * Journal URL page. 
      */
     url: string;
     /**
      * Journal ISSN. 
      */
     issn: string;
 }

/**
 * Entity for Evaluation based on schema `...-v1.0.0.json`. 
 */
 export class Evaluation extends Entity
 {
    /**
     * User who made the evaluation. 
     */
    user: string;
    /**
     * Evaluation date. 
     */
    date: Date;

    /************************************* Journal Data ***************************/

    /**
     * Journal Data. 
     */
    journalData: JournalGeneralData;

    /**************************************** Survey ******************************/

    /**
     * An array of sections associated with the survey. 
     */
    sections: Array<SurveySection>;

    /****************************** Result and Recommendations ********************/
    // TODO: ... 
 }

/**
 * Entity for EvaluationOnlyAnswer based on schema `...-v1.0.0.json`. 
 */
export class EvaluationOnlyAnswer extends Entity
{
    /**
     * User who made the evaluation. 
     */
    user: string;
    /**
     * Evaluation date. 
     */
    date: Date;

    /************************************* Journal Data ***************************/

    /**
     * Journal Data. 
     */
     journalData: JournalGeneralData;

    /**************************************** Survey ******************************/

    /**
     * Journal survey. 
     */
    survey: Params<any>;

    /****************************** Result and Recommendations ********************/
    // TODO: ... 
}
