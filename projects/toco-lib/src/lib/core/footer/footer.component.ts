
import { Component, OnInit, Input } from '@angular/core';

@Component({
    selector: 'toco-footer',
    templateUrl: './footer.component.html',
    styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

    @Input()
    public sites: Array< { name: string, url: string, useRouterLink: boolean } >;

    @Input()
    public information: Array< { name: string, url: string, useRouterLink: boolean } >;

    @Input()
    public image: string

    public constructor() { }

    public ngOnInit(): void {
        if ( this.sites == undefined ) this.sites = new Array();
        if ( this.information == undefined ) this.information = new Array();
    }
}
