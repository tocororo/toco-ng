import { Component, OnInit, ComponentFactoryResolver, ViewChild, Output, EventEmitter } from '@angular/core';
import { FilterComponent } from '../../filters/filter.component';
import { FilterItem } from '../../filters/filter-item';
import { BooleanFilterComponent } from '../../filters/boolean-filter/boolean-filter.component';
import { CatalogService } from '../catalog.service';
import { FilterContainerService } from '../../filters/filter-container.service';
import { FilterContainerComponent } from '../../filters/filter-container/filter-container.component';


@Component({
  selector: 'toco-catalog-filters-container',
  templateUrl: './catalog-filters.component.html',
  styleUrls: ['./catalog-filters.component.scss']
})
export class CatalogFiltersComponent extends FilterContainerComponent{

  constructor(protected componentFactoryResolver: ComponentFactoryResolver,
              protected childrenService: FilterContainerService,
              protected service:  CatalogService,) {
                super(componentFactoryResolver, childrenService)
              }

  ngOnInit() {
    super.ngOnInit();

    this.addOperator();

// tslint:disable-next-line: no-use-before-declare
    default_filters.forEach(filter =>{
      this.filters_data.push(filter);
    });

    this.service.getJournalsVocab().subscribe(response =>{
      response.data.vocabularies.forEach(vocab =>{
        this.service.getTerminosByVocab(vocab.name).subscribe(termsResponse => {
          this.filters_data.push(
          {
            index: this.filters_data.length,
            field: 'terms',
            type: 'select-autocomplete',
            placeholder: vocab.name,
            name: vocab.name,
            idVocab: vocab.id,
            selectOptions: termsResponse.data.terms,
            is_enabled: true
          }
        );
        });
      });
    });
  }

  addOperator(){
    const f = new FilterItem(BooleanFilterComponent, {field: 'op', value:  true,name: ['AND', 'OR'], is_enabled: false, index:-1});
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
