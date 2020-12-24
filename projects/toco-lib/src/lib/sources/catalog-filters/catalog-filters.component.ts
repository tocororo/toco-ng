/*
 *   Copyright (c) 2020 Universidad de Pinar del Río "Hermanos Saíz Montes de Oca"
 *   All rights reserved.
 */


import { Component, ComponentFactoryResolver } from '@angular/core';
import { of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material';

import { FilterComponent } from '../../filters/public-api';
import { FilterItem } from '../../filters/public-api';
import { BooleanFilterComponent } from '../../filters/public-api';
import { FilterContainerService } from '../../filters/public-api';
import { FilterContainerComponent } from '../../filters/public-api';
import { MessageHandler, StatusCode } from '../../core/public-api';

import { CatalogService, TaxonomyService } from '../../backend/public-api';
import { EnvService } from '../../backend/env.service';
import { VocabulariesInmutableNames } from '../../entities/public-api';

@Component({
  selector: 'toco-catalog-filters-container',
  templateUrl: './catalog-filters.component.html',
  styleUrls: ['./catalog-filters.component.scss']
})
export class CatalogFiltersComponent extends FilterContainerComponent {

  constructor(protected componentFactoryResolver: ComponentFactoryResolver,
    protected childrenService: FilterContainerService,
    protected service: CatalogService,
    private taxonomyService: TaxonomyService,
    private _snackBar: MatSnackBar,
    private env: EnvService) {
    super(componentFactoryResolver, childrenService)
  }

  ngOnInit() {
    super.ngOnInit();

    this.addOperator();

    // tslint:disable-next-line: no-use-before-declare
    default_filters.forEach(filter => {
      this.filters_data.push(filter);
    });

    this.service.getJournalsVocab().pipe(
      catchError(error => {
        const m = new MessageHandler(this._snackBar);
        m.showMessage(StatusCode.serverError, error.message);
        return of(null);
      })
    )
      .subscribe(response => {
        if (response) {
          response.data.vocabularies.forEach(vocab => {
            if (VocabulariesInmutableNames.CUBAN_INTITUTIONS === vocab.id
              && this.env.topOrganizationPID !== '') {
              console.log(this.env.topOrganizationPID);
              this.taxonomyService.getTermByUUID(this.env.topOrganizationPID).subscribe(termsResponse => {
                this.filters_data.push(
                  {
                    index: this.filters_data.length,
                    field: 'terms',
                    type: 'tree',
                    placeholder: vocab.human_name,
                    name: vocab.human_name,
                    idVocab: vocab.id,
                    selectOptions: termsResponse.data.term_node.children,
                    is_enabled: true
                  });
              });
            } else {
              this.service.getTerminosByVocab(vocab.id).subscribe(termsResponse => {
                this.filters_data.push(
                  {
                    index: this.filters_data.length,
                    field: 'terms',
                    type: 'select-autocomplete',
                    placeholder: vocab.human_name,
                    name: vocab.human_name,
                    idVocab: vocab.id,
                    selectOptions: termsResponse.data.terms,
                    is_enabled: true
                  });

              });
            }

          });
        } else {
          const m = new MessageHandler(this._snackBar);
          m.showMessage(StatusCode.serverError, "No puedo cargar los vocabularios");
        }
      });
  }

  addOperator() {
    const f = new FilterItem(BooleanFilterComponent, { field: 'op', value: true, name: ['AND', 'OR'], is_enabled: false, index: -1 });
    // this.current_filters.push(f);
    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(f.component);
    const viewContainerRef = this.adHost.viewContainerRef;
    // viewContainerRef.clear();
    const componentRef = viewContainerRef.createComponent(componentFactory);
    (<FilterComponent>componentRef.instance).data = f.data;
  }

}

const default_filters =
  [
    {
      index: 0,
      field: 'title',
      type: 'search',
      placeholder: 'Título',
      name: 'Título',
      is_enabled: true
    },
    {
      index: 1,
      field: 'issn',
      type: 'text',
      placeholder: 'ISSN',
      name: 'ISSN',
      is_enabled: true
    }/*,
        {
            index: 2,
            field: 'e_issn',
            type: 'text',
            placeholder: 'eISSN',
            name: 'eISSN',
            is_enabled: true
        },
        {
            index: 3,
            field: 'i_issn',
            type: 'text',
            placeholder: 'iISSN',
            name: 'iISSN',
            is_enabled: true
        }*/,
    {
      index: 2,
      field: 'rnps',
      type: 'number',
      placeholder: 'RNPS',
      name: 'RNPS',
      is_enabled: true
    }/*,
        {
            index: 5,
            field: 'term',
            type: 'select',
            placeholder: 'Términos',
            name: 'Términos',
            is_enabled: true
        } */
  ];
