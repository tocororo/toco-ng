
import { Component, ComponentFactoryResolver } from '@angular/core';
import { of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material';

import { FilterComponent } from '@toco/tools/filters';
import { FilterItem } from '@toco/tools/filters';
import { BooleanFilterComponent } from '@toco/tools/filters';
import { FilterContainerService } from '@toco/tools/filters';
import { FilterContainerComponent } from '@toco/tools/filters';
import { MessageHandler, StatusCode } from '@toco/tools/core';

import { CatalogService } from '@toco/tools/backend';
import { EnvService } from '@tocoenv/tools/env.service';
import { VocabulariesInmutableNames } from '@toco/tools/entities';

@Component({
  selector: 'toco-catalog-filters-container',
  templateUrl: './catalog-filters.component.html',
  styleUrls: ['./catalog-filters.component.scss']
})
export class CatalogFiltersComponent extends FilterContainerComponent {

  constructor(protected componentFactoryResolver: ComponentFactoryResolver,
    protected childrenService: FilterContainerService,
    protected service: CatalogService,
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
            if (VocabulariesInmutableNames.INTITUTION === vocab.id
                && this.env.organizationUUID !== '') {
                  console.log(this.env.organizationUUID);
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
