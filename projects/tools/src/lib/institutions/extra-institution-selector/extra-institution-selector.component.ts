import { Component, OnInit, Input } from '@angular/core';
import { Term, VocabulariesInmutableNames } from '@toco/tools/entities';
import { TermHelper } from '@toco/tools/taxonomy';
import { FormGroup, FormBuilder } from '@angular/forms';
import { PanelContent, FormFieldType } from '@toco/tools/forms';

@Component({
  selector: 'toco-extra-institution-selector',
  templateUrl: './extra-institution-selector.component.html',
  styleUrls: ['./extra-institution-selector.component.scss']
})
export class ExtraInstitutionSelectorComponent implements OnInit {

  @Input()
  public institution: Term;

  @Input()
  public externalFormGroup: FormGroup;

  institutionPanel: PanelContent[] = null;

  constructor(
    private formBuilder: FormBuilder,
  ) { }

  ngOnInit() {
    if (this.institution) {
      this.institutionPanel = [
        {
          title: "Institución",
          description: "",
          iconName: "",
          formGroup: this.externalFormGroup,
          content: [
            {
              name: "name",
              label: "Nombre",
              type: FormFieldType.text,
              required: true,
              value: this.institution.name ? this.institution.name : null,
              width: "100%"
            },
            {
              name: "grid",
              label: "Identificador",
              type: FormFieldType.text,
              required: false,
              value: this.institution.data["grid"] ? this.institution.data["grid"] : null,
              width: "45%"
            },
            {
              name: "country",
              label: "Pais",
              type: FormFieldType.vocabulary,
              required: false,
              extraContent: {
                multiple: false,
                selectedTermsIds: this.institution.class_ids ? this.institution.class_ids : null,
                vocab: VocabulariesInmutableNames.PROVINCES
              },
              width: "45%"
            },
            {
              name: "description",
              label: "Descripción",
              type: FormFieldType.textarea,
              required: false,
              value: this.institution.description ? this.institution.description : null,
              width: "100%"
            },
            {
              name: "email",
              label: "Email",
              type: FormFieldType.email,
              required: true,
              value: this.institution.data["email"] ? this.institution.data["email"] : null,
              width: "45%"
            },
            {
              name: "website",
              label: "Sitio Web Oficial",
              type: FormFieldType.url,
              required: false,
              value: this.institution.data["website"] ? this.institution.data["website"] : null,
              width: "45%"
            },
            {
              name: "address",
              label: "Dirección",
              type: FormFieldType.textarea,
              required: false,
              value: this.institution.data["address"] ? this.institution.data["address"] : null,
              width: "100%"
            }
          ]
        }
      ];
    }
  }
}
