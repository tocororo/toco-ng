import { Component, OnInit, Input } from '@angular/core';
import { FilterComponent } from '../filter.component';
import { FiltersService } from '../filters.service';
import { FilterContainerService } from '../filter-container.service';

@Component({
  selector: 'toco-select-filter',
  templateUrl: './select-filter.component.html',
  styleUrls: ['./select-filter.component.scss']
})
export class SelectFilterComponent implements OnInit, FilterComponent {
  @Input() data: any;
  type: string = '';
  placeholder:  string = '';
  text:string = '';
  multiple = false;
  selectValue:string
  selectOptions: string[] = [''];
  
  constructor(private filterService : FiltersService,
    private filterContainerService: FilterContainerService  ) {}  

  ngOnInit() {
    if(this.data.type)          this.type = this.data.type;
    if(this.data.placeholder)   this.placeholder = this.data.placeholder;
    if(this.multiple)           this.multiple = true;
    if(this.data.selectOptions) this.selectOptions = this.data.selectOptions;
    this.data.value='';
  }
  remove_component(){
    this.filterService.deleteParameter(this.data.field);
    this.filterContainerService.filterDeleted(this.data.index)
  }
  optionSelect(){
    if(this.multiple){
      //adaptar el value
    }    
    this.filterService.changeFilter(this.data.field, this.data.value);
  }

}
