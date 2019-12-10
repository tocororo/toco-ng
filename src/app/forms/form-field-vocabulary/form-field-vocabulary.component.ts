import { Component, OnInit, Input } from '@angular/core';
import { FormField } from '../form-container/form-container.component';
import { FormControl } from '@angular/forms';
import { Observable, PartialObserver } from 'rxjs';
import { startWith, map } from 'rxjs/operators';
import { Term, Vocabulary, TermNode } from '@toco/entities/taxonomy.entity';
import { TaxonomyService } from '@toco/taxonomy/taxonomy.service';
import { Response } from '@toco/entities/response';

/***
 * A control to select a term or terms in a vocabulary
 */
@Component({
  selector: 'toco-form-field-vocabulary',
  templateUrl: './form-field-vocabulary.component.html',
  styleUrls: ['./form-field-vocabulary.component.scss']
})
export class FormFieldVocabularyComponent implements OnInit {

  @Input() public formField: FormField;

  // en this.formField.value va un arreglo con los ids seleccionados.

  formControl = new FormControl();
  inputId: string;
  filteredOptions: Observable<Term[]>;
  chipsList: Term[] = [];
  selectOptions: Term[] = [];
  multiple = true;

  terms: TermNode[];
  vocab: Vocabulary;
  loading = true;

  selectedTermsIds = [];

  private termsTreeObserver: PartialObserver<Response<any>> = {
    next: (response: Response<any>) => {
      this.terms = response.data.terms.terms;

      this.terms.forEach(element => {
        this.selectOptions = this.selectOptions.concat(this._get_terms(element));
      });
      this.loading = !this.loading;
    },

    error: (err: any) => {
        console.log('The observable got an error notification: ' + err + '.');
    },

    complete: () => {
      console.log('The observable got a complete notification.');
    }
  };

  constructor(private service: TaxonomyService) { }

  ngOnInit() {
    this.inputId = this.formField.placeholder.trim().toLowerCase();
    if (this.formField.input) {
      if (this.formField.input.multiple !== null) {
        this.multiple = this.formField.input.multiple;
      }
      if (this.formField.input.selectedTermsIds) {
        this.formField.value = this.formField.input.selectedTermsIds;
      } else {
        this.formField.value = [];
      }

      if (this.formField.input.vocab ) {
        this.vocab = this.formField.input.vocab;
        this.service.getTermsTreeByVocab(this.vocab).subscribe(this.termsTreeObserver);
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
    if ( (this.formField.value as []).some(id => id === node.term.id)){
      this.chipsList.push(node.term);
    }else{
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
      this.formField.value.unshift(value.id);
    } else {
      this.chipsList = [value];
      this.formField.value = [value.id];
    }
    this.selectOptions = this.selectOptions.filter(option => option.id !== value.id);

    this.formControl.setValue('');
    this._updateFilteredOptions();
    document.getElementById(this.inputId).blur();

  }

  removeChip(index: number) {
    this.selectOptions.push(this.chipsList[index]);
    this._updateFilteredOptions();
    this.formField.value = (this.formField.value as []).filter(id => id !== this.chipsList[index].id);
    this.chipsList.splice(index, 1);
  }

}
