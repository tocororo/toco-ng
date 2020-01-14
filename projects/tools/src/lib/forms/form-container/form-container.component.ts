
import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { PartialObserver, Subscription } from 'rxjs';

import { Entity, Response } from '@toco/tools/entities';

/**
 * Represents a form field type.
 */
export enum FormFieldType {
    /** A text control. */
    text = 'text',

    /** A texarea control. */
    textarea = 'textarea',

    /** A datapicker control. */
    datepicker = 'datepicker',

    /** A checkbox control. */
    checkbox = 'checkbox',

    /** A url control. */
    url= 'url',

    /** An email control. */
    email= 'email',

    /** An issn control. */
    issn= 'issn',
    
    /** An rnps control. */
    rnps= 'rnps',

    /** An vocabulary control. */
    vocabulary= 'vocabulary',

    /** An term parent control. */
    term_parent= 'term_parent',
}

/**
 * An interface that represents the content of a `FormFieldControl`. 
 */
export interface FormFieldContent
{
    /** The form field type. */
    type: FormFieldType;

    /** The form field name. */
    name: string;

    /** The form field placeholder. */
    placeholder: string;

    /** If it is true the form field is required; otherwise, false. */
    required: boolean;

	/** The form field hint text. */
    hintValue?: string;

    /** The form field value. */
    value?: any;

    /** The form field width. */
    width?: string;

    /** For any other input needed by an specific `FormFieldContent`. */
    input?: any;
}

/**
 * Represents the base abstract class for a control that is treated as a form field.  
 */
export abstract class FormFieldControl
{
    /**
     * Input field that contains the content of this class. 
     */
    @Input()
    public content: any;  /* content: FormFieldContent */
}

/**
 * An interface that represents the content of an expansion control. 
 */
export interface PanelContent
{
    /**
     * Returns the panel's title. 
     */
    title: string;

    /**
     * Returns the panel's description. 
     */
    description: string;

    /**
     * Returns the panel's icon name. 
     */
    iconName: string;

    /**
     * Returns the panel's content. 
     */
    content: any[];  /* formField: FormFieldContent[] */
}

export interface FormContainerAction
{
    doit(data: any): void;
}

/**
 * @description
 * Represents a form container. 
 * Creates a form to show the array of panels and sends that information to the server. 
 */
@Component({
    selector: 'toco-form-container',
    templateUrl: './form-container.component.html',
    styleUrls: ['./form-container.component.scss']
})
export class FormContainerComponent implements OnInit, OnDestroy
{
    /**
     * The array of panels to show. 
     */
    @Input()
    public panels: PanelContent[];

    @Input()
    public action: FormContainerAction;

    @Input()
    public entity: Entity;

    /**
     * An string that represents the action label of the last panel. 
     */
    @Input()
    public actionLabel: string;

    /**
     * The current expanded panel position.
     */
    public step: number;

    // tslint:disable-next-line: member-ordering
    private sendDataObserver: PartialObserver<Response<any>> = {
        next: (response: Response<any>) => {
            /**
             * TODO: make somthing with response
             */
        },

        error: (err: any) => {
                console.log('The observable got an error notification: ' + err + '.');
        },

        complete: () => {
            console.log('The observable got a complete notification.');
        }
    };

    private sendDataSubscription: Subscription = null;

    public constructor()
    {
        /* By default, the first panel is expanded. */
        this.step = 0;
    }

    public ngOnInit(): void
    {
        if (this.actionLabel == undefined) this.actionLabel = 'Adicionar';
    }

    // tslint:disable-next-line: indent
    public ngOnDestroy(): void
    {
        this.sendDataUnsubscribe();
    }

    /**
     * Sets the new expanded panel position. 
     * @param newStep The new position. 
     */
    public setStep(newStep: number): void
    {
        this.step = newStep;
    }

    /**
     * Sets the expanded panel position to the next position. 
     */
    public nextStep(): void
    {
        this.step++;
    }

    /**
     * Sets the expanded panel position to the previous position. 
     */
    public prevStep(): void
    {
        this.step--;
    }

    /**
     * Sends data to the server. Collects all added information from the component. 
     * Creates a JSON object based on `form.name` and `form.value` fields. 
     */
    public addData(): void
    {
        /* Preparing all data. */

        const data = { };

        this.panels.forEach(panel => {
            panel.content.forEach(form => {
                data[form.name] = form.value;
            });
        });

        this.action.doit(data);

        this.panels.forEach(panel => {
            panel.content.forEach(form => {
                form.value = null;
            });
        });
    }

    private sendDataUnsubscribe(): void
    {
        if (this.sendDataSubscription)
        {
            this.sendDataSubscription.unsubscribe();
        }
    }
}
