
import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { PartialObserver, Subscription } from 'rxjs';

import { Response } from '@toco/entities/response';
import { Entity } from '@toco/entities/entity';

/**
 * Represents a form field type.
 */
export enum FormFieldType {
    /** An input control. */
    input = 'input',

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
 * Represents a form field interface.
 */
export interface FormFieldContent {
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
 * Represents a base class for a control that is treated as a form field.
 */
export abstract class FormField {
    @Input()
    public formFieldContent: FormFieldContent;
}

/**
 * Represents a panel interface.
 * @description Represents the information shown in the expansion control.
 */
export interface Panel {
    title: string;

    description: string;

    // tslint:disable-next-line: indent
    iconName: string;

    formField: FormFieldContent[];
}

export interface FormContainerAction {
    doit(data: any): void;
}

/**
 * Represents a form container.
 * @description Creates a form to show the panels Array and sends that information to server.
 */
@Component({
    selector: 'toco-form-container',
    templateUrl: './form-container.component.html',
    styleUrls: ['./form-container.component.scss']
})
export class FormContainerComponent implements OnInit, OnDestroy {

    public constructor() { }

    @Input() public panels: Panel[] = [];

    @Input() public action: FormContainerAction = null;

    @Input() public entity: Entity;

    @Input() public actionLabel = 'Adicionar';

    @Input() public deleteValuesAfterAction = true;

    public step = 0;

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

    public ngOnInit(): void { }

    // tslint:disable-next-line: indent
    public ngOnDestroy(): void {
        this.sendDataUnsubscribe();
    }

    /**
     * Sets a new current panel to expand.
     * @param index The new position
     */
    public setStep(index: number): void {
        this.step = index;
    }

    /**
     * Sets the next panel to expand.
     */
    public nextStep(): void {
        this.step++;
    }

    /**
     * Sets the previous panel to expand.
     */
    public prevStep(): void {
        this.step--;
    }

    /**
     * Sends data to the server. Collects all added information from the component.
     * Create a json object based on form.name fields and form.value
     */
    public doAction(): void {
        /* Preparing all data. */
        const data = {};

        this.panels.forEach(panel => {
            panel.formField.forEach( form => {
                data[form.name] = form.value;
            });
        });

        this.action.doit(data);

        if (this.deleteValuesAfterAction) {
            this.panels.forEach(panel => {
              panel.formField.forEach( form => {
                  form.value = null;
              });
            });
        }
    }

    private sendDataUnsubscribe(): void {
        if (this.sendDataSubscription) {
            this.sendDataSubscription.unsubscribe();
        }
    }
}
