import { Component, OnInit } from '@angular/core';
import { TaxonomyService } from '../taxonomy.service';
import { Vocabulary } from '@toco/entities/taxonomy.entity';

@Component({
  selector: 'toco-vocabularies',
  templateUrl: './vocabularies.component.html',
  styleUrls: ['./vocabularies.component.scss']
})
export class VocabulariesComponent implements OnInit {

  vocabularies: Vocabulary[] = [];
  constructor(private service: TaxonomyService) { }

  ngOnInit() {
    this.service.getVocabularies().subscribe(response => {
      console.log(response);
      this.vocabularies = response.data.vocabularies;
    });
  }

  showTerms(vname){
    console.log(vname);
  }

}
