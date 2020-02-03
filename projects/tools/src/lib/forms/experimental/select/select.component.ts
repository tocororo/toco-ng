import { Component, OnInit, Input } from '@angular/core';
import { FormFieldControl_Experimental } from '../form-field.control.experimental';
import { FormControl } from '@angular/forms';
import { MatOption } from '@angular/material';

export interface SelectOption{
  value: any;
  label: string;
  // selected?: boolean;
}

/***
 * extraContent recibe una funcion llamada getOptions() que se encarga de contruir un SelectOption[]
 */
@Component({
  selector: 'toco-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.scss'],
  host: {
    '[style.minWidth]': 'content.minWidth',
    '[style.width]': 'content.width'
  }
})
export class SelectComponent extends FormFieldControl_Experimental implements OnInit {

  internalControl = new FormControl();

  public selectOptions: SelectOption[] = null;
  selectedValue: any;
  algo: MatOption;
  constructor() {
    super();
  }

  ngOnInit() {
    this.selectOptions = this.content.extraContent.getOptions();
    this.selectedValue = this.content.value;
    // this.selectOptions.forEach(opt => {
    //   if (opt.value === this.selectedValue) {
    //     opt.selected = true;
    //   } else {
    //     opt.selected = false;
    //   }
    // });
    this.content.formGroup.addControl(this.content.name, this.internalControl);
    this.internalControl.setValue(this.content.value);
    this.onSelectionChange();
  }
  onSelectionChange() {
    if (this.content.extraContent.selectionChange) {
        this.content.extraContent.selectionChange(this.content.value);
      }
  }
}
