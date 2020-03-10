import { Component, OnInit, Input } from '@angular/core';
import { MetadataService } from '@toco/tools/core';
import { ActivatedRoute, Data, RouterOutlet } from '@angular/router';

@Component({
    selector: 'toco-static-pages',
    templateUrl: './static-pages.component.html',
    styleUrls: ['./static-pages.component.scss']
})
export class StaticPagesComponent implements OnInit {

    @Input() public src: string;

    @Input() public title: string;

    constructor(private metadata: MetadataService, private activatedRoute: ActivatedRoute) { }

    ngOnInit() {
        if (this.src == undefined) this.src = '';
        if (this.title == undefined) this.title = '';
        this.metadata.setTitleDescription(this.title, '');

        this.activatedRoute.data.subscribe({
            next: (data) => {
                console.log(data);
                
                if (data) {
                    this.src = data['src'];
                    this.title = data['title'];
                    this.metadata.setTitleDescription(this.title, '');
                }

            },
            error: (e) => {console.log(e);},
            complete: () => {}
        });
    }

}
