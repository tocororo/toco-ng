import { Component, OnInit, ViewChild, Inject } from "@angular/core";
import {
  FormContainerAction,
  PanelContent,
  FormFieldType,
  HintValue,
  HintPosition,
  SelectOption,
  PanelContent_Depr
} from "@toco/tools/forms";
import { FormGroup, FormBuilder, FormControl } from "@angular/forms";
import { CatalogService, SourceService } from "@toco/tools/backend";
import {
  Journal,
  SourcePersonRole,
  JournalVersion
} from "@toco/tools/entities";
import { FilterHttpMap } from "@toco/tools/filters";
import { StatusCode, HandlerComponent, MessageHandler } from "@toco/tools/core";
import { MatDialog, MatStep, MatStepper, MAT_DIALOG_DATA } from "@angular/material";

@Component({
  selector: "toco-journal-inclusion",
  templateUrl: "./journal-inclusion.component.html",
  styleUrls: ["./journal-inclusion.component.scss"]
})
export class JournalInclusionComponent implements OnInit {
  public journal: Journal = null;
  public versionToEdit: JournalVersion = null;

  public loading = false;
  public isStartProcess = true;

  public searchJournalAction: FormContainerAction;
  findPanel: PanelContent_Depr[] = [];
  findFormGroup: FormGroup;

  personPanel: PanelContent_Depr[] = [];
  personFormGroup: FormGroup;

  agreementPanel: PanelContent_Depr[] = [];
  agreementFormGroup: FormGroup;

  constructor(
    private catalogService: CatalogService,
    private sourceService: SourceService,
    private _formBuilder: FormBuilder,
    public dialog: MatDialog
  ) {}

  ngOnInit() {
    this.findFormGroup = this._formBuilder.group({});
    this.findPanel = [
      {
        title: "Introduzca el ISSN de la revista que desea incluir.",
        description: "",
        iconName: "",
        formSection: this.findFormGroup,
        formSectionContent: [
          {
            name: "idenfifier",
            label: "Identificador",
            type: FormFieldType.text,
            required: true,
            startHint: new HintValue(
              HintPosition.start,
              "(ISSN, RNPS, URL, Título)"
            ),
            width: "100%"
          }
        ]
      }
    ];

    // this.personFormGroup = this._formBuilder.group({});
    // this.personPanel = [
    //   {
    //     title: "Seleccione su rol en la revista",
    //     description: "",
    //     iconName: "",
    //     formSection: this.personFormGroup,
    //     formSectionContent: [
    //       {
    //         name: "role",
    //         label: "Rol",
    //         type: FormFieldType.select_expr,
    //         required: true,
    //         width: "45%",
    //         value: this.journal ? this.journal.source_type : "",
    //         extraContent: {
    //           getOptions: () => {
    //             const opts: SelectOption[] = [];
    //             Object.keys(SourcePersonRole).forEach(key => {
    //               opts.push({
    //                 value: SourcePersonRole[key].value,
    //                 label: SourcePersonRole[key].label
    //               });
    //             });
    //             return opts;
    //           }
    //         }
    //       }
    //     ]
    //   }
    // ];

    // this.agreementFormGroup = this._formBuilder.group({
    //   agree: new FormControl(false)
    // });
    // this.agreementPanel = [
    //   {
    //     title: "Acuerdo Legal",
    //     description: "",
    //     iconName: "",
    //     formSection: this.agreementFormGroup,
    //     formSectionContent: [
    //       {
    //         name: "role",
    //         label: "Rol",
    //         type: FormFieldType.select_expr,
    //         required: true,
    //         width: "45%",
    //         value: this.journal ? this.journal.source_type : "",
    //         extraContent: {
    //           getOptions: () => {
    //             const opts: SelectOption[] = [];
    //             Object.keys(SourcePersonRole).forEach(key => {
    //               opts.push({
    //                 value: SourcePersonRole[key].value,
    //                 label: SourcePersonRole[key].label
    //               });
    //             });
    //             return opts;
    //           }
    //         }
    //       },
    //       {
    //         name: "agree",
    //         label: "Acepto",
    //         type: FormFieldType.checkbox,
    //         required: true,
    //         width: "50%",
    //         value: false
    //       },
    //       {
    //         name: "comment",
    //         label:
    //           "Puede escribir aquí un comentario para los gestores del sistema.",
    //         type: FormFieldType.textarea,
    //         required: true,
    //         width: "100%",
    //         value: ""
    //       }
    //     ]
    //   }
    // ];

    this.searchJournalAction = {
      doit: (data: any) => {
        this.loading = true;
        const httpParams = [
          // new FilterHttpMap('issn', data.idenfifier),
          // new FilterHttpMap('rnps', data.idenfifier),
          // new FilterHttpMap('url', data.idenfifier),
          new FilterHttpMap("title", data.idenfifier)
        ];

        this.journal = new Journal();
        this.versionToEdit = new JournalVersion();
        const m = new MessageHandler(null, this.dialog);
        let title = "No hemos encontrado información";
        let content =
          "Debe completar todos los datos solicitados para incluir la revista.";

        this.catalogService.getJournalsPage(10, 0, httpParams).subscribe(
          response => {
            if (response.data && response.data.sources.count === 1) {
              console.log(response.data);
              this.sourceService
                .getSourceVersions(response.data.sources.data[0].uuid)
                .subscribe(
                  response => {
                    console.log(response);
                    this.journal.deepcopy(response.data.source);
                    this.journal.versions.forEach(version => {
                      if (version.is_current) {
                        title = "Tenemos información sobre la revista";
                        content =
                          "Compruebe y complete todos los datos solicitados para incluir la revista.";
                        this.versionToEdit.data.deepcopy(version.data);
                        this.isStartProcess = false;
                        this.loading = false;
                        m.showMessage(
                          StatusCode.OK,
                          content,
                          HandlerComponent.dialog,
                          title
                        );
                      }
                    });
                  },
                  (error: any) => {},
                  () => {}
                );
            } else {
              this.sourceService.getIssnInfo(data.idenfifier).subscribe(
                response => {
                  if (response.data && response.data.issn_org) {
                    this.journal.data.issn.issn_org.deepcopy(
                      response.data.issn_org
                    );
                    this.versionToEdit.data.issn.issn_org.deepcopy(
                      response.data.issn_org
                    );
                  }
                  this.journal.isNew = true;
                  this.loading = false;
                  this.isStartProcess = false;
                  m.showMessage(
                    StatusCode.OK,
                    content,
                    HandlerComponent.dialog,
                    title
                  );
                },
                (error: any) => {},
                () => {}
              );
            }
          },
          (error: any) => {},
          () => {}
        );
      }
    };
  }

  journalEditDone() {
    // this.isEditig = false;
    // this.isViewing = true;
    // console.log(this.versionToEdit)
    // this.journalStep.completed = true;
    // this.journalStep.hasError = false;
    // this.stepper.next();
  }
  resetEdit() {
    this.journal = null;
    this.isStartProcess = true;
  }

  finishInclusion() {

    let dialogRef;
      this.dialog.open(JournalInclusionAcceptComponent, {
        data: {
          accept: (role) => {
            this.dialog.closeAll();
            console.log(" KONIEC", role);

          }
        }
      });
  }
}





@Component({
  selector: "toco-journal-addinstextra",
  template: `

  <h2>
  Acuerdo legal
</h2>
<p>
  texto del acuerdo legal
</p>

<h3>Subtitulo</h3>
<p>algo mas...</p>


  <toco-form-container
  [panelsContent]="agreementPanel"
  [useAccordion]="false"
  [formGroup]="agreementFormGroup"
  [action]="acceptAction"
  [actionLabel]="'Terminar'"
>
</toco-form-container>
  `
})
export class JournalInclusionAcceptComponent implements OnInit {

  agreementPanel: PanelContent_Depr[] = [];
  agreementFormGroup: FormGroup;

  accept;
  acceptAction: FormContainerAction;

  constructor(
    private _formBuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {

    this.accept = data.accept;
  }

  ngOnInit() {
    this.agreementFormGroup = this._formBuilder.group({
      agree: new FormControl(false)
    });
    this.agreementPanel = [
      {
        title: "Acuerdo Legal",
        description: "",
        iconName: "",
        formSection: this.agreementFormGroup,
        formSectionContent: [
          {
            name: "role",
            label: "Rol",
            type: FormFieldType.select_expr,
            required: true,
            width: "100%",
            value: null,
            extraContent: {
              getOptions: () => {
                const opts: SelectOption[] = [];
                Object.keys(SourcePersonRole).forEach(key => {
                  opts.push({
                    value: SourcePersonRole[key].value,
                    label: SourcePersonRole[key].label
                  });
                });
                return opts;
              }
            }
          },
          {
            name: "agree",
            label: "Acepto",
            type: FormFieldType.checkbox,
            required: true,
            width: "100%",
            value: false
          },
        ]
      }
    ];

    this.acceptAction = {
      doit: (data: any) => {
        if (this.agreementFormGroup.status == 'VALID'){
          this.accept(this.agreementFormGroup.value['role']);
        }

      }
    };
  }
}
