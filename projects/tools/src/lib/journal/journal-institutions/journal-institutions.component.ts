import { Component, OnInit, Input, Inject, ViewChild } from "@angular/core";
import {
  Source,
  JournalVersion,
  Term,
  TermSource,
  VocabulariesInmutableNames,
  TermNode,
  SourceInstitutionRole
} from "@toco/tools/entities";
import { PanelContent, FormContainerAction } from "@toco/tools/forms";
import { FormGroup, FormBuilder, FormControl } from "@angular/forms";
import { TaxonomyService } from "@toco/tools/backend";
import { MAT_DIALOG_DATA, MatDialog } from "@angular/material";
import { TermHelper } from "@toco/tools/taxonomy";
import { InstitutionSelectorComponent } from "@toco/tools/institutions/institution-selector/institution-selector.component";

@Component({
  selector: "toco-journal-institutions",
  templateUrl: "./journal-institutions.component.html",
  styleUrls: ["./journal-institutions.component.scss"]
})
export class JournalInstitutionsComponent implements OnInit {
  @Input()
  public source: Source;

  @Input()
  public journalVersion: JournalVersion = null;

  @Input()
  public defaultOrganizationUUID: string = null;

  @Input()
  organizationFormGroup: FormGroup;

  @Input()
  institutions: TermSource[] = [];

  // // organization, institution and entity, variables for step 2
  // public organization: Term = null;
  // organizationPanel: PanelContent[] = null;

  // // institution
  // public institution: Term = null;
  // institutionPanel: PanelContent[] = null;
  // institutionFormGroup: FormGroup;
  // // entity
  // public entity: Term = null;
  // entityPanel: PanelContent[] = null;

  // public isManageByEntity = true;

  public initOrganizationPanel = false;
  public roles = SourceInstitutionRole;
  public vocab = VocabulariesInmutableNames;
  tabs = [];

  constructor(
    private formBuilder: FormBuilder,
    private taxonomyService: TaxonomyService,
    public dialog: MatDialog
  ) {}

  ngOnInit() {
    // get data for and create institutional panel (second step)
    let termSource: TermSource[] = [];
    if (this.journalVersion) {
      this.institutions = this.journalVersion.data.term_sources.filter(
        ts => ts.term.vocabulary_id == VocabulariesInmutableNames.INTITUTION
      );
      console.log(this.institutions);

      if (this.institutions.length == 1) {
        if (!this.institutions[0].data) {
          this.institutions[0].data = {
            role: SourceInstitutionRole.MAIN.value
          };
        } else {
          this.institutions[0].data["role"] = SourceInstitutionRole.MAIN.value;
        }
      }
      this.initOrganizationPanel = true;
    }
  }

  selected = new FormControl(0);

  addInst(extra = false) {
    let newInst = new TermSource();
    newInst.source_id = this.source.id;
    newInst.data = { role: SourceInstitutionRole.COLABORATOR.value };
    newInst.term = new Term();
    newInst.term.isNew = true;

    this.editTermSource(newInst, extra);

    this.selected.setValue(this.institutions.length - 1);
  }

  editTermSource(termSource: TermSource, extra = false, index=-1) {
    let dialogRef;
    if (extra) {
      dialogRef = termSource.term.vocabulary_id =
        VocabulariesInmutableNames.EXTRA_INSTITUTIONS;
      this.dialog.open(JournalAddExtraInstitutionComponent, {
        data: {
          term: termSource.term,
          addTerm: (term: Term) => {
            termSource.term = term;
            this.dialog.closeAll();
            if (index > 0 && index < this.institutions.length){
              this.institutions[index] = termSource;
            }
            else {
              this.institutions.push(termSource);
            }
          }
        }
      });
    } else {
      dialogRef = termSource.term.vocabulary_id =
        VocabulariesInmutableNames.INTITUTION;
      this.dialog.open(JournalAddInstitutionComponent, {
        data: {
          term: termSource.term,
          addTerm: (hierarchy: TermNode) => {
            this.dialog.closeAll();
            console.log(hierarchy);

            termSource.term = hierarchy.term;
            termSource['h'] = hierarchy;
            // if (hierarchy.parent) {
            //   if (hierarchy.parent.parent) {
            //     termSource["l1"] = hierarchy.parent.parent.term;
            //   } else {
            //     termSource["l2"] = null;
            //   }
            //   termSource["l2"] = hierarchy.parent.term;
            // } else {
            //   termSource["l1"] = null;
            //   termSource["l2"] = null;
            // }
            if (index > 0 && index < this.institutions.length){
              this.institutions[index] = termSource;
            } else {
              this.institutions.push(termSource);
            }
            
          }
        }
      });
    }
  }

  editInst(index: number) {
    const extra =
      this.institutions[index].term.vocabulary_id ==
      VocabulariesInmutableNames.EXTRA_INSTITUTIONS;
    this.editTermSource(this.institutions[index], extra, index);
  }
  removeInst(index: number) {
    this.institutions.splice(index, 1);
  }
}

@Component({
  selector: "toco-journal-addinst",
  template: `
    <toco-institution-selector
      [institution]="term"
      [externalFormGroup]="formGroup"
    >
    </toco-institution-selector>
    <div mat-dialog-actions>
      <button mat-stroked-button (click)="ok()">Adicionar</button>
    </div>
  `
})
export class JournalAddInstitutionComponent implements OnInit {
  @ViewChild(InstitutionSelectorComponent, { static: true })
  selector: InstitutionSelectorComponent;
  term: Term;

  formGroup: FormGroup;
  addTerm;
  constructor(
    private _formBuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.term = data.term;
    this.addTerm = data.addTerm;
  }

  ngOnInit() {
    this.formGroup = this._formBuilder.group({});
  }
  ok() {
    const h = this.selector.getSelectedHierarchy();
    if (h) {
      this.addTerm(h);
    }
  }
}

// TODO: hacer este control de la misma manera que JournalAddInstitutionComponent, osea
// usando view  child, y agregandole al control ExtraInstitutionSelectorComponent del modulo institutions.
// un metodo que devuelva el termino creado...

@Component({
  selector: "toco-journal-addinstextra",
  template: `
    <toco-form-container
      *ngIf="formGroup && institutionPanel"
      #level1PanelContainer
      [panels]="institutionPanel"
      [useAccordion]="false"
      fxLayout="row"
      [deleteValuesAfterAction]="false"
      [action]="addAction"
      [actionLabel]="'Adicionar'"
    ></toco-form-container>
  `
})
export class JournalAddExtraInstitutionComponent implements OnInit {
  term: Term;

  institutionPanel: PanelContent[] = null;

  formGroup: FormGroup;
  addTerm;
  addAction: FormContainerAction;
  constructor(
    private _formBuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.term = data.term;
    this.addTerm = data.addTerm;
  }

  ngOnInit() {
    this.formGroup = this._formBuilder.group({});
    const content = TermHelper.getPanelContentToEdit(this.term);

    this.institutionPanel = [
      {
        title: "Institución",
        description: "",
        iconName: "",
        formGroup: this.formGroup,
        content: content
      }
    ];

    this.addAction = {
      doit: (data: any) => {
        console.log(this.formGroup);
        this.term.name = this.formGroup.value["name"];
        this.term.data = this.formGroup.value;
        console.log(this.term);
        this.addTerm(this.term);
      }
    };
  }
}
