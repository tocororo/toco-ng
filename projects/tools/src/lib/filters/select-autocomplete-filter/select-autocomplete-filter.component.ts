
import { Component, OnInit, Input } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { startWith, map } from 'rxjs/operators';

import { FilterComponent } from '../filter.component';
import { FiltersService } from '../filters.service';
import { FilterContainerService } from '../filter-container.service';

@Component({
    selector: 'toco-select-autocomplete-filter',
    templateUrl: './select-autocomplete-filter.component.html',
    styleUrls: ['./select-autocomplete-filter.component.scss']
})
export class SelectAutocompleteFilterComponent implements OnInit, FilterComponent {
    @Input() data: any;
    type: string = '';
    placeholder:  string = '';
    text:string = '';
    multiple = false;
    selectValue:string
    selectOptions: ValueInformation[] = [];
    myControl = new FormControl();
    filteredOptions: Observable<ValueInformation[]>;
    chipsList: ValueInformation[] = [];
    inputId: string;
    
    constructor(private filterService : FiltersService,
        private filterContainerService: FilterContainerService  )
    { }  

    ngOnInit() {
        if(this.data.type)          this.type = this.data.type;
        if(this.data.placeholder)   this.placeholder = this.data.placeholder;
        if(this.multiple)           this.multiple = true;
        if(this.data.selectOptions) this.selectOptions = this.data.selectOptions;
        this.data.value='';
        this.filteredOptions = this.myControl.valueChanges.pipe<string,ValueInformation[]>(
            startWith(''),
            map(value => this._filter(value))
        );
        this.inputId = this.placeholder.trim().toLowerCase();
    }
    private _filter(value: string): ValueInformation[] {
        const filterValue = value.toLowerCase();
        return this.selectOptions.filter(option => option.name.toLowerCase().includes(filterValue));
    }
    remove_component(){
        this.filterService.deleteParameter(this.data.field);
        this.filterContainerService.filterDeleted(this.data.index)
        this.filterService.changeAutocompleteFilter(this.data.idVocab, 'OR');
    }
    optionSelect(){
        var valueEmiter ='OR';
        this.chipsList.forEach(chip =>{
            valueEmiter= valueEmiter+','+chip.id;
        });
        this.filterService.changeAutocompleteFilter(this.data.idVocab, valueEmiter);
    }
    addChips(value: ValueInformation){
        this.chipsList.unshift(value);
        this.myControl.setValue('');
        this.filteredOptions = this.myControl.valueChanges.pipe(
            startWith(''),
            map(value => this._filter(value))
        );
        document.getElementById(this.inputId).blur();
        this.optionSelect()
    }
    removeChip(index: number){
        this.chipsList.splice(index,1);
        this.optionSelect();
    }

}

export interface ValueInformation{
    id: string;
    name:string;
}
