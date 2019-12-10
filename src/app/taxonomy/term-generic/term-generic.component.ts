import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormContainerComponent, Panel, FormFieldType, FormContainerAction } from '@toco/forms/form-container/form-container.component';
import { TaxonomyService } from '../taxonomy.service';
import { Term, Vocabulary } from '@toco/entities/taxonomy.entity';

export class TermActionNew implements FormContainerAction {
  doit(data: any): void {
    console.log(this);
    data['vocabulary_id'] = this.vocab.id;
    this.service.newTerm(data);
  }
  constructor(private service: TaxonomyService, private vocab: Vocabulary) { }
}

export class TermAction implements FormContainerAction {
  doit(data: any): void {
    this.term.name = data.name;
    this.term.parent_id = data.parent_id;
    this.term.description = data.description;

    if (this.is_new_term){
      this.service.newTerm(data);
    } else{
      this.service.editTerm(this.term);
    }
  }
  constructor(private service: TaxonomyService, private term: Term, private is_new_term: boolean) { }
}

@Component({
  selector: 'toco-term-generic',
  templateUrl: './term-generic.component.html',
  styleUrls: ['./term-generic.component.scss']
})
export class TermGenericComponent implements OnInit {

  public panels: Panel[];
  public action: FormContainerAction;
  public actionLabel: string = 'Adicionar';

  constructor(
    @Inject(MAT_DIALOG_DATA) private data: any) {
  }

  ngOnInit() {
    if (this.data.service && this.data.terms && this.data.vocab) {

      // if a term is comming, then we are updating it
      if (this.data.term) {
        this.actionLabel = 'Actualizar';
        this.panels[0].title = 'Editar ' + this.data.term.name;
        this.action = new TermAction(this.data.service, this.data.term, false);
      } else {
        let term: Term = new Term();
        term.vocabulary_id = this.data.vocab.id;
        this.action = new TermAction(this.data.service, this.data.vocab, true);
        this.actionLabel = 'Adicionar';
        this.panels[0].title = 'Nuevo Término de ' + this.data.vocab.human_name;
      }

      this.panels = [{
        title: 'Nuevo Término',
        description: '',
        iconName: '',
        formField: [
          {
            name: 'name',
            placeholder: 'Nombre',
            type: FormFieldType.input,
            required: true,
            width: '100%',
            value: (this.data.term.name) ? this.data.term.name : null,
          },
          {
            name: 'description',
            placeholder: 'Descripción',
            type: FormFieldType.textarea,
            required: false,
            width: '100%',
            value: (this.data.term.description) ? this.data.term.description : null,
          },
          {
            name: 'parent_id',
            placeholder: 'Término Padre',
            type: FormFieldType.term_parent,
            required: false,
            input: { 
              terms: this.data.terms,
              currentTerm: (this.data.term) ? this.data.term : null,
            },
            width: '50%'
          },
        ],
      }];

    }
  }

}
