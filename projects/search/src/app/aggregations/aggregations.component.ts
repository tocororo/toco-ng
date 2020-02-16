import { Component, OnInit } from '@angular/core';
import { PanelContent, FormFieldType, SelectOption } from '@toco/tools/forms';
import { FormGroup, FormBuilder } from '@angular/forms';
import { TaxonomyService, SearchService, VocabulariesInmutableNames } from '@toco/tools/backend';
import { TermNode } from '@toco/tools/entities';

@Component({
  selector: 'app-search-aggregations',
  templateUrl: './aggregations.component.html',
  styleUrls: ['./aggregations.component.scss']
})
export class AggregationsComponent implements OnInit {

  panels: PanelContent[] = null;
  formGroup: FormGroup;
  organismoUUID='';

  constructor(
    private searchService: SearchService,
    private taxonomyService: TaxonomyService,
    private _formBuilder: FormBuilder,
  ) { }

  ngOnInit() {
    this.formGroup = this._formBuilder.group({});
    this.panels = [
      {
        title: '',
        description: '',
        iconName: '',
        formGroup: this.formGroup,
        content: [
          {
            name: 'organismo',
            label: 'Organismo',
            type: FormFieldType.select,
            required: true,
            width: '100%',
            value: this.organismoUUID,
            extraContent: {
              getOptions: () => {
                const opts: SelectOption[] = [];
                this.taxonomyService.getTermsTreeByVocab(VocabulariesInmutableNames.INTITUTION, 0)
                  .subscribe(response => {
                    response.data.tree.term_node.forEach((node: TermNode) => {
                      opts.push({
                        value: node.term.uuid,
                        label: node.term.name,
                      });
                    });
                  });
                return opts;
              },
              selectionChange: (uuid) => {
                this.organismoUUID = uuid;
              }
            }
          }
        ]
      }
    ];
  }

}
