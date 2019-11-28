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
        title: 'Revista',
        description: '',
        iconName: '',
        formField : [
            {name: 'title', placeholder: 'Título', type: FormFieldType.input, required: false },
            {name: 'subtitle', placeholder: 'Subtítulo', type: FormFieldType.input, required: false },
            {name: 'abbreviation', placeholder: 'Título abreviado', type: FormFieldType.input, required: false },
            {name: 'url', placeholder: 'URL', type: FormFieldType.url, required: false},
            {name: 'email', placeholder: 'Correo Electrónico', type: FormFieldType.email, required: false},
            {name: 'source_type', placeholder: 'Tipo de revista', type: FormFieldType.url, required: false},
            {name: 'source_app', placeholder: 'Sistema', type: FormFieldType.url, required: false},
            {name: 'start_year', placeholder: 'Año de inicio', type: FormFieldType.url, required: false},
            {name: 'frequency', placeholder: 'Año de inicio', type: FormFieldType.url, required: false},
            {name: 'issn_p', placeholder: 'ISSN Impreso', type: FormFieldType.input, required: false },
            {name: 'issn_e', placeholder: 'ISSN Electrónico', type: FormFieldType.input, required: false },
            {name: 'issn_l', placeholder: 'ISSN de Enlace', type: FormFieldType.input, required: false },
            {name: 'rnps', placeholder: 'RNPS', type: FormFieldType.input, required: false },
            {name: 'subjects', placeholder: 'Materias', type: FormFieldType.input, required: false},
            {name: 'description', placeholder: 'Descripción', type: FormFieldType.textarea, required: false},
            {name: 'licence', placeholder: 'Licencia', type: FormFieldType.input, required: false},
            {name: 'social_networks', placeholder: 'Redes Sociales', type: FormFieldType.input, required: false},
        ]
    },
    {
      title: 'Institución',
      description: '',
      iconName: '',
      formField : [
        {name: 'institution', placeholder: 'Instutuciones', type: FormFieldType.input, required: false},
        {name: 'custom', placeholder: 'Hacer el formulario para Terminos', type: FormFieldType.input, required: false},
      ]
    },
    {
      title: 'Indizaciones',
      description: '',
      iconName: '',
      formField : [
        {name: 'data_bases', placeholder: 'Dases de Datos', type: FormFieldType.input, required: false},

      ]
    },    
    {
        title: 'Persona',
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
