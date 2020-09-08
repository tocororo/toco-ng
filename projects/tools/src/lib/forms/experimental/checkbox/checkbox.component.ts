import { Component, OnInit } from '@angular/core';
import { FormFieldControl_Experimental } from '../form-field.control.experimental';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'toco-checkbox',
  templateUrl: './checkbox.component.html',
  styleUrls: ['./checkbox.component.scss']
})
export class CheckboxComponent extends FormFieldControl_Experimental
implements OnInit {

constructor() {
  super();
}

ngOnInit() {
  (this.content.parentFormSection as FormGroup).addControl(
    this.content.name,
    this.internalControl
  );
}

}
