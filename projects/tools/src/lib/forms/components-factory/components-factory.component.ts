/*
 *   Copyright (c) 2020 Universidad de Pinar del Río "Hermanos Saíz Montes de Oca"
 *   All rights reserved.
 */


import { Component, OnInit, Input, ViewChild, ComponentFactoryResolver,
    ComponentFactory, ViewContainerRef, ComponentRef } from '@angular/core';

import { GetViewContainerDirective } from '@toco/tools/core';
import { FormFieldControl } from '../form-field.control';

/**
 * This component represents a components' factory. 
 * //TODO: Pensar en cómo hacer esto de forma dinámica con facilidades que brinda Angular. 
 * Entonces cuando esta clase sea modificada o desaparezca, el campo 
 * `parentFormSection` sale de adentro del `content` para un campo `Input` dentro de la clase `FormFieldControl`, 
 * `formSection` sale de adentro del `content` para un campo `Input` dentro de la clase `ContainerControl`, 
 * `formControl` sale de adentro del `content` para un campo `Input` dentro de la clase `InputControl`. 
 */
@Component({
    selector: 'components-factory',
    templateUrl: './components-factory.component.html',
    styleUrls: ['./components-factory.component.scss']
})
export class ComponentsFactory implements OnInit
{
    // TODO: for datepicker, !!!! use https://stackblitz.com/edit/angular-material2-year-picker-7z9k4t?file=app%2Fcustom-datepicker%2Fyear-picker-component%2Fyear-picker.component.html

    /**
     * Input field that represents an array of types which types inherit from `FormFieldContent` interface. 
     * This array contains the content of the components that the factory is going to create. 
     */
    @Input()
    public componentsContent: any[];

    @ViewChild(GetViewContainerDirective, { static: true })
    private _componentHost: GetViewContainerDirective;

    public constructor(private _componentFactoryResolver: ComponentFactoryResolver)
    {
        this.componentsContent = [];
    }

    public ngOnInit(): void
    {
        console.log('ComponentsFactory componentsContent: ', this.componentsContent);

        this._createComponents();
    }

    private _createComponents(): void
    {
        /* The factory object that creates a component of the given type. */
        let cf: ComponentFactory<any>;
        let cr: ComponentRef<any>;

        const viewContainerRef: ViewContainerRef = this._componentHost.viewContainerRef;

        for (let componentContent of this.componentsContent)
        {
            cf = this._componentFactoryResolver.resolveComponentFactory(componentContent.componentType);
            cr = viewContainerRef.createComponent(cf);
            (cr.instance as FormFieldControl).content = componentContent;
        }
    }
}
