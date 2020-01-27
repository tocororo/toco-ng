
import { Component } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { of } from 'rxjs';
import { catchError, finalize } from 'rxjs/operators';
import { MatDialog, MatSnackBar } from '@angular/material';

import { CatalogService, TaxonomyService, VocabulariesInmutableNames, SourceService } from '@toco/tools/backend';
import { MessageHandler, StatusCode, HandlerComponent } from '@toco/tools/core';
import { Vocabulary, Journal } from '@toco/tools/entities';
import { FilterHttpMap } from '@toco/tools/filters';
import { PanelContent, FormFieldType, HintValue, HintPosition, FormContainerAction, IssnValue } from '@toco/tools/forms';
import {FormBuilder, FormGroup, Validators, FormControl} from '@angular/forms';


class SearchJournalByIdentifiersAction implements FormContainerAction {
  constructor(private service: CatalogService, private journalFound: Function) { }

  doit(data: any): void {
    const rnps = data.rnps;
    const httpParams = Array<FilterHttpMap>();
    
    console.log(data)
    

    httpParams.push(new FilterHttpMap('issn', data.idenfifier));
    httpParams.push(new FilterHttpMap('rnps', data.idenfifier));
    httpParams.push(new FilterHttpMap('url', data.idenfifier));
    httpParams.push(new FilterHttpMap('title', data.idenfifier));

    
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


  findPanel: PanelContent[] = [];
  findFormGroup: FormGroup;

  informationPanel: PanelContent[] = [];
  informationFormGroup: FormGroup;

  institutionPanel: PanelContent[] = [];
  institutionFormGroup: FormGroup;

  indexPanel: PanelContent[] = [];
  indexFormGroup: FormGroup;

  public searchJournalAction: SearchJournalByIdentifiersAction;


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
    this.findFormGroup = this._formBuilder.group({});
    this.findPanel = [
      {
        title: 'Inclusión de Revista',
        description: 'Introduzca un identificador de la revista ',
        iconName: '',
        formGroup: this.findFormGroup,
        content: [
          {
            name: 'idenfifier',
            label: 'Identificador',
            type: FormFieldType.text,
            required: true,
            startHint: new HintValue(HintPosition.start, '(ISSN, RNPS, URL, Título)'),
            width: '100%'
          }
        ]
      }
    ];

    this.searchJournalAction = new SearchJournalByIdentifiersAction(
      this.catalogService,
      (journalResponse) => {

        let title = 'Revista NO encontrada';
        let content = 'Complete la información de la revista...';

        if (journalResponse) {
          this.journal = new Journal();
          this.journal.load_from_data(journalResponse);
          title = 'Revista encontrada';
          content = 'Compruebe los datos de la revista...';
          console.log(journalResponse)
          console.log(this.journal)
        }
        this.initJournalPanels();

        const m = new MessageHandler(null, this.dialog);
        m.showMessage(StatusCode.OK, content, HandlerComponent.dialog, title);
      });
  }

  resetStepper() {
    this.informationPanel = [];
    this.informationFormGroup = undefined;
  
    this.institutionPanel = [];
    this.institutionFormGroup = undefined;
  
    this.indexPanel = [];
    this.indexFormGroup = undefined;
    this.journal = null;
  }
  nextStep(){
    console.log(this.informationFormGroup)
  }
  initJournalPanels(): void {

    const descriptionControl = new FormControl('', Validators.required)
    descriptionControl.setValue(this.journal ? this.journal.data.description : '');

    this.informationFormGroup = this._formBuilder.group({
      'description': descriptionControl,
      'start_year': new FormControl(''),
      'end_year': new FormControl(''),
    });

    this.informationPanel = [
      {
        title: 'Identificadores',
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
            name: 'issn_p',
            label: 'ISSN Impreso',
            type: FormFieldType.issn,
            required: false,
            startHint: new HintValue(HintPosition.start, 'XXXX-XXXX'),
            width: '30%',
            value: this.journal ? IssnValue.createIssnValueFromString(this.journal.data.issn.p) : null
          },
          {
            name: 'issn_e',
            label: 'ISSN Electrónico',
            type: FormFieldType.issn,
            required: false,
            startHint: new HintValue(HintPosition.start, 'XXXX-XXXX'),
            width: '30%',
            value: this.journal ? IssnValue.createIssnValueFromString(this.journal.data.issn.e) : null
          },
          {
            name: 'issn_l',
            label: 'ISSN de Enlace',
            type: FormFieldType.issn,
            required: false,
            startHint: new HintValue(HintPosition.start, 'XXXX-XXXX'),
            width: '30%',
            value: this.journal ? IssnValue.createIssnValueFromString(this.journal.data.issn.l) : null
          },
          {
            name: 'rnps',
            label: 'RNPS',
            type: FormFieldType.rnps,
            required: true,
            startHint: new HintValue(HintPosition.start, 'Escriba un RNPS válido.'),
            width: '45%',
            value: this.journal ? this.journal.data.rnps : ''
          },
          {
            name: 'url',
            label: 'URL',
            type: FormFieldType.url,
            required: true,
            startHint: new HintValue(HintPosition.start, 'Escriba una URL válida.'),
            width: '45%',
            value: this.journal ? this.journal.data.url : ''
          },
        ]
      },
      {
        title: 'Informacion de la Revista',
        description: '',
        iconName: '',
        formGroup: this.informationFormGroup,
        content: [
          
          {
            name: 'subtitle',
            label: 'Subtítulo',
            type: FormFieldType.text,
            required: false,
            width: '45%',
            value: this.journal ? this.journal.data.subtitle : ''
          },
          {
            name: 'abbreviation',
            label: 'Título abreviado',
            type: FormFieldType.text,
            required: false,
            width: '45%',
            value: this.journal ? this.journal.data.shortname : ''
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
            name: 'start_year',
            label: 'Año de inicio',
            type: FormFieldType.datepicker,
            required: false,
            width: '30%',
            value: this.journal ? this.journal.data.start_year : ''
          },
          {
            name: 'end_year',
            label: 'Año de inicio',
            type: FormFieldType.datepicker,
            required: false,
            width: '30%',
            value: this.journal ? this.journal.data.end_year : ''
          },
          {
            name: 'frequency',
            label: 'Frecuencia',
            type: FormFieldType.text,
            required: false,
            width: '30%',
            value: this.journal ? this.journal.data.frequency : ''
          },
          {
            name: 'subjects',
            label: 'Materias',
            type: FormFieldType.vocabulary,
            required: true,
            width: '45%',
            extraContent: {
              multiple: true,
              selectedTermsIds: this.journal ? this.journal.terms.map(term => {return term.term_id}) : null,
              vocab: VocabulariesInmutableNames.SUBJECTS
            },
          },
          {
            name: 'licence',
            label: 'Licencia',
            type: FormFieldType.vocabulary,
            required: false,
            width: '45%',
            extraContent: {
              multiple: true,
              selectedTermsIds: this.journal ? this.journal.terms.map(term => {return term.term_id}) : null,
              vocab: VocabulariesInmutableNames.LICENCES
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
            required: false,
            value: this.journal ? this.journal.data.socialNetworks.facebook : ''
          },
          {
            name: 'twiter',
            label: 'Twiter',
            type: FormFieldType.url,
            required: false,
            value: this.journal ? this.journal.data.socialNetworks.twitter : ''
          },
          {
            name: 'linkedin',
            label: 'LinkedIN',
            type: FormFieldType.url,
            required: false,
            value: this.journal ? this.journal.data.socialNetworks.linkedin : ''
          },
        ]
      }
    ];

    this.institutionFormGroup = this._formBuilder.group({});

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
              vocab: VocabulariesInmutableNames.INTITUTION
            },
          }
        ]
      }
    ];

    this.indexFormGroup = this._formBuilder.group({});

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
              multiple: false,
              selectedTermsIds: this.journal ? this.journal.terms.map(term => {return term.term_id}) : null,
              vocab: VocabulariesInmutableNames.DATABASES
            },
          }
        ]
      }
    ];


  }
}
