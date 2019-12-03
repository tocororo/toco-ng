
import { Component, OnDestroy, Input, ElementRef, Optional, Self } from '@angular/core';
import { ControlValueAccessor, NgControl, FormControl, FormGroup, FormBuilder, Validators, ValidationErrors } from '@angular/forms';
import { Subject } from 'rxjs';
import { MatFormFieldControl } from '@angular/material/form-field';
import { FocusMonitor } from '@angular/cdk/a11y';
import { coerceBooleanProperty } from '@angular/cdk/coercion';

import { ExtraValidators } from '@toco/core/utils/validator';

/**
 * Data structure for holding an ISSN. 
 * An ISSN (International Standard Serial Number) is an 8-digit code used to identify 
 * newspapers, journals, magazines and periodicals of all kinds and on all media–print 
 * and electronic. For more information follow the link: https://www.issn.org/understanding-the-issn/what-is-an-issn/. 
 */
export class IssnData
{
	/**
	 * The first group of four digits.
	 */
	public firstGroup: string;

	/**
	 * The second group of four digits.
	 */
	public secondGroup: string;

	constructor(fg: string, sg: string)
	{
		this.firstGroup = fg;
		this.secondGroup = sg;
	}
}

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
	MatFormFieldControl<IssnData>, ControlValueAccessor
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
	 * Tracks the value and validity state of a group of `FormControl` instances. 
	 */
	public readonly parts: FormGroup;
	private readonly _firstGroup: FormControl;
	private readonly _secondGroup: FormControl;

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
	 * Returns true if the control is in an error state; otherwise, false. 
	 */
	public _errorState: boolean;

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
	
		this._errorState = false;

		this.controlType = IssnFormFieldInternalComponent._controlNameWithDash;

		this.describedBy = '';
	
		this._onChange = (_: any) => { };
		
		this._onTouched = () => { };

		/* Constructs a new `FormGroup` instance. */
		this.parts = new FormGroup({
			'First Group': this._firstGroup = new FormControl('', [
				ExtraValidators.equalLength(4),
				Validators.pattern('^[0-9]*$')]
				),
			'Second Group': this._secondGroup = new FormControl('', [
				ExtraValidators.equalLength(4),
				Validators.pattern('^[0-9]*$')]
				),
		});

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
	 * Returns the value of the control. 
	 */
	@Input()
	public get value(): IssnData | null
	{
		if ((this._firstGroup.value.length == 4) && (this._secondGroup.value.length == 4))
		{
			//TODO: Test to 'return this.parts.value;' variable directamente y no crea una nueva (lo puedo hacer por como funciona este control). 
			//return issn;
			return new IssnData(this._firstGroup.value, this._secondGroup.value);
		}
		return null;
	}

	/**
	 * Sets the value of the control. 
	 * @param newIssn The new ISSN to set. 
	 */
	public set value(newIssn: IssnData | null)
	{
		newIssn = newIssn || new IssnData('', '');

		//TODO: this.parts.setValue(newIssn);
		this.parts.setValue({ 'First Group': newIssn.firstGroup, 'Second Group': newIssn.secondGroup });

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
		/*You may not want your application to display errors before the user has a 
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
		let result: string = '';
		let result_alreadyHaveErrorInfo: boolean = false;
		let validationErrors: ValidationErrors = this._firstGroup.errors;

		/* Shows the first group errors. */
		if (validationErrors)
		{
			result += 'First Group:';

			if (validationErrors[ExtraValidators.equalLength.name])
			{
				result += ' Its length must be 4';
				result_alreadyHaveErrorInfo = true;
			}

			if (validationErrors[Validators.pattern.name])
			{
				if (result_alreadyHaveErrorInfo)
				{
					result += ', and it can only have digits';
				}
				else
				{
					result += ' It can only have digits';
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
					result += ' Its length must be 4';
					result_alreadyHaveErrorInfo = true;
				}

				if (validationErrors[Validators.pattern.name])
				{
					if (result_alreadyHaveErrorInfo)
					{
						result += ', and it can only have digits';
					}
					else
					{
						result += ' It can only have digits';
					}

					result_alreadyHaveErrorInfo = true;
				}

				result += '.';
			}
		}

		return result;
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
			this._elementRef.nativeElement.querySelector('input')!.focus();
		}
	}

	public writeValue(issn: IssnData | null): void
	{
		this.value = issn;
	}
	
	public registerOnChange(fn: any): void
	{
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
	 * Handler function that is called when the control's value changes in the UI. 
	 */
	public _handleInput(): void
	{
		this._onChange(this.parts.value);
	}
}
