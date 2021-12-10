import { Component, OnInit } from '@angular/core';
import { FormFieldControl_Experimental } from '../form-field.control.experimental';
import { FormGroup } from '@angular/forms';
import { InputControl } from '../../input/input.control';

@Component({
  selector: 'toco-checkbox',
  templateUrl: './checkbox.component.html',
  styleUrls: ['./checkbox.component.scss']
})
export class CheckboxComponent extends InputControl
implements OnInit {

constructor() {
  super();
}

ngOnInit() {
  this.init('', '', false, true);
  // (this.content.parentFormSection as FormGroup).addControl(
  //   this.content.name,
  //   this.internalControl
  // );
}

}
