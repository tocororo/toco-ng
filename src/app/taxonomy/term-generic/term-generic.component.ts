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

export class TermActionEdit implements FormContainerAction {
  doit(data: any): void {
    console.log(this);
    this.service.editTerm(this.term);
  }
  constructor(private service: TaxonomyService, private term: Term) { }
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
            width: '100%'
          },
          {
            name: 'description',
            placeholder: 'Descripción',
            type: FormFieldType.textarea,
            required: false,
            width: '100%'
          },
          {
            name: 'parent_id',
            placeholder: 'Término Padre',
            type: FormFieldType.term_parent,
            required: false,
            input: { terms: this.data.terms },
            width: '50%'
          },
        ],
      }];

      // if a term is comming, then we are updating it
      if (this.data.term) {
        this.actionLabel = 'Actualizar';
        this.panels[0].title = 'Editar Término';
        this.panels[0].formField[0].value = this.data.term.name;
        this.panels[0].formField[1].value = this.data.term.description;
        this.panels[0].formField[2].input.currentTerm = this.data.term;
        this.action = new TermActionEdit(this.data.service, this.data.term);
      } else {
        this.action = new TermActionNew(this.data.service, this.data.vocab);
      }
      console.log(this.panels);
    }
  }

}
