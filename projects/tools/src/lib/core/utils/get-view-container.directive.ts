
import { Directive, ViewContainerRef } from '@angular/core';

/**
 * A helper directive to mark valid insertion points in the template. 
 * This directive injects the `ViewContainerRef` to gain access to the view container of the element 
 * that will host the dynamically components. 
 * In the `@Directive` decorator, notice the selector name, `get-view-container`; that's what you use 
 * to apply the directive to the element. 
 */
@Directive({
    selector: '[get-view-container]'
})
export class GetViewContainerDirective
{
    public constructor(private _viewContainerRef: ViewContainerRef)
    { }

    /**
     * Returns the injected `ViewContainerRef` to gain access to the view container of the element 
     * that will host the dynamically components. 
     */
    public get viewContainerRef(): ViewContainerRef
    {
        return this._viewContainerRef;
    }
}
