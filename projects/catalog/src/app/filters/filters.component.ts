/*
 *   Copyright (c) 2020 Universidad de Pinar del Río "Hermanos Saíz Montes de Oca"
 *   All rights reserved.
 */

import { Component, OnInit, OnChanges } from '@angular/core';
import { PanelContent, FormFieldType, SelectOption, FormContainerAction } from '@toco/tools/forms';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { TaxonomyService, SearchService, SourceService } from '@toco/tools/backend';
import { TermNode, VocabulariesInmutableNames, Source } from '@toco/tools/entities';
import { EnvService } from '@tocoenv/tools/env.service';
import { SelectOptionNode, FlatTreeNode } from '@toco/tools/forms/experimental/select-tree/select-tree.component';

@Component({
  selector: 'app-catalog-filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.scss']
})
export class FiltersComponent implements OnInit {

  filters : Array<{name: string, value: string}> ;
  panels: PanelContent[] = null;
  formGroup: FormGroup;
  institutionTree: SelectOptionNode[] = [];
  organizationUUID = '';

  constructor(
    private taxonomyService: TaxonomyService,
    private sourceService: SourceService,
    private envService: EnvService,
    private _formBuilder: FormBuilder,
  ) {
    if (envService.extraArgs && envService.extraArgs['organizationUUID']) {
      this.organizationUUID = envService.extraArgs['organizationUUID'];
    }
  }

  ngOnInit() {
    
    this.filters = new Array();

    this.formGroup = this._formBuilder.group({
      approved: new FormControl(true),
      asc: new FormControl(true),
    });

    this.formGroup.valueChanges.subscribe(
      ( values ) => {
        const inst = values['institutions'];
        inst.forEach( val=> {

        });
      },
      (err: any) => {
          console.log('error: ' + err + '.');
      },
      () => {
        console.log('complete');
      }
    );

    this.panels = [
      {
        title: 'Aprobados:',
        description: '',
        iconName: '',
        formGroup: this.formGroup,
        open: false,
        content: [
          {
            type: FormFieldType.checkbox,
            name: 'approved',
            label: 'Sólo mostrar datos de fuentes aprobadas',
            width: '100%',
            value: true,
            required: true
          }

        ]
      },
      {
        title: 'Revistas por Tipo:',
        description: '',
        iconName: '',
        formGroup: this.formGroup,
        open: false,
        content: [
          {
            name: 'institutions',
            label: 'Instituciones',
            type: FormFieldType.select_tree,
            required: true,
            width: '100%',
            value: '',
            extraContent: {
              observable: this.sourceService.countSourcesByTerm(this.organizationUUID, 2),
              getOptions: (response:any) =>  {
                this.institutionTree = []
                this.institutionTree.push({
                  element: {
                    value: response.data.relations.uuid,
                    label: response.data.relations.name + " (" + response.data.relations.count + ")"
                  },
                  children: this.initInstitutionTree(response.data.relations)
                });
                return this.institutionTree;
              },
              selectionChange: (selection) => {
                console.log(selection)

              }
            }
          },

        ]
      },
      {
        title: 'Revistas por Institución:',
        description: '',
        iconName: '',
        formGroup: this.formGroup,
        open: false,
        content: [
          {
            name: 'institutions',
            label: 'Instituciones',
            type: FormFieldType.select_tree,
            required: true,
            width: '100%',
            value: '',
            extraContent: {
              observable: this.sourceService.countSourcesByTerm(this.organizationUUID, 2),
              getOptions: (response:any) =>  {
                this.institutionTree = []
                this.institutionTree.push({
                  element: {
                    value: response.data.relations.uuid,
                    label: response.data.relations.name + " (" + response.data.relations.count + ")"
                  },
                  children: this.initInstitutionTree(response.data.relations)
                });
                return this.institutionTree;
              },
              selectionChange: (selection) => {
                console.log(selection)

              }
            }
          },

        ]
      },

      
      {
        formGroup: this.formGroup,
        title: 'Tipos de Indizaciones:',
        iconName: '',
        description:'',
        open: false,
        content: [
          {
            name: 'grupo_mes',
            label: 'Grupo MES',
            type: FormFieldType.vocabulary,
            required: true,
            width: '100%',
            value: '',
            extraContent: {
              multiple: true,
              selectedTermsIds: null,
              vocab: VocabulariesInmutableNames.MES_GROUPS
            },
          },
          {
            name: 'miar_types',
            label: 'Tipos de MIAR',
            type: FormFieldType.vocabulary,
            required: true,
            width: '100%',
            value: '',
            extraContent: {
              multiple: true,
              selectedTermsIds: null,
              vocab: VocabulariesInmutableNames.MIAR_DATABASES
            },
          },
        ]
      }
    ];
  }

  private initInstitutionTree(node: any){
    
    if (node && node.children){
      const opts: SelectOptionNode[] = []
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

  private selectInstitution(node:FlatTreeNode){
    
  }
}
