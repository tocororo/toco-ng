import { Component, OnInit } from "@angular/core";
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
    this.init('', '', false, true);
    // (this.content.parentFormSection as FormGroup).addControl(
    //   this.content.name,
    //   this.internalControl
    // );
    // // console.log(this.content);
    // this.content.formControl.setValue(this.content.value);
  }
}
