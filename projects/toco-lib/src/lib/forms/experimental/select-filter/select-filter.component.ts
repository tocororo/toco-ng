/*
 *   Copyright (c) 2020 Universidad de Pinar del Río "Hermanos Saíz Montes de Oca"
 *   All rights reserved.
 */

import { Component, OnInit } from "@angular/core";
import { AbstractControl, UntypedFormControl, ValidationErrors } from "@angular/forms";
import { isArray } from "is-what";
import { Observable } from "rxjs";
import { map, startWith } from "rxjs/operators";
import { InputControl } from '../../input/input.control';
import { SelectOption } from "../../input/select/select-input.component";



interface SelectFilterComponentExtraContent{
  multiple: boolean;
  selectedTermsIds: [];
  excludeTermsIds: [];

}



@Component({
  selector: "toco-select-filter",
  templateUrl: "./select-filter.component.html",
  styleUrls: ["./select-filter.component.scss"],
  host: {
    "[style.minWidth]": "content.minWidth",
    "[style.width]": "content.width",
  },
})
export class SelectFilterComponent extends InputControl
  implements OnInit {
  //   internalControl = new FormControl();

  // internalControl = new FormControl();

  //this control is used by the chips,not necessary to expose it
  chipsFormControl = new UntypedFormControl();
  inputId: string;
  filteredOptions: Observable<SelectOption[]>;
  chipsList: SelectOption[] = [];
  selectOptions: SelectOption[] = [];

  terms: SelectOption[] = [];

  loading = true;

  extraContent: SelectFilterComponentExtraContent;

  // selectedTermsIds = [];

  searchText = "Seleccione las opciones";


  constructor()
  {
    super();
  }

  ngOnInit()
  {
    this.init('', '', false, true);
    // (this.content.parentFormSection as FormGroup).addControl(
    //   this.content.name,
    //   this.internalControl
    // );

    if (this.content.required) {
      this.content.formControl.setValidators(
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

      if (this.content.extraContent.observable) {
        this.content.extraContent.observable.subscribe(
          // next
          (response: any) => {
            this.selectOptions = this.content.extraContent.getOptions(response);
            this.selectOptionsLoaded();
          },

          // error
          (error: any) => {
            // console.log(error);
          },
          // complete
          () => {}
        );
      } else {
        this.selectOptions = this.content.extraContent.getOptions();
        this.selectOptionsLoaded();
      }
    //   else if(this.extraContent.termID){
    //     this.service.getTermByUUID(this.extraContent.termID, this.extraContent.level)
    //     .subscribe(this.termsTreeObserver);
    // }
      // this._updateFilteredOptions();
    }
  }


  private selectOptionsLoaded() {
    this.selectOptions.forEach((option) => {
      if (
        (this.extraContent.selectedTermsIds as []).some(
          val => val === option.value
        )
      ){
        this.addChips(option);
      }

      // if (this.extraContent.multiple) {
      //   try {
      //     const index = this.content.value.indexOf(option.value);
      //     if (index >= 0) {
      //       this.addChips(option);
      //     }
      //   } catch (error) {}
      // } else {
      //   if (option.value == this.content.value) {
      //     this.addChips(option);
      //   }
      // }
    });
    if (
      this.extraContent.multiple &&
      (this.content.value == null ||
        this.content.value == undefined ||
        !isArray(this.content.value))
    ) {
      this.content.value = [];
    }

    this._updateFilteredOptions();
    this.loading = false;
  }

  private setValidation() {
    if (this.content.formControl.valid) {
      this.chipsFormControl.setErrors(null);
    } else {
      this.chipsFormControl.setErrors({ requiered: true });
    }
  }
  private addTermToValue(term: SelectOption) {
    if (this.extraContent.multiple) {
      this.content.value.unshift(term);
    } else {
      this.content.value = [term];
    }
    this.content.formControl.setValue(this.content.value);
    this.setValidation();
  }

  private removeTermFromValue(term: SelectOption) {
    this.content.value = (this.content.value as []).filter(
      (e: SelectOption) => e.value !== term.value
    );
    this.content.formControl.setValue(this.content.value);
    this.setValidation();
  }

  private _updateFilteredOptions() {
    this.filteredOptions = this.chipsFormControl.valueChanges.pipe<
      string,
      SelectOption[]
    >(
      startWith(""),
      map(value => {
        const filterValue = value ? value.toLowerCase() : "";
        // console.log('************************************')
        // console.log(this.selectOptions);
        // console.log('************************************')

        return this.selectOptions.filter(option =>
          option.label.toLowerCase().includes(filterValue)
        );
      })
    );
  }



  addChips(value: SelectOption) {
    if (this.extraContent.multiple) {
      this.chipsList.unshift(value);
    } else {
      // if not is multiple, then the element in the chipsList goes back to the options
      if (this.chipsList.length > 0) {
        this.selectOptions.push(this.chipsList[0]);
      }
      this.chipsList = [value];
    }
    this.addTermToValue(value);
    // // console.log(this.selectOptions);
    this.selectOptions = this.selectOptions.filter(
      option => option.value !== value.value
    );
    // // console.log(this.selectOptions);

    this.chipsFormControl.setValue("");
    // document.getElementById(this.inputId).blur();
    this._updateFilteredOptions();
  }

  removeChip(index: number) {
    // // console.log(this.selectOptions);

    this.selectOptions.push(this.chipsList[index]);
    // // console.log(this.selectOptions);
    this.removeTermFromValue(this.chipsList[index]);
    this.chipsList.splice(index, 1);
    this._updateFilteredOptions();
  }

}
