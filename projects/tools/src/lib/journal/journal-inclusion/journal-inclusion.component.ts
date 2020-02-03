import { Component, OnInit } from '@angular/core';
import { FormContainerAction, PanelContent, FormFieldType, HintValue, HintPosition, SelectOption } from '@toco/tools/forms';
import { FormGroup, FormBuilder } from '@angular/forms';
import { CatalogService, SourceService } from '@toco/tools/backend';
import { Journal, SourcePersonRole } from '@toco/tools/entities';
import { FilterHttpMap } from '@toco/tools/filters';
import { StatusCode, HandlerComponent, MessageHandler } from '@toco/tools/core';
import { MatDialog } from '@angular/material';

@Component({
  selector: 'toco-journal-inclusion',
  templateUrl: './journal-inclusion.component.html',
  styleUrls: ['./journal-inclusion.component.scss']
})
export class JournalInclusionComponent implements OnInit {

  public journal: Journal = null;

  public loading = false;
  public isStartProcess = true;

  public isEditig = false;
  public isViewing = false;

  public searchJournalAction: FormContainerAction;
  findPanel: PanelContent[] = [];
  findFormGroup: FormGroup;

  personPanel: PanelContent[] = [];
  personFormGroup: FormGroup;

  agreementPanel: PanelContent[] = [];
  agreementFormGroup: FormGroup;

  constructor(
    private catalogService: CatalogService,
    private sourceService: SourceService,
    private _formBuilder: FormBuilder,
    public dialog: MatDialog) { }

  ngOnInit() {

    this.findFormGroup = this._formBuilder.group({});
    this.findPanel = [
      {
        title: 'Introduzca el ISSN de la revista que desea incluir.',
        description: '',
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

    this.personFormGroup = this._formBuilder.group({});
    this.personPanel = [
      {
        title: 'Seleccione su rol en la revista',
        description: '',
        iconName: '',
        formGroup: this.personFormGroup,
        content: [
          {
            name: 'role',
            label: 'Rol',
            type: FormFieldType.select,
            required: true,
            width: '45%',
            value: this.journal ? this.journal.source_type : '',
            extraContent: {
              getOptions: () => {
                const opts: SelectOption[] = [
                  {
                    value: SourcePersonRole.EDITOR.value,
                    label: SourcePersonRole.EDITOR.label,
                  },
                  {
                    value: SourcePersonRole.MANAGER.value,
                    label: SourcePersonRole.MANAGER.label,
                  },
                  {
                    value: SourcePersonRole.DIRECTOR.value,
                    label: SourcePersonRole.DIRECTOR.label,
                  },
                ];
                return opts;
              }
            }
          }]
      }
    ];

    this.agreementFormGroup = this._formBuilder.group({});
    this.agreementPanel = [
      {
        title: 'Acuerdo Legal',
        description: '',
        iconName: '',
        formGroup: this.agreementFormGroup,
        content: [
          {
            name: 'agree',
            label: 'Acepto',
            type: FormFieldType.checkbox,
            required: true,
            width: '50%',
            value: false,
          },
          {
            name: 'comment',
            label: 'Puede escribir aquí un comentario para los gestores del sistema.',
            type: FormFieldType.textarea,
            required: true,
            width: '100%',
            value: '',
          }
        ]
      }
    ];

    this.searchJournalAction = {

      doit: (data: any) => {
        this.loading = true;
        const httpParams = [
          new FilterHttpMap('issn', data.idenfifier)
          // new FilterHttpMap('rnps', data.idenfifier),
          // new FilterHttpMap('url', data.idenfifier),
          // new FilterHttpMap('title', data.idenfifier)
        ];

        this.catalogService.getJournalsPage(10, 0, httpParams)
          .subscribe(response => {

            let title = 'No hemos encontrado información';
            let content = 'Debe completar todos los datos solicitados para incluir la revista.';
            this.journal = new Journal();
            if (response.data && response.data.sources.count === 1) {
              console.log(response.data);
              this.journal.load_from_data(response.data.sources.data[0]);
              title = 'Tenemos información sobre la revista';
              content = 'Compruebe y complete todos los datos solicitados para incluir la revista.';
            } else {
              this.sourceService.getIssnInfo(data.idenfifier)
                .subscribe(response => {
                  if (response.data && response.data.issn_org) {
                    this.journal.data.issn.issn_org.load_from_data(response.data.issn_org);
                  }
                });
              this.journal.isNew = true;
            }
            this.isStartProcess = false;
            this.isEditig = true;
            this.loading = false;
            const m = new MessageHandler(null, this.dialog);
            m.showMessage(StatusCode.OK, content, HandlerComponent.dialog, title);
          });
      }
    };
  }

  journalEditDone() {
    this.isEditig = false;
    this.isViewing = true;
    console.log(this.journal)
  }
  resetEdit() {
    this.journal = null;
    this.isEditig = false;
    this.isViewing = false;
    this.isStartProcess = true;
  }
  editAgain() {
    this.isEditig = true;
    this.isViewing = false;
  }

  finishInclusion() {
    console.log(' KONIEC');
  }

}
