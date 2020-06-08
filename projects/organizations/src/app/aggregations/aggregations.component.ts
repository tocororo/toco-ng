
import { Component, OnInit, OnChanges } from '@angular/core';
import { PanelContent, FormFieldType, SelectOption, FormContainerAction } from '@toco/tools/forms';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { TaxonomyService, SearchService, SourceService } from '@toco/tools/backend';
import { TermNode, VocabulariesInmutableNames, Source } from '@toco/tools/entities';
import { EnvService } from '@tocoenv/tools/env.service';


@Component({
  selector: 'app-aggregations',
  templateUrl: './aggregations.component.html',
  styleUrls: ['./aggregations.component.scss']
})
export class AggregationsComponent implements OnInit {

  panels: PanelContent[] = null;
  formGroup: FormGroup;


  constructor(
    private formBuilder: FormBuilder,
  ) {}

  ngOnInit() {
    this.formGroup = this.formBuilder.group({});

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
        title: 'Filtros:',
        description: '',
        iconName: '',
        formGroup: this.formGroup,
        open: false,
        content: [
          {
            name: 'types',
            label: 'Tipos',
            type: FormFieldType.select,
            required: true,
            width: '100%',
            value: '',
            extraContent: {
              multiple: false,
              getOptions: () => {
                return [
                  {
                    label: 'Education',
                    value: 'Education'
                  },
                  {
                    label: 'Healthcare',
                    value: 'Healthcare'
                  },
                  {
                    label: 'Company',
                    value: 'Company'
                  },
                  {
                    label: 'Archive',
                    value: 'Archive'
                  },
                  {
                    label: 'Nonprofit',
                    value: 'Nonprofit'
                  },
                  {
                    label: 'Government',
                    value: 'Government'
                  },
                  {
                    label: 'Facility',
                    value: 'Facility'
                  },
                  {
                    label: 'Other',
                    value: 'Other'
                  },
                ];
              }
            }
          },
          // {
          //   name: 'country',
          //   label: 'Pais',
          //   required: true,
          //   width: '100%',
          //   type: FormFieldType.vocabulary,
          //   extraContent: {
          //     multiple: true,
          //     selectedTermsIds: null,
          //     vocab: VocabulariesInmutableNames.COUNTRIES
          //   },
          // },
          // {
          //   name: 'state',
          //   label: 'Estado/Provincia',
          //   type: FormFieldType.select,
          //   required: true,
          //   width: '100%',
          // }
        ]
      }
    ];
  }
}
