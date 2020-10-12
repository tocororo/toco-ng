
import { Component, OnInit, Input } from '@angular/core';

@Component({
    selector: 'toco-body',
    templateUrl: './body.component.html',
    styleUrls: ['./body.component.scss']
})
export class BodyComponent implements OnInit {

    @Input()
    body: string;

    processed: string;

    constructor()
    { }

    ngOnChanges(): void {
        this.doReplace();
    }

    ngOnInit() {
        if (this.body) {
            this.doReplace();
        }
    }

    doReplace() {
        var find = "/public/inline-images/";
        var replace = "/public/inline-images/";
        var str = this.body.replace(find, replace);
        this.processed = str;
    }
}
