
import { Component } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { of } from 'rxjs';
import { catchError, finalize } from 'rxjs/operators';
import { MatDialog, MatSnackBar } from '@angular/material';

import { CatalogService, TaxonomyService, VocabulariesInmutableNames, SourceService } from '@toco/tools/backend';
import { MessageHandler, StatusCode, HandlerComponent } from '@toco/tools/core';
import { Vocabulary, Journal } from '@toco/tools/entities';
import { FilterHttpMap } from '@toco/tools/filters';
import { PanelContent, FormFieldType, HintValue, HintPosition, FormContainerAction } from '@toco/tools/forms';
import {FormBuilder, FormGroup, Validators, FormControl} from '@angular/forms';


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


  testPanel: PanelContent[] = [];
  testFormGroup: FormGroup;


  identifiersPanel: PanelContent[] = [];
  identifiersFormGroup: FormGroup;

  informationPanel: PanelContent[] = [];
  informationFormGroup: FormGroup;

  institutionPanel: PanelContent[] = [];
  institutionFormGroup: FormGroup;

  indexPanel: PanelContent[] = [];
  indexFormGroup: FormGroup;

  public searchJournalAction: SearchJournalByIdentifiersAction;

  public vocabularies: Vocabulary[] = [];

  licences: Vocabulary;
  subjects: Vocabulary;

  public constructor(
    private sourceService: SourceService,
    private catalogService: CatalogService,
    private taxonomyService: TaxonomyService,
    public _snackBar: MatSnackBar,
    public dialog: MatDialog,
    private _formBuilder: FormBuilder) { }

  ngOnInit() {
    this.testFormGroup = this._formBuilder.group({
      'datepicker': new FormControl('', Validators.required),
      'checkbox': new FormControl('', Validators.required),
      'textarea': new FormControl('', Validators.required)
    });
    this.testPanel = [
      {
        title: 'Inclusión de Revista',
        description: 'Introduzca alguno de los siguientes identificadores de la revista que desea incluir',
        iconName: '',
        formGroup: this.testFormGroup,
        content: [
          {
            name: 'textarea',
            label: 'textarea',
            type: FormFieldType.textarea,
            required: false,
            startHint: new HintValue(HintPosition.start, 'Escriba un texto.'),
            width: '25%'
          },
          {
            name: 'text',
            label: 'text',
            type: FormFieldType.text,
            required: false,
            startHint: new HintValue(HintPosition.start, 'Escriba un texto.'),
            width: '25%'
          },
          {
            name: 'rnps',
            label: 'rnps',
            type: FormFieldType.rnps,
            required: false,
            startHint: new HintValue(HintPosition.start, 'Escriba un texto.'),
            width: '25%'
          },
          {
            name: 'url',
            label: 'url',
            type: FormFieldType.url,
            required: false,
            startHint: new HintValue(HintPosition.start, 'Escriba un texto.'),
            width: '25%'
          },
          {
            name: 'email',
            label: 'email',
            type: FormFieldType.email,
            required: false,
            startHint: new HintValue(HintPosition.start, 'Escriba un texto.'),
            width: '25%'
          },
          {
            name: 'issn',
            label: 'issn',
            type: FormFieldType.issn,
            required: false,
            startHint: new HintValue(HintPosition.start, 'Escriba un texto.'),
            width: '25%'
          },
          {
            name: 'datepicker',
            label: 'datepicker',
            type: FormFieldType.datepicker,
            required: false,
            startHint: new HintValue(HintPosition.start, 'Escriba un texto.'),
            width: '25%'
          },
          {
            name: 'checkbox',
            label: 'checkbox',
            type: FormFieldType.checkbox,
            required: false,
            startHint: new HintValue(HintPosition.start, 'Escriba un texto.'),
            width: '25%'
          },
        ]
      }
    ];
    

    this.initFormGroups();

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

            this.initExtraPanels();

            const m = new MessageHandler(null, this.dialog);
            m.showMessage(StatusCode.OK, content, HandlerComponent.dialog, title);
          });

      });

    console.log(this.testFormGroup)
  }

  initFormGroups(){
    this.identifiersFormGroup = this._formBuilder.group({
      issn_p: new FormControl(),
      issn_e: new FormControl(),
      issn_l: new FormControl(),
    });

    this.informationFormGroup = this._formBuilder.group({
      title: new FormControl('', Validators.required),
      url: new FormControl('', Validators.required),
      email: new FormControl('', Validators.required),
      source_type: new FormControl('', Validators.required),
    });
    
    this.indexFormGroup = this._formBuilder.group({
      indexes: new FormControl(),
    });

    this.institutionFormGroup = this._formBuilder.group({
      institution: ['', Validators.required],
    });

  }


  initIdentifiersPanel(): void {
    this.identifiersPanel = [{
      title: 'Inclusión de Revista',
      description: 'Introduzca alguno de los siguientes identificadores de la revista que desea incluir',
      iconName: '',
      formGroup: this.identifiersFormGroup,
      content: [
        {
          name: 'issn_p',
          label: 'ISSN Impreso',
          type: FormFieldType.issn,
          required: false,
          startHint: new HintValue(HintPosition.start, 'Escriba un ISSN Impreso válido.'),
          width: '25%',
        },
        {
          name: 'issn_e',
          label: 'ISSN Electrónico',
          type: FormFieldType.issn,
          required: false,
          startHint: new HintValue(HintPosition.start, 'Escriba un ISSN Electrónico válido.'),
          width: '25%'
        },
        {
          name: 'issn_l',
          label: 'ISSN de Enlace',
          type: FormFieldType.issn,
          required: false,
          startHint: new HintValue(HintPosition.start, 'Escriba un ISSN de Enlace válido.'),
          width: '25%'
        },
        {
          name: 'rnps',
          label: 'RNPS',
          type: FormFieldType.rnps,
          required: false,
          startHint: new HintValue(HintPosition.start, 'Escriba un RNPS válido.'),
          width: '25%'
        }
      ]
    }];
    
  }

  initExtraPanels(): void {
    this.informationPanel = [
      {
        title: 'Informacion de la Revista',
        description: '',
        iconName: '',
        formGroup: this.informationFormGroup,
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
            width: '45%',
            value: this.journal ? this.journal.data.shortname : ''
          },
          {
            name: 'url',
            label: 'URL',
            type: FormFieldType.url,
            required: true,
            startHint: new HintValue(HintPosition.start, 'Escriba una URL válida.'),
            width: '50%',
            value: this.journal ? this.journal.data.url : ''
          },
          {
            name: 'email',
            label: 'Correo Electrónico',
            type: FormFieldType.email,
            required: true,
            startHint: new HintValue(HintPosition.start, 'Escriba un email válido.'),
            width: '40%',
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
            width: '45%',
            value: this.journal ? this.journal.source_type : ''
          },
          {
            name: 'source_type',
            label: 'Sistema',
            type: FormFieldType.text,
            required: true,
            width: '45%',
            value: this.journal ? this.journal.source_type : ''
          },
          {
            name: 'start_year',
            label: 'Año de inicio',
            type: FormFieldType.datepicker,
            required: true,
            width: '30%',
            value: this.journal ? this.journal.data.start_year : ''
          },
          {
            name: 'end_year',
            label: 'Año de inicio',
            type: FormFieldType.datepicker,
            required: true,
            width: '30%',
            value: this.journal ? this.journal.data.end_year : ''
          },
          {
            name: 'frequency',
            label: 'Frecuencia',
            type: FormFieldType.text,
            required: true,
            width: '30%',
            value: this.journal ? this.journal.data.frequency : ''
          },
          {
            name: 'subjects',
            label: 'Materias',
            type: FormFieldType.vocabulary,
            required: true,
            width: '30%',
            extraContent: {
              multiple: true,
              selectedTermsIds: this.journal ? this.journal.terms.map(term => {return term.term_id}) : null,
              vocab: this.vocabularies.filter(vocab => vocab.id === VocabulariesInmutableNames.SUBJECTS)[0]
            },
          },
          {
            name: 'subjects',
            label: 'Materias (Vocabulario UNESCO)',
            type: FormFieldType.vocabulary,
            required: true,
            width: '30%',
            extraContent: {
              multiple: false,
              selectedTermsIds: this.journal ? this.journal.terms.map(term => {return term.term_id}) : null,
              vocab: this.vocabularies.filter(vocab => vocab.id === VocabulariesInmutableNames.SUBJECTS_UNESCO)[0]
            },
          },
          {
            name: 'licence',
            label: 'Licencia',
            type: FormFieldType.vocabulary,
            required: false,
            width: '30%',
            extraContent: {
              multiple: true,
              selectedTermsIds: this.journal ? this.journal.terms.map(term => {return term.term_id}) : null,
              vocab: this.vocabularies.filter(vocab => vocab.id === VocabulariesInmutableNames.LICENCES)[0]
            },
          },
        ]
      },
      {
        title: 'Redes Sociales',
        description: '',
        iconName: '',
        formGroup: this.informationFormGroup,
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
      }
    ];



    this.institutionPanel = [
      {
        title: 'Institución',
        description: 'Seleccione la Institución que gestiona la revista. Si no la encuentra, adicione su institución.',
        iconName: '',
        formGroup: this.institutionFormGroup,
        content: [
          {
            name: 'institution',
            label: 'Institución',
            type: FormFieldType.vocabulary,
            required: true,
            width: '70%',
            extraContent: {
              multiple: false,
              selectedTermsIds: this.journal ? this.journal.terms.map(term => {return term.term_id}) : null,
              vocab: this.vocabularies.filter(vocab => vocab.id === VocabulariesInmutableNames.INTITUTION)[0]
            },
          }
        ]
      }
    ];


    this.indexPanel = [
      {
        title: 'Indizaciones',
        description: 'Seleccione la indizaciones y bases de datos en las que se encuentra la revista.',
        iconName: '',
        formGroup: this.indexFormGroup,
        content: [
          {
            name: 'indexes',
            label: 'Índices',
            type: FormFieldType.vocabulary,
            required: false,
            width: '70%',
            extraContent: {
              multiple: true,
              selectedTermsIds: this.journal ? this.journal.terms.map(term => {return term.term_id}) : null,
              vocab: this.vocabularies.filter(vocab => vocab.id === VocabulariesInmutableNames.DATABASES)[0]
            },
          }
        ]
      }
    ];


  }
}
