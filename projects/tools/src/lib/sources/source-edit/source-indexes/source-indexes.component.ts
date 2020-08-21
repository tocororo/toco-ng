import { Component, OnInit, Inject, Input } from "@angular/core";
import {
  PanelContent_Depr,
  FormContainerAction,
  FormFieldType,
  HintValue,
  HintPosition,
  SelectOption,
} from "@toco/tools/forms";
import { FormGroup, FormBuilder } from "@angular/forms";
import { MAT_DIALOG_DATA, MatDialog } from "@angular/material";
import {
  VocabulariesInmutableNames,
  SourceClasification,
  Term,
  SourceData,
  TermNode,
} from "@toco/tools/entities";
import { TaxonomyService } from '@toco/tools/backend';

@Component({
  selector: "toco-source-indexes",
  templateUrl: "./source-indexes.component.html",
  styleUrls: ["./source-indexes.component.scss"],
})
export class SourceIndexesComponent implements OnInit {
  @Input()
  public sourceData: SourceData;

  databases: TermNode[] = null;

  constructor(public dialog: MatDialog, private service: TaxonomyService ) {}

  indexexClasses: Array<{dbclass: Term, dblist: SourceClasification[]}>;

  ngOnInit() {

    this.service.getTermsTreeByVocab(VocabulariesInmutableNames.INDEXES, 1).subscribe(
      (response) => {
        this.indexexClasses = new Array();
        if (response.data.tree.term_node){
          this.databases = response.data.tree.term_node;
          
          response.data.tree.term_node.forEach(element => {
            this.indexexClasses.push({
              dbclass : element,
              dblist : null
            })
          });
          this._setIndexes();
        }
      },
      (err: any) => {
        console.log(
          "The observable got an error notification: " + err + "."
        );
      },

      () => {
      }
    );

    this.service.getTermsTreeByVocab(VocabulariesInmutableNames.INDEXES, 0).subscribe(
      
    );


  }
  private _setIndexes(){
    this.indexes = this.sourceData.classifications.filter(value=> value.vocabulary == VocabulariesInmutableNames.INDEXES);
  }
  editIndexAction(index){

  }

  public addIndexAction(indexClass, editing: SourceClasification = null) {
    const termsIdsToExclude: string[] = [];
    for (let index = 0; index < this.indexes.length; index++) {
      termsIdsToExclude.push(this.indexes[index].id);
    }
    if(editing) termsIdsToExclude.push(editing.id);

    this.dialog.open(SourceEditAddIndexComponent, {
      data: {
        termsIdsToExclude,
        editing: editing,
        classID: indexClass,
        addIndex: (indexDB: SourceClasification) => {
          this.dialog.closeAll();
          const clasifications = this.sourceData.classifications.filter(value=> value.id != indexDB.id);
          clasifications.push(indexDB);
          this.sourceData.classifications = clasifications;
          this._setIndexes();

          console.log(this.sourceData);
        },
      },
    });
  }
  deleteIndexAction(toDelete: SourceClasification){
    const clasifications = this.sourceData.classifications.filter(value=>value.id != toDelete.id);
          this.sourceData.classifications = clasifications;
          this._setIndexes();
          console.log(this.sourceData);
  }
}

@Component({
  selector: "toco-source-addindex",
  styleUrls: ["./source-indexes.component.scss"],
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
  indexFormGroup: FormGroup;
  termsIdsToExclude: string[];
  addIndex;
  addIndexAction: FormContainerAction;
  editing: SourceClasification = null;
  classID: string = null;
  constructor(
    private service: TaxonomyService,
    private _formBuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.termsIdsToExclude = data.termsIdsToExclude;
    this.addIndex = data.addIndex;
    
    if(data.editing){
      this.editing = data.editing;
    }
    this.classID = data.classID;
  }

  ngOnInit() {
    this.indexFormGroup = this._formBuilder.group({});
    if(this.classID){
      this.indexPanel = [
        {
          title: (this.editing)? 'Editar' :"Adicionar",
          description: "",
          iconName: "",
          formSection: this.indexFormGroup,
          formSectionContent: [
            {
              name: "indexes",
              label: "Indices",
              type: FormFieldType.select_filter,
              required: true,
              width: "100%",
              value:(this.editing)? [this.editing.id] : null,
              extraContent: {
                multiple: true,
                observable: this.service.getTermByUUID(this.classID, 0),
                getOptions: (response: any) => {
                  const opts: SelectOption[] = [];
                  if (response.data.tree.term_node) {
                    response.data.tree.term_node.forEach((term: Term) => {
                      opts.push({
                        value: term.uuid,
                        label: term.description,
                      });
                    });
                  }
                  return opts;
                },
                selectionChange: (value) => {
                  console.log(value);
                }
              }
            },
            {
              name: "url",
              label: "URL",
              type: FormFieldType.url,
              required: false,
              startHint: new HintValue(
                HintPosition.start,
                "URL de la revista en el índice."
              ),
              width: "100%",
              value: (this.editing)? [this.editing.data['url']] :"",
            },
            {
              name: "initial_cover",
              label: "Cobertura inicio",
              type: FormFieldType.text,
              required: false,
              startHint: new HintValue(HintPosition.start, ""),
              width: "45%",
              value: (this.editing)? [this.editing.data['initial_cover']] :"",
            },
            {
              name: "end_cover",
              label: "Cobertura",
              type: FormFieldType.text,
              required: false,
              startHint: new HintValue(HintPosition.start, ""),
              width: "45%",
              value: (this.editing)? [this.editing.data['end_cover']] :"",
            },
          ],
        },
      ];
    }


    this.addIndexAction = {
      doit: (data: any) => {
        const result = new SourceClasification();
        console.log(this.indexFormGroup);
        
        if (this.indexFormGroup.controls["indexes"].value) {
          const term: Term = this.indexFormGroup.controls["indexes"].value[0];
          result.vocabulary = term.vocabulary_id;
          result.description = term.description;
          result.id = term.uuid;
          result.data = {
            url: this.indexFormGroup.controls["url"].value,
            initial_cover: this.indexFormGroup.controls["initial_cover"].value,
            end_cover: this.indexFormGroup.controls["end_cover"].value,
          };
        }
        this.addIndex(result);
      },
    };
  }
}
