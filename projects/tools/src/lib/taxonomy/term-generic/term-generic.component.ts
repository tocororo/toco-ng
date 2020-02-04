
import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

import { PanelContent, FormFieldType, FormContainerAction } from '@toco/tools/forms';
import { Term, Vocabulary } from '@toco/tools/entities';

import { TaxonomyService, VocabulariesInmutableNames } from '@toco/tools/backend';
import { FormBuilder, FormGroup } from '@angular/forms';

export class TermAction implements FormContainerAction {
  constructor(private service: TaxonomyService, private term: Term, private is_new_term: boolean) { }

  doit(data: any): void {
    this.term.name = data.name;
    this.term.parent_id = data.parent_id;
    this.term.description = data.description;
    if (this.is_new_term) {
      this.service.newTerm(this.term as Term);
    } else {
      this.service.editTerm(this.term as Term);
    }
  }
}

@Component({
  selector: 'toco-term-generic',
  templateUrl: './term-generic.component.html',
  styleUrls: ['./term-generic.component.scss']
})
export class TermGenericComponent implements OnInit {
  public panels: PanelContent[] = [];
  public formGroup: FormGroup;
  public action: FormContainerAction;
  public actionLabel = 'Adicionar';
  term: Term;
  hasService = false;
  accept;
  vocab: Vocabulary;
  constructor(
    private _formBuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) private data: any) {
    if (data.term) {
      this.term = data.term;
      this.actionLabel = 'Actualizar';
    } else {
      this.term = new Term();
      this.term.isNew = true;
    }
    if (data.accept && data.currentVocab) {
      this.accept = data.accept;
      this.hasService = true;
      this.vocab = data.currentVocab;
    }
  }

  ngOnInit() {
    this.formGroup = this._formBuilder.group({});
    this.panels = [{
      title: 'Término',
      description: '',
      iconName: '',
      formGroup: this.formGroup,
      content: this.getPanels(),
    }];

    this.action = {
      doit: (data: any) => {
        console.log(this.formGroup);

        if (this.formGroup.valid) {

          this.term.load_from_data(this.formGroup.value);
          this.accept(this.term as Term);

        }
      }
    };

  }

  getPanels() {

    switch (this.vocab.id) {
      case VocabulariesInmutableNames.INTITUTION:
        return [
          {
            name: 'name', label: 'Nombre',
            type: FormFieldType.text,
            required: true,
            value: (this.data.term.name) ? this.data.term.name : null,
            width: '45%'
          },
          {
            name: 'description',
            label: 'Descripción',
            type: FormFieldType.textarea,
            required: false,
            value: (this.data.term.description) ? this.data.term.description : null,
            width: '45%'
          },
          {
            name: 'grid',
            label: 'Identificador GRID',
            type: FormFieldType.text,
            required: false,
            value: (this.data.term.data.grid) ? this.data.term.data.grid : null,
            width: '30%'
          },
          {
            name: 'email',
            label: 'Email',
            type: FormFieldType.email,
            required: true,
            value: (this.data.term.data.email) ? this.data.term.data.email : null,
            width: '30%'
          },
          {
            name: 'website',
            label: 'Sitio Web Oficial',
            type: FormFieldType.url,
            required: false,
            value: (this.data.term.data.website) ? this.data.term.data.website : null,
            width: '30%'
          },
          {
            name: 'address',
            label: 'Dirección',
            type: FormFieldType.textarea,
            required: false,
            value: (this.data.term.data.address) ? this.data.term.data.address : null,
            width: '100%'
          },
          {
            name: 'parent_id',
            label: 'Jerarquía Institucional (Institución Superior)',
            type: FormFieldType.term_parent,
            required: false,
            extraContent: {
              currentTerm: (this.data.term) ? this.data.term : null,
              terms: (this.data.terms) ? this.data.terms : null
            },
            width: '30%'
          },
        ];
        break;
      default:
        return [{
          name: 'name',
          label: 'Nombre',
          type: FormFieldType.text,
          required: true,
          width: '100%',
          value: (this.term.name) ? this.term.name : null,
        },
        {
          name: 'description',
          label: 'Descripción',
          type: FormFieldType.textarea,
          required: false,
          width: '100%',
          value: (this.term.description) ? this.term.description : null,
        },
        {
          name: 'parent_id',
          label: 'Término Padre',
          type: FormFieldType.term_parent,
          required: true,
          extraContent: {
            terms: this.data.terms,
            currentTerm: (this.term) ? this.term : null,
          },
          width: '50%'
        }]
    }
  }
}
