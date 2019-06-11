import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FilterComponent } from '../filter.component';
import { FiltersService } from '../filters.service';
import { FilterContainerService } from '../filter-container.service';


@Component({
  selector: 'toco-title-filter',
  templateUrl: './title-filter.component.html',
  styleUrls: ['./title-filter.component.scss']
})
export class TitleFilterComponent implements OnInit, FilterComponent {
  @Input() data: any;
  type: string;
  placeholder:  string;
  text:string;
  constructor(private filterService : FiltersService,
              private filterContainerService: FilterContainerService ) {
  }

  ngOnInit() {
    this.type = this.data.type;
    this.placeholder = this.data.placeholder;
    this.data.value='';
  }

  remove_component(){
    this.filterService.deleteParameter(this.data.field);
    this.filterContainerService.filterDeleted(this.data.index)
    
  }
  onChange(){
    this.filterService.changeFilter(this.data.field, this.data.value);
  }
}
