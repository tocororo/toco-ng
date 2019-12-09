import { Component, OnInit, Input } from '@angular/core';
import { FormField } from '../form-container/form-container.component';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { startWith, map } from 'rxjs/operators';
import { TermNode } from '@toco/taxonomy/terms/terms.component';
import { Term } from '@toco/entities/taxonomy.entity';

@Component({
  selector: 'toco-form-field-vocabulary',
  templateUrl: './form-field-vocabulary.component.html',
  styleUrls: ['./form-field-vocabulary.component.scss']
})
export class FormFieldVocabularyComponent implements OnInit {

  @Input() public formField: FormField;

  formControl = new FormControl();
  inputId: string;
  filteredOptions: Observable<Term[]>;
  chipsList: Term[] = [];
  selectOptions: Term[] = [];
  currentTerm: Term;
  multiple = true;

  constructor() { }

  ngOnInit() {
    this.inputId = this.formField.placeholder.trim().toLowerCase();
    if (this.formField.input) {
      if (this.formField.input.multiple !== null) {
        this.multiple = this.formField.input.multiple;
      }

      if (this.formField.input.currentTerm) { this.currentTerm = this.formField.input.currentTerm; }

      if (this.formField.input.terms ) {
        (this.formField.input.terms as TermNode[]).forEach(element => {
          this.selectOptions = this.selectOptions.concat(this._get_terms(element));
        });
      }
      console.log(this.selectOptions);

      if (this.formField.input.chipsList) {
        this.chipsList = this.formField.input.chipsList as Term[];
      }


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
    if (!this.currentTerm || (this.currentTerm && this.currentTerm.id !== node.term.id)) {
      result.push(node.term);
    }

    node.children.forEach(child => {
      result = result.concat(this._get_terms(child));
    });

    return result;
  }

  addChips(value: Term) {
    if (this.multiple) {
      this.chipsList.unshift(value);
    } else {
      this.chipsList = [value];
    }
    this.selectOptions = this.selectOptions.filter(option => option.id !== value.id);

    this.formControl.setValue('');
    this._updateFilteredOptions();
    document.getElementById(this.inputId).blur();

    console.log(this.chipsList);
    console.log(this.selectOptions);
  }

  removeChip(index: number) {
    this.selectOptions.push(this.chipsList[index]);
    this._updateFilteredOptions();
    this.chipsList.splice(index, 1);
  }

}
