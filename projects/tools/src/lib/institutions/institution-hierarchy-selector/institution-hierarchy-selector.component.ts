import { Component, OnInit, Input, Output } from "@angular/core";
import {
  Term,
  TermNode,
  VocabulariesInmutableNames
} from "@toco/tools/entities";
import { PanelContent_Depr, FormFieldType, SelectOption } from "@toco/tools/forms";
import { FormGroup, FormBuilder } from "@angular/forms";
import { TaxonomyService } from "@toco/tools/backend";

@Component({
  selector: "toco-institution-hierarchy-selector",
  templateUrl: "./institution-hierarchy-selector.component.html",
  styleUrls: ["./institution-hierarchy-selector.component.scss"]
})
export class InstitutionHierarchySelectorComponent implements OnInit {
  // @Output()
  // institution: Term;

  // @Input()
  // public defaultOrganizationUUID: string = null;

  @Input()
  public institution: Term = null;

  @Input()
  externalFormGroup: FormGroup;

  // organization, institution and entity, variables for step 2

  public level1: Term = null;

  level1Panel: PanelContent_Depr[] = null;

  // institution
  public level2: Term = null;
  level2Panel: PanelContent_Depr[] = null;

  // entity
  public level3: Term = null;
  level3Panel: PanelContent_Depr[] = null;

  public isManageByEntity = true;

  public initializated = false;

  constructor(
    private taxonomyService: TaxonomyService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit() {
    if (this.externalFormGroup) {
      if (!this.institution) {
        this.level1 = null;
        this.level2 = null;
        this.level3 = null;
        this.initializated = this.initLevel1Panel();
      } else {
        if (this.institution.isNew) {
          if (this.institution.parent_id && this.institution.parent_id != "") {
            this.taxonomyService
              .getTermByID(this.institution.parent_id, -3)
              .subscribe(
                response => {
                  if (!response.data) {
                    return;
                  }
                  const node: TermNode = response.data.term_node;
                  if (node.parent && !node.parent.parent) {
                    this.level1 = new Term();
                    this.level1.deepcopy(node.parent.term);
                    this.level2 = new Term();
                    this.level2.deepcopy(node.term);
                    this.level3 = this.institution;
                  } else {
                    this.level1 = null;
                    this.level2 = null;
                    this.level3 = null;
                  }
                  this.initializated = this.initLevel1Panel();
                },
                (error: any) => {},
                () => {}
              );
          } else {
            this.level1 = null;
            this.level2 = null;
            this.level3 = null;
            this.initializated = this.initLevel1Panel();
          }
        } else {
          this.taxonomyService
            .getTermByUUID(this.institution.uuid, -3)
            .subscribe(
              response => {
                if (!response.data) {
                  return;
                }
                console.log(this.institution);
                console.log(response);

                const node: TermNode = response.data.term_node;
                if (node.parent) {
                  if (node.parent.parent) {
                    this.level1 = new Term();
                    this.level1.deepcopy(node.parent.parent.term);
                    this.level2 = new Term();
                    this.level2.deepcopy(node.parent.term);
                    this.level3 = new Term();
                    this.level3.deepcopy(node.term);
                    if (node.parent.parent.parent) {
                      this.level1 = null;
                      this.level2 = null;
                      this.level3 = null;
                    }
                  } else {
                    this.level1 = new Term();
                    this.level1.deepcopy(node.parent.term);
                    this.level2 = new Term();
                    this.level2.deepcopy(node.term);
                  }
                } else {
                  this.level1 = new Term();
                  this.level1.deepcopy(node.term);
                }
                this.initializated = this.initLevel1Panel();
              },
              (error: any) => {},
              () => {}
            );
        }
      }
    }
  }

  initLevel1Panel() {
    // if (this.defaultOrganizationUUID != null && this.level1 && this.defaultOrganizationUUID != this.level1.uuid) {
    //   return false;
    // }
    this.level1Panel = [
      {
        title: "Organismo",
        description: "",
        iconName: "",
        formSection: this.externalFormGroup,
        formSectionContent: [
          {
            name: "organization",
            label: "Organismo",
            type: FormFieldType.select_expr,
            required: true,
            width: "100%",
            value: this.level1 ? this.level1.uuid : "",
            extraContent: {
              observable: this.taxonomyService.getTermsTreeByVocab(
                VocabulariesInmutableNames.CUBAN_INTITUTIONS,
                0
              ),
              getOptions: (response: any) => {
                const opts: SelectOption[] = [];
                response.data.tree.term_node.forEach((node: TermNode) => {
                  opts.push({
                    value: node.term.uuid,
                    label: node.term.name
                  });
                });
                return opts;
              },
              selectionChange: uuid => {
                console.log("organizatioon");
                if (!uuid) {
                  return;
                }
                this.taxonomyService.getTermByUUID(uuid, 1).subscribe(
                  response => {
                    if (
                      !response.data &&
                      !response.data.term_node &&
                      !response.data.term_node.term
                    ) {
                      return;
                    }

                    this.level1 = new Term();
                    this.level1.deepcopy(response.data.term_node.term);

                    if (
                      this.level2 &&
                      this.level1.id != this.level2.parent_id
                    ) {
                      this.level2 = null;
                      this.level2Panel = null;
                      this.level3 = null;
                      this.level3Panel = null;
                    }
                    this.initLevel2Panel(
                      response.data.term_node.children,
                      this.externalFormGroup
                    );
                  },
                  (err: any) => {
                    console.log("error: " + err + ".");
                  },
                  () => {
                    console.log("complete");
                  }
                );
              }
            }
          }
        ]
      }
    ];
    return true;
  }

  initLevel2Panel(children: TermNode[] = null, formGroup: FormGroup) {
    console.log(this.externalFormGroup);
    // this.institutionFormGroup = this._formBuilder.group({});
    this.level2Panel = [
      {
        title: "Institución",
        description: "Institución a la que pertenece la revista",
        iconName: "",
        formSection: this.externalFormGroup,
        formSectionContent: [
          {
            name: "institution",
            label: "Institución",
            type: FormFieldType.select_expr,
            required: true,
            width: "100%",
            value: this.level2 ? this.level2.uuid : null,
            extraContent: {
              getOptions: () => {
                const opts: SelectOption[] = [];
                if (children) {
                  children.forEach((node: TermNode) => {
                    opts.push({
                      value: node.term.uuid,
                      label: node.term.name
                    });
                  });
                } else if (this.level1) {
                  console.log("instituytion");
                  this.taxonomyService
                    .getTermByUUID(this.level1.uuid, 1)
                    .subscribe(response => {
                      if (
                        !response.data &&
                        !response.data.term_node &&
                        !response.data.term_node.children
                      ) {
                        return;
                      }
                      response.data.term_node.children.forEach(
                        (node: TermNode) => {
                          opts.push({
                            value: node.term.uuid,
                            label: node.term.name
                          });
                        }
                      );
                    });
                }
                return opts;
              },
              selectionChange: uuid => {
                if (!uuid) {
                  return;
                }
                console.log("inst selec change");

                this.taxonomyService
                  .getTermByUUID(uuid, 1)
                  .subscribe(response => {
                    if (
                      !response.data &&
                      !response.data.term_node &&
                      !response.data.term_node.term
                    ) {
                      return;
                    }
                    this.level2 = new Term();
                    this.level2.deepcopy(response.data.term_node.term);
                    if (
                      this.level3 &&
                      this.level2.id != this.level3.parent_id
                    ) {
                      this.level3 = null;
                      this.level3Panel = null;
                    }
                    this.initLevel3Panel(response.data.term_node.children);
                  });
              }
            }
          }
        ]
      }
    ];
  }

  manageByLevel3Click() {
    this.isManageByEntity = !this.isManageByEntity;
    console.log(this.isManageByEntity);

    if (this.isManageByEntity) {
      const instUUID = this.externalFormGroup.value["institution"];
      console.log("entitiy");

      this.taxonomyService.getTermByUUID(instUUID, 1).subscribe(response => {
        if (
          !response.data &&
          !response.data.term_node &&
          !response.data.term_node.term
        ) {
          return;
        }
        this.level2 = new Term();
        this.level2.deepcopy(response.data.term_node.term);
        if (this.level3 && this.level2.id != this.level3.parent_id) {
          this.level3 = null;
          this.level3Panel = null;
        }
        this.initLevel3Panel(response.data.term_node.children);
      });
    } else {
      this.level3 = null;
      this.deleteLevel3PanelFields();
    }
  }

  initLevel3Panel(children: TermNode[] = null) {
    this.deleteLevel3PanelFields();
    this.level3Panel = [
      {
        title: "Unidad",
        description: "Complete la información sobre la Unidad.",
        iconName: "",
        formSection: this.externalFormGroup,
        formSectionContent: [
          {
            name: "entity",
            label: "Unidad",
            type: FormFieldType.select_expr,
            required: true,
            width: "100%",
            value: this.level3 ? this.level3.uuid : "new",
            extraContent: {
              getOptions: () => {
                const opts: SelectOption[] = [
                  {
                    label: " < Nueva Unidad > ",
                    value: "new"
                  }
                ];
                if (children) {
                  children.forEach((node: TermNode) => {
                    opts.push({
                      value: node.term.uuid,
                      label: node.term.name
                    });
                  });
                } else if (this.level2) {
                  console.log("entiti change");

                  this.taxonomyService
                    .getTermByUUID(this.level2.uuid, 1)
                    .subscribe(response => {
                      if (
                        !response.data &&
                        !response.data.term_node &&
                        !response.data.term_node.children
                      ) {
                        return;
                      }
                      response.data.term_node.children.forEach(
                        (node: TermNode) => {
                          opts.push({
                            value: node.term.uuid,
                            label: node.term.name
                          });
                        }
                      );
                    });
                }
                return opts;
              },
              selectionChange: uuid => {
                if (uuid == "new") {
                  if (!this.level3) {
                    this.level3 = new Term();
                  }
                  this.level3.isNew = true;
                  this.level3.parent_id = this.level2.id;
                  this.resetLevel3PanelFields();
                } else {
                  this.taxonomyService
                    .getTermByUUID(uuid, 0)
                    .subscribe(response => {
                      if (
                        !response.data &&
                        !response.data.term_node &&
                        !response.data.term_node.term
                      ) {
                        return;
                      }
                      this.level3 = new Term();
                      this.level3.deepcopy(response.data.term_node.term);
                      this.resetLevel3PanelFields();
                    });
                }
              }
            }
          },
          {
            name: "name",
            label: "Nombre",
            type: FormFieldType.text,
            required: true,
            value: this.level3 ? this.level3.name : null,
            width: "100%"
          },
          {
            name: "description",
            label: "Descripción",
            type: FormFieldType.textarea,
            required: false,
            value: this.level3 ? this.level3.description : null,
            width: "100%"
          },
          {
            name: "email",
            label: "Email",
            type: FormFieldType.email,
            required: false,
            value: this.level3 ? this.level3.data["email"] : null,
            width: "45%"
          },
          {
            name: "website",
            label: "Sitio Web Oficial",
            type: FormFieldType.url,
            required: false,
            value: this.level3 ? this.level3.data["website"] : null,
            width: "45%"
          },
          {
            name: "address",
            label: "Dirección",
            type: FormFieldType.textarea,
            required: false,
            value: this.level3 ? this.level3.data["address"] : null,
            width: "100%"
          }
        ]
      }
    ];
  }

  private fillInstitutionData() {
    this.level3.uuid = this.externalFormGroup.value["entity"];
    this.level3.name = this.externalFormGroup.value["name"];
    this.level3.data["description"] = this.externalFormGroup.value[
      "description"
    ];
    this.level3.data["email"] = this.externalFormGroup.value["email"];
    this.level3.data["website"] = this.externalFormGroup.value["website"];
    this.level3.data["address"] = this.externalFormGroup.value["address"];
    this.level3.vocabulary_id = VocabulariesInmutableNames.CUBAN_INTITUTIONS;
  }

  private deleteLevel3PanelFields() {
    this.externalFormGroup.removeControl("entity");
    this.externalFormGroup.removeControl("name");
    this.externalFormGroup.removeControl("description");
    this.externalFormGroup.removeControl("email");
    this.externalFormGroup.removeControl("website");
    this.externalFormGroup.removeControl("address");
  }

  private resetLevel3PanelFields() {
    this.resetControl(
      this.externalFormGroup.controls,
      "name",
      this.level3.name
    );
    this.resetControl(
      this.externalFormGroup.controls,
      "description",
      this.level3.description
    );
    this.resetControl(
      this.externalFormGroup.controls,
      "email",
      this.level3.data["email"]
    );
    this.resetControl(
      this.externalFormGroup.controls,
      "website",
      this.level3.data["website"]
    );
    this.resetControl(
      this.externalFormGroup.controls,
      "address",
      this.level3.data["address"]
    );
  }

  private resetControl(controls, name, value) {
    if (controls[name]) {
      controls[name].setValue(value);
    }
  }

  public getSelectedHierarchy(): TermNode{
    if (this.externalFormGroup.invalid){
      return null;
    }
    if (this.level3) {
      this.fillInstitutionData();
      return {
        term: this.level3,
        parent: {
          term: this.level2,
          parent: {
            parent: null,
            term: this.level1
          }
        }
      }
    } else if (this.level2) {
      return {
        term: this.level2,
        parent: {
          term: this.level1,
          parent: null
        }
      }
    } else if (this.level1) {
      return {
        term: this.level1,
        parent: null
      }
    } else {
      return null;
    }
  }
}
