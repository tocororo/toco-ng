import { Component, OnInit, Input } from '@angular/core';
import { FormFieldControl_Experimental } from '../form-field.control.experimental';
import { FormControl } from '@angular/forms';

interface SelectOption{
  value: any;
  label: string;
}

@Component({
  selector: 'toco-select-generic',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.scss']
})
export class SelectComponent extends FormFieldControl_Experimental implements OnInit {

  internalControl = new FormControl();

  @Input()
  public selectOptions: SelectOption[];
  
  constructor() { 
    super();
  }

  ngOnInit() {
    this.content.formGroup.addControl(this.content.name, this.internalControl);
  }

}
