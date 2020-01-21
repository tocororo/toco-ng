
import { Component } from '@angular/core';

import { Source, Vocabulary, JournalInformation, Journal } from '@toco/tools/entities';
import { PanelContent, FormFieldType, IssnValue, HintValue, HintPosition, FormContainerAction } from '@toco/tools/forms';

import { JournalService } from '../journal.service';
import { FilterHttpMap } from '@toco/tools/filters';
import { MatDialog, MatSnackBar } from '@angular/material';
import { CatalogService, TaxonomyService, VocabulariesInmutableNames } from '@toco/tools/backend';
import { of } from 'rxjs';
import { catchError, finalize } from 'rxjs/operators';
import { HttpErrorResponse } from '@angular/common/http';
import { MessageHandler, StatusCode, HandlerComponent } from '@toco/tools/core';
import { SourceService } from '@toco/tools/backend/source.service';


class SearchJournalByIdentifiersAction implements FormContainerAction {
  constructor(private service: CatalogService, private journalFound: Function) { }

  doit(data: any): void {
    const rnps = data.rnps;
    const httpParams = Array<FilterHttpMap>();
    const issn = (data.issn_p !== '') ? data.issn_p : (data.issn_e !== '') ? data.issn_e : (data.issn_e !== '') ? data.issn_l : '';

    if (issn !== '') {
      httpParams.push(new FilterHttpMap('issn', issn));
    }
    if (rnps !== '') {
      httpParams.push(new FilterHttpMap('rnps', rnps));
    }
    this.service.getJournalsPage(10, 0, httpParams)
      .subscribe(response => {
        if (response.data && response.data.sources.count === 1) {
          console.log(response.data.sources.data[0].data);
          this.journalFound(response.data.sources.data[0]);
        } else {
          this.journalFound(null);
        }
      });
  }
}



@Component({
  selector: 'toco-journal-edit',
  templateUrl: './journal-edit.component.html',
  styleUrls: ['./journal-edit.component.scss']
})
export class JournalEditComponent {
  // TODO: Idea del componente:
  // trabajan internamente con un journal, si recibe null entonces es uno nuevo, si recibe un journal entonces es editar.
  // en ambos casos devuelve el journal editado, o sea el contenido, listo para hacer post en el backend.
  public journal: Journal = null;
  loading = true;
  identifiersPanel: PanelContent[] = [];
  informationPanel: PanelContent[] = [];
  socialNetworks: PanelContent[] = [];

  searchJournalAction: SearchJournalByIdentifiersAction;

  public vocabularies: Vocabulary[] = [];

  licences: Vocabulary;
  subjects: Vocabulary;

  public constructor(
    private sourceService: SourceService,
    private catalogService: CatalogService,
    private taxonomyService: TaxonomyService,
    public _snackBar: MatSnackBar,
    public dialog: MatDialog) { }

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

        this.initIdentifiersPanel();

        this.searchJournalAction = new SearchJournalByIdentifiersAction(
          this.catalogService,
          (journalResponse) => {
            this.journal = new Journal();

            let title = 'Revista NO encontrada';
            let content = 'Complete la información de la revista...';

            if (journalResponse) {
              this.journal.load_from_data(journalResponse);
              title = 'Revista encontrada';
              content = 'Compruebe los datos de la revista...';
            }

            this.initInformationPanel();

            const m = new MessageHandler(null, this.dialog);
            m.showMessage(StatusCode.OK, content, HandlerComponent.dialog, title);
          });

      });
  }

  initIdentifiersPanel(): void {
    this.identifiersPanel = [{
      title: 'Identificadores de la Revista',
      description: 'La Revista debe tener uno de los 3 ISSN y un RNPS',
      iconName: '',
      content: [
        {
          name: 'issn_p',
          label: 'ISSN Impreso',
          type: FormFieldType.text,
          required: false,
          startHint: new HintValue(HintPosition.start, 'Escriba un ISSN Impreso válido.'),
          width: '25%',


        },
        {
          name: 'issn_e',
          label: 'ISSN Electrónico',
          type: FormFieldType.text,
          required: false,
          startHint: new HintValue(HintPosition.start, 'Escriba un ISSN Electrónico válido.'),
          width: '25%'
        },
        {
          name: 'issn_l',
          label: 'ISSN de Enlace',
          type: FormFieldType.text,
          required: false,
          startHint: new HintValue(HintPosition.start, 'Escriba un ISSN de Enlace válido.'),
          width: '25%'
        },
        {
          name: 'rnps',
          label: 'RNPS',
          type: FormFieldType.text,
          required: false,
          startHint: new HintValue(HintPosition.start, 'Escriba un RNPS válido.'),
          width: '25%'
        }
      ]
    }];
  }

  initInformationPanel(): void {
    this.informationPanel = [{
      title: 'Informacion de la Revista',
      description: '',
      iconName: '',
      content: [
        {
          name: 'title',
          label: 'Título',
          type: FormFieldType.text,
          required: true,
          width: '100%',
          value: this.journal ? this.journal.data.title : ''
        },
        {
          name: 'subtitle',
          label: 'Subtítulo',
          type: FormFieldType.text,
          required: true,
          width: '45%',
          value: this.journal ? this.journal.data.subtitle : ''
        },
        {
          name: 'abbreviation',
          label: 'Título abreviado',
          type: FormFieldType.text,
          required: true,
          width: '50%',
          value: this.journal ? this.journal.data.shortname : ''
        },
        {
          name: 'url',
          label: 'URL',
          type: FormFieldType.url,
          required: true,
          startHint: 'Escriba un URL válido.',
          width: '50%',
          value: this.journal ? this.journal.data.url : ''
        },
        {
          name: 'email',
          label: 'Correo Electrónico',
          type: FormFieldType.email,
          required: true,
          startHint: new HintValue(HintPosition.start, 'Escriba un email válido.'),
          width: '50%',
          value: this.journal ? this.journal.data.email : ''
        },
        {
          name: 'description',
          label: 'Descripción',
          type: FormFieldType.textarea,
          required: true,
          width: '100%',
          value: this.journal ? this.journal.data.description : ''
        },
        {
          name: 'source_type',
          label: 'Tipo de revista',
          type: FormFieldType.text,
          required: true,
          width: '25%',
          value: this.journal ? this.journal.source_type : ''
        },
        {
          name: 'source_type',
          label: 'Sistema',
          type: FormFieldType.text,
          required: true,
          width: '25%',
          value: this.journal ? this.journal.source_type : ''
        },
        {
          name: 'start_year',
          label: 'Año de inicio',
          type: FormFieldType.datepicker,
          required: true,
          width: '25%',
          value: this.journal ? this.journal.data.start_year : ''
        },
        {
          name: 'end_year',
          label: 'Año de inicio',
          type: FormFieldType.datepicker,
          required: true,
          width: '25%',
          value: this.journal ? this.journal.data.end_year : ''
        },
        {
          name: 'frequency',
          label: 'Frecuencia',
          type: FormFieldType.text,
          required: true,
          width: '25%',
          value: this.journal ? this.journal.data.frequency : ''
        },
        {
          name: 'subjects',
          label: 'Materias',
          type: FormFieldType.vocabulary,
          required: true,
          width: '50%',
          extraContent: {
            multiple: true,
            selectedTermsIds: this.journal ? this.journal.terms : null,
            vocab: this.vocabularies.filter(vocab => vocab.id === VocabulariesInmutableNames.SUBJECTS)[0]
          },
          value: this.journal ? this.journal.terms : ''
        },
        {
          name: 'licence',
          label: 'Licencia',
          type: FormFieldType.vocabulary,
          required: true,
          width: '50%',
          extraContent: {
            multiple: true,
            selectedTermsIds: this.journal ? this.journal.terms : null,
            vocab: this.vocabularies.filter(vocab => vocab.id === VocabulariesInmutableNames.LICENCES)[0]
          },
          value: this.journal ? this.journal.terms : ''
        }
      ]
    },
    {
      title: 'Redes Sociales',
      description: '',
      iconName: '',
      content: [
        {
          name: 'facebook',
          label: 'Facebook',
          type: FormFieldType.url,
          required: true,
          value: this.journal ? this.journal.data.socialNetworks.facebook : ''
        },
        {
          name: 'twiter',
          label: 'Twiter',
          type: FormFieldType.url,
          required: true,
          value: this.journal ? this.journal.data.socialNetworks.twitter : ''
        },
        {
          name: 'linkedin',
          label: 'LinkedIN',
          type: FormFieldType.url,
          required: true,
          value: this.journal ? this.journal.data.socialNetworks.linkedin : ''
        },
      ]
    }];
  }
}
