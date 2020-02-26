
import { Component, Input, OnInit, Inject, Output, EventEmitter } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { of } from 'rxjs';
import { catchError, finalize } from 'rxjs/operators';
import { MatDialog, MatSnackBar, MAT_DIALOG_DATA } from '@angular/material';

import { CatalogService, TaxonomyService, SourceService } from '@toco/tools/backend';
import { MessageHandler, StatusCode, HandlerComponent, MetadataService } from '@toco/tools/core';
import { Vocabulary, Journal, SourceTypes, Term, TermSource, TermNode, VocabulariesInmutableNames, JournalVersion } from '@toco/tools/entities';
import { FilterHttpMap } from '@toco/tools/filters';
import { PanelContent, FormFieldType, HintValue, HintPosition, FormContainerAction, IssnValue, SelectOption } from '@toco/tools/forms';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { ConstantPool } from '@angular/compiler';



@Component({
  selector: 'toco-journal-edit',
  templateUrl: './journal-edit.component.html',
  styleUrls: ['./journal-edit.component.scss']
})
export class JournalEditComponent implements OnInit {
  // TODO: Idea del componente:
  // trabajan internamente con un journal, si recibe null entonces es uno nuevo, si recibe un journal entonces es editar.
  // en ambos casos devuelve el journal editado, o sea el contenido, listo para hacer post en el backend.
  public pageTitle = '';
  @Input()
  public journalVersion: JournalVersion = null;

  // journal information variables for step 1
  informationPanel: PanelContent[] = null;
  informationFormGroup: FormGroup;

  // organization, institution and entity, variables for step 2
  public organization: Term = null;
  organizationPanel: PanelContent[] = null;
  organizationFormGroup: FormGroup;
  // institution
  public institution: Term = null;
  institutionPanel: PanelContent[] = null;
  institutionFormGroup: FormGroup;
  // entity
  public entity: Term = null;
  entityPanel: PanelContent[] = null;

  public isManageByEntity = true;
  // entityFormGroup: FormGroup;

  // indexes (databases), variables for step 3
  indexesPanel: PanelContent[] = null;
  indexesFormGroup: FormGroup;
  indexAction: FormContainerAction;

  finalPanel: PanelContent[] = null;
  finalFormGroup: FormGroup;

  // actions, if needed
  stepperStep = 0;
  stepAction1: FormContainerAction;
  stepAction2: FormContainerAction;
  stepAction3: FormContainerAction;
  stepAction4: FormContainerAction;

  // TODO: Esto se puede hacer mejor, con un emiter alcanza
  @Output()
  journalEditDone = new EventEmitter<JournalVersion>();

  @Output()
  editCanceled = new EventEmitter<boolean> ();

  public constructor(
    private metadata: MetadataService,
    private sourceService: SourceService,
    private catalogService: CatalogService,
    private taxonomyService: TaxonomyService,
    public _snackBar: MatSnackBar,
    private _formBuilder: FormBuilder,
    public dialog: MatDialog) { }

  ngOnInit() {
    this.pageTitle = (this.journalVersion.isNew)? "Nueva Revista" : "Editando : " + this.journalVersion.data.title;
    this.metadata.setTitleDescription(this.pageTitle, "");

    console.log('journal edit INIT');
    this.resetStepper();

    this.stepperStep = 1;
    this.initStep1();
    this.initStep2();
    this.initStep3();
    this.initStepFinal() ;


  }

  resetStepper() {
    this.stepperStep = 0;

    this.informationPanel = null;
    this.informationFormGroup = null;

    this.organization = null;
    this.organizationPanel = null;
    this.institution = null;
    this.institutionPanel = null;
    this.entity = null;
    this.entityPanel = null;
    this.organizationFormGroup = null;

    this.indexesPanel = null;
    this.indexesFormGroup = null;
  }

  previusStep() {
    this.stepperStep -= 1;
  }

  initStep1(): void {

    this.informationFormGroup = this._formBuilder.group({
      // 'description': descriptionControl,
      start_year: new FormControl(''),
      end_year: new FormControl(''),
    });

    this.informationPanel = [
      {
        title: 'Identificadores',
        description: '',
        iconName: '',
        formGroup: this.informationFormGroup,
        content: [
          {
            name: 'p',
            label: 'ISSN Impreso',
            type: FormFieldType.text,
            required: false,
            startHint: new HintValue(HintPosition.start, 'XXXX-XXXX'),
            width: '23%',
            value: this.journalVersion ? this.journalVersion.data.issn.p : ''
            // value: this.journalVersion ? IssnValue.createIssnValueFromString(this.journalVersion.data.issn.p) : null
          },
          {
            name: 'e',
            label: 'ISSN Electrónico',
            type: FormFieldType.text,
            required: false,
            startHint: new HintValue(HintPosition.start, 'XXXX-XXXX'),
            width: '23%',
            value: this.journalVersion ? this.journalVersion.data.issn.e : ''
            // value: this.journalVersion ? IssnValue.createIssnValueFromString(this.journalVersion.data.issn.e) : null
          },
          {
            name: 'l',
            label: 'ISSN de Enlace',
            type: FormFieldType.text,
            required: false,
            startHint: new HintValue(HintPosition.start, 'XXXX-XXXX'),
            width: '23%',
            value: this.journalVersion ? this.journalVersion.data.issn.l : ''
            // value: this.journalVersion ? IssnValue.createIssnValueFromString(this.journalVersion.data.issn.l) : null
          },
          {
            name: 'rnps',
            label: 'RNPS',
            type: FormFieldType.rnps,
            required: true,
            startHint: new HintValue(HintPosition.start, 'XXXX.'),
            width: '23%',
            value: this.journalVersion ? this.journalVersion.data.rnps : ''
          },
        ]
      },
      {
        title: 'Informacion de la Revista',
        description: '',
        iconName: '',
        formGroup: this.informationFormGroup,
        content: [
          {
            name: 'title',
            label: 'Título',
            type: FormFieldType.text,
            required: true,
            width: '100%',
            value: this.journalVersion ? this.journalVersion.data.title : ''
          },
          {
            name: 'url',
            label: 'URL',
            type: FormFieldType.url,
            required: true,
            startHint: new HintValue(HintPosition.start, 'Escriba una URL válida.'),
            width: '100%',
            value: this.journalVersion ? this.journalVersion.data.url : ''
          },
          {
            name: 'subtitle',
            label: 'Subtítulo',
            type: FormFieldType.text,
            required: false,
            width: '45%',
            startHint: new HintValue(HintPosition.start, ''),
            value: this.journalVersion ? this.journalVersion.data.subtitle : ''
          },
          {
            name: 'shortname',
            label: 'Título abreviado',
            type: FormFieldType.text,
            required: false,
            width: '45%',
            startHint: new HintValue(HintPosition.start, ''),
            value: this.journalVersion ? this.journalVersion.data.shortname : ''
          },
          {
            name: 'description',
            label: 'Descripción',
            type: FormFieldType.textarea,
            required: true,
            width: '100%',
            value: this.journalVersion ? this.journalVersion.data.description : ''
          },
          {
            name: 'purpose',
            label: 'Propósito',
            type: FormFieldType.textarea,
            required: true,
            width: '100%',
            value: this.journalVersion ? this.journalVersion.data.purpose : ''
          },
          {
            name: 'seriadas_cubanas',
            label: 'URL en Seriadas Cubanas',
            type: FormFieldType.url,
            required: false,
            startHint: new HintValue(HintPosition.start, ''),
            width: '100%',
            value: this.journalVersion ? this.journalVersion.data.seriadas_cubanas : ''
          },
          {
            name: 'email',
            label: 'Correo Electrónico',
            type: FormFieldType.email,
            required: true,
            startHint: new HintValue(HintPosition.start, 'Escriba un email válido.'),
            width: '45%',
            value: this.journalVersion ? this.journalVersion.data.email : ''
          },
          {
            name: 'start_year',
            label: 'Año de inicio',
            type: FormFieldType.datepicker,
            required: false,
            width: '30%',
            value: this.journalVersion ? this.journalVersion.data.start_year : ''
          },
          {
            name: 'end_year',
            label: 'Año final',
            type: FormFieldType.datepicker,
            required: false,
            width: '30%',
            value: this.journalVersion ? this.journalVersion.data.end_year : ''
          },
          {
            name: 'frequency',
            label: 'Frecuencia',
            type: FormFieldType.text,
            required: false,
            startHint: new HintValue(HintPosition.start, ''),
            width: '30%',
            value: this.journalVersion ? this.journalVersion.data.frequency : ''
          },
          {
            name: 'subjects',
            label: 'Materias',
            type: FormFieldType.vocabulary,
            required: true,
            width: '45%',
            extraContent: {
              multiple: true,
              selectedTermsIds: this.journalVersion ? this.journalVersion.data.term_sources.map(termSource => termSource.term_id) : null,
              vocab: VocabulariesInmutableNames.SUBJECTS
            },
          },
          {
            name: 'licence',
            label: 'Licencia',
            type: FormFieldType.vocabulary,
            required: false,
            width: '45%',
            extraContent: {
              multiple: false,
              selectedTermsIds: this.journalVersion ? this.journalVersion.data.term_sources.map(termSource => termSource.term_id) : null,
              vocab: VocabulariesInmutableNames.LICENCES
            },
          },
        ]
      },
      {
        title: 'Redes Sociales',
        description: '',
        iconName: '',
        formGroup: this.informationFormGroup,
        content: [
          {
            name: 'facebook',
            label: 'Facebook',
            type: FormFieldType.url,
            required: false,
            width: '33%',
            value: this.journalVersion ? this.journalVersion.data.socialNetworks.facebook : ''
          },
          {
            name: 'twitter',
            label: 'Twitter',
            type: FormFieldType.url,
            required: false,
            width: '33%',
            value: this.journalVersion ? this.journalVersion.data.socialNetworks.twitter : ''
          },
          {
            name: 'linkedin',
            label: 'LinkedIN',
            type: FormFieldType.url,
            required: false,
            width: '33%',
            value: this.journalVersion ? this.journalVersion.data.socialNetworks.linkedin : ''
          },
        ]
      }
    ];

  }

  initStep2() {
    // get data for and create institutional panel (second step)
    let termSource: TermSource = null;
    if (this.journalVersion) {
      termSource = this.journalVersion.data.term_sources.find((termSource: TermSource) => {
        if (termSource.term.vocabulary_id == VocabulariesInmutableNames.INTITUTION) {
          return termSource;
        }
      });
      
      // si la revista no tiene ninguna institucion
      if (!termSource){
        // termSource = new TermSource();
        // termSource.term = new Term();
        // termSource.term.isNew = true;
        // termSource.term.vocabulary_id = VocabulariesInmutableNames.INTITUTION;
        // this.journalVersion.organization = termSource.term;
        // this.journalVersion.institution = termSource.term;
        // this.journalVersion.entity = termSource.term;
        this.organization = null;
        this.institution = null;
        this.entity = null;
        this.initOrganizationPanel();
      }
      else if (termSource && !termSource.term.isNew) {
        this.taxonomyService.getTermByUUID(termSource.term.uuid, -3)
          .subscribe(response => {
            if (!response.data) {
              return;
            }
            const hierarchy: TermNode = response.data.term_node;
            if (hierarchy.parent) {
              if (hierarchy.parent.parent) {
                this.organization = new Term();
                this.organization.load_from_data(hierarchy.parent.parent.term);
                this.institution = new Term();
                this.institution.load_from_data(hierarchy.parent.term);
                this.entity = new Term();
                this.entity.load_from_data(hierarchy.term);
                // Se asume que la revista solo se puede relacionar con elementos de hasta el tercer nivel de la jerarquia institucional
                if (hierarchy.parent.parent.parent) {
                  this.organization = null;
                  this.institution = null;
                  this.entity = null;
                }
              } else {
                this.organization = new Term();
                this.organization.load_from_data(hierarchy.parent.term);
                this.institution = new Term();
                this.institution.load_from_data(hierarchy.term);
              }
            } else {
              this.organization = new Term();
              this.organization.load_from_data(hierarchy.term);
            }
            this.initOrganizationPanel();
          });
      } else if (this.journalVersion.organization) {
        this.organization = this.journalVersion.organization;
        this.institution = this.journalVersion.institution;
        this.entity = this.journalVersion.entity;
        this.initOrganizationPanel();
      }
    }
  }
  initOrganizationPanel() {
    this.organizationFormGroup = this._formBuilder.group({});

    this.organizationPanel = [{
      title: 'Organismo',
      description: 'Organismo al que pertenece la revista (OAC)',
      iconName: '',
      formGroup: this.organizationFormGroup,
      content: [
        {
          name: 'organization',
          label: 'Organismo',
          type: FormFieldType.select,
          required: true,
          width: '100%',
          value: this.organization ? this.organization.uuid : '',
          extraContent: {
            observable: this.taxonomyService.getTermsTreeByVocab(VocabulariesInmutableNames.INTITUTION, 0),
            getOptions:  (response:any) => {
              const opts: SelectOption[] = [];
              response.data.tree.term_node.forEach((node: TermNode) => {
                opts.push({
                  value: node.term.uuid,
                  label: node.term.name,
                });
              });
              return opts;
            },
            selectionChange: (uuid) => {
              console.log("organizatioon")
              if (!uuid) { return; }
              this.taxonomyService.getTermByUUID(uuid, 1)
                .subscribe(
                  (response) => {
                    if (!response.data &&
                      !response.data.term_node &&
                      !response.data.term_node.term) {
                      return;
                    }

                    this.organization = new Term();
                    this.organization.load_from_data(response.data.term_node.term);
                    this.journalVersion.organization = this.organization;

                    if (this.institution &&
                      this.organization.id != this.institution.parent_id) {

                      this.institution = null;
                      this.institutionPanel = null;
                      this.entity = null;
                      this.entityPanel = null;
                    }
                    this.initInstitutionPanel(response.data.term_node.children, this.organizationFormGroup);
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
        }]
    }];
  }

  initInstitutionPanel(children: TermNode[] = null, formGroup: FormGroup) {
    console.log(this.organizationFormGroup);
    // this.institutionFormGroup = this._formBuilder.group({});
    this.institutionPanel = [
      {
        title: 'Institución',
        description: 'Institución a la que pertenece la revista',
        iconName: '',
        formGroup: this.organizationFormGroup,
        content: [
          {
            name: 'institution',
            label: 'Institución',
            type: FormFieldType.select,
            required: true,
            width: '100%',
            value: this.institution ? this.institution.uuid : null,
            extraContent: {
              getOptions: () => {
                const opts: SelectOption[] = [];
                if (children) {
                  children.forEach((node: TermNode) => {
                    opts.push({
                      value: node.term.uuid,
                      label: node.term.name,
                    });
                  });
                } else if (this.organization) {
                  console.log("instituytion")
                  this.taxonomyService.getTermByUUID(this.organization.uuid, 1)
                    .subscribe(response => {
                      if (!response.data &&
                        !response.data.term_node &&
                        !response.data.term_node.children) {
                        return;
                      }
                      response.data.term_node.children.forEach((node: TermNode) => {
                        opts.push({
                          value: node.term.uuid,
                          label: node.term.name,
                        });
                      });
                    });
                }
                return opts;
              },
              selectionChange: (uuid) => {
                if (!uuid) { return; }
                console.log("inst selec change");
                

                this.taxonomyService.getTermByUUID(uuid, 1)
                  .subscribe(response => {
                    if (!response.data &&
                      !response.data.term_node &&
                      !response.data.term_node.term) {
                      return;
                    }
                    this.institution = new Term();
                    this.institution.load_from_data(response.data.term_node.term);
                    this.journalVersion.institution= this.institution;
                    if (this.entity &&
                      this.institution.id != this.entity.parent_id) {
                      this.entity = null;
                      this.entityPanel = null;
                    }
                    this.initEntityPanel(response.data.term_node.children);
                  });
              }
            }
          }]
      }];
  }

  manageByEntityClick() {
    this.isManageByEntity = !this.isManageByEntity;
    console.log(this.isManageByEntity)

    if (this.isManageByEntity) {
      const instUUID = this.organizationFormGroup.value['institution'];
      console.log("entitiy");
      
      this.taxonomyService.getTermByUUID(instUUID, 1)
        .subscribe(response => {
          if (!response.data &&
            !response.data.term_node &&
            !response.data.term_node.term) {
            return;
          }
          this.institution = new Term();
          this.institution.load_from_data(response.data.term_node.term);
          if (this.entity &&
            this.institution.id != this.entity.parent_id) {
            this.entity = null;
            this.entityPanel = null;
          }
          this.initEntityPanel(response.data.term_node.children);
        });
    } else {
      this.deleteEntityPanelFields();
    }
  }

  initEntityPanel(children: TermNode[] = null) {
    this.deleteEntityPanelFields();
    this.entityPanel = [
      {
        title: 'Entidad',
        description: 'Complete la información sobre la entidad que gestiona la revista.',
        iconName: '',
        formGroup: this.organizationFormGroup,
        content: [
          {
            name: 'entity',
            label: 'Entidad',
            type: FormFieldType.select,
            required: true,
            width: '100%',
            value: this.entity ? this.entity.uuid : 'new',
            extraContent: {
              getOptions: () => {
                const opts: SelectOption[] = [
                  {
                    label: ' < Nueva Entidad > ',
                    value: 'new'
                  }
                ];
                if (children) {
                  children.forEach((node: TermNode) => {
                    opts.push({
                      value: node.term.uuid,
                      label: node.term.name,
                    });
                  });
                } else if (this.institution) {
                  console.log("entiti change");
                  
                  this.taxonomyService.getTermByUUID(this.institution.uuid, 1)
                    .subscribe(response => {
                      if (!response.data &&
                        !response.data.term_node &&
                        !response.data.term_node.children) {
                        return;
                      }
                      response.data.term_node.children.forEach((node: TermNode) => {
                        opts.push({
                          value: node.term.uuid,
                          label: node.term.name,
                        });
                      });
                    });
                }
                return opts;
              },
              selectionChange: (uuid) => {
                if (uuid == 'new') {
                  if ( !this.entity ) {
                    this.entity = new Term();
                  }
                  this.entity.isNew = true;
                  this.entity.parent_id = this.institution.id;
                  this.resetEntityPanelFields();
                } else {
                  this.taxonomyService.getTermByUUID(uuid, 0)
                    .subscribe(response => {
                      if (!response.data &&
                        !response.data.term_node &&
                        !response.data.term_node.term) {
                        return;
                      }
                      this.entity = new Term();
                      this.entity.load_from_data(response.data.term_node.term);
                      this.resetEntityPanelFields();
                    });
                }
              }
            }
          },
          {
            name: 'name',
            label: 'Nombre',
            type: FormFieldType.text,
            required: true,
            value: (this.entity) ? this.entity.name : null,
            width: '100%'
          },
          {
            name: 'description',
            label: 'Descripción',
            type: FormFieldType.textarea,
            required: false,
            value: (this.entity) ? this.entity.description : null,
            width: '100%'
          },
          {
            name: 'email',
            label: 'Email',
            type: FormFieldType.email,
            required: false,
            value: (this.entity) ? this.entity.data['email'] : null,
            width: '45%'
          },
          {
            name: 'website',
            label: 'Sitio Web Oficial',
            type: FormFieldType.url,
            required: false,
            value: (this.entity) ? this.entity.data['website'] : null,
            width: '45%'
          },
          {
            name: 'address',
            label: 'Dirección',
            type: FormFieldType.textarea,
            required: false,
            value: (this.entity) ? this.entity.data['address'] : null,
            width: '100%'
          }]
      }];
  }

  private fillEntityData() {
    this.entity.uuid = this.organizationFormGroup.value['entity'];
    this.entity.name = this.organizationFormGroup.value['name'];
    this.entity.data['description'] = this.organizationFormGroup.value['description'];
    this.entity.data['email'] = this.organizationFormGroup.value['email'];
    this.entity.data['website'] = this.organizationFormGroup.value['website'];
    this.entity.data['address'] = this.organizationFormGroup.value['address'];
    this.entity.vocabulary_id = VocabulariesInmutableNames.INTITUTION;
    this.journalVersion.entity = this.entity;
  }
  private deleteEntityPanelFields () {
    this.organizationFormGroup.removeControl('entity');
    this.organizationFormGroup.removeControl('name');
    this.organizationFormGroup.removeControl('description');
    this.organizationFormGroup.removeControl('email');
    this.organizationFormGroup.removeControl('website');
    this.organizationFormGroup.removeControl('address');
  }
  private resetEntityPanelFields() {
    this.resetControl(this.organizationFormGroup.controls, 'name', this.entity.name);
    this.resetControl(this.organizationFormGroup.controls, 'description', this.entity.description);
    this.resetControl(this.organizationFormGroup.controls, 'email', this.entity.data['email']);
    this.resetControl(this.organizationFormGroup.controls, 'website', this.entity.data['website']);
    this.resetControl(this.organizationFormGroup.controls, 'address', this.entity.data['address']);
  }
  private resetControl(controls, name, value) {
    if (controls[name]) {
      controls[name].setValue(value);
    }
  }

  initStep3() {

    this.indexesFormGroup = this._formBuilder.group({});
    const panel = [];
    this.indexesPanel = [];
    // for (let index = 0; index < this.journalVersion.data.term_sources.length; index++) {
    //   const element = this.journalVersion.data.term_sources[index];
    //   if (element.term.vocabulary_id === VocabulariesInmutableNames.DATABASES) {
    //     // this.indexesPanel.push(this.getIndexPanel(element));

    //   }
    // }
    // this.indexesPanel = temPanel;

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
              console.log(this.indexesFormGroup)
            }
          }
        });
      }
    };
  }

  private getPanelIndex(termSource: TermSource) {
    return {
      title: termSource.term.name,
      description: '',
      iconName: '',
      formGroup: this.indexesFormGroup,
      actionLabel: 'Eliminar',
      action: {
        doit: (index) => {
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
          name: 'url_' + termSource.term_id,
          label: 'URL de la revista en el índice',
          type: FormFieldType.url,
          required: false,
          startHint: new HintValue(HintPosition.start, ''),
          width: '100%',
          value: termSource.data ? termSource.data['url'] : ''
        },
        {
          name: 'initial_cover_' + termSource.term_id,
          label: 'Cobertura inicio',
          type: FormFieldType.text,
          required: false,
          startHint: new HintValue(HintPosition.start, ''),
          width: '45%',
          value: termSource.data ? termSource.data['initial_cover'] : ''
        },
        {
          name: 'end_cover_' + termSource.term_id,
          label: 'Cobertura hasta',
          type: FormFieldType.text,
          required: false,
          startHint: new HintValue(HintPosition.start, ''),
          width: '45%',
          value: termSource.data ? termSource.data['end_cover'] : ''
        }]
    };
  }

  initStepFinal() {

    this.finalFormGroup = this._formBuilder.group({});
    this.finalPanel = [
      {
        title: '',
        description: 'Puede agregar aquí un comentario.',
        iconName: '',
        formGroup: this.finalFormGroup,

        content: [
          {
            name: 'comment',
            label: '',
            type: FormFieldType.textarea,
            required: false,
            startHint: new HintValue(HintPosition.start, ''),
            width: '100%',
            minWidth: '100%',
            value: this.journalVersion ? this.journalVersion.comment : ''
          },
        ]
      }
    ];
    
  }

  private fillJournalFields() {
    // this.journalVersion.source_type = this.informationFormGroup.value['source_type'];

    this.journalVersion.data.load_from_data(this.informationFormGroup.value);
    this.journalVersion.data.issn.load_from_data(this.informationFormGroup.value);
    this.journalVersion.data.socialNetworks.load_from_data(this.informationFormGroup.value);


    this.journalVersion.data.term_sources = [];

    this.informationFormGroup.value['licence'].forEach(term => {
      const ts = new TermSource();
      ts.term = term;
      ts.term_id = ts.term.id;
      ts.source_id = this.journalVersion.source_id;
      this.journalVersion.data.term_sources.push(ts);
    });


    this.informationFormGroup.value['subjects'].forEach(term => {
      const ts = new TermSource();
      ts.term = term;
      ts.term_id = ts.term.id;
      ts.source_id = this.journalVersion.source_id;
      this.journalVersion.data.term_sources.push(ts);
    });

    const ts = new TermSource();
    if (this.isManageByEntity) {
      this.fillEntityData();
      ts.term = this.entity;
      this.journalVersion.entity = this.entity;
    } else {
      ts.term = this.institution;
      this.journalVersion.entity = null;
    }
    ts.term_id = ts.term.id;
    ts.source_id = this.journalVersion.source_id;
    this.journalVersion.data.term_sources.push(ts);

    this.indexesPanel.forEach(panel => {
      const ts = new TermSource();
      ts.term = panel.value;
      ts.term_id = ts.term.id;
      ts.source_id = this.journalVersion.source_id;
      ts.data['url'] = this.indexesFormGroup.value['url_'+ts.term.id];
      ts.data['initial_cover'] = this.indexesFormGroup.value['initial_cover_'+ts.term.id];
      ts.data['end_cover'] = this.indexesFormGroup.value['end_cover_'+ts.term.id];
      this.journalVersion.data.term_sources.push(ts);
    });

    this.journalVersion.comment = this.finalFormGroup.value['comment'];
    

    console.log(this.informationFormGroup);
    console.log(this.organizationFormGroup);
    console.log(this.indexesFormGroup);
  }

  step1Action() {
    this.stepperStep += 1;
  }

  step2Action() {
    this.stepperStep += 1;
  }
  step3Action() {
    this.stepperStep += 1;
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
  selector: 'toco-journal-edit-addindex',
  styleUrls: ['./journal-edit.component.scss'],
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
    @Inject(MAT_DIALOG_DATA) public data: any) {
    this.termsIdsToExclude = data.termsIdsToExclude;
    this.addIndexPanel = data.addIndexPanel;
  }

  ngOnInit() {
    this.indexFormGroup = this._formBuilder.group({});
    this.indexPanel = [
      {
        title: 'Adicionar un Índice',
        description: '',
        iconName: '',
        formGroup: this.indexFormGroup,
        content: [
          {
            name: 'indexes',
            label: 'Indices',
            type: FormFieldType.vocabulary,
            required: true,
            width: '100%',
            extraContent: {
              multiple: false,
              selectedTermsIds: null,
              excludeTermsIds: this.termsIdsToExclude,
              vocab: VocabulariesInmutableNames.DATABASES
            },
          },
          {
            name: 'url',
            label: 'URL',
            type: FormFieldType.url,
            required: false,
            startHint: new HintValue(HintPosition.start, 'URL de la revista en el índice.'),
            width: '100%',
            value: ''
          },
          {
            name: 'initial_cover',
            label: 'Cobertura inicio',
            type: FormFieldType.text,
            required: false,
            startHint: new HintValue(HintPosition.start, ''),
            width: '45%',
            value: ''
          },
          {
            name: 'end_cover',
            label: 'Cobertura',
            type: FormFieldType.text,
            required: false,
            startHint: new HintValue(HintPosition.start, ''),
            width: '45%',
            value: ''
          }
        ]
    }];

    this.addIndexAction = {
      doit: (data: any) => {
        const result = new TermSource();
        if( this.indexFormGroup.controls['indexes'].value )
        {
          result.term = this.indexFormGroup.controls['indexes'].value[0];
          result.term_id = result.term.id;
          result.data = {
            'url': this.indexFormGroup.controls['url'].value,
            'initial_cover': this.indexFormGroup.controls['initial_cover'].value,
            'end_cover': this.indexFormGroup.controls['end_cover'].value,
          }
        }
        this.addIndexPanel(result);
      }
    };
  }

}
