
import { Component, OnInit, OnDestroy, Input, OnChanges } from '@angular/core';
import { PartialObserver, Subscription } from 'rxjs';

import { Entity, Response } from '@toco/tools/entities';

import { InputContent } from '../../input/input.control';
import { ActionContent } from '../../action/action.control';
import { FormFieldContent_Experimental } from '../../experimental/form-field.control.experimental';
import { FormGroup } from '@angular/forms';
import { FormFieldContent } from '../../form-field.control';
import { element } from 'protractor';

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
    content: (InputContent | ActionContent | FormFieldContent_Experimental)[] | any[];

    formGroup: FormGroup;

    /**
     * action and action labels for each panels
     */
    action?: FormContainerAction;
    actionLabel?: string;
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
export class FormContainerComponent implements OnInit, OnDestroy, OnChanges
{
    /**
     * The array of panels to show. 
     */
    @Input()
    public panels: PanelContent[];

    @Input()
    public useAccordion = true;

    @Input()
    public actionButtonIsStepperNext = false;


    @Input()
    public action: FormContainerAction;

    @Input()
    public entity: Entity;

    /**
     * An string that represents the action label of the last panel. 
     */
    @Input()
    public actionLabel: string;

    @Input()
    public deleteValuesAfterAction = true;

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

    private setFormGroupToPanels(){
        this.panels.forEach(panel => {
            panel.content.forEach((element: FormFieldContent) => {
                element.formGroup = panel.formGroup;
            });
        });
    }

    public ngOnInit(): void
    {
        // if actionLabel is undefined, means that there is no actionLabel, the user must decide!!!
        // if (this.actionLabel == undefined) this.actionLabel = 'Adicionar';
        console.log("on INIT", this.panels)
        this.setFormGroupToPanels();
    }

    // tslint:disable-next-line: indent
    public ngOnDestroy(): void
    {   
        console.log("on DESTROY Call", this.panels)
        this.sendDataUnsubscribe();
    }

    public ngOnChanges(): void{
        console.log("on CHANGES Call", this.panels)
        this.setFormGroupToPanels();
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
    public doAction(): void
    {
        /* Preparing all data. */

        const data = { };

        this.panels.forEach(panel => {
            panel.content.forEach(form => {
                data[form.name] = form.value;
            });
        });

        if (this.action) {
            this.action.doit(data);
        }

        if (this.deleteValuesAfterAction) {
            this.panels.forEach(panel => {
              panel.content.forEach( form => {
                  form.value = null;
              });
            });
        }
    }


    private sendDataUnsubscribe(): void
    {
        if (this.sendDataSubscription)
        {
            this.sendDataSubscription.unsubscribe();
        }
    }

    public addPanel(panel: PanelContent){
        panel.content.forEach( element => {
            element.formGroup = panel.formGroup;
        });
        this.panels.push(panel);
        
    }
    public deletePanel(panelIndex){
        
        this.panels[panelIndex].content.forEach( content => {
            this.panels[panelIndex].formGroup.removeControl(content.name);
        });
        this.panels.splice(panelIndex, 1);
        console.log(this.panels, panelIndex)
    }
}
