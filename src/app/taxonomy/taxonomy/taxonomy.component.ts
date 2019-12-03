import { Component, OnInit, OnDestroy } from '@angular/core';
import { Vocabulary } from '@toco/entities/taxonomy.entity';
import { TaxonomyService } from '../taxonomy.service';
import { Subscription, PartialObserver } from 'rxjs';

@Component({
  selector: 'toco-taxonomy',
  templateUrl: './taxonomy.component.html',
  styleUrls: ['./taxonomy.component.scss']
})
export class TaxonomyComponent implements OnInit, OnDestroy{

  vocabs = { title: 'Vocabularios', cols: 1, rows: 1 };
  terms = { title: 'Terminos de', cols: 1, rows: 2 };

  current_vocab = {name: '', description: ''};

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

  constructor(private service: TaxonomyService) {}

  ngOnInit(): void {
    this.currentVocabSuscription = this.service.currentVocabularyObservable.subscribe(this.currentVocabObserver);
  }

  ngOnDestroy(): void {
    if (this.currentVocabSuscription){
      this.currentVocabSuscription.unsubscribe();
    }
  }
}
