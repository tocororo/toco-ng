
import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

import { PanelContent, FormFieldType, FormContainerAction, HintValue, HintPosition } from '@toco/tools/forms';
import { Term, Vocabulary, TermInstitutionData, Entity, EntityBase, TermIndexData, VocabulariesInmutableNames } from '@toco/tools/entities';

import { TaxonomyService } from '@toco/tools/backend';
import { FormBuilder, FormGroup } from '@angular/forms';
import { finalize, catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { MessageHandler, StatusCode } from '@toco/tools/core';
import { MatSnackBar } from '@angular/material';

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
  // term: Term;
  hasService = false;
  accept;
  vocab: Vocabulary;
  constructor(
    private _formBuilder: FormBuilder,
    public _snackBar: MatSnackBar,
    private service: TaxonomyService,
    @Inject(MAT_DIALOG_DATA) private data: any) {
    
    if (data.accept && data.currentVocab) {
      this.accept = data.accept;
      this.hasService = true;
      this.vocab = data.currentVocab;
      if (data.term) {
        console.log(data.term)

        // this.term = data.term;
        this.actionLabel = 'Actualizar';
        if (! this.data.term.data){
          this.data.term.data = this.getTermDataObject();
        }
        
      } else {
        this.data.term = new Term();
        this.data.term.isNew = true;
        this.data.term.vocabulary_id = data.currentVocab.id;
      }
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
          const result = new Term();
          result.load_from_data(this.data.term);
          result.load_from_data(this.formGroup.value);
          result.data = this.getTermDataObject();
          result.data.load_from_data(this.formGroup.value);
          console.log(result, "aqui")
          const parent = this.formGroup.value['parent_id']
          if ( parent && parent[0]){
            result.parent_id = parent[0].id;
          } else {
            result.parent_id = null;
          }

          if (this.vocab.id == VocabulariesInmutableNames.DATABASES) { 
            result.class_ids = [];
            const miar = this.formGroup.value['miar_class'];
            const mes =  this.formGroup.value['group_mes'];
            if (miar && miar[0]){
              
              console.log(miar[0]);
              
            if( miar[0]) {
              result.class_ids.push(miar[0].id)
            }}
            if (mes && mes[0]) {
              result.class_ids.push(mes[0].id)
            }
          }
          console.log(result, "aqui")
          this.accept(result as Term);
        }
      }
    }
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
            width: '100%'
          },
          {
            name: 'grid',
            label: 'Identificador GRID',
            type: FormFieldType.text,
            required: false,
            value: (this.data.term.data.grid) ? this.data.term.data.grid : null,
            width: '50%'
          },
          {
            name: 'description',
            label: 'Descripción',
            type: FormFieldType.textarea,
            required: false,
            value: (this.data.term.description) ? this.data.term.description : null,
            width: '100%'
          },
          {
            name: 'email',
            label: 'Email',
            type: FormFieldType.email,
            required: true,
            value: (this.data.term.data.email) ? this.data.term.data.email : null,
            width: '45%'
          },
          {
            name: 'website',
            label: 'Sitio Web Oficial',
            type: FormFieldType.url,
            required: false,
            value: (this.data.term.data.website) ? this.data.term.data.website : null,
            width: '45%'
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
            type: FormFieldType.vocabulary,
            required: false,
            extraContent: {
              multiple: false,
              selectedTermsIds: (this.data.term.parent_id) ? [this.data.term.parent_id] : null,
              vocab: this.vocab.id
            },
            width: '100%'
          },
        ];
      case VocabulariesInmutableNames.DATABASES:
          return [
            {
              name: 'name', label: 'Nombre',
              type: FormFieldType.text,
              required: true,
              value: (this.data.term.name) ? this.data.term.name : null,
              width: '100%'
            },
            {
              name: 'url',
              label: 'URL',
              type: FormFieldType.url,
              required: false,
              value: (this.data.term.data.url) ? this.data.term.data.url : null,
              width: '100%'
            },
            {
              name: 'abrev',
              label: 'Identificadores',
              type: FormFieldType.text,
              required: false,
              value: (this.data.term.data.abrev) ? this.data.term.data.abrev : null,
              width: '30%'
            },
            {
              name: 'initial_cover',
              label: 'Cobertura inicio',
              type: FormFieldType.text,
              required: false,
              value: (this.data.term.data.initial_cover) ? this.data.term.data.initial_cover : null,
              width: '30%'
            },
            {
              name: 'end_cover',
              label: 'Cobertura',
              type: FormFieldType.text,
              required: false,
              value: (this.data.term.data.end_cover) ? this.data.term.data.end_cover : null,
              width: '30%'
            },
            {
              name: 'description',
              label: 'Descripción',
              type: FormFieldType.textarea,
              required: false,
              value: (this.data.term.description) ? this.data.term.description : null,
              width: '100%'
            },
            {
              name: 'miar_class',
              label: 'Tipología de sistemas de indización',
              type: FormFieldType.vocabulary,
              required: false,
              extraContent: {
                multiple: false,
                selectedTermsIds: (this.data.term.class_ids) ? this.data.term.class_ids : null,
                vocab: VocabulariesInmutableNames.MIAR
              },
              width: '48%'
            },
            {
              name: 'group_mes',
              label: 'Grupos, Categorías según criterios de “calidad” de las publicaciones ',
              type: FormFieldType.vocabulary,
              startHint: new HintValue(HintPosition.start, ''),
              required: false,
              extraContent: {
                multiple: false,
                selectedTermsIds: (this.data.term.class_ids) ? this.data.term.class_ids : null,
                vocab: VocabulariesInmutableNames.DB_GROUPS
              },
              width: '48%'
            },
          ];
      default:
        return [{
          name: 'name',
          label: 'Nombre',
          type: FormFieldType.text,
          required: true,
          width: '100%',
          value: (this.data.term.name) ? this.data.term.name : null,
        },
        {
          name: 'description',
          label: 'Descripción',
          type: FormFieldType.textarea,
          required: false,
          width: '100%',
          value: (this.data.term.description) ? this.data.term.description : null,
        },
        {
          name: 'parent_id',
          label: 'Término Padre',
          type: FormFieldType.vocabulary,
          startHint: new HintValue(HintPosition.start, ''),
          required: false,
          extraContent: {
            multiple: false,
            selectedTermsIds: (this.data.term.parent_id) ? [this.data.term.parent_id] : null,
            vocab: this.vocab.id
          },
          width: '50%'
        }]
    }
  }

  getTermDataObject(){
    switch (this.vocab.id) {
      case VocabulariesInmutableNames.INTITUTION:
        return new TermInstitutionData();
      case VocabulariesInmutableNames.DATABASES:
        return new TermIndexData();
      default:
        return new EntityBase();
    }
  }

}
