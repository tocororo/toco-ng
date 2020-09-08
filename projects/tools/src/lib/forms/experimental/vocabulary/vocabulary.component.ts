/*
 *   Copyright (c) 2020 Universidad de Pinar del Río "Hermanos Saíz Montes de Oca"
 *   All rights reserved.
 */

import { Component, OnInit } from "@angular/core";
import {
  FormControl,
  AbstractControl,
  ValidationErrors,
  FormGroup
} from "@angular/forms";
import { Observable, PartialObserver } from "rxjs";
import { startWith, map } from "rxjs/operators";

import { Response } from "@toco/tools/core";
import { Term, TermNode, VocabulariesInmutableNames } from "@toco/tools/entities";
import { TaxonomyService } from "@toco/tools/backend";

import { FormFieldControl_Experimental } from "../form-field.control.experimental";

interface VocabularyComponentExtraContent{
  multiple: boolean;
  selectedTermsIds: [];
  excludeTermsIds: [];

  level: number;

  vocab: VocabulariesInmutableNames;
}

/**
 * A control to select a term or terms in a vocabulary.
 */
@Component({
  selector: "toco-vocabulary",
  templateUrl: "./vocabulary.component.html",
  styleUrls: ["./vocabulary.component.scss"],
  host: {
    "[style.minWidth]": "content.minWidth",
    "[style.width]": "content.width"
  }
})
export class VocabularyComponent extends FormFieldControl_Experimental
  implements OnInit {

  // internalControl = new FormControl();

  //this control is used by the chips,not necessary to expose it
  formControl = new FormControl();
  inputId: string;
  filteredOptions: Observable<TermNode[]>;
  chipsList: TermNode[] = [];
  selectOptions: TermNode[] = [];

  terms: TermNode[] = [];

  loading = true;

  extraContent: VocabularyComponentExtraContent;

  // selectedTermsIds = [];

  searchText = "Seleccione las opciones";

  private termsTreeObserver: PartialObserver<Response<any>> = {
    next: (response: Response<any>) => {
      console.log("VOCABULARY COMPONENT RESPONSE ",response)

      this.terms = response.data.tree.term_node;

      this.terms.forEach(element => {
        this.selectOptions = this.selectOptions.concat(
          this._get_terms(element)
        );
      });

    },

    error: (err: any) => {
      console.log("The observable got an error notification: " + err + ".");
    },

    complete: () => {
      console.log("The observable got a complete notification.");
      this.loading = !this.loading;
    }
  };

  constructor(private service: TaxonomyService)
  {
    super();
  }

  ngOnInit()
  {
    (this.content.parentFormSection as FormGroup).addControl(
      this.content.name,
      this.internalControl
    );

    if (this.content.required) {
      this.internalControl.setValidators(
        (control: AbstractControl): ValidationErrors | null => {
          return this.content.value.length == 0
            ? { requiredTerms: "No Terms Selected" }
            : null;
        }
      );
    }

    this.inputId = this.content.label.trim().toLowerCase();
    if (this.content.extraContent) {
      this.extraContent = this.content.extraContent;

      // if (this.extraContent.multiple !== null) {
      //   this.multiple = this.extraContent.multiple;
      // }
      // if (this.extraContent.selectedTermsIds) {
      //   this.content.value = this.extraContent.selectedTermsIds;
      // } else {
      //   this.content.value = [];
      // }

      // already selected terms
      if (!this.extraContent.selectedTermsIds) {
        this.extraContent.selectedTermsIds = [];
      }

      // terms ids to exclude of the possible options.
      if (!this.extraContent.excludeTermsIds) {
        this.extraContent.excludeTermsIds = [];
      }
      this.content.value = [];

      if (this.extraContent.level == undefined) {
        this.extraContent.level = 10;
      }
      if (this.extraContent.vocab) {
        // this.vocab = this.extraContent.vocab;
        this.service
          .getTermsTreeByVocab(this.extraContent.vocab, this.extraContent.level)
          .subscribe(this.termsTreeObserver);
      } 
    //   else if(this.extraContent.termID){
    //     this.service.getTermByUUID(this.extraContent.termID, this.extraContent.level)
    //     .subscribe(this.termsTreeObserver);
    // }
      this._updateFilteredOptions();
    }
  }

  private setValidation() {
    if (this.internalControl.valid) {
      this.formControl.setErrors(null);
    } else {
      this.formControl.setErrors({ requiered: true });
    }
  }
  private addTermToValue(term: Term) {
    if (this.extraContent.multiple) {
      this.content.value.unshift(term);
    } else {
      this.content.value = [term];
    }
    this.internalControl.setValue(this.content.value);
    this.setValidation();
  }

  private removeTermFromValue(term: Term) {
    this.content.value = (this.content.value as []).filter(
      (e: Term) => e.id !== term.id
    );
    this.internalControl.setValue(this.content.value);
    this.setValidation();
  }

  private _updateFilteredOptions() {
    this.filteredOptions = this.formControl.valueChanges.pipe<
      string,
      TermNode[]
    >(
      startWith(""),
      map(value => {
        const filterValue = value ? value.toLowerCase() : "";
        return this.selectOptions.filter(option =>
          option.term.name.toLowerCase().includes(filterValue)
        );
      })
    );
  }

  private _get_terms(node: TermNode, parent: TermNode = null): TermNode[] {
    let result: TermNode[] = [];
    node.parent = parent;
    // if is in selected terms ids list, then is part of the value
    if (
      (this.extraContent.selectedTermsIds as []).some(
        id => id === node.term.uuid
      )
    ) {
      this.addTermToValue(node.term);
      this.chipsList.push(node);
    } else {
      // if is not in any of the exclude term ids, then push
      if (
        !(this.extraContent.excludeTermsIds as []).some(
          id => id === node.term.uuid
        )
      ) {
        result.push(node);
      }
    }
    if(node.children){
      node.children.forEach(child => {
        result = result.concat(this._get_terms(child, node));
      });
    }


    return result;
  }

  addChips(value: TermNode) {
    if (this.extraContent.multiple) {
      this.chipsList.unshift(value);
    } else {
      // if not is multiple, then the element in the chipsList goes back to the options
      if (this.chipsList.length > 0) {
        this.selectOptions.push(this.chipsList[0]);
      }
      this.chipsList = [value];
    }
    this.addTermToValue(value.term);
    this.selectOptions = this.selectOptions.filter(
      option => option.term.id !== value.term.id
    );

    this.formControl.setValue("");
    // document.getElementById(this.inputId).blur();
    this._updateFilteredOptions();
  }

  removeChip(index: number) {
    this.selectOptions.push(this.chipsList[index]);
    this.removeTermFromValue(this.chipsList[index].term);
    this.chipsList.splice(index, 1);
    this._updateFilteredOptions();
  }

  getTermNameInATree(node: TermNode) {
    if (node.parent != null) {
      return this.getTermNameInATree(node.parent) + " / " + node.term.description;
    } else {
      return node.term.description;
    }
  }
}
