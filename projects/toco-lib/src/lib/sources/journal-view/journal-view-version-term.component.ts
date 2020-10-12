import { Component, OnInit, Input } from '@angular/core';
import { SourceClasification } from '../../entities';

/**
 * This component share the same scss that `JournalViewComponent`.
 * His goal is show a list of `terms`
 */
@Component({
    selector: 'toco-journal-view-term',
    templateUrl: './journal-view-term.component.html',
    styleUrls: ['./journal-view.component.scss']
})
export class JournalViewTermComponent implements OnInit {

    @Input() public title: string;

    @Input() public vocab_id: number;

    @Input() public terms: Array<SourceClasification>;

    constructor() {

    }

    ngOnInit(): void {
        if (this.terms == undefined) this.terms = new Array<SourceClasification>(0);

        if (this.vocab_id == undefined) this.vocab_id = 0;

        if (this.title == undefined) this.title = '';
    }
}

