import { Component, OnInit } from '@angular/core';

export enum formFieldType {
  textarea = "textarea",
  input = "input",
  datepicker = "datepicker",
  checkbox = "checkbox",
};


@Component({
  selector: 'toco-form-container',
  templateUrl: './form-container.component.html',
  styleUrls: ['./form-container.component.scss']
})
export class FormContainerComponent implements OnInit {

  step = 0;
  
  panels = [
    {
      title: 'panel1',
      description: "este es el panel 1",
      iconName: "account_circle",
      formField : [
        {name: 'paco', placeholder: 'paco', type: formFieldType.textarea}, 
        {name: 'pedro', placeholder: 'data', type: formFieldType.datepicker}, 
        {name: 'juan', placeholder: 'juan', type: formFieldType.input},
        {name: 'check', placeholder: 'check', type: formFieldType.checkbox}
      ]
    },
    {
      title: 'panel2',
      description: "este es el panel 2",
      iconName: "account_circle",
      formField : [
        {name: 'paco', placeholder: 'paco', type: formFieldType.textarea}, 
        {name: 'pedro', placeholder: 'data', type: formFieldType.datepicker}, 
        {name: 'juan', placeholder: 'juan', type: formFieldType.input},
        {name: 'check', placeholder: 'check', type: formFieldType.checkbox}
      ]
    },
    {
      title: 'panel3',
      description: "este es el panel 3",
      iconName: "account_circle",
      formField : [
        {name: 'paco', placeholder: 'paco', type: formFieldType.textarea}, 
        {name: 'pedro', placeholder: 'data', type: formFieldType.datepicker}, 
        {name: 'juan', placeholder: 'juan', type: formFieldType.input},
        {name: 'check', placeholder: 'check', type: formFieldType.checkbox}
      ]
    },
  ];

  constructor() { }

  ngOnInit() {
  }

  setStep(index: number) {
    this.step = index;
  }

  nextStep() {
    this.step++;
  }

  prevStep() {
    this.step--;
  }
}
