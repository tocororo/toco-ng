import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SourceService, CatalogService, TaxonomyService } from '../../../backend/public-api';
import { MetadataService } from '../../../core/public-api';
import { IdentifierSchemas } from '../../../entities/common';
import { JournalData, JournalVersion, Organization, SourceClasification, SourceTypes, SourceSystems, VocabulariesInmutableNames, Term } from '../../../entities/public-api';
import { VocabularyTreeComponent } from '../../../forms/experimental/vocabulary-tree/vocabulary-tree.component';
import { PanelContent, FormContainerAction, ContainerPanelComponent, InputTextComponent, FormFieldType, HintValue, HintPosition, InputRnpsComponent, SelectComponent, TextareaComponent, InputUrlComponent, InputEmailComponent, VocabularyComponent, DatepickerComponent } from '../../../forms/public-api';

@Component({
  selector: "toco-journal-edit",
  templateUrl: "./journal-edit.component.html",
  styleUrls: ["./journal-edit.component.scss"],
})
export class JournalEditComponent implements OnInit {
  // TODO: Idea del componente:
  // trabajan internamente con un journal, si recibe null entonces es uno nuevo, si recibe un journal entonces es editar.
  // en ambos casos devuelve el journal editado, o sea el contenido, listo para hacer post en el backend.
  public pageTitle = "";

  public journalData: JournalData = null;

  @Input()
  public journalVersion: JournalVersion = null;

  @Input()
  public showEditHeader = false;

  @Input()
  public description = "";

  @Input()
  public topMainOrganization: Organization = null;

  @Input()
  public showFinalStep = true;

  // journal identifiers variables for step 0
  identifiersPanel: PanelContent = null;
  identifiersFormGroup: FormGroup;

  // journal information variables for step 1
  informationPanel: PanelContent = null;
  informationFormGroup: FormGroup;
  informationSocialFormGroup: FormGroup;

  journalCover: SourceClasification;

  organizationFormGroup: FormGroup;

  // indexes: SourceClasification[] = [];
  indexesFormGroup: FormGroup;

  // institutions: SourceClasification[] = [];
  // entityFormGroup: FormGroup;

  // indexes (databases), variables for step 3

  finalPanel: PanelContent = null;
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
    private formBuilder: FormBuilder
  ) {}

  ngOnInit() {
    this.journalData = new JournalData();
    this.journalData.deepcopy(this.journalVersion.data);

    this.pageTitle = this.journalData.isNew
      ? "Nueva Revista"
      : "Editando: " + this.journalData.title;
    this.metadata.setStandardMeta(this.pageTitle, "", "");

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
    this.informationSocialFormGroup = null;

    // this.organization = null;
    // this.organizationPanel = null;
    // this.institution = null;
    // this.institutionPanel = null;
    // this.entity = null;
    // this.entityPanel = null;
    this.organizationFormGroup = null;
    this.indexesFormGroup = null;
  }

  initStep0Identifiers() {
    this.identifiersFormGroup = this.formBuilder.group({});

    this.identifiersPanel =
      {
        name: 'identifiersPanel',
        label: 'Identificadores',
        controlType: ContainerPanelComponent,
        description: "",
        iconName: "",
        formSection: this.identifiersFormGroup,
        formSectionContent: [
          {
            formControl: InputTextComponent.getFormControlByDefault(),
            name: "issn_l",
            label: "ISSN de Enlace",
            type: FormFieldType.text,
            controlType: InputTextComponent,
            required: false,
            startHint: new HintValue(HintPosition.start, "XXXX-XXXX"),
            width: "23%",
            value: this.journalData
              ? this.journalData.getIdentifierValue(IdentifierSchemas.issn_l)
              : "",
            // value: this.journalVersion ? IssnValue.createIssnValueFromString(this.journalVersion.issn.l) : null
          },
          {
            formControl: InputTextComponent.getFormControlByDefault(),
            name: "issn_p",
            label: "ISSN Impreso",
            type: FormFieldType.text,
            controlType: InputTextComponent,
            required: false,
            startHint: new HintValue(HintPosition.start, "XXXX-XXXX"),
            width: "23%",
            value: this.journalData
              ? this.journalData.getIdentifierValue(IdentifierSchemas.issn_p)
              : "",
            // value: this.journalVersion ? IssnValue.createIssnValueFromString(this.journalVersion.issn.p) : null
          },
          {
            formControl: InputTextComponent.getFormControlByDefault(),
            name: "issn_e",
            label: "ISSN Electrónico",
            type: FormFieldType.text,
            controlType: InputTextComponent,
            required: false,
            startHint: new HintValue(HintPosition.start, "XXXX-XXXX"),
            width: "23%",
            value: this.journalData
              ? this.journalData.getIdentifierValue(IdentifierSchemas.issn_e)
              : "",
            // value: this.journalVersion ? IssnValue.createIssnValueFromString(this.journalVersion.issn.e) : null
          },
          {
            formControl: InputRnpsComponent.getFormControlByDefault(),
            name: "rnps_p",
            label: "RNPS Impreso",
            type: FormFieldType.rnps,
            controlType: InputRnpsComponent,
            required: true,
            startHint: new HintValue(HintPosition.start, "XXXX."),
            width: "23%",
            value: this.journalData
              ? this.journalData.getIdentifierValue(IdentifierSchemas.prnps)
              : "",
          },
          {
            formControl: InputRnpsComponent.getFormControlByDefault(),
            name: "rnps_e",
            label: "RNPS Electrónico",
            type: FormFieldType.rnps,
            controlType: InputRnpsComponent,
            required: true,
            startHint: new HintValue(HintPosition.start, "XXXX."),
            width: "23%",
            value: this.journalData
              ? this.journalData.getIdentifierValue(IdentifierSchemas.ernps)
              : "",
          },
        ],
      };
  }

  initStep1(): void {
    this.informationFormGroup = this.formBuilder.group({
      // 'description': descriptionControl,
      start_year: new FormControl(""),
      end_year: new FormControl(""),
    });

    this.informationSocialFormGroup = this.formBuilder.group({});

    this.informationPanel =
      {
        name: 'informationPanel',
        label: 'Datos de la Revista',
        description: "",
        iconName: "",
        controlType: ContainerPanelComponent,
        formSection: this.informationFormGroup,
        formSectionContent: [
          {
            formControl: InputTextComponent.getFormControlByDefault(),
            name: "title",
            label: "Título",
            type: FormFieldType.text,
            controlType: InputTextComponent,
            required: true,
            width: "100%",
            value: this.journalData ? this.journalData.title : "",
          },
          {
            formControl: InputTextComponent.getFormControlByDefault(),
            name: "subtitle",
            label: "Subtítulo",
            type: FormFieldType.text,
            controlType: InputTextComponent,
            required: false,
            width: "30%",
            startHint: new HintValue(HintPosition.start, ""),
            value: this.journalData ? this.journalData.subtitle : "",
          },
          {
            formControl: InputTextComponent.getFormControlByDefault(),
            name: "shortname",
            label: "Título abreviado",
            type: FormFieldType.text,
            controlType: InputTextComponent,
            required: false,
            width: "30%",
            startHint: new HintValue(HintPosition.start, ""),
            value: this.journalData ? this.journalData.shortname : "",
          },
          {
            formControl: InputTextComponent.getFormControlByDefault(),
            name: "source_type",
            label: "Tipo de Revista",
            type: FormFieldType.select_expr,
            controlType: SelectComponent,
            required: true,
            width: "30%",
            value: this.journalData ? this.journalData.source_type : "",
            extraContent: {
              multiple: false,
              getOptions: () => {
                return [
                  {
                    label: SourceTypes.JOURNAL.label,
                    value: SourceTypes.JOURNAL.value,
                  },
                  {
                    label: SourceTypes.STUDENT.label,
                    value: SourceTypes.STUDENT.value,
                  },
                  {
                    label: SourceTypes.POPULARIZATION.label,
                    value: SourceTypes.POPULARIZATION.value,
                  },
                ];
              },
            },
          },
          {
            formControl: InputTextComponent.getFormControlByDefault(),
            name: "description",
            label: "Descripción",
            type: FormFieldType.textarea,
            controlType: TextareaComponent,
            required: true,
            width: "100%",
            value: this.journalData ? this.journalData.description : "",
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
            formControl: InputUrlComponent.getFormControlByDefault(),
            name: "url",
            label: "URL",
            type: FormFieldType.url,
            controlType: InputUrlComponent,
            required: true,
            startHint: new HintValue(
              HintPosition.start,
              "Escriba una URL válida."
            ),
            width: "100%",
            value: this.journalData
              ? this.journalData.getIdentifierValue(IdentifierSchemas.url)
              : "",
          },
          {
            formControl: InputTextComponent.getFormControlByDefault(),
            name: "source_system",
            label: "Tipo de Sistema que soporta la revista",
            type: FormFieldType.select_expr,
            controlType: SelectComponent,
            required: false,
            width: "35%",
            value: this.journalData ? this.journalData.source_system : "",
            extraContent: {
              multiple: false,
              getOptions: () => {
                return [
                  {
                    label: SourceSystems.OJS.label,
                    value: SourceSystems.OJS.value,
                  },
                  {
                    label: SourceSystems.CMS.label,
                    value: SourceSystems.CMS.value,
                  },
                  {
                    label: SourceSystems.OTHER.label,
                    value: SourceSystems.OTHER.value,
                  },
                ];
              },
            },
          },
          {
            formControl: InputUrlComponent.getFormControlByDefault(),
            name: "oaiurl",
            label: "OAI-PMH",
            type: FormFieldType.url,
            controlType: InputUrlComponent,
            required: false,
            startHint: new HintValue(
              HintPosition.start,
              "Escriba una URL válida."
            ),
            width: "60%",
            value: this.journalData
              ? this.journalData.getIdentifierValue(IdentifierSchemas.oaiurl)
              : "",
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
            formControl: InputEmailComponent.getFormControlByDefault(),
            name: "email",
            label: "Correo Electrónico",
            type: FormFieldType.email,
            controlType: InputEmailComponent,
            required: true,
            startHint: new HintValue(
              HintPosition.start,
              "Escriba un email válido."
            ),
            width: "45%",
            value: this.journalData ? this.journalData.email : "",
          },
          {
            formControl: InputTextComponent.getFormControlByDefault(),
            name: "licence",
            label: "Licencia",
            type: FormFieldType.vocabulary,
            controlType: VocabularyComponent,
            required: false,
            width: "45%",
            extraContent: {
              multiple: false,
              selectedTermsIds: this.journalData
                ? this.journalData.classifications.map(
                    (termSource) => termSource.id
                  )
                : null,
              vocab: VocabulariesInmutableNames.LICENCES,
              level: 0,
            },
          },
          {
            formControl: InputTextComponent.getFormControlByDefault(),
            name: "start_year",
            label: "Año de inicio",
            type: FormFieldType.datepicker,
            controlType: DatepickerComponent,
            required: false,
            width: "30%",
            value: this.journalData ? this.journalData.start_year : "",
          },
          {
            formControl: InputTextComponent.getFormControlByDefault(),
            name: "end_year",
            label: "Año final",
            type: FormFieldType.datepicker,
            controlType: DatepickerComponent,
            required: false,
            width: "30%",
            value: this.journalData ? this.journalData.end_year : "",
          },
          {
            formControl: InputTextComponent.getFormControlByDefault(),
            name: "frequency",
            label: "Frecuencia",
            type: FormFieldType.text,
            controlType: InputTextComponent,
            required: false,
            startHint: new HintValue(HintPosition.start, ""),
            width: "30%",
            value: this.journalData ? this.journalData.frequency : "",
          },
          // {
          //   // TODO: el top level de unesco de materias....
          //   name: "cover",
          //   label: "Cobertura Temática",
          //   type: FormFieldType.select_expr,
          //   required: true,
          //   width: "45%",
          //   extraContent: {
          //     multiple: false,
          //     observable: this.taxonomyService.getTermsTreeByVocab(
          //       VocabulariesInmutableNames.SUBJECTS,
          //       0
          //     ),
          //     getOptions: (response: any) => {
          //       const opts: SelectOption[] = [];
          //       response.data.tree.term_node.forEach((node: TermNode) => {
          //         opts.push({
          //           value: node.term,
          //           label: node.term.description,
          //         });
          //       });
          //       return opts;
          //     },
          //     selectionChange: (term) => {
          //       this.journalCover = new SourceClasification();
          //       this.journalCover.description = term.description;
          //       this.journalCover.id = term.uuid;
          //       this.journalCover.vocabulary = term.vocabulary_id;

          //     },
          //   },
          // },
          {
            formControl: InputTextComponent.getFormControlByDefault(),
            name: "subjects",
            label: "Materias",
            type: FormFieldType.vocabulary_tree,
            controlType: VocabularyTreeComponent,
            required: false,
            width: "80%",
            extraContent: {
              multiple: true,
              selectedTermsIds: this.journalData
                ? this.journalData.classifications.map(
                    (termSource) => termSource.id
                  )
                : null,
              vocab: VocabulariesInmutableNames.SUBJECTS,
              level: 1,
            },
          },
          {
            formControl: InputUrlComponent.getFormControlByDefault(),
            name: "facebook",
            label: "Facebook",
            type: FormFieldType.url,
            controlType: InputUrlComponent,
            required: false,
            width: "33%",
            value: this.journalData
              ? this.journalData.socialNetworks.facebook
              : "",
          },
          {
            formControl: InputUrlComponent.getFormControlByDefault(),
            name: "twitter",
            label: "Twitter",
            type: FormFieldType.url,
            controlType: InputUrlComponent,
            required: false,
            width: "33%",
            value: this.journalData
              ? this.journalData.socialNetworks.twitter
              : "",
          },
          {
            formControl: InputUrlComponent.getFormControlByDefault(),
            name: "linkedin",
            label: "LinkedIN",
            type: FormFieldType.url,
            controlType: InputUrlComponent,
            required: false,
            width: "33%",
            value: this.journalData
              ? this.journalData.socialNetworks.linkedin
              : "",
          }
        ],
      };
      // {
      //   title: "Redes Sociales",
      //   description: "",
      //   iconName: "",
      //   formSection: this.informationFormGroup,
      //   formSectionContent: [
      //     {
      //       name: "facebook",
      //       label: "Facebook",
      //       type: FormFieldType.url,
      //       required: false,
      //       width: "33%",
      //       value: this.journalData
      //         ? this.journalData.socialNetworks.facebook
      //         : "",
      //     },
      //     {
      //       name: "twitter",
      //       label: "Twitter",
      //       type: FormFieldType.url,
      //       required: false,
      //       width: "33%",
      //       value: this.journalData
      //         ? this.journalData.socialNetworks.twitter
      //         : "",
      //     },
      //     {
      //       name: "linkedin",
      //       label: "LinkedIN",
      //       type: FormFieldType.url,
      //       required: false,
      //       width: "33%",
      //       value: this.journalData
      //         ? this.journalData.socialNetworks.linkedin
      //         : "",
      //     },
      //   ],
      // },

  }

  initStep2() {
    this.organizationFormGroup = this.formBuilder.group({
      institutions: new FormControl(""),
    });
  }

  initStep3() {
    this.indexesFormGroup = this.formBuilder.group({});
  }
  indexerStepper() {
    // console.log(this.journalData);

    // this.indexes = this.journalData.classifications.filter(
    //   (value) => value.vocabulary == VocabulariesInmutableNames.INDEXES
    // );
    // console.log(this.indexes);
  }

  initStepFinal() {
    this.finalFormGroup = this.formBuilder.group({});
    this.finalPanel =
      {
        name: 'finalPanel',
        label: '',
        description: "",
        iconName: "",
        formSection: this.finalFormGroup,
        controlType: ContainerPanelComponent,
        formSectionContent: [
          {
            formControl: InputTextComponent.getFormControlByDefault(),
            name: "comment",
            label: "Puede agregar aquí un comentario.",
            type: FormFieldType.textarea,
            controlType: TextareaComponent,
            required: false,
            startHint: new HintValue(HintPosition.start, ""),
            width: "100%",
            minWidth: "100%",
            value: this.journalData ? this.journalData._save_info.comment : "",
          },
        ],
      };
  }

  private fillJournalFields() {
    // this.journalVersion.source_type = this.informationFormGroup.value['source_type'];

    this.journalData.setIdentifierValue(
      IdentifierSchemas.issn_p,
      this.identifiersFormGroup.value.issn_p
    );
    this.journalData.setIdentifierValue(
      IdentifierSchemas.issn_e,
      this.identifiersFormGroup.value.issn_e
    );
    this.journalData.setIdentifierValue(
      IdentifierSchemas.issn_l,
      this.identifiersFormGroup.value.issn_l
    );
    this.journalData.setIdentifierValue(
      IdentifierSchemas.prnps,
      this.identifiersFormGroup.value.rnps_p
    );
    this.journalData.setIdentifierValue(
      IdentifierSchemas.ernps,
      this.identifiersFormGroup.value.rnps_e
    );

    // this.journalVersion.issn.deepcopy(
    //   this.identifiersFormGroup.value
    // );
    // this.journalVersion.rnps.deepcopy(
    //   this.identifiersFormGroup.value
    // );

    console.log(this.informationFormGroup)
    this.journalData.deepcopy(this.informationFormGroup.value);
    this.journalData.socialNetworks.deepcopy(this.informationFormGroup.value);

    this.journalData.setIdentifierValue(
      IdentifierSchemas.url,
      this.informationFormGroup.value.url
    );
    this.journalData.setIdentifierValue(
      IdentifierSchemas.oaiurl,
      this.informationFormGroup.value.oaiurl
    );

    this.journalData.source_type = this.informationFormGroup.value[
      "source_type"
    ];

    const indexes = this.journalData.classifications.filter(
      (value) => value.vocabulary == VocabulariesInmutableNames.INDEXES
    );
    this.journalData.classifications = [];

    if (this.informationFormGroup.value["licence"]){
        this.informationFormGroup.value["licence"].forEach((term: Term) => {
        const ts = new SourceClasification();
        ts.description = term.description;
        ts.id = term.uuid;
        ts.vocabulary = term.vocabulary_id;
        this.journalData.classifications.push(ts);
      });
    }
    // this.informationFormGroup.value["cover"].forEach((term) => {
    //   const ts = new SourceClasification();
    //   ts.description = term.description;
    //   ts.id = term.uuid;
    //   ts.vocabulary = term.vocabulary_id;
    //   this.journalData.classifications.push(ts);
    // });

    if (this.informationFormGroup.value["subjects"]){
      this.informationFormGroup.value["subjects"].forEach((term) => {
        const ts = new SourceClasification();
        ts.description = term.description;
        ts.id = term.uuid;
        ts.vocabulary = term.vocabulary_id;
        this.journalData.classifications.push(ts);
      });

    }

    console.log(indexes);
    this.journalData.classifications = this.journalData.classifications.concat(
      indexes
    );
    // this.journalData.organizations = this.source.data.organizations;

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
    // console.log(this.indexesPanel);
    // this.indexesPanel.forEach(panel => {
    //   const ts = new SourceClasification();
    //   const term: Term = panel.value;
    //   ts.description = term.description;
    //   ts.id = term.uuid;
    //   ts.vocabulary = term.vocabulary_id;
    //   ts.data['url'] = this.indexesFormGroup.value['url_' + ts.id];
    //   ts.data['initial_cover'] = this.indexesFormGroup.value[
    //     'initial_cover_' + ts.id
    //   ];
    //   ts.data['end_cover'] = this.indexesFormGroup.value[
    //     'end_cover_' + ts.id
    //   ];
    //   this.journalData.classifications.push(ts);
    // });

    this.journalData._save_info.comment = this.finalFormGroup.value["comment"];
    this.journalVersion.comment = this.finalFormGroup.value["comment"];
    this.journalVersion.data.deepcopy(this.journalData);

    console.log(this.identifiersFormGroup);
    console.log(this.informationFormGroup);
    console.log(this.organizationFormGroup);
    console.log(this.indexesFormGroup);
    console.log(this.journalData);
  }

  public finishStepper() {
    console.log(this.journalData);
    // console.log(this.journalVersion, this)
    this.fillJournalFields();

    console.log(this.journalData);
    this.journalEditDone.emit(this.journalVersion);
  }
  public cancelStepper() {
    this.editCanceled.emit(true);
  }
}
