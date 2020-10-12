import { Component, OnInit, Input } from '@angular/core';
import { TaxonomyService } from '@toco/backend';
import { Term } from '@toco/entities';

@Component({
  selector: 'toco-terms-viewer',
  templateUrl: './terms-viewer.component.html',
  styleUrls: ['./terms-viewer.component.scss']
})
export class TermsViewerComponent implements OnInit {
  /**
   * receive vocab_id and a list of terms ids. 
   * show in a chiplist the terms of vocab_id
   */

  @Input()
  vocabulary_id = null;
  @Input()
  ids: number[] = null;
  
  terms: Term[] = []
  constructor(private taxonomyService: TaxonomyService) { }

  ngOnInit() {
    if (this.vocabulary_id){
      console.log(this.ids)
      this.taxonomyService.getTermListByIDs(this.ids)
      .subscribe(
        (response)=>{
          console.log(response);
          
          if(response.data.term){
            response.data.term.forEach(term => {
              if (term.vocabulary_id == this.vocabulary_id){
                this.terms.push(term);
              }
            });
          }
        },
        (error)=>{},
        ()=>{}
      );
    }
  }

}
