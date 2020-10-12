
import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
    selector: '[toco-Filter]'
})
export class FilterDirective
{
    constructor(public viewContainerRef : ViewContainerRef)
    { }
}
