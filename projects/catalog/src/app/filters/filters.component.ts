/*
 *   Copyright (c) 2020 Universidad de Pinar del Río "Hermanos Saíz Montes de Oca"
 *   All rights reserved.
 */

import {
  Component,
  OnInit,
  OnChanges,
  Input,
  Output,
  EventEmitter
} from "@angular/core";
import {
  PanelContent,
  FormFieldType,
  SelectOption,
  FormContainerAction
} from "@toco/tools/forms";
import { FormGroup, FormBuilder, FormControl } from "@angular/forms";
import {
  TaxonomyService,
  SearchService,
  SourceService
} from "@toco/tools/backend";
import {
  TermNode,
  VocabulariesInmutableNames,
  Source,
  SourceTypes
} from "@toco/tools/entities";
import { EnvService } from "@tocoenv/tools/env.service";
import {
  SelectOptionNode,
  FlatTreeNode
} from "@toco/tools/forms/experimental/select-tree/select-tree.component";
import { ParamMap, ActivatedRoute } from "@angular/router";
import { filter } from "rxjs/operators";

@Component({
  selector: "app-catalog-filters",
  templateUrl: "./filters.component.html",
  styleUrls: ["./filters.component.scss"]
})
export class FiltersComponent implements OnInit {
  @Input()
  params: ParamMap;

  @Output()
  paramsChange: EventEmitter<any> = new EventEmitter();

  panels: PanelContent[] = null;
  formGroup: FormGroup;

  institutionTree: SelectOptionNode[] = [];
  institutionSelection: FlatTreeNode[];

  organizationUUID = "";

  filters = {
    type: "type",
    institutions: "institutions",
    subjects: "subjects",
    grupo_mes: "grupo_mes",
    miar_types: "miar_types",
    approved: "approved"
  };
  constructor(
    private taxonomyService: TaxonomyService,
    private sourceService: SourceService,
    private envService: EnvService,
    private _formBuilder: FormBuilder,
    private route: ActivatedRoute
  ) {
    if (envService.extraArgs && envService.extraArgs["organizationUUID"]) {
      this.organizationUUID = envService.extraArgs["organizationUUID"];
    }
  }

  ngOnInit() {
    this.formGroup = this._formBuilder.group({
      approved: new FormControl(true)
    });

    this.formGroup.valueChanges.subscribe(
      values => {
        const filters = values;
        this.institutionSelection = values[this.filters.institutions];
        if (this.institutionTree && this.institutionSelection) {
          const selection = this.findFlatInInstTree(this.institutionTree);
          let insts = '';
          selection.forEach(element => {
            insts = insts.concat(element.element.value, ',')
          });
          filters[this.filters.institutions] = insts;
        }
        console.log(values);

        this.paramsChange.emit(filters);
      },
      (err: any) => {
        console.log("error: " + err + ".");
      },
      () => {
        console.log("complete");
      }
    );

    this.panels = [
      {
        title: "Revistas por Tipo:",
        description: "",
        iconName: "",
        formGroup: this.formGroup,
        open: false,
        content: [
          {
            name: this.filters.type,
            label: "Tipo de Revista",
            type: FormFieldType.select,
            required: true,
            width: "100%",
            value: this.params.has(this.filters.type)
              ? this.params.get(this.filters.type)
              : "",
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
              },
              selectionChange: selection => {
                console.log(selection);
              }
            }
          }
        ]
      },
      {
        title: "Revistas por Institución:",
        description: "",
        iconName: "",
        formGroup: this.formGroup,
        open: false,
        content: [
          {
            name: this.filters.institutions,
            label: "Instituciones",
            type: FormFieldType.select_tree,
            required: true,
            width: "100%",
            value: "",
            extraContent: {
              selectedTermsUUIDs: this.params.has(this.filters.institutions)
                ? this.params.get(this.filters.institutions).split(",")
                : "",
              observable: this.sourceService.countSourcesByTerm(
                this.organizationUUID,
                2
              ),
              getOptions: (response: any) => {
                this.institutionTree = [];
                this.institutionTree.push({
                  element: {
                    value: response.data.relations.uuid,
                    label:
                      response.data.relations.name +
                      " (" +
                      response.data.relations.count +
                      ")"
                  },
                  children: this.initInstitutionTree(response.data.relations)
                });
                return this.institutionTree;
              },
              selectionChange: selection => {
                console.log(selection);
              }
            }
          }
        ]
      },
      {
        formGroup: this.formGroup,
        title: "Cobertura Temática:",
        iconName: "",
        description: "",
        open: false,
        content: [
          {
            name: this.filters.subjects,
            label: "Materias",
            type: FormFieldType.vocabulary,
            required: false,
            width: "100%",
            value: this.params.has(this.filters.subjects)
              ? this.params.get(this.filters.subjects).split(",")
              : "",
            extraContent: {
              multiple: true,
              selectedTermsUUIDs: this.params.has(this.filters.subjects)
                ? this.params.get(this.filters.subjects).split(",")
                : "",
              vocab: VocabulariesInmutableNames.SUBJECTS
            }
          }
        ]
      },
      {
        formGroup: this.formGroup,
        title: "Indizaciones:",
        iconName: "",
        description: "",
        open: false,
        content: [
          {
            name: this.filters.grupo_mes,
            label: "Grupo MES",
            type: FormFieldType.vocabulary,
            required: true,
            width: "100%",
            value: this.params.has(this.filters.grupo_mes)
              ? this.params.get(this.filters.grupo_mes).split(",")
              : "",
            extraContent: {
              multiple: true,
              selectedTermsUUIDs: this.params.has(this.filters.grupo_mes)
                ? this.params.get(this.filters.grupo_mes).split(",")
                : "",
              vocab: VocabulariesInmutableNames.MES_GROUPS
            }
          },
          {
            name: this.filters.miar_types,
            label: "Tipos de MIAR",
            type: FormFieldType.vocabulary,
            required: true,
            width: "100%",
            value: this.params.has(this.filters.miar_types)
              ? this.params.get(this.filters.miar_types).split(",")
              : "",
            extraContent: {
              multiple: true,
              selectedTermsUUIDs: this.params.has(this.filters.miar_types)
                ? this.params.get(this.filters.miar_types).split(",")
                : "",
              vocab: VocabulariesInmutableNames.MIAR_DATABASES
            }
          }
        ]
      },
      {
        title: "Estado:",
        description: "",
        iconName: "",
        formGroup: this.formGroup,
        open: false,
        content: [
          {
            type: FormFieldType.checkbox,
            name: this.filters.approved,
            label: "Sólo mostrar datos de fuentes aprobadas",
            width: "100%",
            value: true,
            required: true
          }
        ]
      }
    ];
  }

  private initInstitutionTree(node: any) {
    if (node && node.children) {
      const opts: SelectOptionNode[] = [];
      node.children.forEach((node: any) => {
        opts.push({
          element: {
            value: node.uuid,
            label: node.name + " (" + node.count + ")"
          },
          children: this.initInstitutionTree(node)
        });
      });
      return opts;
    }
    return null;
  }

  private findFlatInInstTree(children: SelectOptionNode[]) {
    let result: FlatTreeNode[] = [];
    children.forEach(node => {
      const to_add = this.institutionSelection.find(
        f => f.element.value == node.element.value
      );
      if (to_add != undefined) {
        result.push(to_add);
      } else {
        result = result.concat(this.findFlatInInstTree(node.children));
      }
    });
    return result;
  }
}

// (relations.uuid:4dbd2cda-6e42-4858-a999-1fa6ec210657 OR relations.uuid:eeab373f-f904-4f1e-ad91-b36e0e04fa3b)AND(relations.uuid:2f528a11-45d0-4ded-b4f4-98b791c0014e)

// OR(relations.inst.uuid=a1234ORrelations.inst.uuid:23)
