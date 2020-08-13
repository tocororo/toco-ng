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
  PanelContent_Depr,
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
  SourceTypes,
  SourceStatus
} from "@toco/tools/entities";
import { EnvService } from "@tocoenv/tools/env.service";
import {
  SelectOptionNode,
  FlatTreeNode
} from "@toco/tools/forms/experimental/select-tree/select-tree.component";
import { ParamMap, ActivatedRoute, convertToParamMap, Params } from "@angular/router";
import { filter } from "rxjs/operators";

export const CatalogFilterKeys = {
  source_type: "source_type",
  institutions: "institutions",
  subjects: "subjects",
  grupo_mes: "grupo_mes",
  miar_types: "miar_types",
  source_status: "source_status"
};

@Component({
  selector: "app-catalog-filters",
  templateUrl: "./filters.component.html",
  styleUrls: ["./filters.component.scss"]
})
export class FiltersComponent implements OnInit {
  @Input()
  params: ParamMap;

  @Output()
  paramsChange: EventEmitter<Params> = new EventEmitter();

  panels: PanelContent_Depr[] = null;
  formGroup: FormGroup;

  institutionTree: SelectOptionNode[] = [];
  institutionSelection: FlatTreeNode[];

  organizationUUID = "";

  filters: Map<string, string> = new Map<string, string>();

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

    this.formGroup = this._formBuilder.group({});
    this.initFilters();
    this.formGroup.valueChanges.subscribe(
      values => {
        this.institutionSelection = values[CatalogFilterKeys.institutions];
        this.changeTreeFilter();
        this.changeTermMultipleFilter(values, CatalogFilterKeys.subjects);
        this.changeTermMultipleFilter(values, CatalogFilterKeys.grupo_mes);
        this.changeTermMultipleFilter(values, CatalogFilterKeys.miar_types);

        if (
          values[CatalogFilterKeys.source_type] &&
          values[CatalogFilterKeys.source_type] != ""
        ) {
          this.filters.set(CatalogFilterKeys.source_type,
            values[CatalogFilterKeys.source_type]);
        }
        if (
          values[CatalogFilterKeys.source_status] &&
          values[CatalogFilterKeys.source_status] != ""
        ) {
          this.filters.set(CatalogFilterKeys.source_status,
            values[CatalogFilterKeys.source_status]);
        }

        // this.params = convertToParamMap(this.filters);
        console.log(values);

        console.log(this.filters);
        let res: Params = {};
        this.filters.forEach((value:string, key:string) => {
          console.log(value, key);
          if (value != "") {
            res[key]= value;
          }
        });
        // console.log(this.filters.keys());

        // for (const key in this.filters.keys()) {
        //   console.log(key)
        //   console.log(this.filters[key]);
        //   if (this.filters.get(key) != "") {
        //     res.set(key, this.filters.get(key));
        //   }
        // }
        console.log(res);

        this.paramsChange.emit(res);
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
        formSection: this.formGroup,
        open: this.filters.get(CatalogFilterKeys.source_type) != '',
        formSectionContent: [
          {
            name: CatalogFilterKeys.source_type,
            label: "Tipo de Revista",
            type: FormFieldType.select_expr,
            required: true,
            width: "100%",
            value: this.filters.get(CatalogFilterKeys.source_type),
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
                // console.log(selection);
              }
            }
          }
        ]
      },
      {
        title: "Revistas por Institución:",
        description: "",
        iconName: "",
        formSection: this.formGroup,
        open: this.filters.get(CatalogFilterKeys.institutions) != '',
        formSectionContent: [
          {
            parentFormSection: this.formGroup,
            name: CatalogFilterKeys.institutions,
            label: "Instituciones",
            type: FormFieldType.select_tree,
            required: true,
            width: "100%",
            value: "",
            extraContent: {
              selectedTermsUUIDs: this.filters.get(CatalogFilterKeys.institutions).split(","),
              observable:
                this.organizationUUID != ""
                  ? this.sourceService.countSourcesByTerm(
                      this.organizationUUID,
                      2
                    )
                  : this.taxonomyService.getTermsTreeByVocab(
                      VocabulariesInmutableNames.CUBAN_INTITUTIONS
                    ),
              getOptions: (response: any) => {
                if (this.organizationUUID != "") {
                  console.log(response);
                  this.institutionTree = this.initInstitutionTree(
                    response.data.relations
                  );
                  return this.institutionTree;
                } else {
                  this.institutionTree = this.initInstitutionTreeVocab(
                    response.data.tree.term_node
                  );
                  return this.institutionTree;
                }
              },
              selectionChange: selection => {
                console.log(selection);
              }
            }
          }
        ]
      },
      {
        formSection: this.formGroup,
        title: "Cobertura Temática:",
        iconName: "",
        description: "",
        open: this.filters.get(CatalogFilterKeys.subjects) != '',
        formSectionContent: [
          {
            parentFormSection: this.formGroup,
            name: CatalogFilterKeys.subjects,
            label: "Materias",
            type: FormFieldType.vocabulary,
            required: false,
            width: "100%",
            value: this.filters.get(CatalogFilterKeys.subjects).split(","),
            extraContent: {
              multiple: true,
              selectedTermsUUIDs: this.filters.get(CatalogFilterKeys.subjects).split(","),
              vocab: VocabulariesInmutableNames.SUBJECTS,
              level: 0
            }
          }
        ]
      },
      {
        formSection: this.formGroup,
        title: "Indizaciones:",
        iconName: "",
        description: "",
        open: this.filters.get(CatalogFilterKeys.grupo_mes) != '' || this.filters.get(CatalogFilterKeys.miar_types) != '',
        formSectionContent: [
          {
            parentFormSection: this.formGroup,
            name: CatalogFilterKeys.grupo_mes,
            label: "Grupo MES",
            type: FormFieldType.vocabulary,
            required: true,
            width: "100%",
            value: this.filters.get(CatalogFilterKeys.grupo_mes).split(","),
            extraContent: {
              multiple: true,
              selectedTermsUUIDs: this.filters.get(CatalogFilterKeys.grupo_mes).split(","),
              vocab: VocabulariesInmutableNames.INDEXES_CLASIFICATION
            }
          },
          {
            parentFormSection: this.formGroup,
            name: CatalogFilterKeys.miar_types,
            label: "Tipos de MIAR",
            type: FormFieldType.vocabulary,
            required: true,
            width: "100%",
            value: this.filters.get(CatalogFilterKeys.miar_types).split(","),
            extraContent: {
              multiple: true,
              selectedTermsUUIDs: this.filters.get(CatalogFilterKeys.miar_types).split(","),
              vocab: VocabulariesInmutableNames.INDEXES,
              level: 0
            }
          }
        ]
      },
      {
        title: "Estado:",
        description: "",
        iconName: "",
        formSection: this.formGroup,
        open:this.filters.get(CatalogFilterKeys.source_status) != '' && this.filters.get(CatalogFilterKeys.source_status) != 'ALL',
        formSectionContent: [
          {
            name: CatalogFilterKeys.source_status,
            label: "Estado",
            type: FormFieldType.select_expr,
            required: true,
            width: "100%",
            value: this.filters.get(CatalogFilterKeys.source_status),
            extraContent: {
              multiple: false,
              getOptions: () => {
                return [
                  {
                    label: 'Todos',
                    value: 'ALL'
                  },
                  {
                    label: SourceStatus.APPROVED.label,
                    value: SourceStatus.APPROVED.value
                  },
                  {
                    label: SourceStatus.UNOFFICIAL.label,
                    value: SourceStatus.UNOFFICIAL.value
                  }
                ];
              },
              selectionChange: selection => {
                console.log(selection);
              }
            }
          }
        ]
      }
    ];
  }

  private initFilters() {
    this.filters.set(CatalogFilterKeys.grupo_mes, this.params.has(
      CatalogFilterKeys.grupo_mes
    )
      ? this.params.get(CatalogFilterKeys.grupo_mes)
      : "");
    this.filters.set(CatalogFilterKeys.institutions, this.params.has(
      CatalogFilterKeys.institutions
    )
      ? this.params.get(CatalogFilterKeys.institutions)
      : "");
    this.filters.set(CatalogFilterKeys.miar_types, this.params.has(
      CatalogFilterKeys.miar_types
    )
      ? this.params.get(CatalogFilterKeys.miar_types)
      : "");
    this.filters.set(CatalogFilterKeys.source_status, this.params.has(
      CatalogFilterKeys.source_status
    )
      ? this.params.get(CatalogFilterKeys.source_status)
      : SourceStatus.UNOFFICIAL.value);
    this.filters.set(CatalogFilterKeys.source_type, this.params.has(
      CatalogFilterKeys.source_type
    )
      ? this.params.get(CatalogFilterKeys.source_type)
      : "");
    this.filters.set(CatalogFilterKeys.subjects, this.params.has(
        CatalogFilterKeys.subjects
    )
      ? this.params.get(CatalogFilterKeys.subjects)
      : "");
  }

  private initInstitutionTreeVocab(nodes: TermNode[]) {
    const opts: SelectOptionNode[] = [];
    nodes.forEach(node => {
      opts.push({
        element: {
          value: node.term.uuid,
          label: node.term.name
        },
        children: this.initInstitutionTreeVocab(node.children)
      });
    });
    return opts;
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

  private changeTreeFilter() {
    if (this.institutionTree && this.institutionSelection) {
      const selection = this.findFlatInInstTree(this.institutionTree);
      let val = "";
      selection.forEach(element => {
        val = val.concat(element.element.value, ",");
      });
      // val = val.concat(this.organizationUUID)
      val = val.slice(0, val.length - 1);
      // if (val != ''){
      // this.filters[CatalogFilterKeys.institutions] = val;
      this.filters.set(CatalogFilterKeys.institutions, val);
      // }
      // else if (this.organizationUUID != ''){
      //   this.filters[CatalogFilterKeys.institutions] = this.organizationUUID;
      // }
    }
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

  private changeTermMultipleFilter(values, key) {
    if (values[key]) {
      let val = "";
      values[key].forEach(element => {
        val = val.concat(element.uuid, ",");
      });
      val = val.slice(0, val.length - 1);
      // if (val != '') {
      this.filters.set(key, val);
      // this.filters[key] = val;
      // }
    }
  }
}

// (relations.uuid:4dbd2cda-6e42-4858-a999-1fa6ec210657 OR relations.uuid:eeab373f-f904-4f1e-ad91-b36e0e04fa3b)AND(relations.uuid:2f528a11-45d0-4ded-b4f4-98b791c0014e)

// OR(relations.inst.uuid=a1234ORrelations.inst.uuid:23)
