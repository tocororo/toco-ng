
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription, PartialObserver } from 'rxjs';

import { Vocabulary } from '@toco/tools/entities';

import { TaxonomyService } from '@toco/tools/backend';

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

    private currentVocabSuscription: Subscription = null;
    private currentVocabObserver: PartialObserver<Vocabulary> = {
        next: (vocab: Vocabulary) => {
            this.current_vocab = vocab;
        },

        error: (err: any) => {
                console.log('The observable got an error notification: ' + err + '.');
        },

        complete: () => {
            console.log('The observable got a complete notification.');
        }
    };

    constructor(private service: TaxonomyService)
    { }

    ngOnInit(): void {
        this.currentVocabSuscription = this.service.currentVocabularyObservable.subscribe(this.currentVocabObserver);
    }
    vocabChange(vocab: Vocabulary){
        console.log(vocab);
        this.currentVocab = vocab;
        // this.service.getTermsTreeByVocab(vocab.id);
    }
    ngOnDestroy(): void {
        if (this.currentVocabSuscription){
            this.currentVocabSuscription.unsubscribe();
        }
    }
}
