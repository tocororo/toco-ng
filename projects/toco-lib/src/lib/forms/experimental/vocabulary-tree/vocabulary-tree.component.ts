/*
 *   Copyright (c) 2020 Universidad de Pinar del Río "Hermanos Saíz Montes de Oca"
 *   All rights reserved.
 */

import { Component, OnInit } from "@angular/core";
import {
  FormControl,
  AbstractControl,
  ValidationErrors,
  FormGroup,
} from "@angular/forms";
import { Observable, PartialObserver } from "rxjs";
import { startWith, map } from "rxjs/operators";

import { Response } from "../../../core/public-api";
import {
  Term,
  TermNode,
  VocabulariesInmutableNames,
} from "../../../entities/public-api";
import { TaxonomyService } from "../../../backend/public-api";

import { FormFieldControl_Experimental } from "../form-field.control.experimental";

interface VocabularyComponentExtraContent {
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
  selector: "toco-vocabulary-tree",
  templateUrl: "./vocabulary-tree.component.html",
  styleUrls: ["./vocabulary-tree.component.scss"],
  host: {
    "[style.minWidth]": "content.minWidth",
    "[style.width]": "content.width",
  },
})
export class VocabularyTreeComponent extends FormFieldControl_Experimental
  implements OnInit {
  // internalControl = new FormControl();

  //this control is used by the chips,not necessary to expose it
  formControl = new FormControl();

  levelsOptions: Array<TermNode[]> = null;
  levelsSelection: Array<Term> = new Array<Term>();

  lastLevelTerm: Term = null;

  inputId: string;
  filteredOptions: Observable<TermNode[]>;
  chipsList: TermNode[] = [];
  leafsOptions: TermNode[] = null;

  terms: TermNode[] = [];

  loading = true;

  extraContent: VocabularyComponentExtraContent;

  // selectedTermsIds = [];

  searchText = "Seleccione las opciones";

  constructor(private service: TaxonomyService) {
    super();
  }

  ngOnInit() {
    (this.content.parentFormSection as FormGroup).addControl(
      this.content.name,
      this.internalControl
    );
    if (this.content.required) {
      this.internalControl.setValidators(
        (control: AbstractControl): ValidationErrors | null => {
          return !this.content.value || this.content.value.length == 0
            ? { requiredTerms: "No Terms Selected" }
            : null;
        }
      );
    }

    this.inputId = this.content.label.trim().toLowerCase();
    if (this.content.extraContent) {
      this.extraContent = this.content.extraContent;

      // already selected terms
      if (!this.extraContent.selectedTermsIds) {
        this.extraContent.selectedTermsIds = [];
      }

      // terms ids to exclude of the possible options.
      if (!this.extraContent.excludeTermsIds) {
        this.extraContent.excludeTermsIds = [];
      }
      this.content.value = [];
      this.internalControl.setValue(this.content.value);

      if (this.extraContent.level == undefined) {
        this.extraContent.level = 10;
      }
      if (this.extraContent.vocab) {
        this.loading = true;
        this.service.getTermsTreeByVocab(this.extraContent.vocab, 0).subscribe(
          (response: Response<any>) => {
            this.loading = false;
            const nextLevel = response.data.tree.term_node;
            if (this.extraContent.level > 0) {
              this.levelsOptions = new Array<TermNode[]>();
              // this.levelsSelection = new Array<TermNode>();
              this._setLevelsOptions(nextLevel, 0);
            } else {
              this.leafsOptions = this._get_terms(nextLevel);
              this._updateFilteredOptions();
            }
          },

          (err: any) => {
            console.log(
              "The observable got an error notification: " + err + "."
            );
          },

          () => {
            console.log("The observable got a complete notification.");
            this.loading = !this.loading;
          }
        );
      }
      //   else if(this.extraContent.termID){
      //     this.service.getTermByUUID(this.extraContent.termID, this.extraContent.level)
      //     .subscribe(this.termsTreeObserver);
      // }
    }
  }
  private _setLevelsOptions(nextLevel: TermNode[], level: number) {
    console.log('VOCABULARY TREE *****')
    console.log(this.extraContent.selectedTermsIds, nextLevel)
    let result: TermNode[] = [];
    nextLevel.forEach((node) => {
      if (
        !(this.extraContent.excludeTermsIds as []).some(
          (id) => id === node.term.uuid
        )
      ) {
        result.push(node);
      }

      if (
        (this.extraContent.selectedTermsIds as []).some(
          (id) => id === node.term.uuid

        )
      ) {
        this.onSelectionChange(level, node.term)
        // this.addTermToValue(node.term);
        // this.levelsSelection[level] = node.term;
      } 
      
      
    });
    this.levelsOptions.push(result);
  }
  onSelectionChange(level, item: Term) {
    console.log(level, item);
    this.leafsOptions = null;
    this.chipsList = [];
    this.loading = true;
    this.lastLevelTerm = item;
    this.levelsOptions = this.levelsOptions.slice(0, level+1);

    // this.removeTermFromValue(this.levelsSelection[level]);
    // this.levelsSelection[level] = item;
    // this.addTermToValue(this.levelsSelection[level]);

    this.content.value = [];

    this.levelsSelection = this.levelsSelection.slice(0, level);
    this.levelsSelection.push(item);
    this.levelsSelection.forEach(element => {
      this.addTermToValue(element, false);
    });

    this.service.getTermByUUID(item.uuid, 1).subscribe(
      (response: Response<any>) => {
        console.log(response);
        this.loading = false;
        const nextLevel = response.data.term_node.children;
        if (this.extraContent.level > level + 1) {
          this._setLevelsOptions(nextLevel, level);
        } else {
          this.leafsOptions = this._get_terms(nextLevel);
          this._updateFilteredOptions();
        }
      },

      (err: any) => {
        console.log("The observable got an error notification: " + err + ".");
      },

      () => {
        console.log("The observable got a complete notification.");
        this.loading = !this.loading;
      }
    );
  }

  private setValidation() {
    if (this.internalControl.valid) {
      this.formControl.setErrors(null);
    } else {
      this.formControl.setErrors({ requiered: true });
    }
  }


  private addTermToValue(term: Term, isLeaf=true) {
    if (this.extraContent.multiple) {
      this.content.value.unshift(term);
    } else {
      this.content.value = [];
      this.levelsSelection.forEach(element => {
        this.content.value.unshift(element);
      });
      this.content.value.unshift(term);
    }
    console.log(this.content.value)
    this.internalControl.setValue(this.content.value);
    this.setValidation();
    console.log(this.internalControl);

  }

  private removeTermFromValue(term: Term) {
    this.content.value = (this.content.value as []).filter(
      (e: Term) => e.id !== term.id
    );
    this.internalControl.setValue(this.content.value);
    this.setValidation();
    console.log(this.internalControl);
  }

  private _updateFilteredOptions() {
    this.filteredOptions = this.formControl.valueChanges.pipe<
      string,
      TermNode[]
    >(
      startWith(""),
      map((value) => {
        const filterValue = value ? value.toLowerCase() : "";
        return this.leafsOptions.filter((option) =>
          option.term.description.toLowerCase().includes(filterValue)
        );
      })
    );
  }

  private _get_terms(nodes: TermNode[]): TermNode[] {
    this.chipsList = [];
    let result: TermNode[] = [];
    nodes.forEach((node) => {
      if (
        (this.extraContent.selectedTermsIds as []).some(
          (id) => id === node.term.uuid
        )
      ) {
        this.addTermToValue(node.term);
        this.chipsList.push(node);
      } else {
        // if is not in any of the exclude term ids, then push
        if (
          !(this.extraContent.excludeTermsIds as []).some(
            (id) => id === node.term.uuid
          )
        ) {
          result.push(node);
        }
      }
    });

    return result;
  }

  addChips(value: TermNode) {
    if (this.extraContent.multiple) {
      this.chipsList.unshift(value);
    } else {
      // if not is multiple, then the element in the chipsList goes back to the options
      if (this.chipsList.length > 0) {
        this.leafsOptions.push(this.chipsList[0]);
      }
      this.chipsList = [value];
    }
    console.log(value, this.chipsList);
    this.addTermToValue(value.term);
    this.leafsOptions = this.leafsOptions.filter(
      (option) => option.term.id !== value.term.id
    );

    this.formControl.setValue("");
    // document.getElementById(this.inputId).blur();
    this._updateFilteredOptions();
  }

  removeChip(index: number) {
    this.leafsOptions.push(this.chipsList[index]);
    this.removeTermFromValue(this.chipsList[index].term);
    this.chipsList.splice(index, 1);
    this._updateFilteredOptions();
  }

  getTermNameInATree(node: TermNode) {
    if (node.parent != null) {
      return (
        this.getTermNameInATree(node.parent) + " / " + node.term.description
      );
    } else {
      return node.term.description;
    }
  }
}
