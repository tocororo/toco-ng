import { Component, OnInit, Inject } from '@angular/core';

import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

import { FormContainerComponent, Panel, FormFieldType, FormContainerAction} from '@toco/forms/form-container/form-container.component';
import { Term } from '@toco/entities/taxonomy.entity';
import { TermActionEdit, TermActionNew } from '../terms/terms.component';

@Component({
  selector: 'toco-term-generic',
  templateUrl: './term-generic.component.html',
  styleUrls: ['./term-generic.component.scss']
})
export class TermGenericComponent implements OnInit {

  public panels: Panel[] = [{
    title: 'Término',
    description: '',
    iconName: '',
    formField : [
        {name: 'name', placeholder: 'Nombre', type: FormFieldType.input, required: true },
        {name: 'description', placeholder: 'Descripción', type: FormFieldType.textarea, required: false },
    ]
  }];
  public action: FormContainerAction;
  constructor(
    public dialogRef: MatDialogRef<FormContainerComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
      console.log(data);
      if (data.service) {
        if (data.term) {
          this.panels[0].formField[0].value = data.term.name;
          this.panels[0].formField[1].value = data.term.description;
          this.action = new TermActionEdit(data.service, data.term);
        } else {
          this.action = new TermActionNew(data.service);
        }
      }

    }

  ngOnInit() {
  }

}
