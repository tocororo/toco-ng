/*
 *   Copyright (c) 2020 Universidad de Pinar del Río "Hermanos Saíz Montes de Oca"
 *   All rights reserved.
 */


import { Component, DoCheck, Input, ViewChild, ComponentFactoryResolver,
    ComponentFactory, ViewContainerRef, ComponentRef, OnChanges, SimpleChanges } from '@angular/core';

import { GetViewContainerDirective } from '@toco/tools/core';
import { FormFieldControl } from '../form-field.control';

/**
 * This component represents a components' factory. 
 */
@Component({
    selector: 'components-factory',
    templateUrl: './components-factory.component.html',
    styleUrls: ['./components-factory.component.scss']
})
export class ComponentsFactory implements OnChanges, DoCheck
{
    // TODO: for datepicker, !!!! use https://stackblitz.com/edit/angular-material2-year-picker-7z9k4t?file=app%2Fcustom-datepicker%2Fyear-picker-component%2Fyear-picker.component.html

    /**
     * Input field that represents an array of types which types inherit from `FormFieldContent` interface. 
     * This array contains the content of the components that the factory is going to create. 
     */
    @Input()
    public componentsContent: any[];

    private _componentsContentLength: number;

    @ViewChild(GetViewContainerDirective, { static: true })
    private _componentHost: GetViewContainerDirective;

    public constructor(private _componentFactoryResolver: ComponentFactoryResolver)
    {
        this.componentsContent = [];
        this._componentsContentLength = 0;
    }

    /**
     * A callback method that is invoked immediately after the
     * default change detector has checked data-bound properties
     * if at least one has changed, and before the view and content
     * children are checked.
     * @param changes The changed properties.
     */
    public ngOnChanges(changes: SimpleChanges): void
    {
        // // if (this._componentsContentLength != this.componentsContent.length)
        // // {
        //     // this._componentsContentLength = this.componentsContent.length;
        //     console.log('ComponentsFactory componentsContent: ', this.componentsContent);
 
        //     this._createComponents();
        // // }
    }

    /**
     * A callback method that performs change-detection, invoked after the default change-detector runs. 
     */
    public ngDoCheck(): void
    {
        if (this._componentsContentLength != this.componentsContent.length)
        {
            this._componentsContentLength = this.componentsContent.length;
            console.log('ComponentsFactory componentsContent: ', this.componentsContent);
 
            this._createComponents();
        }
    }

    private _createComponents(): void
    {
        /* The factory object that creates a component of the given type. */
        let cf: ComponentFactory<any>;
        let cr: ComponentRef<any>;

        const viewContainerRef: ViewContainerRef = this._componentHost.viewContainerRef;
        viewContainerRef.clear();

        for (let componentContent of this.componentsContent)
        {
            cf = this._componentFactoryResolver.resolveComponentFactory(componentContent.componentType);
            cr = viewContainerRef.createComponent(cf);
            (cr.instance as FormFieldControl).content = componentContent;
        }
    }
}
