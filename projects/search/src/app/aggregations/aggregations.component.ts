import { Component, OnInit, OnChanges } from '@angular/core';
import { PanelContent, FormFieldType, SelectOption, FormContainerAction } from '@toco/tools/forms';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { TaxonomyService, SearchService } from '@toco/tools/backend';
import { TermNode, VocabulariesInmutableNames } from '@toco/tools/entities';
import { EnvService } from '@tocoenv/tools/env.service';

@Component({
  selector: 'app-search-aggregations',
  templateUrl: './aggregations.component.html',
  styleUrls: ['./aggregations.component.scss']
})
export class AggregationsComponent implements OnInit {

  panels: PanelContent[] = null;
  formGroup: FormGroup;

  organismoUUID = '';

  constructor(
    private searchService: SearchService,
    private taxonomyService: TaxonomyService,
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
        title: 'Colección',
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
                
              }
            }
          },
        ]
      },
      {
        formGroup: this.formGroup,
        title: 'Tipos de Indizaciones',
        iconName: '',
        description:'',
        open: true,
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

}
