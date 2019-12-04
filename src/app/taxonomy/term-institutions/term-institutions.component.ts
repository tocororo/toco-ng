import { Component, OnInit, Inject } from '@angular/core';
import { Panel, FormFieldType, FormContainerAction, FormContainerComponent, FormField } from '@toco/forms/form-container/form-container.component';
import { TaxonomyService } from '../taxonomy.service';
import { Term } from '@toco/entities/taxonomy.entity';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

function get_institution_data(data: any){
  return {
    'name': data.name,
    'description': data.description,
    'data': {
      'identifiers': data.identifiers,
      'email':data.email,
      'address':data.address,
      'website':data.website,
      'role':data.role
    }
  };
}

class InstitutionActionNew implements FormContainerAction {
  doit(data: any): void {
    const idata = get_institution_data(data);
    this.service.newTerm(idata);
  }
  constructor(private service: TaxonomyService) {

  }
}

class InstitutionActionEdit implements FormContainerAction {
  doit(data: any): void {
    console.log(data);
    const idata = get_institution_data(data);
    this.service.editTerm(idata, this.term);
  }
  constructor(private service: TaxonomyService, private term: Term) {

  }
}


@Component({
  selector: 'toco-term-institutions',
  templateUrl: './term-institutions.component.html',
  styleUrls: ['./term-institutions.component.scss']
})
export class TermInstitutionsComponent implements OnInit {


  public panels: Panel[] = [{
    title: 'Término',
    description: '',
    iconName: '',
    formField : []
  }];
  formFields: FormField[] = [
    {name: 'name', placeholder: 'Nombre', type: FormFieldType.input, required: true },
    {name: 'description', placeholder: 'Descripción', type: FormFieldType.textarea, required: false },
    {name: 'identifiers', placeholder: 'Identificadores', type: FormFieldType.textarea, required: false },
    {name: 'email', placeholder: 'Email', type: FormFieldType.textarea, required: false },
    {name: 'address', placeholder: 'Dirección', type: FormFieldType.textarea, required: false },
    {name: 'website', placeholder: 'Sitio Web Oficial', type: FormFieldType.textarea, required: false },
    {name: 'role', placeholder: 'Rol (Select, patrocinador, co-patrocinador...)', type: FormFieldType.textarea, required: false },
  ];

  public action: FormContainerAction;
  constructor(
    public dialogRef: MatDialogRef<FormContainerComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
      console.log(data);
      if (data.service) {
        this.formFields = [
          {name: 'name', placeholder: 'Nombre', type: FormFieldType.input, required: true, value: (data.term.name)? data.term.name : null },
          {name: 'description', placeholder: 'Descripción', type: FormFieldType.textarea, required: false, value: (data.term.description)? data.term.description : null },
          {name: 'identifiers', placeholder: 'Identificadores', type: FormFieldType.textarea, required: false, value: (data.term.data.identifiers)? data.term.data.identifiers: null},
          {name: 'email', placeholder: 'Email', type: FormFieldType.textarea, required: false, value: (data.term.data.email)? data.term.data.email: null },
          {name: 'address', placeholder: 'Dirección', type: FormFieldType.textarea, required: false, value: (data.term.data.address)? data.term.data.address: null },
          {name: 'website', placeholder: 'Sitio Web Oficial', type: FormFieldType.textarea, required: false, value: (data.term.data.website)? data.term.data.website: null },
          {name: 'role', placeholder: 'Rol (Select, patrocinador, co-patrocinador...)', type: FormFieldType.textarea, required: false, value: (data.term.data.role)? data.term.data.role: null },
        ];
        this.panels[0].formField = this.formFields;

        if (data.term) {
          this.action = new InstitutionActionEdit(data.service, data.term);
        } else {
          this.action = new InstitutionActionNew(data.service);
        }
      }

    }

  ngOnInit() {
  }

}
