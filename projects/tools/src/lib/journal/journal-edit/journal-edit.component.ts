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
  TermSource,
  TermNode,
  VocabulariesInmutableNames,
  JournalVersion,
  Source,
  SourceSystems
} from "@toco/tools/entities";
import { FilterHttpMap } from "@toco/tools/filters";
import {
  PanelContent,
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
  public journalVersion: JournalVersion = null;

  @Input()
  public showCancelButton: boolean = true;

  @Input()
  public description = "";

  @Input()
  public defaultOrganizationUUID: string = null;

  // journal identifiers variables for step 0
  identifiersPanel: PanelContent[] = null;
  identifiersFormGroup: FormGroup;

  // journal information variables for step 1
  informationPanel: PanelContent[] = null;
  informationFormGroup: FormGroup;

  organizationFormGroup: FormGroup;

  @ViewChild(JournalInstitutionsComponent, { static: true })
  institutionsComponent: JournalInstitutionsComponent;

  // institutions: TermSource[] = [];
  // entityFormGroup: FormGroup;

  // indexes (databases), variables for step 3
  indexesPanel: PanelContent[] = null;
  indexesFormGroup: FormGroup;
  indexAction: FormContainerAction;

  finalPanel: PanelContent[] = null;
  finalFormGroup: FormGroup;

  // actions, if needed
  stepAction1: FormContainerAction;
  stepAction2: FormContainerAction;
  stepAction3: FormContainerAction;
  stepAction4: FormContainerAction;

  // TODO: Esto se puede hacer mejor, con un emiter alcanza
  @Output()
  journalEditDone = new EventEmitter<JournalVersion>();

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
      : "Editando : " + this.journalVersion.data.title;
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

  initStep0Identifiers() {
    this.identifiersFormGroup = this.formBuilder.group({});

    this.identifiersPanel = [
      {
        title: "Identificadores",
        description: "",
        iconName: "",
        formGroup: this.identifiersFormGroup,
        content: [
          {
            name: "p",
            label: "ISSN Impreso",
            type: FormFieldType.text,
            required: false,
            startHint: new HintValue(HintPosition.start, "XXXX-XXXX"),
            width: "23%",
            value: this.journalVersion ? this.journalVersion.data.issn.p : ""
            // value: this.journalVersion ? IssnValue.createIssnValueFromString(this.journalVersion.data.issn.p) : null
          },
          {
            name: "e",
            label: "ISSN Electrónico",
            type: FormFieldType.text,
            required: false,
            startHint: new HintValue(HintPosition.start, "XXXX-XXXX"),
            width: "23%",
            value: this.journalVersion ? this.journalVersion.data.issn.e : ""
            // value: this.journalVersion ? IssnValue.createIssnValueFromString(this.journalVersion.data.issn.e) : null
          },
          {
            name: "l",
            label: "ISSN de Enlace",
            type: FormFieldType.text,
            required: false,
            startHint: new HintValue(HintPosition.start, "XXXX-XXXX"),
            width: "23%",
            value: this.journalVersion ? this.journalVersion.data.issn.l : ""
            // value: this.journalVersion ? IssnValue.createIssnValueFromString(this.journalVersion.data.issn.l) : null
          },
          {
            name: "rnps",
            label: "RNPS Impreso",
            type: FormFieldType.rnps,
            required: true,
            startHint: new HintValue(HintPosition.start, "XXXX."),
            width: "23%",
            value: this.journalVersion ? this.journalVersion.data.rnps.p : ""
          },
          {
            name: "rnps",
            label: "RNPS Electrónico",
            type: FormFieldType.rnps,
            required: true,
            startHint: new HintValue(HintPosition.start, "XXXX."),
            width: "23%",
            value: this.journalVersion ? this.journalVersion.data.rnps.e : ""
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
        formGroup: this.informationFormGroup,
        content: [
          {
            name: "title",
            label: "Título",
            type: FormFieldType.text,
            required: true,
            width: "100%",
            value: this.journalVersion ? this.journalVersion.data.title : ""
          },
          {
            name: "subtitle",
            label: "Subtítulo",
            type: FormFieldType.text,
            required: false,
            width: "30%",
            startHint: new HintValue(HintPosition.start, ""),
            value: this.journalVersion ? this.journalVersion.data.subtitle : ""
          },
          {
            name: "shortname",
            label: "Título abreviado",
            type: FormFieldType.text,
            required: false,
            width: "30%",
            startHint: new HintValue(HintPosition.start, ""),
            value: this.journalVersion ? this.journalVersion.data.shortname : ""
          },
          {
            name: "source_type",
            label: "Tipo de Revista",
            type: FormFieldType.select,
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
              ? this.journalVersion.data.description
              : ""
          },
          // {
          //   name: 'purpose',
          //   label: 'Propósito',
          //   type: FormFieldType.textarea,
          //   required: true,
          //   width: '100%',
          //   value: this.journalVersion ? this.journalVersion.data.purpose : ''
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
            value: this.journalVersion ? this.journalVersion.data.url : ""
          },
          {
            name: "source_system",
            label: "Tipo de Sistema que soporta la revista",
            type: FormFieldType.select,
            required: false,
            width: "35%",
            value: this.journalVersion
              ? this.journalVersion.data.source_system
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
            value: this.journalVersion ? this.journalVersion.data.oaiurl : ""
          },
          // {
          //   name: 'seriadas_cubanas',
          //   label: 'URL en Seriadas Cubanas',
          //   type: FormFieldType.url,
          //   required: false,
          //   startHint: new HintValue(HintPosition.start, ''),
          //   width: '100%',
          //   value: this.journalVersion ? this.journalVersion.data.seriadas_cubanas : ''
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
            value: this.journalVersion ? this.journalVersion.data.email : ""
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
                ? this.journalVersion.data.term_sources.map(
                    termSource => termSource.term_id
                  )
                : null,
              vocab: VocabulariesInmutableNames.LICENCES
            }
          },
          {
            name: "start_year",
            label: "Año de inicio",
            type: FormFieldType.datepicker,
            required: false,
            width: "30%",
            value: this.journalVersion
              ? this.journalVersion.data.start_year
              : ""
          },
          {
            name: "end_year",
            label: "Año final",
            type: FormFieldType.datepicker,
            required: false,
            width: "30%",
            value: this.journalVersion ? this.journalVersion.data.end_year : ""
          },
          {
            name: "frequency",
            label: "Frecuencia",
            type: FormFieldType.text,
            required: false,
            startHint: new HintValue(HintPosition.start, ""),
            width: "30%",
            value: this.journalVersion ? this.journalVersion.data.frequency : ""
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
                ? this.journalVersion.data.term_sources.map(
                    termSource => termSource.term_id
                  )
                : null,
              vocab: VocabulariesInmutableNames.PROVINCES
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
                ? this.journalVersion.data.term_sources.map(
                    termSource => termSource.term_id
                  )
                : null,
              vocab: VocabulariesInmutableNames.SUBJECTS
            }
          }
        ]
      },
      {
        title: "Redes Sociales",
        description: "",
        iconName: "",
        formGroup: this.informationFormGroup,
        content: [
          {
            name: "facebook",
            label: "Facebook",
            type: FormFieldType.url,
            required: false,
            width: "33%",
            value: this.journalVersion
              ? this.journalVersion.data.socialNetworks.facebook
              : ""
          },
          {
            name: "twitter",
            label: "Twitter",
            type: FormFieldType.url,
            required: false,
            width: "33%",
            value: this.journalVersion
              ? this.journalVersion.data.socialNetworks.twitter
              : ""
          },
          {
            name: "linkedin",
            label: "LinkedIN",
            type: FormFieldType.url,
            required: false,
            width: "33%",
            value: this.journalVersion
              ? this.journalVersion.data.socialNetworks.linkedin
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

    this.journalVersion.data.term_sources.forEach(element => {
      if (element.term.vocabulary_id === VocabulariesInmutableNames.DATABASES) {
        panel.push(this.getPanelIndex(element));
      }
    });
    this.indexesPanel = panel;

    this.indexAction = {
      doit: (data: any) => {
        const termsIdsToExclude = [];
        this.indexesPanel.forEach(panel => {
          termsIdsToExclude.push(panel.value.id);
        });

        this.dialog.open(JournalEditAddIndexComponent, {
          data: {
            termsIdsToExclude: termsIdsToExclude,
            addIndexPanel: (termSource: TermSource) => {
              this.dialog.closeAll();
              termSource.source_id = this.journalVersion.source_id;
              const panels = this.indexesPanel.slice(0);
              panels.push(this.getPanelIndex(termSource));
              this.indexesPanel = panels;
              console.log(this.indexesFormGroup);
            }
          }
        });
      }
    };
  }

  private getPanelIndex(termSource: TermSource) {
    return {
      title: termSource.term.name,
      description: "",
      iconName: "",
      formGroup: this.indexesFormGroup,
      actionLabel: "Eliminar",
      action: {
        doit: index => {
          const panels = [];
          for (let i = 0; i < this.indexesPanel.length; i++) {
            if (i === index) {
              this.indexesPanel[i].content.forEach(element => {
                this.indexesFormGroup.removeControl(element.name);
              });
            } else {
              panels.push(this.indexesPanel[i]);
            }
          }
          this.indexesPanel = panels;
        }
      },
      value: termSource.term,
      content: [
        {
          name: "url_" + termSource.term_id,
          label: "URL de la revista en el índice",
          type: FormFieldType.url,
          required: false,
          startHint: new HintValue(HintPosition.start, ""),
          width: "100%",
          value: termSource.data ? termSource.data["url"] : ""
        },
        {
          name: "initial_cover_" + termSource.term_id,
          label: "Cobertura inicio",
          type: FormFieldType.text,
          required: false,
          startHint: new HintValue(HintPosition.start, ""),
          width: "45%",
          value: termSource.data ? termSource.data["initial_cover"] : ""
        },
        {
          name: "end_cover_" + termSource.term_id,
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
        description: "Puede agregar aquí un comentario.",
        iconName: "",
        formGroup: this.finalFormGroup,

        content: [
          {
            name: "comment",
            label: "",
            type: FormFieldType.textarea,
            required: false,
            startHint: new HintValue(HintPosition.start, ""),
            width: "100%",
            minWidth: "100%",
            value: this.journalVersion ? this.journalVersion.comment : ""
          }
        ]
      }
    ];
  }

  private fillJournalFields() {
    // this.journalVersion.source_type = this.informationFormGroup.value['source_type'];

    this.journalVersion.data.issn.load_from_data(
      this.identifiersFormGroup.value
    );
    this.journalVersion.data.rnps.load_from_data(
      this.identifiersFormGroup.value
    );

    this.journalVersion.data.load_from_data(this.informationFormGroup.value);
    this.journalVersion.data.socialNetworks.load_from_data(
      this.informationFormGroup.value
    );

    this.source.source_type = this.informationFormGroup.value["source_type"];

    this.journalVersion.data.term_sources = [];

    this.informationFormGroup.value["licence"].forEach(term => {
      const ts = new TermSource();
      ts.term = term;
      ts.term_id = ts.term.id;
      ts.source_id = this.journalVersion.source_id;
      this.journalVersion.data.term_sources.push(ts);
    });

    this.informationFormGroup.value["cover"].forEach(term => {
      const ts = new TermSource();
      ts.term = term;
      ts.term_id = ts.term.id;
      ts.source_id = this.journalVersion.source_id;
      this.journalVersion.data.term_sources.push(ts);
    });

    this.informationFormGroup.value["subjects"].forEach(term => {
      const ts = new TermSource();
      ts.term = term;
      ts.term_id = ts.term.id;
      ts.source_id = this.journalVersion.source_id;
      this.journalVersion.data.term_sources.push(ts);
    });

    this.organizationFormGroup.value[
      "institutions"
    ].forEach((panel: JournalInstitutionsPanel) => {
      const ts = new TermSource();
      ts.load_from_data(panel.inst);
      this.journalVersion.data.term_sources.push(ts)

    }
    );

    // this.institutions.forEach(inst => {
    //   this.journalVersion.data.term_sources.push(inst);
    // });

    this.indexesPanel.forEach(panel => {
      const ts = new TermSource();
      ts.term = panel.value;
      ts.term_id = ts.term.id;
      ts.source_id = this.journalVersion.source_id;
      ts.data["url"] = this.indexesFormGroup.value["url_" + ts.term.id];
      ts.data["initial_cover"] = this.indexesFormGroup.value[
        "initial_cover_" + ts.term.id
      ];
      ts.data["end_cover"] = this.indexesFormGroup.value[
        "end_cover_" + ts.term.id
      ];
      this.journalVersion.data.term_sources.push(ts);
    });

    this.journalVersion.comment = this.finalFormGroup.value["comment"];

    console.log(this.identifiersFormGroup);
    console.log(this.informationFormGroup);
    console.log(this.organizationFormGroup);
    console.log(this.indexesFormGroup);
    console.log(this.journalVersion);
  }

  public finishStepper() {
    // console.log(this.journalVersion)
    this.fillJournalFields();
    // console.log(this.journalVersion)
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
      [panels]="indexPanel"
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
  indexPanel: PanelContent[] = null;
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
        formGroup: this.indexFormGroup,
        content: [
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
              vocab: VocabulariesInmutableNames.DATABASES
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
        const result = new TermSource();
        if (this.indexFormGroup.controls["indexes"].value) {
          result.term = this.indexFormGroup.controls["indexes"].value[0];
          result.term_id = result.term.id;
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
