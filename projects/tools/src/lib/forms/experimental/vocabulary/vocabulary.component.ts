
import { Component, OnInit } from '@angular/core';
import { FormControl, ControlContainer } from '@angular/forms';
import { Observable, PartialObserver } from 'rxjs';
import { startWith, map } from 'rxjs/operators';

import { Term, Vocabulary, TermNode, Response } from '@toco/tools/entities';
import { TaxonomyService } from '@toco/tools/backend';

import { FormFieldControl_Experimental } from '../form-field.control.experimental';
import { NullAstVisitor } from '@angular/compiler';


/**
 * A control to select a term or terms in a vocabulary.
 */
@Component({
    selector: 'toco-vocabulary',
    templateUrl: './vocabulary.component.html',
    styleUrls: ['./vocabulary.component.scss'],
    host: {
        '[style.minWidth]': 'content.minWidth',
        '[style.width]': 'content.width'
    }
})
export class VocabularyComponent extends FormFieldControl_Experimental implements OnInit {

    formControl = new FormControl();
    inputId: string;
    filteredOptions: Observable<TermNode[]>;
    chipsList: TermNode[] = [];
    selectOptions: TermNode[] = [];
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

    constructor(private service: TaxonomyService, private controlContainer: ControlContainer) {
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
        this.filteredOptions = this.formControl.valueChanges.pipe<string, TermNode[]>(
            startWith(''),
            map(value => {
                const filterValue = value.toLowerCase();
                return this.selectOptions.filter(option => option.term.name.toLowerCase().includes(filterValue));
            }));
    }

    private _get_terms(node: TermNode, parent: TermNode = null): TermNode[] {
        let result: TermNode[] = [];
        node.parent = parent;
        if ( ( this.content.extraContent.selectedTermsIds as []).some(id => id === node.term.id)) {
            this.content.value.push(node.term.id);
            this.chipsList.push(node);
        } else {
            result.push(node);
        }
        node.children.forEach(child => {
            result = result.concat(this._get_terms(child, node));
        });

        return result;
    }

    addChips(value: TermNode) {
        console.log(this.vocab.name, value.term.name)
        if (this.multiple) {
            this.chipsList.unshift(value);
            this.content.value.unshift(value.term.id);
        } else {
            // if not is multiple, then the element in the chipsList goes back to the options
            if (this.chipsList.length > 0) {
                this.selectOptions.push(this.chipsList[0]);
            }

            this.chipsList = [value];
            this.content.value = [value.term.id];
        }
        this.selectOptions = this.selectOptions.filter(option => option.term.id !== value.term.id);

        this.formControl.setValue('');
        this._updateFilteredOptions();
        document.getElementById(this.inputId).blur();

    }

    removeChip(index: number) {
        this.selectOptions.push(this.chipsList[index]);
        this._updateFilteredOptions();
        this.content.value = (this.content.value as []).filter(id => id !== this.chipsList[index].term.id);
        this.chipsList.splice(index, 1);
    }

    getTermNameInATree(node:TermNode){
        if (node.parent != null){
            return this.getTermNameInATree(node.parent) + ' / ' + node.term.name;
        }else{
            return node.term.name;
        }
    }
}
