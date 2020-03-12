/*
 *   Copyright (c) 2020 Universidad de Pinar del Río "Hermanos Saíz Montes de Oca"
 *   All rights reserved.
 */


import { Component, OnInit, ComponentFactoryResolver, ViewChild, Output, EventEmitter } from '@angular/core';

import { FilterComponent } from '../filter.component';
import { FilterItem } from '../filter-item';
import { FilterDirective } from '../filter.directive';
import { TitleFilterComponent } from '../title-filter/title-filter.component';
import { BooleanFilterComponent } from '../boolean-filter/boolean-filter.component';
import { SelectFilterOldComponent } from '../select-filter/select-filter.component';
import { SelectAutocompleteFilterComponent } from '../select-autocomplete-filter/select-autocomplete-filter.component';
import { FilterContainerService } from '../filter-container.service';
import { TreeFilterComponent } from '../tree-filter/tree-filter.component';

@Component({
  selector: 'toco-filter-container',
  templateUrl: './filter-container.component.html',
  styleUrls: ['./filter-container.component.scss']
})
export class FilterContainerComponent implements OnInit {

  // current_filters: Array<FilterItem>;
  filters_data;

  @Output() filter_url: EventEmitter<string> = new EventEmitter();

  @ViewChild(FilterDirective, { static: true }) adHost: FilterDirective;

  constructor(protected componentFactoryResolver: ComponentFactoryResolver,
    protected childrenService: FilterContainerService) { }

  ngOnInit() {
    this.filters_data = [];
    this.childrenService.emitter.subscribe(filterIndex => {
      this.deleteFilter(filterIndex)
    });

  }

  addFilter(index) {
    let data = this.filters_data[index];

    let viewContainerRef = this.adHost.viewContainerRef;
    data.pos = viewContainerRef.length

    let f = this.newFilter(data);
    // this.current_filters.push(f);
    let componentFactory = this.componentFactoryResolver.resolveComponentFactory(f.component);

    let componentRef = viewContainerRef.createComponent(componentFactory);
    (<FilterComponent>componentRef.instance).data = f.data;
    //this.delete_item_of_filters(pos);

    this.filters_data[index].is_enabled = false
  }

  newFilter(data_filter): FilterItem {
    data_filter.viewContainerRef = this.adHost.viewContainerRef;
    let f = null;
    switch (data_filter.type) {
      case 'select': { f = new FilterItem(SelectFilterOldComponent, data_filter); break; }
      case 'boolean': { f = new FilterItem(BooleanFilterComponent, data_filter); break; }
      case 'select-autocomplete': { f = new FilterItem(SelectAutocompleteFilterComponent, data_filter); break; }
      case 'tree': { f = new FilterItem(TreeFilterComponent, data_filter); break; }
      default: f = new FilterItem(TitleFilterComponent, data_filter);
    }
    return f;
  }

  deleteFilter(index) {
    let last_pos = this.filters_data[index].pos

    this.adHost.viewContainerRef.remove(this.filters_data[index].pos);
    this.filters_data[index].pos = -1
    this.filters_data[index].is_enabled = true

    for (let i = 0; i < this.filters_data.length; i++) {
      if (!this.filters_data[i].is_enabled && this.filters_data[i].pos > last_pos) {
        this.filters_data[i].pos = this.filters_data[i].pos - 1
      }

    }
  }
}
