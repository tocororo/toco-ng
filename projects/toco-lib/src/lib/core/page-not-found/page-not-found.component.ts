
import { Component, Input, OnInit } from '@angular/core';

/**
 * Component that shows information for a page-not-found view. 
 */
@Component({
    selector: 'toco-page-not-found',
    templateUrl: './page-not-found.component.html',
    styleUrls: ['./page-not-found.component.scss']
})
export class PageNotFoundComponent implements OnInit
{
    /**
     * Input field that contains the router link to reditect. 
     * By default, its value is `['/']`. 
     */
    @Input()
    public routerLink: string[];

    /**
     * Input field that contains the image source to show underneath the redirect link. 
     * By default, its value is `undefined`. 
     */
    @Input()
    public imgSource: string;

    public constructor()
    {
        this.routerLink = undefined;
        this.imgSource = undefined;
    }

    public ngOnInit(): void
    {
        /* Specifies the default values. */

        if (this.routerLink == undefined) this.routerLink = ['/'];
        /* The default value for `imgSource` is `undefined`. */
    }
}
