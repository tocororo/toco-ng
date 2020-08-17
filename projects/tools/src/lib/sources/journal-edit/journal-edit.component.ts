import {
  Component,
  Input,
  OnInit,
  Inject,
  Output,
  EventEmitter,
  ViewChild
} from "@angular/core";
import { HttpErrorResponse } from "@angular/common/http";
import { of } from "rxjs";
import { catchError, finalize } from "rxjs/operators";
import { MatDialog, MatSnackBar, MAT_DIALOG_DATA } from "@angular/material";

import {
  CatalogService,
  TaxonomyService,
  SourceService
} from "@toco/tools/backend";
import {
  MessageHandler,
  StatusCode,
  HandlerComponent,
  MetadataService
} from "@toco/tools/core";
import {
  Vocabulary,
  Journal,
  SourceTypes,
  Term,
  SourceClasification,
  TermNode,
  VocabulariesInmutableNames,
  JournalData,
  Source,
  SourceSystems
} from "@toco/tools/entities";
import { FilterHttpMap } from "@toco/tools/filters";
import {
  PanelContent_Depr,
  FormFieldType,
  HintValue,
  HintPosition,
  FormContainerAction,
  IssnValue,
  SelectOption
} from "@toco/tools/forms";
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormControl
} from "@angular/forms";
import { ConstantPool } from "@angular/compiler";
import {
  JournalInstitutionsComponent,
  JournalInstitutionsPanel
} from "../journal-institutions/journal-institutions.component";

@Component({
  selector: "toco-journal-edit",
  templateUrl: "./journal-edit.component.html",
  styleUrls: ["./journal-edit.component.scss"]
})
export class JournalEditComponent implements OnInit {
  // TODO: Idea del componente:
  // trabajan internamente con un journal, si recibe null entonces es uno nuevo, si recibe un journal entonces es editar.
  // en ambos casos devuelve el journal editado, o sea el contenido, listo para hacer post en el backend.
  public pageTitle = "";

  @Input()
  public source: Source;

  @Input()
  public journalVersion: JournalData = null;

  @Input()
  public showEditHeader: boolean = false;

  @Input()
  public description = "";

  @Input()
  public defaultOrganizationUUID: string = null;

  @Input()
  public showFinalStep = true;

  // journal identifiers variables for step 0
  identifiersPanel: PanelContent_Depr[] = null;
  identifiersFormGroup: FormGroup;

  // journal information variables for step 1
  informationPanel: PanelContent_Depr[] = null;
  informationFormGroup: FormGroup;

  organizationFormGroup: FormGroup;

  @ViewChild(JournalInstitutionsComponent, { static: true })
  institutionsComponent: JournalInstitutionsComponent;

  // institutions: SourceClasification[] = [];
  // entityFormGroup: FormGroup;

  // indexes (databases), variables for step 3
  indexesPanel: PanelContent_Depr[] = null;
  indexesFormGroup: FormGroup;
  indexAction: FormContainerAction;

  finalPanel: PanelContent_Depr[] = null;
  finalFormGroup: FormGroup;

  // actions, if needed
  stepAction1: FormContainerAction;
  stepAction2: FormContainerAction;
  stepAction3: FormContainerAction;
  stepAction4: FormContainerAction;

  // TODO: Esto se puede hacer mejor, con un emiter alcanza
  @Output()
  journalEditDone = new EventEmitter<JournalData>();

  @Output()
  editCanceled = new EventEmitter<boolean>();

  public constructor(
    private metadata: MetadataService,
    private sourceService: SourceService,
    private catalogService: CatalogService,
    private taxonomyService: TaxonomyService,
    public snackBar: MatSnackBar,
    private formBuilder: FormBuilder,
    public dialog: MatDialog
  ) {}

  ngOnInit() {
    this.pageTitle = this.journalVersion.isNew
      ? "Nueva Revista"
      : "Editando : " + this.journalVersion.title;
    this.metadata.setTitleDescription(this.pageTitle, "");

    console.log("journal edit INIT");
    this.resetStepper();
    this.initStep2();
    this.initStep0Identifiers();
    this.initStep1();

    this.initStep3();
    this.initStepFinal();
  }

  resetStepper() {
    this.identifiersPanel = null;
    this.identifiersFormGroup = null;

    this.informationPanel = null;
    this.informationFormGroup = null;

    // this.organization = null;
    // this.organizationPanel = null;
    // this.institution = null;
    // this.institutionPanel = null;
    // this.entity = null;
    // this.entityPanel = null;
    this.organizationFormGroup = null;

    this.indexesPanel = null;
    this.indexesFormGroup = null;
  }

  initStep0Identifiers()
  {
    this.identifiersFormGroup = this.formBuilder.group({});

    this.identifiersPanel = [
      {
        title: "Identificadores",
        description: "",
        iconName: "",
        formSection: this.identifiersFormGroup,
        formSectionContent: [
          {
            name: "issn_p",
            label: "ISSN Impreso",
            type: FormFieldType.text,
            required: false,
            startHint: new HintValue(HintPosition.start, "XXXX-XXXX"),
            width: "23%",
            value: this.journalVersion ? this.journalVersion.issn.p : ""
            // value: this.journalVersion ? IssnValue.createIssnValueFromString(this.journalVersion.issn.p) : null
          },
          {
            name: "issn_e",
            label: "ISSN Electrónico",
            type: FormFieldType.text,
            required: false,
            startHint: new HintValue(HintPosition.start, "XXXX-XXXX"),
            width: "23%",
            value: this.journalVersion ? this.journalVersion.issn.e : ""
            // value: this.journalVersion ? IssnValue.createIssnValueFromString(this.journalVersion.issn.e) : null
          },
          {
            name: "issn_l",
            label: "ISSN de Enlace",
            type: FormFieldType.text,
            required: false,
            startHint: new HintValue(HintPosition.start, "XXXX-XXXX"),
            width: "23%",
            value: this.journalVersion ? this.journalVersion.issn.l : ""
            // value: this.journalVersion ? IssnValue.createIssnValueFromString(this.journalVersion.issn.l) : null
          },
          {
            name: "rnps_p",
            label: "RNPS Impreso",
            type: FormFieldType.rnps,
            required: true,
            startHint: new HintValue(HintPosition.start, "XXXX."),
            width: "23%",
            value: this.journalVersion ? this.journalVersion.rnps.p : ""
          },
          {
            name: "rnps_e",
            label: "RNPS Electrónico",
            type: FormFieldType.rnps,
            required: true,
            startHint: new HintValue(HintPosition.start, "XXXX."),
            width: "23%",
            value: this.journalVersion ? this.journalVersion.rnps.e : ""
          }
        ]
      }
    ];
  }

  initStep1(): void {
    this.informationFormGroup = this.formBuilder.group({
      // 'description': descriptionControl,
      start_year: new FormControl(""),
      end_year: new FormControl("")
    });

    this.informationPanel = [
      {
        title: "Datos de la Revista",
        description: "",
        iconName: "",
        formSection: this.informationFormGroup,
        formSectionContent: [
          {
            name: "title",
            label: "Título",
            type: FormFieldType.text,
            required: true,
            width: "100%",
            value: this.journalVersion ? this.journalVersion.title : ""
          },
          {
            name: "subtitle",
            label: "Subtítulo",
            type: FormFieldType.text,
            required: false,
            width: "30%",
            startHint: new HintValue(HintPosition.start, ""),
            value: this.journalVersion ? this.journalVersion.subtitle : ""
          },
          {
            name: "shortname",
            label: "Título abreviado",
            type: FormFieldType.text,
            required: false,
            width: "30%",
            startHint: new HintValue(HintPosition.start, ""),
            value: this.journalVersion ? this.journalVersion.shortname : ""
          },
          {
            name: "source_type",
            label: "Tipo de Revista",
            type: FormFieldType.select_expr,
            required: true,
            width: "30%",
            value: this.source ? this.source.source_type : "",
            extraContent: {
              multiple: false,
              getOptions: () => {
                return [
                  {
                    label: SourceTypes.JOURNAL.label,
                    value: SourceTypes.JOURNAL.value
                  },
                  {
                    label: SourceTypes.STUDENT.label,
                    value: SourceTypes.STUDENT.value
                  },
                  {
                    label: SourceTypes.POPULARIZATION.label,
                    value: SourceTypes.POPULARIZATION.value
                  }
                ];
              }
            }
          },
          {
            name: "description",
            label: "Descripción",
            type: FormFieldType.textarea,
            required: true,
            width: "100%",
            value: this.journalVersion
              ? this.journalVersion.description
              : ""
          },
          // {
          //   name: 'purpose',
          //   label: 'Propósito',
          //   type: FormFieldType.textarea,
          //   required: true,
          //   width: '100%',
          //   value: this.journalVersion ? this.journalVersion.purpose : ''
          // },
          {
            name: "url",
            label: "URL",
            type: FormFieldType.url,
            required: true,
            startHint: new HintValue(
              HintPosition.start,
              "Escriba una URL válida."
            ),
            width: "100%",
            value: this.journalVersion ? this.journalVersion.url : ""
          },
          {
            name: "source_system",
            label: "Tipo de Sistema que soporta la revista",
            type: FormFieldType.select_expr,
            required: false,
            width: "35%",
            value: this.journalVersion
              ? this.journalVersion.source_system
              : "",
            extraContent: {
              multiple: false,
              getOptions: () => {
                return [
                  {
                    label: SourceSystems.OJS.label,
                    value: SourceSystems.OJS.value
                  },
                  {
                    label: SourceSystems.CMS.label,
                    value: SourceSystems.CMS.value
                  },
                  {
                    label: SourceSystems.OTHER.label,
                    value: SourceSystems.OTHER.value
                  }
                ];
              }
            }
          },
          {
            name: "oaiurl",
            label: "OAI-PMH",
            type: FormFieldType.url,
            required: false,
            startHint: new HintValue(
              HintPosition.start,
              "Escriba una URL válida."
            ),
            width: "60%",
            value: this.journalVersion ? this.journalVersion.oaiurl : ""
          },
          // {
          //   name: 'seriadas_cubanas',
          //   label: 'URL en Seriadas Cubanas',
          //   type: FormFieldType.url,
          //   required: false,
          //   startHint: new HintValue(HintPosition.start, ''),
          //   width: '100%',
          //   value: this.journalVersion ? this.journalVersion.seriadas_cubanas : ''
          // },

          {
            name: "email",
            label: "Correo Electrónico",
            type: FormFieldType.email,
            required: true,
            startHint: new HintValue(
              HintPosition.start,
              "Escriba un email válido."
            ),
            width: "45%",
            value: this.journalVersion ? this.journalVersion.email : ""
          },
          {
            name: "licence",
            label: "Licencia",
            type: FormFieldType.vocabulary,
            required: false,
            width: "45%",
            extraContent: {
              multiple: false,
              selectedTermsIds: this.journalVersion
                ? this.journalVersion.classifications.map(
                    termSource => termSource.id
                  )
                : null,
              vocab: VocabulariesInmutableNames.LICENCES,
              level: 0
            }
          },
          {
            name: "start_year",
            label: "Año de inicio",
            type: FormFieldType.datepicker,
            required: false,
            width: "30%",
            value: this.journalVersion
              ? this.journalVersion.start_year
              : ""
          },
          {
            name: "end_year",
            label: "Año final",
            type: FormFieldType.datepicker,
            required: false,
            width: "30%",
            value: this.journalVersion ? this.journalVersion.end_year : ""
          },
          {
            name: "frequency",
            label: "Frecuencia",
            type: FormFieldType.text,
            required: false,
            startHint: new HintValue(HintPosition.start, ""),
            width: "30%",
            value: this.journalVersion ? this.journalVersion.frequency : ""
          },
          {
            // TODO: el top level de unesco de materias....
            name: "cover",
            label: "Cobertura Temática",
            type: FormFieldType.vocabulary,
            required: true,
            width: "45%",
            extraContent: {
              multiple: false,
              selectedTermsIds: this.journalVersion
                ? this.journalVersion.classifications.map(
                    termSource => termSource.id
                  )
                : null,
              vocab: VocabulariesInmutableNames.CUBAN_PROVINCES,
              level: 0
            }
          },
          {
            name: "subjects",
            label: "Materias",
            type: FormFieldType.vocabulary,
            required: true,
            width: "45%",
            extraContent: {
              multiple: true,
              selectedTermsIds: this.journalVersion
                ? this.journalVersion.classifications.map(
                    termSource => termSource.id
                  )
                : null,
              vocab: VocabulariesInmutableNames.SUBJECTS,
              level: 0
            }
          }
        ]
      },
      {
        title: "Redes Sociales",
        description: "",
        iconName: "",
        formSection: this.informationFormGroup,
        formSectionContent: [
          {
            name: "facebook",
            label: "Facebook",
            type: FormFieldType.url,
            required: false,
            width: "33%",
            value: this.journalVersion
              ? this.journalVersion.socialNetworks.facebook
              : ""
          },
          {
            name: "twitter",
            label: "Twitter",
            type: FormFieldType.url,
            required: false,
            width: "33%",
            value: this.journalVersion
              ? this.journalVersion.socialNetworks.twitter
              : ""
          },
          {
            name: "linkedin",
            label: "LinkedIN",
            type: FormFieldType.url,
            required: false,
            width: "33%",
            value: this.journalVersion
              ? this.journalVersion.socialNetworks.linkedin
              : ""
          }
        ]
      }
    ];

  }

  initStep2() {
    this.organizationFormGroup = this.formBuilder.group({
      institutions: new FormControl("")
    });
  }

  initStep3() {
    this.indexesFormGroup = this.formBuilder.group({});
    const panel = [];
    this.indexesPanel = [];

    console.log(this.journalVersion.classifications)
    this.journalVersion.classifications.forEach(element => {
      if (element.vocabulary == VocabulariesInmutableNames.INDEXES) {
        panel.push(this.getPanelIndex(element));
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

  public addIndexAction(){
    const termsIdsToExclude = [];
    this.indexesPanel.forEach(panel => {
      termsIdsToExclude.push(panel.value.id);
    });

    this.dialog.open(JournalEditAddIndexComponent, {
      data: {
        termsIdsToExclude: termsIdsToExclude,
        addIndexPanel: (termSource: SourceClasification) => {
          this.dialog.closeAll();
          const panels = this.indexesPanel.slice(0);
          panels.push(this.getPanelIndex(termSource));
          this.indexesPanel = panels;
          console.log(this.indexesFormGroup);
        }
      }
    });
  }

  private getPanelIndex(termSource: SourceClasification) {
    return {
      title: termSource.description,
      description: "",
      iconName: "",
      formSection: this.indexesFormGroup,
      actionLabel: "Eliminar",
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
          name: "url_" + termSource.id,
          label: "URL de la revista en el índice",
          type: FormFieldType.url,
          required: false,
          startHint: new HintValue(HintPosition.start, ""),
          width: "100%",
          value: termSource.data ? termSource.data["url"] : ""
        },
        {
          name: "initial_cover_" + termSource.id,
          label: "Cobertura inicio",
          type: FormFieldType.text,
          required: false,
          startHint: new HintValue(HintPosition.start, ""),
          width: "45%",
          value: termSource.data ? termSource.data["initial_cover"] : ""
        },
        {
          name: "end_cover_" + termSource.id,
          label: "Cobertura hasta",
          type: FormFieldType.text,
          required: false,
          startHint: new HintValue(HintPosition.start, ""),
          width: "45%",
          value: termSource.data ? termSource.data["end_cover"] : ""
        }
      ]
    };
  }

  initStepFinal() {
    this.finalFormGroup = this.formBuilder.group({});
    this.finalPanel = [
      {
        title: "",
        description: "",
        iconName: "",
        formSection: this.finalFormGroup,

        formSectionContent: [
          {
            name: "comment",
            label: "Puede agregar aquí un comentario.",
            type: FormFieldType.textarea,
            required: false,
            startHint: new HintValue(HintPosition.start, ""),
            width: "100%",
            minWidth: "100%",
            value: this.journalVersion ? this.journalVersion._save_info.comment : ""
          }
        ]
      }
    ];
  }

  private fillJournalFields() {
    // this.journalVersion.source_type = this.informationFormGroup.value['source_type'];

    this.journalVersion.issn.p = this.identifiersFormGroup.value['issn_p'];
    this.journalVersion.issn.e = this.identifiersFormGroup.value['issn_e'];
    this.journalVersion.issn.l = this.identifiersFormGroup.value['issn_l'];
    this.journalVersion.rnps.p = this.identifiersFormGroup.value['rnps_p'];
    this.journalVersion.rnps.e = this.identifiersFormGroup.value['rnps_e'];

    // this.journalVersion.issn.deepcopy(
    //   this.identifiersFormGroup.value
    // );
    // this.journalVersion.rnps.deepcopy(
    //   this.identifiersFormGroup.value
    // );

    this.journalVersion.deepcopy(this.informationFormGroup.value);
    this.journalVersion.socialNetworks.deepcopy(
      this.informationFormGroup.value
    );

    this.source.source_type = this.informationFormGroup.value["source_type"];

    this.journalVersion.classifications = [];

    this.informationFormGroup.value["licence"].forEach((term: Term) => {
      const ts = new SourceClasification();
      ts.description = term.description;
      ts.id = term.uuid;
      this.journalVersion.classifications.push(ts);
    });

    this.informationFormGroup.value["cover"].forEach(term => {
      const ts = new SourceClasification();
      ts.description = term.description;
      ts.id = term.uuid;
      this.journalVersion.classifications.push(ts);
    });

    this.informationFormGroup.value["subjects"].forEach(term => {
      const ts = new SourceClasification();
      ts.description = term.description;
      ts.id = term.uuid;
      this.journalVersion.classifications.push(ts);
    });

    this.journalVersion.organizations = this.source.data.organizations;

    // this.organizationFormGroup.value[
    //   "institutions"
    // ].forEach((panel: JournalInstitutionsPanel) => {
    //   const ts = new SourceClasification();
    //   ts.deepcopy(panel.inst);
    //   ts.term_id = panel.inst.term.id;
    //   ts.source_id = this.journalVersion.source_id;
    //   this.journalVersion.classifications.push(ts);

    // }
    // );

    // this.institutions.forEach(inst => {
    //   this.journalVersion.classifications.push(inst);
    // });
    console.log(this.indexesPanel)
    this.indexesPanel.forEach(panel => {
      const ts = new SourceClasification();
      let term: Term = panel.value;
      ts.description = term.description;
      ts.id = term.uuid;
      ts.data["url"] = this.indexesFormGroup.value["url_" + ts.id];
      ts.data["initial_cover"] = this.indexesFormGroup.value[
        "initial_cover_" + ts.id
      ];
      ts.data["end_cover"] = this.indexesFormGroup.value[
        "end_cover_" + ts.id
      ];
      this.journalVersion.classifications.push(ts);
    });

    this.journalVersion._save_info.comment = this.finalFormGroup.value["comment"];

    console.log(this.identifiersFormGroup);
    console.log(this.informationFormGroup);
    console.log(this.organizationFormGroup);
    console.log(this.indexesFormGroup);
    console.log(this.journalVersion);
  }

  public finishStepper() {
    // console.log(this.journalVersion, this)
    this.fillJournalFields();
    console.log(this.journalVersion)
    this.journalEditDone.emit(this.journalVersion);
  }
  public cancelStepper() {
    this.editCanceled.emit(true);
  }
}

@Component({
  selector: "toco-journal-edit-addindex",
  styleUrls: ["./journal-edit.component.scss"],
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
export class JournalEditAddIndexComponent implements OnInit {
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
        title: "Adicionar un Índice",
        description: "",
        iconName: "",
        formSection: this.indexFormGroup,
        formSectionContent: [
          {
            name: "indexes",
            label: "Indices",
            type: FormFieldType.vocabulary,
            required: true,
            width: "100%",
            extraContent: {
              multiple: false,
              selectedTermsIds: null,
              excludeTermsIds: this.termsIdsToExclude,
              vocab: VocabulariesInmutableNames.INDEXES
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
            value: ""
          },
          {
            name: "initial_cover",
            label: "Cobertura inicio",
            type: FormFieldType.text,
            required: false,
            startHint: new HintValue(HintPosition.start, ""),
            width: "45%",
            value: ""
          },
          {
            name: "end_cover",
            label: "Cobertura",
            type: FormFieldType.text,
            required: false,
            startHint: new HintValue(HintPosition.start, ""),
            width: "45%",
            value: ""
          }
        ]
      }
    ];

    this.addIndexAction = {
      doit: (data: any) => {
        const result = new SourceClasification();
        if (this.indexFormGroup.controls["indexes"].value) {
          let term: Term = this.indexFormGroup.controls["indexes"].value[0];
          result.id = term.uuid;
          result.data = {
            url: this.indexFormGroup.controls["url"].value,
            initial_cover: this.indexFormGroup.controls["initial_cover"].value,
            end_cover: this.indexFormGroup.controls["end_cover"].value
          };
        }
        this.addIndexPanel(result);
      }
    };
  }
}
