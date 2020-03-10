/*
 *   Copyright (c) 2020 Universidad de Pinar del Río "Hermanos Saíz Montes de Oca"
 *   All rights reserved.
 */

import { Component, OnInit, Input } from '@angular/core';
import { FormFieldControl_Experimental } from '../form-field.control.experimental';
import { FormControl } from '@angular/forms';
import { MatOption } from '@angular/material';
import { Observable } from 'rxjs';
import { startWith, map } from 'rxjs/operators';

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
  constructor() {
    super();
  }


  multiple = false;


  ngOnInit() {

    this.multiple = this.content.extraContent['multiple']?this.content.extraContent['multiple'] : false;

    this.content.formGroup.addControl(this.content.name, this.internalControl);

    if (this.content.extraContent.observable) {

      this.content.extraContent.observable.subscribe(

        // next
        (response: any) => {
          this.selectOptions = this.content.extraContent.getOptions(response);
        },
  
        // error
        (error: any) => { console.log(error); }
        ,
  
        // complete
        () => { }
  
      );
    } else {
      this.selectOptions = this.content.extraContent.getOptions();
    }


    this.internalControl.setValue(this.content.value);
    this.onSelectionChange();

  }

  onSelectionChange() {
    if (this.content.extraContent.selectionChange) {
        this.content.extraContent.selectionChange(this.content.value);
      }
  }

}
