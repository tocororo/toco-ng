
import { Component, OnInit, Inject } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { catchError, finalize } from 'rxjs/operators';
import { of } from 'rxjs';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

import { MessageHandler, StatusCode } from '@toco/tools/core';
import { Term, TermIndexData } from '@toco/tools/entities';
import { FormContainerAction, PanelContent, FormFieldContent, FormFieldType } from '@toco/tools/forms';

import { TaxonomyService, VocabulariesInmutableNames } from '@toco/tools/backend';
import { FormBuilder, FormGroup } from '@angular/forms';

class IndexerAction implements FormContainerAction {

  doit(data: any): void {
    this.term.name = data.name;
    this.term.parent_id = data.parent_id;
    this.term.description = data.description;
    const class_ids = (data.miar_class as []).concat(data.group_mes);
    this.term.class_ids = class_ids;
    this.term.data = new TermIndexData();
    (this.term.data as TermIndexData).load_from_data({
      'abrev': data.abrev,
      'url': data.url,
      'initial_cover': data.initial_cover,
      'end_cover': data.end_cover,
    });

    if (this.is_new_term) {
      this.service.newTerm(this.term);
    } else {
      this.service.editTerm(this.term);
    }
  }

  constructor(private service: TaxonomyService, private term: Term, private is_new_term: boolean) {
  }

}
/***
 * Componente para editar un termino del vocabulario Bases de Datos
 * En data espera recibir:
 * data: {
 *  term: El termino que esta siendo editado
 *  service: TaxonomyService
 *  terms: Los terminos del Vocabulario
 *  vocab: El vocabulario
 * }
 */
@Component({
  selector: 'toco-term-indexer',
  templateUrl: './term-indexer.component.html',
  styleUrls: ['./term-indexer.component.scss']
})
export class TermIndexerComponent implements OnInit {

  loading = true;

  public panels: PanelContent[] = [];
  public formGroup: FormGroup;
  formFieldsContent: FormFieldContent[];
  actionLabel: string;

  public action: FormContainerAction;

  term: Term;

  constructor(
    private _formBuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public _snackBar: MatSnackBar) { }

  ngOnInit() {
    this.formGroup = this._formBuilder.group({});
    this.panels = [{
      title: 'Término',
      description: '',
      iconName: '',
      formGroup: this.formGroup,
      content: []
    }];
    if (this.data.service) {
      console.log('if (this.data.service) {');
      (this.data.service as TaxonomyService).getVocabulary(VocabulariesInmutableNames.PROVINCES)
        .pipe(
          catchError((err: HttpErrorResponse) => {
            const m = new MessageHandler(this._snackBar);
            m.showMessage(StatusCode.serverError);
            // TODO: Maybe you must set a better return.
            return of(null);
          }),
          finalize(() => this.loading = false)
        )
        .subscribe(response_miar => {
          if (response_miar.data) {
            (this.data.service as TaxonomyService).getVocabulary(VocabulariesInmutableNames.DB_GROUPS)
              .pipe(
                catchError((err: HttpErrorResponse) => {
                  const m = new MessageHandler(this._snackBar);
                  m.showMessage(StatusCode.serverError);
                  // TODO: Maybe you must set a better return.
                  return of(null);
                }),
                finalize(() => this.loading = false)
              ).subscribe(response_group => {
                if (response_group.data) {
                  console.log(response_miar.data);
                  console.log(response_group.data);
                  if (this.data.term) {
                    this.term = this.data.term;
                    this.action = new IndexerAction(this.data.service, this.data.term, false);
                    this.actionLabel = 'Actualizar';
                    this.panels[0].title = 'Editar ' + this.term.name;
                  } else {
                    this.term = new Term();
                    this.term.vocabulary_id = this.data.vocab.id;
                    this.data['term'] = this.term;

                    this.action = new IndexerAction(this.data.service, this.data.term, true);
                    this.actionLabel = 'Adicionar';
                    this.panels[0].title = 'Nuevo Término de ' + this.data.vocab.human_name;
                  }
                  // TODO: usar TermIndexData instead of any
                  // const instData = new TermIndexData();
                  // instData.load_from_data(this.data.term.data);
                  // this.data.term.data = instData;

                  this.data.term.data = (this.data.term.data) ? this.data.term.data : {};

                  this.formFieldsContent = [
                    {
                      name: 'name', label: 'Nombre',
                      type: FormFieldType.text,
                      required: true,
                      value: (this.term.name) ? this.term.name : null,
                      width: '30%'
                    },
                    {
                      name: 'abrev',
                      label: 'Identificadores',
                      type: FormFieldType.textarea,
                      required: false,
                      value: (this.data.term.data.abrev) ? this.data.term.data.abrev : null,
                      width: '30%'
                    },
                    {
                      name: 'description',
                      label: 'Descripción',
                      type: FormFieldType.textarea,
                      required: false,
                      value: (this.term.description) ? this.term.description : null,
                      width: '30%'
                    },
                    {
                      name: 'url',
                      label: 'URL',
                      type: FormFieldType.url,
                      required: false,
                      value: (this.data.term.data.url) ? this.data.term.data.url : null,
                      width: '50%'
                    },
                    {
                      name: 'initial_cover',
                      label: 'Cobertura inicio',
                      type: FormFieldType.datepicker,
                      required: false,
                      value: (this.data.term.data.initial_cover) ? this.data.term.data.initial_cover : null,
                      width: '20%'
                    },
                    {
                      name: 'end_cover',
                      label: 'Cobertura',
                      type: FormFieldType.datepicker,
                      required: false,
                      value: (this.data.term.data.end_cover) ? this.data.term.data.end_cover : null,
                      width: '20%'
                    },
                    {
                      name: 'miar_class',
                      label: 'Tipología de sistemas de indización',
                      type: FormFieldType.vocabulary,
                      required: false,
                      extraContent: {
                        multiple: false,
                        selectedTermsIds: (this.term.class_ids) ? this.term.class_ids : null,
                        vocab: response_miar.data.vocabulary
                      },
                      width: '48%'
                    },
                    {
                      name: 'group_mes',
                      label: 'Grupos, Categorías según criterios de “calidad” de las publicaciones ',
                      type: FormFieldType.vocabulary,
                      required: false,
                      extraContent: {
                        multiple: false,
                        selectedTermsIds: (this.term.class_ids) ? this.term.class_ids : null,
                        vocab: response_group.data.vocabulary
                      },
                      width: '48%'
                    },
                  ];
                  this.panels[0].content = this.formFieldsContent;
                }
              });
          }
        });
    }
  }
}
