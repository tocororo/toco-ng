import { Component, OnInit } from '@angular/core';
import { FormFieldControl_Experimental } from '../form-field.control.experimental';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'toco-textarea',
  templateUrl: './textarea.component.html',
  styleUrls: ['./textarea.component.scss'],
  host: {
    '[style.minWidth]': 'content.minWidth',
    '[style.width]': 'content.width'
}
})
export class TextareaComponent extends FormFieldControl_Experimental implements OnInit {

  internalControl = new FormControl();

  constructor() { 
    super();
  }

  ngOnInit()
  {
//    this.content.parentFormSection.addControl(this.content.name, this.internalControl);
    console.log(this.content)
    this.internalControl.setValue(this.content.value);
  }
}
