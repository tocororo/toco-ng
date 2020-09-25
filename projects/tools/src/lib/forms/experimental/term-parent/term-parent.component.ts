/*
 *   Copyright (c) 2020 Universidad de Pinar del Río "Hermanos Saíz Montes de Oca"
 *   All rights reserved.
 */


import { Component, OnInit } from '@angular/core';
import { FormControl, AbstractControl, ValidationErrors, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { startWith, map } from 'rxjs/operators';

import { Term, TermNode } from '@toco/tools/entities';

import { FormFieldControl_Experimental } from '../form-field.control.experimental';

@Component({
    selector: 'toco-term-parent',
    templateUrl: './term-parent.component.html',
    styleUrls: ['./term-parent.component.scss'],
    host: {
        '[style.minWidth]': 'content.minWidth',
        '[style.width]': 'content.width'
    }
})
export class TermParentComponent extends FormFieldControl_Experimental implements OnInit {

    // internalControl = new FormControl();


    formControl = new FormControl();
    inputId: string;
    filteredOptions: Observable<Term[]>;
    selectOptions: Term[] = [];
    currentTerm: Term = null;
    parentTerm: Term = null;

    constructor()
    {
        super();
    }

    ngOnInit() {

        (this.content.parentFormSection as FormGroup).addControl(
            this.content.name,
            this.internalControl
          );

        console.log(this.content.value)
        console.log(this.content.required);

        console.log(this.content.required && (this.content.value == 0 || this.content.value == null || this.content.value == undefined));

        if (this.content.required) {
            this.internalControl.setValidators((control: AbstractControl): ValidationErrors | null => {
                return (control.value == 0 || control.value == null || control.value == undefined)
                    ? { 'requiredTerms': 'No Terms Selected' }
                    : null;
            });
        }
        this.setValueToInternalControl();


        this.inputId = this.content.label.trim().toLowerCase();
        if (this.content.extraContent && this.content.extraContent.terms) {

            if (this.content.extraContent.currentTerm) {
                this.currentTerm = this.content.extraContent.currentTerm;
            }

            (this.content.extraContent.terms as TermNode[]).forEach(element => {
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
                return this.selectOptions.filter(option => option.identifier.toLowerCase().includes(filterValue));
            }));
    }

    private _get_terms(node: TermNode): Term[] {
        let result: Term[] = [];
        if (!this.currentTerm) {
            result.push(node.term);
        } else {
            if (this.currentTerm.id !== node.term.id) {
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
        // document.getElementById(this.inputId).blur();

        (this.currentTerm) ? this.currentTerm.parent_id = this.parentTerm.id : this.parentTerm.id;
        this.setValueToInternalControl();
    }

    removeParent() {
        this.selectOptions.push(this.parentTerm);
        this._updateFilteredOptions();
        this.parentTerm = null;
        this.setValueToInternalControl();
    }

    private setValueToInternalControl(){
        if( this.parentTerm == null){
            this.content.value = null;
            this.internalControl.setValue(null);
        }else{
            this.content.value = this.parentTerm.id;
            this.internalControl.setValue(this.content.value);
        }

        if (this.internalControl.valid){
            this.formControl.setErrors(null);
        }else{
            this.formControl.setErrors({requiered:true});
        }
    }
}
