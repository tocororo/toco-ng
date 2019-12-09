
import { Component, OnInit, ViewChild, Input } from '@angular/core';

import { IssnFormFieldInternalComponent } from './issn-form-field-internal/issn-form-field-internal.component';

/**
 * Custom `MatFormFieldControl` for ISSN input, i.e., a control that represents an
 * ISSN input form field.
 * An ISSN (International Standard Serial Number) is an 8-digit code used to identify
 * newspapers, journals, magazines and periodicals of all kinds and on all media–print
 * and electronic. For more information follow the link: https://www.issn.org/understanding-the-issn/what-is-an-issn/.
 */
@Component({
  selector: 'toco-form-field-issn',
  templateUrl: './form-field-issn.component.html',
  styleUrls: ['./form-field-issn.component.scss']
})
export class FormFieldIssnComponent implements OnInit
{
  @ViewChild(IssnFormFieldInternalComponent, { static: true })
  private _issnFormFieldInternalComponent: IssnFormFieldInternalComponent;

  /**
   * Input field that represents the placeholder for this control.
   */
  @Input()
  public placeholder: string;

  /**
   * Input field that contains true if the control is required; otherwise, false.
   */
  @Input()
  public required: boolean;

  public constructor()
  { }

  public ngOnInit(): void
  { }

  /**
   * Returns true if the control is in an error state; otherwise, false.
   */
  public get errorState(): boolean
  {
    return this._issnFormFieldInternalComponent.errorState;
  }

  /**
   * Returns an error string if the control is in an error state; otherwise, empty string.
   */
  public getErrorMessage(): string
  {
    return this._issnFormFieldInternalComponent.getErrorMessage();
  }
}
