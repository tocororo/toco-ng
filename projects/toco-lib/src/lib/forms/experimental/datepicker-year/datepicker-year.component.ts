import { InputControl } from '../../input/input.control';

import { Component, forwardRef, Input, OnInit, ViewChild } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { MomentDateAdapter } from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { MatDatepicker } from '@angular/material/datepicker';


import moment from 'moment';

import { Moment } from 'moment';
// const moment = _rollupMoment || _moment;


export const YEAR_MODE_FORMATS = {
  parse: {
    dateInput: 'YYYY',
  },
  display: {
    dateInput: 'YYYY',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};

@Component({
  selector: 'toco-datepicker-year',
  templateUrl: './datepicker-year.component.html',
  styleUrls: ['./datepicker-year.component.scss'],
  providers: [
    { provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE] },
    { provide: MAT_DATE_FORMATS, useValue: YEAR_MODE_FORMATS },
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => DatepickerYearComponent),
      multi: true,
    },
  ],
  host: {
    "[style.minWidth]": "content.minWidth",
    "[style.width]": "content.width",
  },
})
export class DatepickerYearComponent  extends InputControl implements OnInit, ControlValueAccessor {

  /** Component label */
  @Input() label = '';

  _max: Moment;
  @Input() get max(): number | Date {
    return this._max ? this._max.year() : undefined;
  }
  set max(max: number | Date) {
    if (max) {
      const momentDate = typeof max === 'number' ? moment([max, 0, 1]) : moment(max);
      this._max = momentDate.isValid() ? momentDate : undefined;
    }
  }

  _min: Moment;
  @Input() get min(): number | Date {
    return this._min ? this._min.year() : undefined;
  }
  set min(min: number | Date) {
    if (min) {
      const momentDate = typeof min === 'number' ? moment([min, 0, 1]) : moment(min);
      this._min = momentDate.isValid() ? momentDate : undefined;
    }
  }

  @Input() touchUi = false;

  @ViewChild(MatDatepicker, { static: true }) _picker: MatDatepicker<Moment>;

  // _inputCtrl: FormControl = new FormControl();

  // Function to call when the date changes.
  onChange = (year: Date) => { };

  // Function to call when the input is touched (when a star is clicked).
  onTouched = () => { };


  ngOnInit() {
    this.init('', '', false, true);
    // this.value = moment(this.value.toString()).format("YYYY")
    if (this.label == '') {
      this.label = this.content.label;
    }

    this.min = this.content.extraContent.minYear;
    this.max = this.content.extraContent.maxYear;
    // console.log(this.content.extraContent, 'DATEPICKER YEAR EXTRA CONTENT....', this._min, this._max)

    this.writeValue(new Date(this.content.value));
   }
   constructor() { super(); }


  writeValue(date: Date): void {
    if (date && this._isYearEnabled(date.getFullYear())) {
      const momentDate = moment(date);
      if (momentDate.isValid()) {
        this.content.formControl.setValue(moment(date), { emitEvent: false });
        this.content.value = moment(date).year;
        // this.content.formControl.setValue(this.content.value);

      }
    }
  }
  registerOnChange(fn: any): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  // Allows Angular to disable the input.
  setDisabledState(isDisabled: boolean): void {
    isDisabled ? this._picker.disabled = true : this._picker.disabled = false;

    isDisabled ? this.content.formControl.disable() : this.content.formControl.enable();
  }

  _yearSelectedHandler(chosenDate: Moment, datepicker: MatDatepicker<Moment>) {
    if (!this._isYearEnabled(chosenDate.year())) {
      datepicker.close();
      return;
    }

    this.content.formControl.setValue(chosenDate, { emitEvent: false });
    this.content.value = chosenDate.year;
    // this.content.formControl.setValue(this.content.value);
    this.onChange(chosenDate.toDate());
    this.onTouched();
    datepicker.close();
  }

  _openDatepickerOnClick(datepicker: MatDatepicker<Moment>) {
    if (!datepicker.opened) {
      datepicker.open();
    }
  }

  _openDatepickerOnFocus(datepicker: MatDatepicker<Moment>) {
    setTimeout(() => {
      if (!datepicker.opened) {
        datepicker.open();
      }
    });
  }

  /** Whether the given year is enabled. */
  private _isYearEnabled(year: number) {
    // disable if the year is greater than maxDate lower than minDate
    if (year === undefined || year === null ||
      (this._max && year > this._max.year()) ||
      (this._min && year < this._min.year())) {
      return false;
    }

    return true;
  }
}
