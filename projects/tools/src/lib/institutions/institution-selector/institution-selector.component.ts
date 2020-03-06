import { Component, OnInit, Input } from '@angular/core';
import { Term, TermNode, VocabulariesInmutableNames } from '@toco/tools/entities';
import { PanelContent, FormFieldType, SelectOption } from '@toco/tools/forms';
import { FormGroup, FormBuilder } from '@angular/forms';
import { TaxonomyService } from '@toco/tools/backend';

@Component({
  selector: 'lib-institution-selector',
  templateUrl: './institution-selector.component.html',
  styleUrls: ['./institution-selector.component.scss']
})
export class InstitutionSelectorComponent implements OnInit {

  @Input()
  selectedInstitution: Term;

  // organization, institution and entity, variables for step 2
  @Input()
  public organization: Term = null;
  organizationPanel: PanelContent[] = null;
  organizationFormGroup: FormGroup;

  // institution
  @Input()
  public institution: Term = null;
  institutionPanel: PanelContent[] = null;
  institutionFormGroup: FormGroup;

  // entity
  @Input()
  public entity: Term = null;
  entityPanel: PanelContent[] = null;

  public isManageByEntity = true;

  constructor(
    private taxonomyService: TaxonomyService,
    private formBuilder: FormBuilder,
  ) { }

  ngOnInit() {
    this.initOrganizationPanel();
  }

  initOrganizationPanel() {
    this.organizationFormGroup = this.formBuilder.group({});

    this.organizationPanel = [{
      title: 'Organismo',
      description: '',
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
            getOptions: (response: any) => {
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
                  if (!this.entity) {
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
  }
  private deleteEntityPanelFields() {
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

}
