import { Component, OnInit, Input } from '@angular/core';
import { Term, VocabulariesInmutableNames } from '@toco/tools/entities';

@Component({
  selector: 'toco-extra-institution-viewer',
  templateUrl: './extra-institution-viewer.component.html',
  styleUrls: ['./extra-institution-viewer.component.scss']
})
export class ExtraInstitutionViewerComponent implements OnInit {

  @Input()
  term: Term;
  valid = false;
  vocab_country = VocabulariesInmutableNames.CUBAN_PROVINCES;

  constructor() { }

  ngOnInit() {
    if (this.term){
      this.valid = this.term.vocabulary_id == VocabulariesInmutableNames.EXTRA_INSTITUTIONS;
    }
  }
}
