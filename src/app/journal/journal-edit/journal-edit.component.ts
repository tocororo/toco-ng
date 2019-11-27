import { Component } from '@angular/core';
import { Panel, FormFieldType } from '@toco/forms/form-container/form-container.component';
import {Journal} from '@toco/entities/journal.entity.ts'

@Component({
    selector: 'toco-journal-edit',
    templateUrl: './journal-edit.component.html',
    styleUrls: ['./journal-edit.component.scss']
})
export class JournalEditComponent {

    //TODO: Idea del componente:
    // trabajan internamente con un journal, si recibe null entonces es un nuevo, si recibe un journal entonces es editar.
    // en ambos casos devuelve el journal editado, o sea el contenido, listo para hacer post en el backend. 
    public journal: Journal;

    public panels: Panel[] = [{
        title: 'Identificadores',
        description: '',
        iconName: '',
        formField : [
            {name: 'issn_p', placeholder: 'ISSN Impreso', type: FormFieldType.input, required: false },
            {name: 'issn_e', placeholder: 'ISSN Electrónico', type: FormFieldType.input, required: false },
            {name: 'issn_l', placeholder: 'ISSN de Enlace', type: FormFieldType.input, required: false },
            {name: 'rnps', placeholder: 'RNPS', type: FormFieldType.input, required: false }
        ]
    },
    {
      title: 'Información',
      description: '',
      iconName: '',
      formField : [
          {name: 'title', placeholder: 'Título', type: FormFieldType.input, required: false },
          {name: 'description', placeholder: 'Descripción', type: FormFieldType.textarea, required: false},
          {name: 'url', placeholder: 'URL', type: FormFieldType.url, required: false},
          {name: 'email', placeholder: 'Correo Electrónico', type: FormFieldType.email, required: false},
      ]
    },
    {
      title: 'Clasificaciones',
      description: '',
      iconName: '',
      formField : [
        {name: 'institution', placeholder: 'Institución', type: FormFieldType.input, required: false},
        {name: 'subjects', placeholder: 'Materias', type: FormFieldType.input, required: false},
        {name: 'licence', placeholder: 'Licencia', type: FormFieldType.input, required: false},
      ]
    },    
    {
        title: 'Impacto',
        description: '',
        iconName: '',
        formField : [
            {name: 'databases', placeholder: 'Bases de Datos', type: FormFieldType.textarea, required: false},
        ]
    },
    {
        title: 'Acuerdo Legal',
        description: '',
        iconName: '',
        formField : [
            {name: 'licence', placeholder: 'Acuerdo Legal', type: FormFieldType.textarea, required: false },
            {name: 'pedro', placeholder: 'Acepto', type: FormFieldType.checkbox, required: false },
        ]
    }];

}
