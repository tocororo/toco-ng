import { Component, OnInit, ComponentFactoryResolver, ViewChild, Output, EventEmitter } from '@angular/core';
import { FilterComponent } from '../../filters/filter.component';
import { FilterItem } from '../../filters/filter-item';
import { BooleanFilterComponent } from '../../filters/boolean-filter/boolean-filter.component';
import { CatalogService } from '../../catalog/catalog.service';
import { FilterContainerService } from '../../filters/filter-container.service';
import { FilterContainerComponent } from '../../filters/filter-container/filter-container.component';
import { FilterDirective } from '../../filters/filter.directive';


@Component({
  selector: 'toco-harvester-filters-container',
  templateUrl: './harvester-filters.component.html',
  styleUrls: ['./harvester-filters.component.scss']
})
export class HarvesterFiltersComponent extends FilterContainerComponent{

  
  constructor(protected componentFactoryResolver: ComponentFactoryResolver,
              protected childrenService: FilterContainerService,
              protected service:  CatalogService,) { 
                super(componentFactoryResolver, childrenService)
              }

  ngOnInit() {
    super.ngOnInit()

    default_filters.forEach(filter =>{
      this.filters_data.push(filter);
    });

    this.service.getJournalsVocab().subscribe(response =>{
      response.data.vocabularies.forEach(vocab =>{ 
        this.service.getTerminosByVocab(vocab.name+'/any').subscribe(termsResponse =>{
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
    }
  ];
