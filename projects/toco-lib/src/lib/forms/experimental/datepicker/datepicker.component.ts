import { Component, OnInit } from "@angular/core";
import { FormFieldControl_Experimental } from "../form-field.control.experimental";
import { FormGroup } from "@angular/forms";
import { InputControl } from '../../input/input.control';

@Component({
  selector: "toco-datepicker",
  templateUrl: "./datepicker.component.html",
  styleUrls: ["./datepicker.component.scss"],
})
export class DatepickerComponent extends InputControl
  implements OnInit {

        // TODO: for datepicker, !!!! use https://stackblitz.com/edit/angular-material2-year-picker-7z9k4t?file=app%2Fcustom-datepicker%2Fyear-picker-component%2Fyear-picker.component.html

  constructor() {
    super();
  }

  ngOnInit() {
    this.init('', false, true);
    // (this.content.parentFormSection as FormGroup).addControl(
    //   this.content.name,
    //   this.internalControl
    // );
  }
}
