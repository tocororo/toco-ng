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
  SourceService,
  OrganizationServiceNoAuth
} from "@toco/tools/backend";
import {
  TermNode,
  VocabulariesInmutableNames,
  Source,
  SourceTypes,
  SourceStatus,
  Organization,
  Relationship
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
  institutions: "organizations",
  subjects: "subjects",
  grupo_mes: "grupo_mes",
  indexes: "indexes",
  // source_status: "source_status"
};

@Component({
  selector: "app-catalog-filters",
  templateUrl: "./filters.component.html",
  styleUrls: ["./filters.component.scss"]
})
export class FiltersComponent implements OnInit {
  @Input()
  params: ParamMap;

  @Input()
  public topMainOrganization: Organization = null;

  @Output()
  paramsChange: EventEmitter<Params> = new EventEmitter();

  panels: PanelContent_Depr[] = null;
  formGroup: FormGroup;

  institutionTree: SelectOptionNode[] = [];
  institutionSelection: FlatTreeNode[];

  topOrganizationPID = "";

  filters: Map<string, string> = new Map<string, string>();

  constructor(
    private searchService: SearchService,
    private envService: EnvService,
    private _formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private orgService: OrganizationServiceNoAuth,
  ) {
    
  }

  ngOnInit(){
    this.initPanels()

    // if (this.envService.extraArgs && this.envService.extraArgs["topOrganizationPID"]) {
    //   this.topOrganizationPID = this.envService.extraArgs["topOrganizationPID"];
    //   this.orgService.getOrganizationByPID(this.topOrganizationPID).subscribe(
    //     (response) => {
    //       this.topMainOrganization = new Organization();
    //       this.topMainOrganization.deepcopy(response.metadata);
    //       this.initPanels()
    //     },
    //     (error) => {
    //       console.log("error");
    //     },
    //     () => {}
    //   );
    // }
    // // TODO: si no hay un top level organization entonces hay que usar otro tipo de control para las organizaciones...
  }

  initPanels() {

    this.formGroup = this._formBuilder.group({});
    this.initFilters();
    this.formGroup.valueChanges.subscribe(
      values => {
        // this.institutionSelection = values[CatalogFilterKeys.institutions];
        // this.changeTreeFilter();
        console.log(values)
        this.changeTermMultipleFilter(values, CatalogFilterKeys.institutions, 'value');
        this.changeTermMultipleFilter(values, CatalogFilterKeys.subjects);
        this.changeTermMultipleFilter(values, CatalogFilterKeys.grupo_mes);
        this.changeTermMultipleFilter(values, CatalogFilterKeys.indexes);

        if (
          values[CatalogFilterKeys.source_type] &&
          values[CatalogFilterKeys.source_type].length > 0
        ) {
          this.filters.set(CatalogFilterKeys.source_type,
            values[CatalogFilterKeys.source_type][0].value);
        } else{
          this.filters.set(CatalogFilterKeys.source_type,'');
        }
        console.log(this.filters)
        // if (
        //   values[CatalogFilterKeys.source_status] &&
        //   values[CatalogFilterKeys.source_status] != ""
        // ) {
        //   this.filters.set(CatalogFilterKeys.source_status,
        //     values[CatalogFilterKeys.source_status]);
        // }

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
            type: FormFieldType.select_filter,
            required: false,
            width: "100%",
            value: this.filters.get(CatalogFilterKeys.institutions),
            extraContent: {
              multiple: true,
              selectedTermsIds: this.filters.get(CatalogFilterKeys.institutions).split(","),
              // observable: this.searchService.getOrganizationById(this.topOrganizationPID),
              getOptions: () => {
                const opts: SelectOption[] = [];
                console.log(this.topMainOrganization.relationships)
                this.topMainOrganization.relationships.forEach((child: Relationship) => {
                  opts.push({
                    value: child.id,
                    label: child.label,
                  });
                });
                console.log(opts)
                return opts;
              },
              selectionChange: selection => {
                console.log(selection);
              }
            }
          }
        ]
      },
      {
        title: "Tipo:",
        description: "",
        iconName: "",
        formSection: this.formGroup,
        open: this.filters.get(CatalogFilterKeys.source_type) != '',
        formSectionContent: [
          {
            name: CatalogFilterKeys.source_type,
            parentFormSection: this.formGroup,
            label: "Tipo de Revista",
            type: FormFieldType.select_filter,
            required: false,
            width: "100%",
            value: [this.filters.get(CatalogFilterKeys.source_type)],
            extraContent: {
              multiple: false,
              getOptions: () => {
                const opts: SelectOption[] =  [
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
                return opts;
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
              selectedTermsIds: this.filters.get(CatalogFilterKeys.subjects).split(","),
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
        open: this.filters.get(CatalogFilterKeys.grupo_mes) != '' || this.filters.get(CatalogFilterKeys.indexes) != '',
        formSectionContent: [
          // {
          //   parentFormSection: this.formGroup,
          //   name: CatalogFilterKeys.grupo_mes,
          //   label: "Grupo MES",
          //   type: FormFieldType.vocabulary,
          //   required: true,
          //   width: "100%",
          //   value: this.filters.get(CatalogFilterKeys.grupo_mes).split(","),
          //   extraContent: {
          //     multiple: true,
          //     selectedTermsIds: this.filters.get(CatalogFilterKeys.grupo_mes).split(","),
          //     vocab: VocabulariesInmutableNames.INDEXES_CLASIFICATION
          //   }
          // },
          {
            parentFormSection: this.formGroup,
            name: CatalogFilterKeys.indexes,
            label: "Bases de Datos",
            type: FormFieldType.vocabulary,
            required: true,
            width: "100%",
            value: this.filters.get(CatalogFilterKeys.indexes).split(","),
            extraContent: {
              multiple: true,
              selectedTermsIds: this.filters.get(CatalogFilterKeys.indexes).split(","),
              vocab: VocabulariesInmutableNames.INDEXES,
              level: 0
            }
          }
        ]
      },
      // {
      //   title: "Estado:",
      //   description: "",
      //   iconName: "",
      //   formSection: this.formGroup,
      //   open:this.filters.get(CatalogFilterKeys.source_status) != '' && this.filters.get(CatalogFilterKeys.source_status) != 'ALL',
      //   formSectionContent: [
      //     {
      //       name: CatalogFilterKeys.source_status,
      //       label: "Estado",
      //       type: FormFieldType.select_expr,
      //       required: true,
      //       width: "100%",
      //       value: this.filters.get(CatalogFilterKeys.source_status),
      //       extraContent: {
      //         multiple: false,
      //         getOptions: () => {
      //           return [
      //             {
      //               label: 'Todos',
      //               value: 'ALL'
      //             },
      //             {
      //               label: SourceStatus.APPROVED.label,
      //               value: SourceStatus.APPROVED.value
      //             },
      //             {
      //               label: SourceStatus.UNOFFICIAL.label,
      //               value: SourceStatus.UNOFFICIAL.value
      //             }
      //           ];
      //         },
      //         selectionChange: selection => {
      //           console.log(selection);
      //         }
      //       }
      //     }
      //   ]
      // }
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
    this.filters.set(CatalogFilterKeys.indexes, this.params.has(
      CatalogFilterKeys.indexes
    )
      ? this.params.get(CatalogFilterKeys.indexes)
      : "");
    // this.filters.set(CatalogFilterKeys.source_status, this.params.has(
    //   CatalogFilterKeys.source_status
    // )
      // ? this.params.get(CatalogFilterKeys.source_status)
      // : SourceStatus.UNOFFICIAL.value);
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

  // private initInstitutionTreeVocab(nodes: TermNode[]) {
  //   const opts: SelectOptionNode[] = [];
  //   nodes.forEach(node => {
  //     opts.push({
  //       element: {
  //         value: node.term.uuid,
  //         label: node.term.identifier
  //       },
  //       children: this.initInstitutionTreeVocab(node.children)
  //     });
  //   });
  //   return opts;
  // }
  // private initInstitutionTree(node: any) {
  //   if (node && node.children) {
  //     const opts: SelectOptionNode[] = [];
  //     node.children.forEach((node: any) => {
  //       opts.push({
  //         element: {
  //           value: node.uuid,
  //           label: node.name + " (" + node.count + ")"
  //         },
  //         children: this.initInstitutionTree(node)
  //       });
  //     });
  //     return opts;
  //   }
  //   return null;
  // }

  // private changeTreeFilter() {
  //   if (this.institutionTree && this.institutionSelection) {
  //     const selection = this.findFlatInInstTree(this.institutionTree);
  //     let val = "";
  //     selection.forEach(element => {
  //       val = val.concat(element.element.value, ",");
  //     });
  //     // val = val.concat(this.topOrganizationPID)
  //     val = val.slice(0, val.length - 1);
  //     // if (val != ''){
  //     // this.filters[CatalogFilterKeys.institutions] = val;
  //     this.filters.set(CatalogFilterKeys.institutions, val);
  //     // }
  //     // else if (this.topOrganizationPID != ''){
  //     //   this.filters[CatalogFilterKeys.institutions] = this.topOrganizationPID;
  //     // }
  //   }
  // }
  // private findFlatInInstTree(children: SelectOptionNode[]) {
  //   let result: FlatTreeNode[] = [];
  //   children.forEach(node => {
  //     const to_add = this.institutionSelection.find(
  //       f => f.element.value == node.element.value
  //     );
  //     if (to_add != undefined) {
  //       result.push(to_add);
  //     } else {
  //       result = result.concat(this.findFlatInInstTree(node.children));
  //     }
  //   });
  //   return result;
  // }

  private changeTermMultipleFilter(values, key, valuekey='uuid') {
    if (values[key]) {
      let val = "";
      values[key].forEach(element => {
        console.log(element);
        
        val = val.concat(element[valuekey], ",");
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
