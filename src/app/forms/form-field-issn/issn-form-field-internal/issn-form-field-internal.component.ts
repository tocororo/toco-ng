
import { Component, OnDestroy, Input, ElementRef, Optional, Self } from '@angular/core';
import { ControlValueAccessor, NgControl, FormControl, FormGroup, FormBuilder, Validators, ValidatorFn, ValidationErrors } from '@angular/forms';
import { Subject } from 'rxjs';
import { MatFormFieldControl } from '@angular/material/form-field';
import { FocusMonitor } from '@angular/cdk/a11y';
import { coerceBooleanProperty } from '@angular/cdk/coercion';

import { IssnValue } from '../issn-value';
import { ExtraValidators } from '../../../core/utils/validator';

/**
 * Custom `MatFormFieldControl` for ISSN input, i.e., a control that represents an 
 * ISSN input form field. 
 * An ISSN (International Standard Serial Number) is an 8-digit code used to identify 
 * newspapers, journals, magazines and periodicals of all kinds and on all media–print 
 * and electronic. For more information follow the link: https://www.issn.org/understanding-the-issn/what-is-an-issn/. 
 */
@Component({
	selector: 'issn-form-field-internal',
	templateUrl: './issn-form-field-internal.component.html',
	styleUrls: ['./issn-form-field-internal.component.scss' ],
	providers: [
		{ provide: MatFormFieldControl, useExisting: IssnFormFieldInternalComponent }
	],
	host: {
		'[id]': 'id',
		'[class.should-label-float]': 'shouldLabelFloat',
		'[attr.aria-describedby]': 'describedBy',
		'(blur)': '_onTouched()'
		/* It does not need to do '(change/input)': '_onChange(parts.value)' because the `input` event 
		 * is already bound. */
	}
})
export class IssnFormFieldInternalComponent implements OnDestroy, 
	MatFormFieldControl<IssnValue>, ControlValueAccessor
{
	/**
	 * Returns the next Id. 
	 */
	private static _nextId: number = 0;

	/**
	 * Returns the control name with dash. 
	 */
	private static readonly _controlNameWithDash: string = 'issn-form-field';

	/**
	 * Tracks the value and validity state of the control that contains the code. 
	 */
	public readonly parts: FormGroup;
	private readonly _firstGroup: FormControl;
	private _firstGroupOldValue: string;   /* It is used by '_handleInput' method. */
	private readonly _secondGroup: FormControl;
	private _secondGroupOldValue: string;  /* It is used by '_handleInput' method. */

    /**
     * Stream that emits whenever the state of the control changes such that the parent `MatFormField` 
     * needs to run change detection. 
     */
	public readonly stateChanges: Subject<void>;

	/**
	 * Return the element ID for this control. 
	 */
	public readonly id: string;

	/**
	 * Returns the placeholder for this control. 
	 */
	private _placeholder: string;

	/**
	 * Returns true if the control is focused; otherwise, false. 
	 */
	public focused: boolean;

	/**
	 * Returns true if the control is required; otherwise, false. 
	 */
	private _required: boolean;

	/**
	 * Returns true if the control is disabled; otherwise, false. 
	 */
	private _disabled: boolean;

    /**
     * Returns an optional name for the control type that can be used to distinguish `mat-form-field` elements 
     * based on their control type. The form field will add a class, `mat-form-field-type-{{controlType}}` 
	 * to its root element. 
     */
	public readonly controlType: string;

	/**
	 * Returns the list of element Ids that currently describes this control. 
	 * These Ids should be used for the `aria-describedby` attribute of the host control. 
	 */
	public describedBy: string;

	/**
	 * Contains a reference to a saved callback function that is called when the control's value changes 
	 * in the UI. 
	 */
	public _onChange: (_: any) => void;
	
	/**
	 * Contains a reference to a saved callback function that is called when the control should be 
	 * considered blurred or "touched". 
	 */
	public _onTouched: () => void;

	//TODO: esta forma de enlace será mejorado en el futuro. 
	public thereWasInput: () => void;

	constructor(private _formBuilder: FormBuilder, private _focusMonitor: FocusMonitor,
		private _elementRef: ElementRef<HTMLElement>, @Optional() @Self() public ngControl: NgControl)
	{
		/* These initializations must be here (not in `ngOnInit` method). */

		this.stateChanges = new Subject<void>();

		this.id = `${ IssnFormFieldInternalComponent._controlNameWithDash }-${ IssnFormFieldInternalComponent._nextId++ }`;
	
		this._placeholder = '';
	
		this.focused = false;

		this._required = false;

		this._disabled= false;
	
		this.controlType = IssnFormFieldInternalComponent._controlNameWithDash;

		this.describedBy = '';
	
		this._onChange = (_: any) => { };
		
		this._onTouched = () => { };

		/* Constructs a new `FormGroup` instance. */
		this.parts = new FormGroup({
			'fg': this._firstGroup = new FormControl((this._firstGroupOldValue = ''), [
				ExtraValidators.equalLength(IssnValue.groupLength),
				Validators.pattern('^[0-9]*$')]),
			'sg': this._secondGroup = new FormControl((this._secondGroupOldValue = ''), [
				ExtraValidators.equalLength(IssnValue.groupLength),
				Validators.pattern('^[0-9]*[0-9xX]$')])
		},
		[
			ExtraValidators.requiredAndNotEmpty(this, [this._firstGroup, this._secondGroup]),
			ExtraValidators.issnConfirmCheckDigit(this._firstGroup, this._secondGroup, IssnValue.groupLength)
		]
		);

		/* Monitors focus on the element and applies appropriate CSS classes. */
		_focusMonitor.monitor(_elementRef, true).subscribe(origin => {
			if (this.focused && !origin)
			{
				this._onTouched();
			}
			
			this.focused = !!origin;

			this.stateChanges.next();
		});

		/* Sets the value accessor directly. */
		if (ngControl != null)
		{
			ngControl.valueAccessor = this;
		}
	}

	public ngOnDestroy(): void
	{
		/* Completes `stateChanges` when the control is destroyed. */
		this.stateChanges.complete();

		/* Stops monitoring the element and removes all focus classes. */
		this._focusMonitor.stopMonitoring(this._elementRef);
	}

	/**
	 * Returns the value of the control. The value can be checked using the `isComplete` instance method. 
	 */
	@Input()
	public get value(): IssnValue | null
	{
		//console.log(this._firstGroup.value + this._secondGroup.value);
		//console.log(`Set Get 'value' method 123.`);

		return new IssnValue(this._firstGroup.value, this._secondGroup.value);
	}

	/**
	 * Sets the value of the control. If the value is null, sets an empty ISSN. 
	 * It does not check if the value is complete. 
	 * @param newIssn The new ISSN to set. 
	 */
	public set value(newIssn: IssnValue | null)
	{
		//console.log(`Set 'value' method 123.`);

		newIssn = newIssn || new IssnValue('', '');

		this.parts.setValue({ 'fg': newIssn.firstGroup, 'sg': newIssn.secondGroup });

		this.stateChanges.next();
	}

	/**
	 * Returns the placeholder for this control. 
	 */
	@Input()
	public get placeholder(): string
	{
		return this._placeholder;
	}

	/**
	 * Sets the placeholder for this control. 
	 * @param value The new placeholder to set. 
	 */
	public set placeholder(value: string)
	{
		this._placeholder = value;

		this.stateChanges.next();
	}

	/**
	 * Returns true if the control is empty; otherwise, false. 
	 */
	public get empty(): boolean
	{
		return ((!this._firstGroup.value) && (!this._secondGroup.value));
	}

	/**
	 * Returns true if the `MatFormField` label should try to float; otherwise, false. 
	 */
	public get shouldLabelFloat(): boolean
	{
		return ((this.focused) || (!this.empty));
	}

	/**
	 * Returns true if the control is required; otherwise, false. 
	 */
	@Input()
	public get required(): boolean
	{
		return this._required;
	}

	/**
	 * Sets the required for this control. 
	 * @param value The new required to set. 
	 */
	public set required(value: boolean)
	{
		this._required = coerceBooleanProperty(value);

		this.stateChanges.next();
	}

	/**
	 * Returns true if the control is disabled; otherwise, false. 
	 */
	@Input()
	public get disabled(): boolean
	{
		return this._disabled;
	}

	/**
	 * Sets the disabled for this control. 
	 * @param value The new disabled to set. 
	 */
	public set disabled(value: boolean)
	{
		/* Sets the disabled state on the individual inputs that make up the control. */
		(this._disabled = coerceBooleanProperty(value)) ? this.parts.disable() : this.parts.enable();

		this.stateChanges.next();
	}

	/**
	 * Returns true if the control is in an error state; otherwise, false. 
	 */
	public get errorState(): boolean
	{
		/* The control does not display errors before the user has a 
		 * chance to edit the form. The checks for dirty and touched prevent errors 
		 * from showing until the user does one of two things: changes the value, 
		 * turning the control dirty; or blurs the form control element, setting the 
		 * control to touched. 
		 * Thus, it reveals an error message only if the control is invalid and 
		 * the control is either dirty or touched. */
		return ((this.parts.invalid) && (this.parts.dirty || this.parts.touched));
	}

	/**
	 * Returns an error string if the control is in an error state; otherwise, empty string. 
	 */
	public getErrorMessage(): string
	{
		//console.log(this._firstGroup.errors);
		//console.log(this._secondGroup.errors);
		//console.log(this.parts.errors);

		let result: string = '';
		let result_alreadyHaveErrorInfo: boolean = false;
		let validationErrors: ValidationErrors = this._firstGroup.errors;

		/* Shows the first group errors. */
		if (validationErrors)
		{
			result += 'First Group:';

			if (validationErrors[ExtraValidators.equalLength.name])
			{
				result += ' Its length must be ' + IssnValue.groupLengthAsString;
				result_alreadyHaveErrorInfo = true;
			}

			if (validationErrors[Validators.pattern.name])
			{
				if (result_alreadyHaveErrorInfo)
				{
					result += ', and all positions have digits';
				}
				else
				{
					result += ' All positions must have digits';
				}

				result_alreadyHaveErrorInfo = true;
			}

			result += '.';
		}

		/* Only shows the second group errors if there isn't any error in the first group. */
		if (!result_alreadyHaveErrorInfo)
		{
			validationErrors = this._secondGroup.errors;

			if (validationErrors)
			{
				result += 'Second Group:';

				if (validationErrors[ExtraValidators.equalLength.name])
				{
					result += ' Its length must be ' + IssnValue.groupLengthAsString;
					result_alreadyHaveErrorInfo = true;
				}

				if (validationErrors[Validators.pattern.name])
				{
					if (result_alreadyHaveErrorInfo)
					{
						result += ', and all positions have digits (the last one can also have x or X)';
					}
					else
					{
						result += ' All positions must have digits (the last one can also have x or X)';
					}

					result_alreadyHaveErrorInfo = true;
				}

				result += '.';
			}
		}

		/* Only shows the `issnConfirmCheckDigit` error if there isn't any error in the first and second group. */
		if (!result_alreadyHaveErrorInfo)
		{
			validationErrors = this.parts.errors;

			if (validationErrors)
			{
				if (validationErrors[ExtraValidators.requiredAndNotEmpty.name])
				{
					if (validationErrors[ExtraValidators.requiredAndNotEmpty.name].pos == 0)
					{
						result += 'First Group: Its length must be ' + IssnValue.groupLengthAsString;
					}
					else
					{
						result += 'Second Group: Its length must be ' + IssnValue.groupLengthAsString;
					}

					result_alreadyHaveErrorInfo = true;
				}

				if (validationErrors[ExtraValidators.issnConfirmCheckDigit.name])
				{
					result += 'There is some wrong digit';
					result_alreadyHaveErrorInfo = true;
				}

				result += '.';
			}
		}

		return result;
	}

	/**
     * Returns true if the input is currently in an autofilled state; otherwise, false. This property 
	 * is not present on the control, then it returns false. 
     */
	public get autofilled(): boolean
	{
		return false;
	}

	/**
	 * Sets the list of element Ids that currently describes this control. 
	 * @param ids The list of element Ids. 
	 */
	public setDescribedByIds(ids: string[]): void
	{
		this.describedBy = ids.join(' ');
	}

	/**
	 * Handles a click event on the control's container that occurs due to the user interacting with a pointing 
	 * device (such as a mouse). 
	 * @param event The event information. 
	 */
	public onContainerClick(event: MouseEvent): void
	{
		if (((event.target as Element).tagName.toLowerCase() != 'input') || (this.empty))
		{
			this._elementRef.nativeElement.querySelector<HTMLElement>('#first-group')!.focus();
		}
	}

	public writeValue(issn: IssnValue | null): void
	{
		this.value = issn;
	}
	
	public registerOnChange(fn: any): void
	{
		console.log('12345');

		/* Saves a callback function that is called when the control's value changes in the UI. */
		this._onChange = fn;
	}

	public registerOnTouched(fn: any): void
	{
		/* Saves a callback function that is called when the control should be considered blurred or "touched". */
		this._onTouched = fn;
	}

	public setDisabledState(isDisabled: boolean): void
	{
		this.disabled = isDisabled;
	}

	/**
	 * Handler function that is called when the control's value changes in the UI. For internal use only. 
	 */
	public _handleInput(): void
	{
		let firstGroupValue: string = this._firstGroup.value;
		let secondGroupValue: string = this._secondGroup.value;

		if (firstGroupValue.length == IssnValue.groupLength)
		{
			/* Sets the focus to the second group. */
			if (this._firstGroup.valid) this._elementRef.nativeElement.querySelector<HTMLElement>('#second-group')!.focus();
		}
		else if (firstGroupValue.length > IssnValue.groupLength)
		{
			/* Sets the old value. */
			this._firstGroup.setValue(this._firstGroupOldValue);
			/* Sets the focus to the second group. */
			if (this._firstGroup.valid) this._elementRef.nativeElement.querySelector<HTMLElement>('#second-group')!.focus();
		}

		if (secondGroupValue.length == IssnValue.groupLength)
		{
			if (secondGroupValue[IssnValue.groupLength - 1] === 'x')
			{
				/* Sets the 'x' value to upper case. */
				if (this._secondGroup.valid) this._secondGroup.setValue((secondGroupValue = secondGroupValue.replace('x', 'X')));
			}
		}
		else if (secondGroupValue.length > IssnValue.groupLength)
		{
			/* Sets the old value. */
			this._secondGroup.setValue(this._secondGroupOldValue);
		}

		/* Updates the old values. */
		this._firstGroupOldValue = this._firstGroup.value;
		this._secondGroupOldValue = this._secondGroup.value;

		//TODO: esta forma de enlace será mejorado en el futuro. 
		this.thereWasInput();

		this._onChange(this.parts.value);
	}
}
