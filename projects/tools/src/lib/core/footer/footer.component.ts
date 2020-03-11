
import { Component, OnInit, Input } from '@angular/core';

@Component({
    selector: 'toco-footer',
    templateUrl: './footer.component.html',
    styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

    @Input() public sites: Array< { name: string, url: string } >;

    @Input() public information: Array< { name: string, url: string } >;

    @Input() public image: string

    constructor(){}

    ngOnInit() {
        if ( this.sites == undefined ) this.sites = new Array< { name: string, url: string } >();
        if ( this.information == undefined ) this.information = new Array< { name: string, url: string } >();
    }
}
