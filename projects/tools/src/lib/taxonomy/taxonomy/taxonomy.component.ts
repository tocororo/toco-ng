
import { Component, OnInit, OnDestroy } from '@angular/core';

import { Vocabulary } from '@toco/tools/entities';

@Component({
    selector: 'toco-taxonomy',
    templateUrl: './taxonomy.component.html',
    styleUrls: ['./taxonomy.component.scss']
})
export class TaxonomyComponent implements OnInit, OnDestroy{

    vocabs = { title: 'Vocabularios', cols: 1, rows: 1 };
    terms = { title: 'Terminos de', cols: 1, rows: 2 };

    current_vocab = {name: '', description: ''};

    currentVocab: Vocabulary;

    constructor()
    { }

    ngOnInit(): void {
    }
    vocabChange(vocab: Vocabulary){
        this.currentVocab = vocab;
    }
    ngOnDestroy(): void {
    }
}
