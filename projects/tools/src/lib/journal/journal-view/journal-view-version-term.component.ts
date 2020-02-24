import { Component, OnInit, Input } from '@angular/core';
import { TermSource } from '@toco/tools/entities';

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

    @Input() public terms: Array<TermSource>;

    constructor() {

    }

    ngOnInit(): void {
        if (this.terms == undefined) this.terms = new Array<TermSource>(0);

        if (this.vocab_id == undefined) this.vocab_id = 0;

        if (this.title == undefined) this.title = '';
    }
}

