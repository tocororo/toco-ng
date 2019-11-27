import { Component } from '@angular/core';
import { Panel, FormFieldType } from '@toco/form-container/form-container.component';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent {
    title = 'Registro de Publicaciones Científicas';

    // TODO: Parametrizar usando el vocabulario 'organismos', en el primer nivel tiene los organismos de nivel
    // superior, en principio esta app puede usarse para otros osde
    organization = 'Ministerio de Educación Superior';

    public panels: Panel[] = [{
        title: 'Identificadores de la Revista',
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
      title: 'Información de la Revista',
      description: '',
      iconName: '',
      formField : [
          {name: 'title', placeholder: 'Título', type: FormFieldType.input, required: false },
          {name: 'description', placeholder: 'Descripción', type: FormFieldType.textarea, required: false},
          {name: 'url', placeholder: 'URL', type: FormFieldType.url, required: false},
          {name: 'email', placeholder: 'Correo Electrónico', type: FormFieldType.email, required: false},
          {name: 'institution', placeholder: 'Institución', type: FormFieldType.input, required: false},
      ]
    },
    {
        title: 'Impacto de la Revista',
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
