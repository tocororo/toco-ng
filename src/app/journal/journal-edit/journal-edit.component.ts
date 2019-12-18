
import { Component, OnInit } from '@angular/core';

import { Panel, FormFieldType, FormContainerAction } from '@toco/forms/form-container/form-container.component';
import { Journal } from '@toco/entities/journal.entity.ts'
import { JournalService } from '../journal.service';
import { TaxonomyService, VocabulariesInmutableNames } from '@toco/taxonomy/taxonomy.service';
import { catchError, finalize } from 'rxjs/operators';
import { HttpErrorResponse } from '@angular/common/http';
import { MessageHandler, StatusCode } from '@toco/core/utils/message-handler';
import { MatSnackBar } from '@angular/material/snack-bar';
import { of } from 'rxjs';
import { Vocabulary } from '@toco/entities/taxonomy.entity';
import { CatalogService } from '@toco/catalog/catalog.service';
import { FilterHttpMap } from '@toco/filters/filter-item';

class SearchJournalByIdentifiersAction implements FormContainerAction {

  constructor(private service: CatalogService) {
  }

  doit(data: any): void {
    const rnps = data.rnps;
    const httpParams = Array<FilterHttpMap>();
    const issn = (data.issn_p !== '') ? data.issn_p : (data.issn_e !== '') ? data.issn_e : data.issn_l;
    httpParams.push(new FilterHttpMap('issn', issn));
    httpParams.push(new FilterHttpMap('rnps', rnps));

    this.service.getJournalsPage(0, 100, httpParams)
      .subscribe( response =>{

    });
  }
}

@Component({
  selector: 'toco-journal-edit',
  templateUrl: './journal-edit.component.html',
  styleUrls: ['./journal-edit.component.scss']
})
export class JournalEditComponent implements OnInit {
  // TODO: Idea del componente:
  // trabajan internamente con un journal, si recibe null entonces es uno nuevo, si recibe un journal entonces es editar.
  // en ambos casos devuelve el journal editado, o sea el contenido, listo para hacer post en el backend.
  public journal: Journal;
  loading = true;

  identifiersPanel: Panel;
  informationPanel: Panel;
  socialNetworks: Panel;

  public vocabularies: Vocabulary[] = [];

  public panels: Panel[] = [
    {
      title: 'Institución',
      description: '',
      iconName: '',
      formField: [
        { name: 'institution', placeholder: 'Instutuciones', type: FormFieldType.input, required: true },
        { name: 'custom', placeholder: 'Hacer el formulario para Terminos', type: FormFieldType.input, required: true },
      ]
    },
    {
      title: 'Indizaciones',
      description: '',
      iconName: '',
      formField: [
        { name: 'data_bases', placeholder: 'Dases de Datos', type: FormFieldType.input, required: true },

      ]
    },
    {
      title: 'Persona',
      description: '',
      iconName: '',
      formField: [
        { name: 'databases', placeholder: 'Bases de Datos', type: FormFieldType.textarea, required: true },
      ]
    },
    {
      title: 'Acuerdo Legal',
      description: '',
      iconName: '',
      formField: [
        { name: 'licence', placeholder: 'Acuerdo Legal', type: FormFieldType.textarea, required: true },
        { name: 'accepted', placeholder: 'Acepto', type: FormFieldType.checkbox, required: true },
      ]
    }
  ];

  public constructor(private journalService: JournalService,
    private taxonomyService: TaxonomyService,
    public _snackBar: MatSnackBar) { }

  ngOnInit() {
    this.taxonomyService.getVocabularies()
      .pipe(
        catchError((err: HttpErrorResponse) => {
          const m = new MessageHandler(this._snackBar);
          m.showMessage(StatusCode.serverError);
          // TODO: Maybe you must set a better return.
          return of(null);
        }),
        finalize(() => this.loading = false)
      ).subscribe(response => {
        this.vocabularies = response.data.vocabularies;
        const licences: Vocabulary = this.vocabularies.filter(vocab => vocab.id === VocabulariesInmutableNames.LICENCES)[0];
        const subjects: Vocabulary = this.vocabularies.filter(vocab => vocab.id === VocabulariesInmutableNames.SUBJECTS)[0];

        this.identifiersPanel = {
          title: 'Identificadores de la Revista',
          description: 'La Revista debe tener uno de los 3 ISSN y un RNPS',
          iconName: '',
          formField: [
            {
              name: 'issn_p',
              placeholder: 'ISSN Impreso',
              type: FormFieldType.issn,
              required: true,
              hintValue: 'Escriba un ISSN Impreso válido.',
              width: '25%'
            },
            {
              name: 'issn_e',
              placeholder: 'ISSN Electrónico',
              type: FormFieldType.issn,
              required: true,
              hintValue: 'Escriba un ISSN Electrónico válido.',
              width: '25%'
            },
            {
              name: 'issn_l',
              placeholder: 'ISSN de Enlace',
              type: FormFieldType.issn,
              required: true,
              hintValue: 'Escriba un ISSN de Enlace válido.',
              width: '25%'
            },
            {
              name: 'rnps',
              placeholder: 'RNPS',
              type: FormFieldType.rnps,
              required: true,
              hintValue: 'Escriba un RNPS válido.',
              width: '25%'
            }
          ]
        };

        this.informationPanel = {
          title: 'Informacion de la Revista',
          description: '',
          iconName: '',
          formField: [
            {
              name: 'title',
              placeholder: 'Título',
              type: FormFieldType.input,
              required: true,
              width: '100%'
            },
            {
              name: 'subtitle',
              placeholder: 'Subtítulo',
              type: FormFieldType.input,
              required: true,
              width: '50%'
            },
            {
              name: 'abbreviation',
              placeholder: 'Título abreviado',
              type: FormFieldType.input,
              required: true,
              width: '50%'
            },
            {
              name: 'url',
              placeholder: 'URL',
              type: FormFieldType.url,
              required: true,
              hintValue: 'Escriba un URL válido.',
              width: '50%'
            },
            {
              name: 'email',
              placeholder: 'Correo Electrónico',
              type: FormFieldType.email,
              required: true,
              hintValue: 'Escriba un email válido.',
              width: '50%'
            },
            {
              name: 'description',
              placeholder: 'Descripción',
              type: FormFieldType.textarea,
              required: true,
              width: '100%'
            },
            {
              name: 'source_type',
              placeholder: 'Tipo de revista',
              type: FormFieldType.input,
              required: true,
              width: '25%'
            },
            {
              name: 'source_app',
              placeholder: 'Sistema',
              type: FormFieldType.input,
              required: true,
              width: '25%'
            },
            {
              name: 'start_year',
              placeholder: 'Año de inicio',
              type: FormFieldType.input,
              required: true,
              width: '25%'
            },
            {
              name: 'frequency',
              placeholder: 'Año de inicio',
              type: FormFieldType.input,
              required: true,
              width: '25%'
            },
            {
              name: 'subjects',
              placeholder: 'Materias',
              type: FormFieldType.vocabulary,
              required: true,
              width: '50%',
              input: {
                multiple : true,
                selectedTermsIds : null,
                vocab: subjects
              },
            },
            {
              name: 'licence',
              placeholder: 'Licencia',
              type: FormFieldType.input,
              required: true,
              width: '50%',
              input: {
                multiple : true,
                selectedTermsIds : null,
                vocab: subjects
              },
            }
          ]
        };

        this.socialNetworks = {
          title: 'Redes Sociales',
          description: '',
          iconName: '',
          formField: [
            {
              name: 'facebook',
              placeholder: 'Facebook',
              type: FormFieldType.url,
              required: true
            },
            {
              name: 'twiter',
              placeholder: 'Twiter',
              type: FormFieldType.url,
              required: true
            },
            {
              name: 'linkedin',
              placeholder: 'LinkedIN',
              type: FormFieldType.url,
              required: true
            },
          ]
        };


      });
  }

}
