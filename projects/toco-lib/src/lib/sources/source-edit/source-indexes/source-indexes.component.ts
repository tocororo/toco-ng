import { Component, OnInit, Input, Inject } from '@angular/core';
import { UntypedFormGroup, UntypedFormBuilder } from '@angular/forms';
import { MatLegacyDialog as MatDialog, MAT_LEGACY_DIALOG_DATA as MAT_DIALOG_DATA } from '@angular/material/legacy-dialog';
import { TaxonomyService } from '../../../backend/public-api';
import { SourceData, TermNode, Term, SourceClasification, VocabulariesInmutableNames } from '../../../entities/public-api';
import { PanelContent_Depr, FormContainerAction, InputTextComponent, FormFieldType, SelectComponent, SelectOption, InputUrlComponent, HintValue, HintPosition } from '../../../forms/public-api';


@Component({
  selector: "toco-source-indexes",
  templateUrl: './source-indexes.component.html',
  styleUrls: ['./source-indexes.component.scss'],
})
export class SourceIndexesComponent implements OnInit {

  @Input()
  public sourceData: SourceData;
  @Input()
  public editable: boolean = true;

  /*
    el arbol entero de los indexes
    el primer nivel se considera que es una clasificacion del index, por ejemplo
        {
          "children": {...}
          "term": {
            "clasified_ids": [],
            "class_ids": [],
            "data": null,
            "description": "WoS / Scopus",
            "id": 4355,
            "name": "http://miar.ub.edu/databases/GRUPO/G",
            "parent_id": null,
            "uuid": "a4aae8a2-b65d-4313-b666-5ef4170fc549",
            "vocabulary_id": "INDEXES"
          }
        }
    en el segundo nivel (children) estan los indices(bases de datos) que realmente clasifican a las fuentes
  */
  databases: TermNode[] = null;

  /*
    cada elemento de este array tiene:
    dbclass, que es un termino del primer nivel de databases,
    dblist, son las clasificaciones de las fuentes con los correspondientes datos,
      los terminos correspondientes de los elementos de dblist son hijos de dbclass en databses
  */
  selectedDatabases: Array<{ dbclass: Term, dblist: SourceClasification[] }> = null;

  constructor(public dialog: MatDialog, private service: TaxonomyService) { }


  ngOnInit() {
    this.service.getTermsTreeByVocab(VocabulariesInmutableNames.INDEXES, 1).subscribe(
      (response) => {
        if (response.data.tree.term_node) {
          this.databases = response.data.tree.term_node;
          this.initIndexes();
        }
      },
      (err: any) => {
        console.log(
          'ERROR: ' + err + '.'
        );
      },

      () => {
      }
    );
  }

  public initIndexes(){

    this.selectedDatabases = new Array(this.databases.length);
    this._setSelectedDatabses();
    this._setIndexesToSource();
    console.log('******* complete process');
  }

  /**
   * divide los source.classifications que son de INDEXES
   * en el arreglo selectedDatabases, cuyos elementos tienen
   * dbclass, que es el primer nivel
   * dblist, que son los SourceClassification seleccionados e hijos de dbclass
   */
  private _setSelectedDatabses() {
    for (let i = 0; i < this.databases.length; i++) {
      this.selectedDatabases[i] = {
        dbclass: this.databases[i].term,
        dblist: this.sourceData.classifications.filter(
          value =>
            value.vocabulary == VocabulariesInmutableNames.INDEXES &&
            this.databases[i].children.find(db => db.term.uuid == value.id) != undefined
        )
      };
    }
    for (let i = 0; i < this.databases.length; i++) {
      for (let k = 0; k < this.selectedDatabases[i].dblist.length; k++) {
        const element = this.selectedDatabases[i].dblist[k];
        if (!this.selectedDatabases[i].dblist[k].data){
          this.selectedDatabases[i].dblist[k].data = {};
        }
        if (!this.selectedDatabases[i].dblist[k].data['url']){
          this.selectedDatabases[i].dblist[k].data['url']='';
        }
        if (!this.selectedDatabases[i].dblist[k].data['initial_cover']){
          this.selectedDatabases[i].dblist[k].data['initial_cover']='';
        }
        if (!this.selectedDatabases[i].dblist[k].data['end_cover']){
          this.selectedDatabases[i].dblist[k].data['end_cover']='';
        }

      }

    }
  }

  /**
   * mantiene la lista sourceData.classification bien formada en relacion con lo que hay en selectedDatabases
   */
  private _setIndexesToSource() {
    // filtra las clasificaciones que no sean indexes
    this.sourceData.classifications = this.sourceData.classifications.filter(
      value => value.vocabulary != VocabulariesInmutableNames.INDEXES
    );


    this.selectedDatabases.forEach(element => {
      // por cada elemento en selectedDatabases, si tiene algun elemento en dblist
      // entonces dbclass y dblist tambien son parte de sourceData.classifications
      if (element.dblist.length > 0) {
        const parent = new SourceClasification();
        parent.id = element.dbclass.uuid;
        parent.description = element.dbclass.description;
        parent.vocabulary = element.dbclass.vocabulary_id;
        this.sourceData.classifications.push(parent);
        this.sourceData.classifications = this.sourceData.classifications.concat(element.dblist);

      }
    });
    console.log(this.sourceData);

  }

  public addIndexAction(dbclassIndex: number) {
    const dbclass = this.selectedDatabases[dbclassIndex].dbclass;
    const options: TermNode[] = this.databases[dbclassIndex].children.filter(
      value =>
        this.selectedDatabases[dbclassIndex].dblist.find(db => db.id == value.term.uuid) == undefined
    );
    if (options.length > 0) {
      this.dialog.open(SourceEditAddIndexComponent, {
        data: {
          dbclass: this.selectedDatabases[dbclassIndex].dbclass,
          options: options,
          editing: null,
          addIndex: (result: SourceClasification) => {
            this.dialog.closeAll();
            this.selectedDatabases[dbclassIndex].dblist = this.selectedDatabases[dbclassIndex].dblist.filter(
              value => value.id != result.id);
            this.selectedDatabases[dbclassIndex].dblist.push(result);
            this._setIndexesToSource();
          },
        },
      });
    }

  }

  public editIndexAction(dbclassIndex: number, editing: SourceClasification) {
    const dbclass = this.selectedDatabases[dbclassIndex].dbclass;
    if (editing) {
      // this.selectedDatabases[dbclassIndex].dblist = this.selectedDatabases[dbclassIndex].dblist.filter(
      //   value => value.id != editing.id
      // );

      const options: TermNode[] = this.databases[dbclassIndex].children.filter(
        value =>
          this.selectedDatabases[dbclassIndex].dblist.find(db => db.id == value.term.uuid) == undefined ||
          value.term.uuid == editing.id
      );
      if (options.length > 0 || editing) {
        this.dialog.open(SourceEditAddIndexComponent, {
          data: {
            dbclass: this.selectedDatabases[dbclassIndex].dbclass,
            options: options,
            editing: editing,
            addIndex: (result: SourceClasification) => {
              this.dialog.closeAll();
              // console.log('----------------------------',this.selectedDatabases[dbclassIndex].dblist);

              const newSelected = [];
              this.selectedDatabases[dbclassIndex].dblist.forEach(element => {
                if (element.id != result.id && element.id != editing.id){
                  newSelected.push(element);
                }
              });
              this.selectedDatabases[dbclassIndex].dblist = newSelected;
              // this.selectedDatabases[dbclassIndex].dblist = this.selectedDatabases[dbclassIndex].dblist.filter(
              //   value => (value.id == result.id && value.id == editing.id));

              // console.log('++++++++++++++++++++++',this.selectedDatabases[dbclassIndex].dblist);

              this.selectedDatabases[dbclassIndex].dblist.push(result);
              // console.log('*********************',this.selectedDatabases[dbclassIndex].dblist);
              this._setIndexesToSource();
            },
          },
        });
      }
    }
  }
  deleteIndexAction(dbclassIndex: number, toDelete: SourceClasification) {
    // console.log('DELETE', toDelete);

    this.selectedDatabases[dbclassIndex].dblist = this.selectedDatabases[dbclassIndex].dblist.filter(value => value.id != toDelete.id);
    this._setIndexesToSource();
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
      [actionLabel]="'OK'"
      [deleteValuesAfterAction]="false"
    ></toco-form-container>
  `,
})
export class SourceEditAddIndexComponent implements OnInit {
  indexPanel: PanelContent_Depr[] = null;
  indexFormGroup: UntypedFormGroup;

  addIndexAction: FormContainerAction;

  dbclass: Term;
  options: TermNode[];
  editing: SourceClasification = null;
  addIndex;

  constructor(
    private service: TaxonomyService,
    private _formBuilder: UntypedFormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    // console.log(data);

    this.dbclass = data.dbclass;
    this.options = data.options;
    if (data.editing) {
      this.editing = data.editing;
    }
    this.addIndex = data.addIndex;


  }

  ngOnInit() {
    this.indexFormGroup = this._formBuilder.group({});
    if (this.dbclass) {
      this.indexPanel = [
        {
          title: (this.editing) ? 'Editar' : 'Adicionar',
          description: '',
          iconName: '',
          formSection: this.indexFormGroup,
          formSectionContent: [
            {
              formControl: InputTextComponent.getFormControlByDefault(),
              name: 'indexes',
              label: this.dbclass.description,
              type: FormFieldType.select_expr,
              controlType: SelectComponent,
              required: true,
              width: '100%',
              value: (this.editing) ? this.editing.id : null,
              extraContent: {
                multiple: false,
                getOptions: (response: any) => {
                  const opts: SelectOption[] = [];
                  this.options.forEach((node: TermNode) => {
                    opts.push({
                      value: node.term.uuid,
                      label: node.term.description,
                    });
                  });
                  return opts;
                },
                selectionChange: (value) => {
                  console.log(value);
                }
              }
            },
            {
              formControl: InputUrlComponent.getFormControlByDefault(),
              name: 'url',
              label: 'URL',
              type: FormFieldType.url,
              controlType: InputUrlComponent,
              required: false,
              startHint: new HintValue(
                HintPosition.start,
                'URL de la revista en el índice.'
              ),
              width: '100%',
              value: (this.editing) ? [this.editing.data['url']] : '',
            },
            {
              formControl: InputTextComponent.getFormControlByDefault(),
              name: 'initial_cover',
              label: 'Cobertura inicio',
              type: FormFieldType.text,
              controlType: InputTextComponent,
              required: false,
              startHint: new HintValue(HintPosition.start, ''),
              width: '45%',
              value: (this.editing) ? [this.editing.data['initial_cover']] : '',
            },
            {
              formControl: InputTextComponent.getFormControlByDefault(),
              name: 'end_cover',
              label: 'Cobertura',
              type: FormFieldType.text,
              controlType: InputTextComponent,
              required: false,
              startHint: new HintValue(HintPosition.start, ''),
              width: '45%',
              value: (this.editing) ? [this.editing.data['end_cover']] : '',
            },
          ],
        },
      ];
    }


    this.addIndexAction = {
      doit: (data: any) => {
        if (this.indexFormGroup.valid) {
          const result = new SourceClasification();
          // console.log(this.indexFormGroup);

          if (this.indexFormGroup.controls['indexes'].value) {
            const node = this.options.find(value => value.term.uuid == this.indexFormGroup.controls['indexes'].value);
            if (node) {
              result.vocabulary = node.term.vocabulary_id;
              result.description = node.term.description;
              result.id = node.term.uuid;
              result.data = {
                url: this.indexFormGroup.controls['url'].value,
                initial_cover: this.indexFormGroup.controls['initial_cover'].value,
                end_cover: this.indexFormGroup.controls['end_cover'].value,
              };
              this.addIndex(result);
            }
          }
        }

      },
    };
  }
}
