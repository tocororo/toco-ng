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
import { CatalogService, SourceService, SourceServiceNoAuth } from "@toco/tools/backend";
import {
  Journal,
  SourcePersonRole,
  JournalVersion, Source, SourceVersion, SourceTypes
} from "@toco/tools/entities";
import { FilterHttpMap } from "@toco/tools/filters";
import { StatusCode, HandlerComponent, MessageHandler } from "@toco/tools/core";
import { MatDialog, MatStep, MatStepper, MAT_DIALOG_DATA } from "@angular/material";
import { Router } from '@angular/router';

@Component({
  selector: "toco-source-inclusion",
  templateUrl: "./source-inclusion.component.html",
  styleUrls: ["./source-inclusion.component.scss"]
})
export class SourceInclusionComponent implements OnInit {
  public source: Source = null;
  public versionToEdit: SourceVersion = null;

  public sourceType = SourceTypes;

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
    private sourceServiceNoAuth: SourceServiceNoAuth,
    private _formBuilder: FormBuilder,
    public dialog: MatDialog,
    private _router: Router,
  ) { }

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

    this.searchJournalAction = {
      doit: (data: any) => {
        this.loading = true;
        const httpParams = [
          // new FilterHttpMap('issn', data.idenfifier),
          // new FilterHttpMap('rnps', data.idenfifier),
          // new FilterHttpMap('url', data.idenfifier),
          new FilterHttpMap("title", data.idenfifier)
        ];


        const m = new MessageHandler(null, this.dialog);
        let title = "No hemos encontrado información";
        let content =
          "Debe completar todos los datos solicitados para incluir la revista.";

        this.sourceServiceNoAuth.getSourceByISSN(data.idenfifier).subscribe(
          response => {
            if (response && response.metadata) {
              this.source = new Journal();
              this.versionToEdit = new JournalVersion();
              console.log(response.metadata);
              this.source.deepcopy(response.metadata);
              this.versionToEdit.source_uuid = response.metadata.id;
              this.versionToEdit.data.deepcopy(response.metadata);

              title = "Tenemos información sobre la revista";
              content =
                "Compruebe y complete todos los datos solicitados para incluir la revista.";

              this.isStartProcess = false;
              this.loading = false;
              m.showMessage(
                StatusCode.OK,
                content,
                HandlerComponent.dialog,
                title
              );
            } else {
              this.sourceServiceNoAuth.getSourceByPID(data.idenfifier).subscribe(
                response => {
                  if (response && response.metadata) {
                    let src = response.metadata;
                    switch (src.source_type) {
                      case this.sourceType.JOURNAL.value:
                        this.source = new Journal();
                        this.versionToEdit = new JournalVersion();
                        console.log(response.metadata);
                        this.source.deepcopy(response.metadata);
                        this.versionToEdit.source_uuid = response.metadata.id;
                        this.versionToEdit.data.deepcopy(response.metadata);
                        title = 'Tenemos información sobre la revista';
                        content = "Compruebe y complete todos los datos solicitados para incluir la revista.";
                        break;
                      default:
                        title = 'No soportado';
                        content = 'El identificador: ' +
                                  data.idenfifier +
                                  'no pertenece a una revista. Este sistema no soporta esta funcionalidad.';
                        this.source = new Source();
                        this.source.data.deepcopy(src);
                    }
                    this.loading = false;
                    m.showMessage(
                      StatusCode.OK,
                      content,
                      HandlerComponent.dialog,
                      title
                    );

                  } else {
                    this.source = new Journal();
                    this.versionToEdit = new JournalVersion();
                    this.source.isNew = true;
                    this.versionToEdit.isNew = true;
                    this.loading = false;
                    this.isStartProcess = false;
                    m.showMessage(
                      StatusCode.OK,
                      content,
                      HandlerComponent.dialog,
                      title
                    );
                  }
                },
                (error: any) => { },
                () => { }
              );
            }
          },
          (error: any) => { },
          () => { }
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
    this.source = null;
    this.isStartProcess = true;
  }

  finishInclusion() {

    let dialogRef;
    this.dialog.open(SourceInclusionAcceptComponent, {
      data: {
        accept: (role) => {
          this.dialog.closeAll();
          console.log(" KONIEC", role, this.versionToEdit);
          this.sourceService.newSource(this.versionToEdit, this.versionToEdit.source_uuid, role)
          .subscribe(
            (values) => {
              console.log(values);
              this._router.navigate(['sources', this.versionToEdit.source_uuid, 'view']);
            },
            (err: any) => {
              console.log('error: ' + err + '.');
            },
            () => {
              console.log('complete');
            }
          );

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
export class SourceInclusionAcceptComponent implements OnInit {

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
        if (this.agreementFormGroup.status == 'VALID') {
          this.accept(this.agreementFormGroup.value['role']);
        }

      }
    };
  }
}
