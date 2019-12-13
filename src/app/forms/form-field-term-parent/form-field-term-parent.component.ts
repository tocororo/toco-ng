import { Component, OnInit, Input } from '@angular/core';
import { FormField } from '../form-container/form-container.component';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { startWith, map } from 'rxjs/operators';
import { Term, TermNode } from '@toco/entities/taxonomy.entity';

@Component({
  selector: 'toco-form-field-term-parent',
  templateUrl: './form-field-term-parent.component.html',
  styleUrls: ['./form-field-term-parent.component.scss']
})
export class FormFieldTermParentComponent extends FormField implements OnInit {

  formControl = new FormControl();
  inputId: string;
  filteredOptions: Observable<Term[]>;
  selectOptions: Term[] = [];
  currentTerm: Term = null;
  parentTerm: Term = null;

  constructor() {
    super();
   }

  ngOnInit() {
    this.inputId = this.formFieldContent.placeholder.trim().toLowerCase();
    if (this.formFieldContent.input && this.formFieldContent.input.terms ) {

        if (this.formFieldContent.input.currentTerm) {
          this.currentTerm = this.formFieldContent.input.currentTerm;
        }

        (this.formFieldContent.input.terms as TermNode[]).forEach(element => {
          this.selectOptions = this.selectOptions.concat(this._get_terms(element));
        });

        this._updateFilteredOptions();
    }
  }

  private _updateFilteredOptions() {
    this.filteredOptions = this.formControl.valueChanges.pipe<string, Term[]>(
      startWith(''),
      map(value => {
        const filterValue = value.toLowerCase();
        return this.selectOptions.filter(option => option.name.toLowerCase().includes(filterValue));
      }));
  }


  private _get_terms(node: TermNode): Term[] {
    let result: Term[] = [];
    if (!this.currentTerm) {
      result.push(node.term);
    } else{
      if ( this.currentTerm.id !== node.term.id) {
        if (this.currentTerm.parent_id && this.currentTerm.parent_id === node.term.id) {
          this.parentTerm = node.term;
        } else {
          result.push(node.term);
        }
      }
    }

    node.children.forEach(child => {
      result = result.concat(this._get_terms(child));
    });

    return result;
  }

  addParent(value: Term) {

    this.parentTerm = value;
    this.selectOptions = this.selectOptions.filter(option => option.id !== value.id);

    this.formControl.setValue('');
    this._updateFilteredOptions();
    document.getElementById(this.inputId).blur();

    this.formFieldContent.value = this.parentTerm.id;
    (this.currentTerm)? this.currentTerm.parent_id = this.parentTerm.id : this.parentTerm.id;

  }

  removeParent() {
    this.selectOptions.push(this.parentTerm);
    this._updateFilteredOptions();
    this.parentTerm = null;
  }

}
