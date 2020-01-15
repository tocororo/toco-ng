
import { Component } from '@angular/core';

import { Journal} from '@toco/tools/entities'
import { PanelContent, FormFieldType, IssnValue, HintValue, HintPosition } from '@toco/tools/forms';

import { JournalService } from '../journal.service';

@Component({
        selector: 'toco-journal-edit',
        templateUrl: './journal-edit.component.html',
        styleUrls: ['./journal-edit.component.scss']
})
export class JournalEditComponent
{
    // TODO: Idea del componente:
    // trabajan internamente con un journal, si recibe null entonces es uno nuevo, si recibe un journal entonces es editar.
    // en ambos casos devuelve el journal editado, o sea el contenido, listo para hacer post en el backend.
    public journal: Journal;

    public panels: PanelContent[] = [
        {
            title: 'Revista',
            description: '',
            iconName: '',
            content : [
                { name: 'issn_p', width: '23%', label: 'ISSN Impreso', type: FormFieldType.issn, required: false, startHint: new HintValue(HintPosition.start, 'Escriba un ISSN Impreso válido.'), value: new IssnValue('1234', '124x') },
                { name: 'issn_e', width: '23%', label: 'ISSN Electrónico', type: FormFieldType.issn, required: false, startHint: new HintValue(HintPosition.start, 'Escriba un ISSN Electrónico válido.') },
                { name: 'issn_l', width: '23%', label: 'ISSN de Enlace', type: FormFieldType.issn, required: false, startHint: new HintValue(HintPosition.start, 'Escriba un ISSN de Enlace válido.') },
                { name: 'rnps', width: '23%', label: 'RNPS', type: FormFieldType.rnps, required: true, startHint: new HintValue(HintPosition.start, 'Escriba un RNPS válido.') },

                { name: 'title', label: 'Título', type: FormFieldType.text, required: false },
                { name: 'subtitle', label: 'Subtítulo', type: FormFieldType.text, required: false },
                { name: 'abbreviation', label: 'Título abreviado', type: FormFieldType.text, required: false },
                { name: 'url', label: 'URL', type: FormFieldType.url, required: false, startHint: new HintValue(HintPosition.start, 'Escriba un url válido.') },
                { name: 'email', label: 'Correo Electrónico', type: FormFieldType.email, required: false, startHint: new HintValue(HintPosition.start, 'Escriba un email válido.') },
                { name: 'source_type', label: 'Tipo de revista', type: FormFieldType.url, required: false, startHint: new HintValue(HintPosition.start, 'Escriba un tipo de revista válido.') },
                { name: 'source_app', label: 'Sistema', type: FormFieldType.url, required: false },
                { name: 'start_year', label: 'Año de inicio', type: FormFieldType.url, required: false },
                { name: 'frequency', label: 'Año de inicio', type: FormFieldType.url, required: false },
                { name: 'subjects', label: 'Materias', type: FormFieldType.text, required: false },
                { name: 'description', label: 'Descripción', type: FormFieldType.textarea, required: false },
                { name: 'licence', label: 'Licencia', type: FormFieldType.text, required: false },
                { name: 'social_networks', label: 'Redes Sociales', type: FormFieldType.text, required: false },
            ]
        },
        {
            title: 'Institución',
            description: '',
            iconName: '',
            content : [
                { name: 'institution', label: 'Instutuciones', type: FormFieldType.text, required: false },
                { name: 'custom', label: 'Hacer el formulario para Terminos', type: FormFieldType.text, required: false },
            ]
        },
        {
            title: 'Indizaciones',
            description: '',
            iconName: '',
            content : [
                { name: 'data_bases', label: 'Bases de Datos', type: FormFieldType.text, required: false },

            ]
        },
        {
            title: 'Persona',
            description: '',
            iconName: '',
            content : [
                { name: 'databases', label: 'Bases de Datos', type: FormFieldType.textarea, required: false },
            ]
        },
        {
            title: 'Acuerdo Legal',
            description: '',
            iconName: '',
            content : [
                { name: 'licence', label: 'Acuerdo Legal', type: FormFieldType.textarea, required: false },
                { name: 'accepted', label: 'Acepto', type: FormFieldType.checkbox, required: false },
            ]
        }
    ];

    public constructor(private service: JournalService)
    { }
}
