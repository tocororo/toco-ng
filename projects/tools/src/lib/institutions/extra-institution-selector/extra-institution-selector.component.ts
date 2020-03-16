import { Component, OnInit, Input } from '@angular/core';
import { Term } from '@toco/tools/entities';
import { TermHelper } from '@toco/tools/taxonomy';
import { FormGroup, FormBuilder } from '@angular/forms';
import { PanelContent } from '@toco/tools/forms';

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
      const content = TermHelper.getPanelContentToEdit(this.institution);
      this.institutionPanel = [
        {
          title: "Institución",
          description: "",
          iconName: "",
          formGroup: this.externalFormGroup,
          content: content
        }
      ];
    }
  }
}
