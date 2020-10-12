
import { Component, ComponentFactoryResolver } from '@angular/core';

import { CatalogService } from '../../backend';
import { FilterContainerComponent, FilterContainerService } from '../../filters';

@Component({
    selector: 'toco-harvester-filters-container',
    templateUrl: './harvester-filters.component.html',
    styleUrls: ['./harvester-filters.component.scss']
})
export class HarvesterFiltersComponent extends FilterContainerComponent{

    constructor(protected componentFactoryResolver: ComponentFactoryResolver,
        protected childrenService: FilterContainerService,
        protected service:  CatalogService,)
    {
        super(componentFactoryResolver, childrenService)
    }

    ngOnInit() {
        super.ngOnInit()

        default_filters.forEach(filter => {
            this.filters_data.push(filter);
        });

        this.service.getJournalsVocab().subscribe(response => {
            response.data.vocabularies.forEach(vocab => {
                this.service.getTerminosByVocab(vocab.name+'/any').subscribe(termsResponse => {
                    this.filters_data.push({
                        index: this.filters_data.length,
                        field: 'terms',
                        type: 'select-autocomplete',
                        placeholder: vocab.name,
                        name: vocab.name,
                        idVocab: vocab.id,
                        selectOptions: termsResponse.data.terms,
                        is_enabled: true
                    });
                });
            });
        });
    }
}

const default_filters = [
    {
        index: 0,
        field: 'title',
        type: 'search',
        placeholder: 'Título',
        name: 'Título',
        is_enabled: true
    }
];
