
import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable, PartialObserver } from 'rxjs';
import { startWith, map } from 'rxjs/operators';

import { Term, Vocabulary, TermNode, Response } from '@toco/tools/entities';
import { TaxonomyService } from '@toco/tools/taxonomy';

import { FormFieldControl_Experimental } from '../form-field.control.experimental';

/**
 * A control to select a term or terms in a vocabulary. 
 */
@Component({
    selector: 'toco-vocabulary',
    templateUrl: './vocabulary.component.html',
    styleUrls: ['./vocabulary.component.scss']
})
export class VocabularyComponent extends FormFieldControl_Experimental implements OnInit {

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

    constructor(private service: TaxonomyService) {
        super();
    }

    ngOnInit() {
        this.inputId = this.content.label.trim().toLowerCase();
        if (this.content.extraContent) {
            if (this.content.extraContent.multiple !== null) {
                this.multiple = this.content.extraContent.multiple;
            }
            // if (this.content.extraContent.selectedTermsIds) {
            //   this.content.value = this.content.extraContent.selectedTermsIds;
            // } else {
            //   this.content.value = [];
            // }
            if (!this.content.extraContent.selectedTermsIds) {
                this.content.extraContent.selectedTermsIds = [];
            }
            this.content.value = [];

            if (this.content.extraContent.vocab ) {
                this.vocab = this.content.extraContent.vocab;
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
        if ( ( this.content.extraContent.selectedTermsIds as []).some(id => id === node.term.id)) {
            this.content.value.push(node.term.id);
            this.chipsList.push(node.term);
        } else {
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
            this.content.value.unshift(value.id);
        } else {
            // if not is multiple, then the element in the chipsList goes back to the options
            if (this.chipsList.length > 0) {
                this.selectOptions.push(this.chipsList[0]);
            }

            this.chipsList = [value];
            this.content.value = [value.id];
        }
        this.selectOptions = this.selectOptions.filter(option => option.id !== value.id);

        this.formControl.setValue('');
        this._updateFilteredOptions();
        document.getElementById(this.inputId).blur();

    }

    removeChip(index: number) {
        this.selectOptions.push(this.chipsList[index]);
        this._updateFilteredOptions();
        this.content.value = (this.content.value as []).filter(id => id !== this.chipsList[index].id);
        this.chipsList.splice(index, 1);
    }
}
