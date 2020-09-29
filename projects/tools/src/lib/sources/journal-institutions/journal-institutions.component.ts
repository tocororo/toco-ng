import { Component, OnInit, Input, Inject, ViewChild, OnDestroy, OnChanges } from "@angular/core";
import {
  Source,
  JournalVersion,
  Term,
  SourceClasification,
  VocabulariesInmutableNames,
  TermNode,
  SourceOrganizationRole
} from "@toco/tools/entities";
import {
  PanelContent_Depr,
  FormContainerAction,
  FormFieldType
} from "@toco/tools/forms";
import { FormGroup, FormBuilder, FormControl } from "@angular/forms";
import { TaxonomyService } from "@toco/tools/backend";
import { MAT_DIALOG_DATA, MatDialog, MAT_DIALOG_DEFAULT_OPTIONS } from "@angular/material";
import { TermHelper } from "@toco/tools/taxonomy";
import { InstitutionHierarchySelectorComponent } from "@toco/tools/institutions/institution-hierarchy-selector/institution-hierarchy-selector.component";

export interface JournalInstitutionsPanel {
  // open: boolean;
  inst: SourceClasification;
}
@Component({
  selector: "toco-journal-institutions",
  templateUrl: "./journal-institutions.component.html",
  styleUrls: ["./journal-institutions.component.scss"]
})
export class JournalInstitutionsComponent implements OnInit,  OnChanges {
  @Input()
  public source: Source;

  @Input()
  public journalVersion: JournalVersion = null;

  @Input()
  public defaultOrganizationUUID: string = null;

  @Input()
  organizationFormGroup: FormGroup;

  @Input()
  enableEdit = false;

  public initOrganizationPanel = false;
  public roles = SourceOrganizationRole;
  public vocab = VocabulariesInmutableNames;
  panels: JournalInstitutionsPanel[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private taxonomyService: TaxonomyService,
    public dialog: MatDialog
  ) { }

  ngOnChanges(){
    this.ngOnInit();
  }
  ngOnInit() {
    console.log("INIT JournalInstitutionsComponent");
    if (this.organizationFormGroup == undefined ){
      this.organizationFormGroup = this.formBuilder.group({
        institutions: new FormControl("")
      });
    }
    this.panels = [];
    let termSource: SourceClasification[] = [];
    if (this.journalVersion) {
      // const institutions: SourceClasification[] = this.journalVersion.classifications.filter(
      //   ts =>
      //   ts.term.vocabulary == VocabulariesInmutableNames.CUBAN_INTITUTIONS
      //   || ts.term.vocabulary == VocabulariesInmutableNames.EXTRA_INSTITUTIONS
      // );
      // console.log(institutions);

      // if (institutions.length == 1) {
      //   if (!institutions[0].data) {
      //     institutions[0].data = {
      //       role: SourceOrganizationRole.MAIN.value
      //     };
      //   } else {
      //     institutions[0].data["role"] = SourceOrganizationRole.MAIN.value;
      //   }
      // }
      // institutions.forEach(i => {
      //   this.panels.push({ /* open: false, */ inst: i });
      // });

      console.log(this.panels)
      this.organizationFormGroup.setValue({ institutions: this.panels });
      console.log(this.organizationFormGroup);

      this.initOrganizationPanel = true;
    }
  }


  addInst(extra = false) {
    let newInst = new SourceClasification();
    // newInst.source_id = this.source.id;
    // newInst.data = { role: SourceOrganizationRole.COLABORATOR.value };
    // newInst.term = new Term();
    // newInst.term.isNew = true;

    this.editTermSource(newInst, extra);

  }

  editTermSource(termSource: SourceClasification, extra = false, index = -1) {
    // let dialogRef;
    if (extra) {
      // dialogRef = termSource.term.vocabulary =
      //   VocabulariesInmutableNames.EXTRA_INSTITUTIONS;
      this.dialog.open(JournalAddExtraInstitutionComponent, {
        data: {
          // term: termSource.term,
          // addTerm: (term: Term) => {
          //   termSource.term = term;
          //   this.dialog.closeAll();
          //   if (index > 0 && index < this.panels.length) {
          //     this.panels[index] = { /* open: true, */ inst: termSource };
          //   } else {
          //     this.panels.push({ /* open: true, */ inst: termSource });
          //   }
          //   this.organizationFormGroup.setValue({ institutions: this.panels });
          //   console.log(this.organizationFormGroup);

          // }
        }
      });
    } else {
      // dialogRef = termSource.term.vocabulary =
      //   VocabulariesInmutableNames.INTITUTION;
      this.dialog.open(JournalAddInstitutionComponent, {
        width: '90%',
        minWidth: '15em',
        data: {
          // term: termSource.term,
          // addTerm: (hierarchy: TermNode) => {
          //   this.dialog.closeAll();
          //   console.log(hierarchy);

          //   termSource.term = hierarchy.term;
          //   termSource["h"] = hierarchy;
          //   if (index >= 0 && index < this.panels.length) {
          //     this.panels[index] = { /* open: true, */ inst: termSource };
          //   } else {
          //     this.panels.push({ /* open: true, */ inst: termSource });
          //   }

          //   this.organizationFormGroup.setValue({ institutions: this.panels });
          //   console.log(this.organizationFormGroup);
          // }
        }
      });
    }
  }

  editInst(index: number) {
    const extra =
      this.panels[index].inst.vocabulary ==
      VocabulariesInmutableNames.EXTRA_INSTITUTIONS;
    console.log(index);

    this.editTermSource(this.panels[index].inst, extra, index);
  }
  removeInst(index: number) {
    this.panels.splice(index, 1);
    this.organizationFormGroup.setValue({ institutions: this.panels });
    console.log(this.organizationFormGroup);
  }

  setAsMain(index) {
    this.panels.forEach((p, i) => {
      if (i == index) {
        p.inst.data = {
          role: SourceOrganizationRole.MAIN.value
        };
      } else {
        p.inst.data = {
          role: SourceOrganizationRole.COLABORATOR.value
        };
      }
    })
    this.organizationFormGroup.setValue({ institutions: this.panels });
    console.log(this.organizationFormGroup);
  }

  getInstitutionalRelations(): SourceClasification[] {
    let result: SourceClasification[] = [];
    this.panels.forEach(p => {
      result.push(p.inst);
    })
    return result;
  }
}

@Component({
  selector: "toco-journal-addinst",
  template: `
    <toco-institution-hierarchy-selector
      [institution]="term"
      [externalFormGroup]="formGroup"
    >
    </toco-institution-hierarchy-selector>
    <div mat-dialog-actions fxLayout="row wrap"
    fxLayoutAlign="end center">
      <button mat-stroked-button (click)="ok()">Aceptar</button>
    </div>
  `
})
export class JournalAddInstitutionComponent implements OnInit {
  @ViewChild(InstitutionHierarchySelectorComponent, { static: true })
  selector: InstitutionHierarchySelectorComponent;
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
      [panelsContent]="institutionPanel"
      [useContainer]="false"
      fxLayout="row"
      [deleteValuesAfterAction]="false"
      [action]="addAction"
      [actionLabel]="'Aceptar'"
    ></toco-form-container>
  `
})
export class JournalAddExtraInstitutionComponent implements OnInit {
  term: Term;

  institutionPanel: PanelContent_Depr[] = null;

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

    this.institutionPanel = [
      {
        title: "Institución",
        description: "",
        iconName: "",
        formSection: this.formGroup,
        formSectionContent: [
          {
            name: "name",
            label: "Nombre",
            type: FormFieldType.text,
            required: true,
            value: this.term.identifier ? this.term.identifier : null,
            width: "100%"
          },
          {
            name: "grid",
            label: "Identificador",
            type: FormFieldType.text,
            required: false,
            value: this.term.data["grid"] ? this.term.data["grid"] : null,
            width: "45%"
          },
          {
            name: "country",
            label: "Pais",
            type: FormFieldType.vocabulary,
            required: false,
            extraContent: {
              multiple: false,
              selectedTermsIds: this.term.class_ids
                ? this.term.class_ids
                : null,
              vocab: VocabulariesInmutableNames.COUNTRIES
            },
            width: "45%"
          },
          {
            name: "description",
            label: "Descripción",
            type: FormFieldType.textarea,
            required: false,
            value: this.term.description ? this.term.description : null,
            width: "100%"
          },
          {
            name: "email",
            label: "Email",
            type: FormFieldType.email,
            required: true,
            value: this.term.data["email"] ? this.term.data["email"] : null,
            width: "45%"
          },
          {
            name: "website",
            label: "Sitio Web Oficial",
            type: FormFieldType.url,
            required: false,
            value: this.term.data["website"] ? this.term.data["website"] : null,
            width: "45%"
          },
          {
            name: "address",
            label: "Dirección",
            type: FormFieldType.textarea,
            required: false,
            value: this.term.data["address"] ? this.term.data["address"] : null,
            width: "100%"
          }
        ]
      }
    ];

    this.addAction = {
      doit: (data: any) => {
        console.log(this.formGroup);
        this.term.identifier = this.formGroup.value["name"];
        this.term.description = this.formGroup.value["description"];
        this.term.data = this.formGroup.value;

        this.formGroup.value["country"].forEach((term: Term) => {
          this.term.class_ids.push(Number.parseInt(term.id));
        });
        // this.term.class_ids = this.formGroup.value["country"];
        console.log(this.term);
        this.addTerm(this.term);
      }
    };
  }
}
