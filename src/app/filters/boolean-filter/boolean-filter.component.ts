import { Component, OnInit, Input } from '@angular/core';
import { FilterComponent } from '../filter.component';
import { FiltersService } from '../filters.service';
import { FilterContainerService } from '../filter-container.service';

@Component({
  selector: 'toco-boolean-filter',
  templateUrl: './boolean-filter.component.html',
  styleUrls: ['./boolean-filter.component.scss']
})
export class BooleanFilterComponent implements OnInit , FilterComponent {
  @Input() data: any;
  operator: boolean = true;
  operator_name: string;
  direction:string = 'column';
  classDireccion:string;
  constructor(private filterService : FiltersService,
    private filterContainerService: FilterContainerService) { }

  ngOnInit() {
    this.operator = this.data.value;
    this.operator_name = this.data.name[0];
    if(this.data.direction){
      this.direction = 'row';
      this.classDireccion = '-horizontal';
    } 
  }
  remove_component(){
    this.filterService.deleteParameter(this.data.field);
    this.filterContainerService.filterDeleted(this.data.index)
  }
  
  change_operator_name(){
    this.operator ? this.operator_name = this.data.name[1] : this.operator_name = this.data.name[0];
    let value = this.operator? 'OR' : 'AND';
    this.filterService.changeFilter(this.data.field, value );
  }
  
  changeInterruptor(){
    this.operator = !this.operator;
    this.change_operator_name();
  }
}
