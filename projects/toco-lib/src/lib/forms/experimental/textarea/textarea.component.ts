import { Component, OnInit } from "@angular/core";
import { FormFieldControl_Experimental } from "../form-field.control.experimental";
import { FormControl, FormGroup } from "@angular/forms";
import { InputControl } from '../../input/input.control';

@Component({
  selector: "toco-textarea",
  templateUrl: "./textarea.component.html",
  styleUrls: ["./textarea.component.scss"],
  host: {
    "[style.minWidth]": "content.minWidth",
    "[style.width]": "content.width",
  },
})
export class TextareaComponent extends InputControl
  implements OnInit {
  // internalControl = new FormControl();

  constructor() {
    super();
  }

  ngOnInit() {
    // (this.content.parentFormSection as FormGroup).addControl(
    //   this.content.name,
    //   this.internalControl
    // );
    // console.log(this.content);
    // this.content.formControl.setValue(this.content.value);
  }
}
