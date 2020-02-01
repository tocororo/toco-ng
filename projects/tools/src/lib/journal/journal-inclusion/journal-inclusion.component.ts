import { Component, OnInit } from '@angular/core';
import { FormContainerAction, PanelContent, FormFieldType, HintValue, HintPosition } from '@toco/tools/forms';
import { FormGroup, FormBuilder } from '@angular/forms';
import { CatalogService } from '@toco/tools/backend';
import { Journal } from '@toco/tools/entities';
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

  public searchJournalAction: FormContainerAction;
  findPanel: PanelContent[] = [];
  findFormGroup: FormGroup;

  constructor(
    private catalogService: CatalogService,
    private _formBuilder: FormBuilder,
    public dialog: MatDialog) { }

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

    this.searchJournalAction = {

      doit: (data: any) => {

        const httpParams = [
          new FilterHttpMap('issn', data.idenfifier),
          new FilterHttpMap('rnps', data.idenfifier),
          new FilterHttpMap('url', data.idenfifier),
          new FilterHttpMap('title', data.idenfifier)
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
            }
            const m = new MessageHandler(null, this.dialog);
            m.showMessage(StatusCode.OK, content, HandlerComponent.dialog, title);
          });
      }
    };
  }

  resetEdit() {
    this.journal = null;
  }

}
