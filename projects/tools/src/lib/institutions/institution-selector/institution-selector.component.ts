import { Component, OnInit, Input, Output } from '@angular/core';
import { Term, TermNode, VocabulariesInmutableNames } from '@toco/tools/entities';
import { PanelContent, FormFieldType, SelectOption } from '@toco/tools/forms';
import { FormGroup, FormBuilder } from '@angular/forms';
import { TaxonomyService } from '@toco/tools/backend';

@Component({
  selector: 'toco-institution-selector',
  templateUrl: './institution-selector.component.html',
  styleUrls: ['./institution-selector.component.scss']
})
export class InstitutionSelectorComponent implements OnInit {

  @Output()
  institution: Term;

  // organization, institution and entity, variables for step 2
  @Input()
  public level1: Term = null;
  @Input()
  level1FormGroup: FormGroup;
  level1Panel: PanelContent[] = null;

  // institution
  @Input()
  public level2: Term = null;
  level2Panel: PanelContent[] = null;

  // entity
  @Input()
  public level3: Term = null;
  level3Panel: PanelContent[] = null;

  public isManageByEntity = true;

  constructor(
    private taxonomyService: TaxonomyService,
    private formBuilder: FormBuilder,
  ) { }

  ngOnInit() {
    if(this.level1FormGroup){
      this.initLevel1Panel();
    }
    
  }

  initLevel1Panel() {

    this.level1Panel = [{
      title: 'Organismo',
      description: '',
      iconName: '',
      formGroup: this.level1FormGroup,
      content: [
        {
          name: 'organization',
          label: 'Organismo',
          type: FormFieldType.select,
          required: true,
          width: '100%',
          value: this.level1 ? this.level1.uuid : '',
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

                    this.level1 = new Term();
                    this.level1.load_from_data(response.data.term_node.term);

                    if (this.level2 &&
                      this.level1.id != this.level2.parent_id) {

                      this.level2 = null;
                      this.level2Panel = null;
                      this.level3 = null;
                      this.level3Panel = null;
                    }
                    this.initLevel2Panel(response.data.term_node.children, this.level1FormGroup);
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

  initLevel2Panel(children: TermNode[] = null, formGroup: FormGroup) {
    console.log(this.level1FormGroup);
    // this.institutionFormGroup = this._formBuilder.group({});
    this.level2Panel = [
      {
        title: 'Institución',
        description: 'Institución a la que pertenece la revista',
        iconName: '',
        formGroup: this.level1FormGroup,
        content: [
          {
            name: 'institution',
            label: 'Institución',
            type: FormFieldType.select,
            required: true,
            width: '100%',
            value: this.level2 ? this.level2.uuid : null,
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
                } else if (this.level1) {
                  console.log("instituytion")
                  this.taxonomyService.getTermByUUID(this.level1.uuid, 1)
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
                    this.level2 = new Term();
                    this.level2.load_from_data(response.data.term_node.term);
                    if (this.level3 &&
                      this.level2.id != this.level3.parent_id) {
                      this.level3 = null;
                      this.level3Panel = null;
                    }
                    this.initLevel3Panel(response.data.term_node.children);
                  });
              }
            }
          }]
      }];
  }

  manageByLevel3Click() {
    this.isManageByEntity = !this.isManageByEntity;
    console.log(this.isManageByEntity)

    if (this.isManageByEntity) {
      const instUUID = this.level1FormGroup.value['institution'];
      console.log("entitiy");

      this.taxonomyService.getTermByUUID(instUUID, 1)
        .subscribe(response => {
          if (!response.data &&
            !response.data.term_node &&
            !response.data.term_node.term) {
            return;
          }
          this.level2 = new Term();
          this.level2.load_from_data(response.data.term_node.term);
          if (this.level3 &&
            this.level2.id != this.level3.parent_id) {
            this.level3 = null;
            this.level3Panel = null;
          }
          this.initLevel3Panel(response.data.term_node.children);
        });
    } else {
      this.deleteLevel3PanelFields();
    }
  }

  initLevel3Panel(children: TermNode[] = null) {
    this.deleteLevel3PanelFields();
    this.level3Panel = [
      {
        title: 'Entidad',
        description: 'Complete la información sobre la entidad que gestiona la revista.',
        iconName: '',
        formGroup: this.level1FormGroup,
        content: [
          {
            name: 'entity',
            label: 'Entidad',
            type: FormFieldType.select,
            required: true,
            width: '100%',
            value: this.level3 ? this.level3.uuid : 'new',
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
                } else if (this.level2) {
                  console.log("entiti change");

                  this.taxonomyService.getTermByUUID(this.level2.uuid, 1)
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
                  if (!this.level3) {
                    this.level3 = new Term();
                  }
                  this.level3.isNew = true;
                  this.level3.parent_id = this.level2.id;
                  this.resetLevel3PanelFields();
                } else {
                  this.taxonomyService.getTermByUUID(uuid, 0)
                    .subscribe(response => {
                      if (!response.data &&
                        !response.data.term_node &&
                        !response.data.term_node.term) {
                        return;
                      }
                      this.level3 = new Term();
                      this.level3.load_from_data(response.data.term_node.term);
                      this.resetLevel3PanelFields();
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
            value: (this.level3) ? this.level3.name : null,
            width: '100%'
          },
          {
            name: 'description',
            label: 'Descripción',
            type: FormFieldType.textarea,
            required: false,
            value: (this.level3) ? this.level3.description : null,
            width: '100%'
          },
          {
            name: 'email',
            label: 'Email',
            type: FormFieldType.email,
            required: false,
            value: (this.level3) ? this.level3.data['email'] : null,
            width: '45%'
          },
          {
            name: 'website',
            label: 'Sitio Web Oficial',
            type: FormFieldType.url,
            required: false,
            value: (this.level3) ? this.level3.data['website'] : null,
            width: '45%'
          },
          {
            name: 'address',
            label: 'Dirección',
            type: FormFieldType.textarea,
            required: false,
            value: (this.level3) ? this.level3.data['address'] : null,
            width: '100%'
          }]
      }];
  }

  private fillInstitutionData() {
    this.institution.uuid = this.level1FormGroup.value['entity'];
    this.institution.name = this.level1FormGroup.value['name'];
    this.institution.data['description'] = this.level1FormGroup.value['description'];
    this.institution.data['email'] = this.level1FormGroup.value['email'];
    this.institution.data['website'] = this.level1FormGroup.value['website'];
    this.institution.data['address'] = this.level1FormGroup.value['address'];
    this.institution.vocabulary_id = VocabulariesInmutableNames.INTITUTION;

  }

  private deleteLevel3PanelFields() {
    this.level1FormGroup.removeControl('entity');
    this.level1FormGroup.removeControl('name');
    this.level1FormGroup.removeControl('description');
    this.level1FormGroup.removeControl('email');
    this.level1FormGroup.removeControl('website');
    this.level1FormGroup.removeControl('address');
  }

  private resetLevel3PanelFields() {
    this.resetControl(this.level1FormGroup.controls, 'name', this.level3.name);
    this.resetControl(this.level1FormGroup.controls, 'description', this.level3.description);
    this.resetControl(this.level1FormGroup.controls, 'email', this.level3.data['email']);
    this.resetControl(this.level1FormGroup.controls, 'website', this.level3.data['website']);
    this.resetControl(this.level1FormGroup.controls, 'address', this.level3.data['address']);
  }

  private resetControl(controls, name, value) {
    if (controls[name]) {
      controls[name].setValue(value);
    }
  }

}
