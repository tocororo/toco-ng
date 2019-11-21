import { Component, OnInit,  Input } from '@angular/core';
import { formFieldType } from '@toco/form-container/form-container.component';

@Component({
  selector: 'toco-form-fields',
  templateUrl: './form-fields.component.html',
  styleUrls: ['./form-fields.component.scss']
})
export class FormFieldsComponent implements OnInit {

  @Input() fields: Array<any>;
  type = formFieldType;
  constructor() { }

  ngOnInit() {
    if (!this.fields)
      this.fields = [];
  }

}
