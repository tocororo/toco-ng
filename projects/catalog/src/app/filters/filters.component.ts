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
import { SelectOptionNode } from '@toco/tools/forms/experimental/select-tree/select-tree.component';

@Component({
  selector: 'app-catalog-filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.scss']
})
export class FiltersComponent implements OnInit {

  panels: PanelContent[] = null;
  formGroup: FormGroup;

  organismoUUID = '';

  constructor(
    private taxonomyService: TaxonomyService,
    private sourceService: SourceService,
    private envService: EnvService,
    private _formBuilder: FormBuilder,
  ) {
    if (envService.extraArgs && envService.extraArgs['organismoUUID']) {
      this.organismoUUID = envService.extraArgs['organismoUUID'];
    }
  }

  ngOnInit() {
    this.formGroup = this._formBuilder.group({
      approved: new FormControl(true),
      asc: new FormControl(true),
    });

    this.formGroup.valueChanges.subscribe(
      ( values ) => {
        console.log(values);
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
        title: 'Colección:',
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
          },
          {
            name: 'institutions',
            label: 'Instituciones',
            type: FormFieldType.select_tree,
            required: true,
            width: '100%',
            value: '',
            extraContent: {
              observable: this.sourceService.countSourcesByTerm(this.envService.extraArgs['organismoUUID'], 1),
              getOptions: (response:any) =>  {
                const opts: SelectOptionNode[] = []
                response.data.relations.children.forEach((node: any) => {
                  opts.push({
                    element: {
                      value: node.uuid,
                      label: node.name + " (" + node.count + ")"
                    },
                    children: node.children
                  });
                });
                return opts;
              },
              selectionChange: (uuid) => {
                console.log("AAAQAQAQA")

              }
            }
          },
          {
            name: 'organismo',
            label: 'Organismo',
            type: FormFieldType.select,
            required: true,
            width: '100%',
            value: this.organismoUUID,
            extraContent: {
              observable: this.taxonomyService.getTermsTreeByVocab(VocabulariesInmutableNames.INTITUTION, 0),
              getOptions: (response:any) =>  {
                const opts: SelectOption[] = []
                response.data.tree.term_node.forEach((node: TermNode) => {
                  opts.push({
                    value: node.term.uuid,
                    label: node.term.name,
                  });
                });
                return opts;
              },
              selectionChange: (uuid) => {
                this.organismoUUID = uuid;
                this.initSourcesPanel();

              }
            }
          }
        ]
      },
      {
        title: 'Ordenar por:',
        description: '',
        iconName: '',
        formGroup: this.formGroup,
        open: false,
        content: [
          {
            type: FormFieldType.select,
            name: 'sort',
            label: '',
            width: '100%',
            value: 'mostrecent',
            required: true,
            extraContent: {
              getOptions: () => {
                return [
                  {
                    value: 'mostrecent',
                    label: 'Mas reciente',
                  },
                  {
                    value: 'bestmatch',
                    label: 'Mejor resultado',
                  },
                ];
              }
            }
          },
          {
            type: FormFieldType.checkbox,
            name: 'asc',
            label: 'Orden Ascendente',
            width: '100%',
            value: true,
            required: true
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

  initSourcesPanel() {
    this.formGroup.removeControl('source');
    this.panels[0].content[2] = {
      name: 'source',
      label: 'Fuentes',
      type: FormFieldType.select_filter,
      formGroup: this.formGroup,
      width: '100%',
      extraContent: {
        multiple: true,
        observable: this.sourceService.getSourcesByTermUUID(this.organismoUUID),
        getOptions: (response: any) => {
          const opts: SelectOption[] = [];
          if (response.data.sources){
            response.data.sources.forEach((source: Source) => {
              opts.push({
                value: source.uuid,
                label: source.name,
              });
            });
          }
          return opts;
        },
        selectionChange: (value) => {
          console.log(value);
        }
      }
    };
  }
}
