import { Component, OnInit, Inject, Input } from '@angular/core';
import { PanelContent_Depr, FormContainerAction, FormFieldType, HintValue, HintPosition } from '@toco/tools/forms';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material';
import { VocabulariesInmutableNames, SourceClasification, Term, SourceData } from '@toco/tools/entities';

@Component({
  selector: 'toco-source-indexes',
  templateUrl: './source-indexes.component.html',
  styleUrls: ['./source-indexes.component.scss']
})
export class SourceIndexesComponent implements OnInit {

  @Input()
  public sourceData: SourceData;

  indexesPanel: PanelContent_Depr[] = null;
  indexesFormGroup: FormGroup;
  indexAction: FormContainerAction;

  constructor(private formBuilder: FormBuilder,
    public dialog: MatDialog) { }

  ngOnInit() {
    this.indexesFormGroup = this.formBuilder.group({});
    const panel = [];
    this.indexesPanel = [];

    console.log(this.sourceData.classifications);
    this.sourceData.classifications.forEach(element => {
      if (element.vocabulary == VocabulariesInmutableNames.INDEXES) {
        panel.push(this.getIndexPanel(element));
      }
    });
    this.indexesPanel = panel;
    // this.indexAction = {
    //   doit: (data: any) => {
    //     const termsIdsToExclude = [];
    //     this.indexesPanel.forEach(panel => {
    //       termsIdsToExclude.push(panel.value.id);
    //     });

    //     this.dialog.open(JournalEditAddIndexComponent, {
    //       data: {
    //         termsIdsToExclude: termsIdsToExclude,
    //         addIndexPanel: (termSource: SourceClasification) => {
    //           this.dialog.closeAll();
    //           termSource.source_id = this.journalVersion.source_id;
    //           const panels = this.indexesPanel.slice(0);
    //           panels.push(this.getPanelIndex(termSource));
    //           this.indexesPanel = panels;
    //           console.log(this.indexesFormGroup);
    //         }
    //       }
    //     });
    //   }
    // };
  }

  public addIndexAction() {
    const termsIdsToExclude = [];
    this.indexesPanel.forEach(panel => {
      termsIdsToExclude.push(panel.value.id);
    });

    this.dialog.open(SourceEditAddIndexComponent, {
      data: {
        termsIdsToExclude,
        addIndexPanel: (termSource: SourceClasification) => {
          this.dialog.closeAll();
          const panels = this.indexesPanel.slice(0);
          panels.push(this.getIndexPanel(termSource));
          this.indexesPanel = panels;
          console.log('-------------');
          console.log(panels);
          console.log(this.indexesFormGroup);
        }
      }
    });
  }

  private getIndexPanel(termSource: SourceClasification) {
    const panel: PanelContent_Depr = {
      title: termSource.description,
      description: '',
      iconName: '',
      formSection: this.indexesFormGroup,
      actionLabel: 'Eliminar',
      action: {
        doit: index => {
          const panels = [];
          for (let i = 0; i < this.indexesPanel.length; i++) {
            if (i === index) {
              this.indexesPanel[i].formSectionContent.forEach(element => {
                this.indexesFormGroup.removeControl(element.name);
              });
            } else {
              panels.push(this.indexesPanel[i]);
            }
          }
          this.indexesPanel = panels;
        }
      },
      value: termSource,
      formSectionContent: [
        {
          name: 'url_' + termSource.id,
          label: 'URL de la revista en el índice',
          type: FormFieldType.url,
          required: false,
          startHint: new HintValue(HintPosition.start, ''),
          width: '100%',
          value: termSource.data ? termSource.data['url'] : ''
        },
        {
          name: 'initial_cover_' + termSource.id,
          label: 'Cobertura inicio',
          type: FormFieldType.text,
          required: false,
          startHint: new HintValue(HintPosition.start, ''),
          width: '45%',
          value: termSource.data ? termSource.data['initial_cover'] : ''
        },
        {
          name: 'end_cover_' + termSource.id,
          label: 'Cobertura hasta',
          type: FormFieldType.text,
          required: false,
          startHint: new HintValue(HintPosition.start, ''),
          width: '45%',
          value: termSource.data ? termSource.data['end_cover'] : ''
        }
      ]
    };
    return panel;
  }
}


@Component({
  selector: "toco-source-addindex",
  styleUrls: ['./source-indexes.component.scss'],
  template: `
    <toco-form-container
      #indexPanelContainer
      [panelsContent]="indexPanel"
      [useAccordion]="false"
      fxLayout="row"
      [formGroup]="indexFormGroup"
      [action]="addIndexAction"
      [actionLabel]="'Adicionar'"
      [deleteValuesAfterAction]="false"
    ></toco-form-container>
  `
})
export class SourceEditAddIndexComponent implements OnInit {
  indexPanel: PanelContent_Depr[] = null;
  indexFormGroup: FormGroup;
  termsIdsToExclude: [];
  addIndexPanel;
  addIndexAction: FormContainerAction;

  constructor(
    private _formBuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.termsIdsToExclude = data.termsIdsToExclude;
    this.addIndexPanel = data.addIndexPanel;
  }

  ngOnInit() {
    this.indexFormGroup = this._formBuilder.group({});
    this.indexPanel = [
      {
        title: 'Adicionar un Índice',
        description: '',
        iconName: '',
        formSection: this.indexFormGroup,
        formSectionContent: [
          {
            name: 'indexes',
            label: 'Indices',
            type: FormFieldType.vocabulary,
            required: true,
            width: '100%',
            extraContent: {
              multiple: false,
              selectedTermsIds: null,
              excludeTermsIds: this.termsIdsToExclude,
              vocab: VocabulariesInmutableNames.INDEXES
            }
          },
          {
            name: 'url',
            label: 'URL',
            type: FormFieldType.url,
            required: false,
            startHint: new HintValue(
              HintPosition.start,
              'URL de la revista en el índice.'
            ),
            width: '100%',
            value: ''
          },
          {
            name: 'initial_cover',
            label: 'Cobertura inicio',
            type: FormFieldType.text,
            required: false,
            startHint: new HintValue(HintPosition.start, ''),
            width: '45%',
            value: ''
          },
          {
            name: 'end_cover',
            label: 'Cobertura',
            type: FormFieldType.text,
            required: false,
            startHint: new HintValue(HintPosition.start, ''),
            width: '45%',
            value: ''
          }
        ]
      }
    ];

    this.addIndexAction = {
      doit: (data: any) => {
        const result = new SourceClasification();
        if (this.indexFormGroup.controls['indexes'].value) {
          const term: Term = this.indexFormGroup.controls['indexes'].value[0];
          result.vocabulary = term.vocabulary_id;
          result.description = term.description;
          result.id = term.uuid;
          result.data = {
            url: this.indexFormGroup.controls['url'].value,
            initial_cover: this.indexFormGroup.controls['initial_cover'].value,
            end_cover: this.indexFormGroup.controls['end_cover'].value
          };
        }
        this.addIndexPanel(result);
      }
    };
  }
}
