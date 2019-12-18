
import { Component } from '@angular/core';

import { FormFieldType, FormFieldContent } from './forms/form-container/form-container.component';

@Component({
    selector: 'toco-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent
{
    title = 'toco';

    formFieldContent1: FormFieldContent = { name: 'url', placeholder: 'URL', type: FormFieldType.url, required: false, hintValue: 'Escriba un url válido.' };
    formFieldContent2: FormFieldContent = { name: 'email', placeholder: 'Correo Electrónico', type: FormFieldType.email, required: false, hintValue: 'Escriba un email válido.' };
    formFieldContent3: FormFieldContent = { name: 'issn_p', placeholder: 'ISSN Impreso', type: FormFieldType.issn, required: false, hintValue: 'Escriba un ISSN Impreso válido.' };
    formFieldContent4: FormFieldContent = { name: 'rnps', placeholder: 'RNPS', type: FormFieldType.rnps, required: true, hintValue: 'Escriba un RNPS válido.' };

}
