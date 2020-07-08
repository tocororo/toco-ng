/*
 *   Copyright (c) 2020 Universidad de Pinar del Río "Hermanos Saíz Montes de Oca"
 *   All rights reserved.
 */

import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { startWith, map } from 'rxjs/operators';
import { isArray } from 'util';

import { FormFieldControl_Experimental } from '../form-field.control.experimental';
import { SelectOption } from '../select/select.component';

@Component({
	selector: 'toco-select-filter',
	templateUrl: './select-filter.component.html',
	styleUrls: ['./select-filter.component.scss'],
	host: {
		'[style.minWidth]': 'content.minWidth',
		'[style.width]': 'content.width'
	}
})
export class SelectFilterComponent extends FormFieldControl_Experimental implements OnInit {

	internalControl = new FormControl();

	formControl = new FormControl();

	public selectOptions: SelectOption[] = null;

	public chipsList: SelectOption[] = [];

	public filteredOptions: Observable<SelectOption[]>;

	searchText = 'Seleccione las opciones';
	selectedValue: any;

	public constructor()
	{
		super();
	}


	public multiple: boolean = false;

	loading = true;

	public ngOnInit(): void
	{
		//    this.content.parentFormSection.addControl(this.content.name, this.internalControl);

		this.multiple = this.content.extraContent['multiple'] ? this.content.extraContent['multiple'] : false;

		if (this.content.extraContent.observable) {
			this.content.extraContent.observable.subscribe(

				// next
				(response: any) => {

					this.selectOptions = this.content.extraContent.getOptions(response);

					this.selectOptions.forEach(option => {

						if (this.multiple) {

							try {
								const index = this.content.value.indexOf(option.value);
								if (index >= 0) {
									this.addChips(option);
								}
							} catch (error) {
							}

						} else {
							if (option.value == this.content.value) {
								this.addChips(option);
							}
						}

					});
					if (this.multiple &&
						(this.content.value == null ||
							this.content.value == undefined ||
							!isArray(this.content.value))) {
						this.content.value = [];
					}

					this._updateFilteredOptions();
					this.loading = false;

				},

				// error
				(error: any) => { console.log(error); }
				,

				// complete
				() => { }

			);
		}
		else
		{
			this.selectOptions = this.content.extraContent.getOptions();
		}

	}

	onSelectionChange() {
		if (this.content.extraContent.selectionChange) {
			this.content.extraContent.selectionChange(this.content.value);
		}
	}

	addChips(item: SelectOption) {

		if (this.multiple) {
			this.chipsList.unshift(item);
			this.content.value.unshift(item.value);
		} else {
			// if not is multiple, then the element in the chipsList goes back to the options
			if (this.chipsList.length > 0) {
				this.selectOptions.push(this.chipsList[0]);
			}
			this.chipsList = [item];
			this.content.value = item.value;
		}

		this.internalControl.setValue(this.content.value);

		this.selectOptions = this.selectOptions.filter(option => option.value !== item.value);

		this.formControl.setValue('');
		this._updateFilteredOptions();
	}

	removeChip(index: number) {

		this.selectOptions.push(this.chipsList[index]);

		if (this.multiple) {
			this.content.value = (this.content.value as []).filter((e: SelectOption) => e.value !== this.chipsList[index].value);
		} else {
			this.content.value = '';
		}

		this.internalControl.setValue(this.content.value);

		this.chipsList.splice(index, 1);
		this._updateFilteredOptions();
	}

	private _updateFilteredOptions()
	{
		this.filteredOptions = this.formControl.valueChanges.pipe<string, SelectOption[]>(
			startWith(''),
			map(value => {
				const filterValue = (value) ? value.toLowerCase() : '';
				return this.selectOptions.filter(option => option.label.toLowerCase().includes(filterValue));
			}));
	}
}