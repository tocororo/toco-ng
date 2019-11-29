
// import { Component, OnInit, Input } from '@angular/core';
// import { FormGroup, FormBuilder } from '@angular/forms';
// import { MatFormFieldControl } from '@angular/material/form-field';

/**
 * Custom `MatFormFieldControl` for ISSN input, i.e, a component that represents an 
 * ISSN input form field. 
 * An ISSN (International Standard Serial Number) is an 8-digit code used to identify 
 * newspapers, journals, magazines and periodicals of all kinds and on all media–print 
 * and electronic. For more information follow the link: https://www.issn.org/understanding-the-issn/what-is-an-issn/. 
 */
// @Component({
// 	selector: 'toco-issn-form-field',
// 	templateUrl: './issn-form-field.component.html',
// 	styleUrls: ['./issn-form-field.component.scss']
// })
// export class IssnFormFieldComponent implements OnInit
// {
// 	public constructor()
// 	{ }

// 	public ngOnInit(): void
// 	{ }
// }

import { FocusMonitor } from '@angular/cdk/a11y';
import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { Component, ElementRef, Input, OnDestroy, Optional, Self } from '@angular/core';
import { FormBuilder, FormGroup, ControlValueAccessor, NgControl } from '@angular/forms';
import { Subject } from 'rxjs';
import { MatFormFieldControl } from '@angular/material/form-field';

/**
 * Data structure for holding an ISSN. 
 */
export class MyTel
{
	constructor(public area: string, public exchange: string, public subscriber: string)
	{ }
}

@Component({
	selector: 'toco-issn-form-field',
	templateUrl: './issn-form-field.component.html',
	styleUrls: ['./issn-form-field.component.scss'],
	providers: [
		{ provide: MatFormFieldControl, useExisting: MyTelInput }
	],
	host: {
		'[class.example-floating]': 'shouldLabelFloat',
		'[id]': 'id',
		'[attr.aria-describedby]': 'describedBy',
	}
})
export class MyTelInput implements ControlValueAccessor, MatFormFieldControl<MyTel>, OnDestroy
{
	static nextId = 0;

	parts: FormGroup;
	stateChanges = new Subject<void>();
	focused = false;
	errorState = false;
	controlType = 'issn-form-field';
	id = `issn-form-field-${MyTelInput.nextId++}`;
	describedBy = '';
	onChange = (_: any) => { };
	onTouched = () => { };

	get empty() {
		const { value: { area, exchange, subscriber } } = this.parts;

		return !area && !exchange && !subscriber;
	}

	get shouldLabelFloat() { return this.focused || !this.empty; }

	@Input()
	get placeholder(): string { return this._placeholder; }
	set placeholder(value: string) {
		this._placeholder = value;
		this.stateChanges.next();
	}
	private _placeholder: string;

	@Input()
	get required(): boolean { return this._required; }
	set required(value: boolean) {
		this._required = coerceBooleanProperty(value);
		this.stateChanges.next();
	}
	private _required = false;

	@Input()
	get disabled(): boolean { return this._disabled; }
	set disabled(value: boolean) {
		this._disabled = coerceBooleanProperty(value);
		this._disabled ? this.parts.disable() : this.parts.enable();
		this.stateChanges.next();
	}
	private _disabled = false;

	@Input()
	get value(): MyTel | null {
		const { value: { area, exchange, subscriber } } = this.parts;
		if (area.length === 3 && exchange.length === 3 && subscriber.length === 4) {
			return new MyTel(area, exchange, subscriber);
		}
		return null;
	}
	set value(tel: MyTel | null) {
		const { area, exchange, subscriber } = tel || new MyTel('', '', '');
		this.parts.setValue({ area, exchange, subscriber });
		this.stateChanges.next();
	}

	constructor(
		formBuilder: FormBuilder,
		private _focusMonitor: FocusMonitor,
		private _elementRef: ElementRef<HTMLElement>,
		@Optional() @Self() public ngControl: NgControl) {

		this.parts = formBuilder.group({
			area: '',
			exchange: '',
			subscriber: '',
		});

		_focusMonitor.monitor(_elementRef, true).subscribe(origin => {
			if (this.focused && !origin) {
				this.onTouched();
			}
			this.focused = !!origin;
			this.stateChanges.next();
		});

		if (this.ngControl != null) {
			this.ngControl.valueAccessor = this;
		}
	}

	ngOnDestroy() {
		this.stateChanges.complete();
		this._focusMonitor.stopMonitoring(this._elementRef);
	}

	setDescribedByIds(ids: string[]) {
		this.describedBy = ids.join(' ');
	}

	onContainerClick(event: MouseEvent) {
		if ((event.target as Element).tagName.toLowerCase() != 'input') {
			this._elementRef.nativeElement.querySelector('input')!.focus();
		}
	}

	writeValue(tel: MyTel | null): void {
		this.value = tel;
	}

	registerOnChange(fn: any): void {
		this.onChange = fn;
	}

	registerOnTouched(fn: any): void {
		this.onTouched = fn;
	}

	setDisabledState(isDisabled: boolean): void {
		this.disabled = isDisabled;
	}

	_handleInput(): void {
		this.onChange(this.parts.value);
	}
}
