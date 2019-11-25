import { Component, OnInit, Input } from '@angular/core';
import { FormContainerService } from './form-container.service';
import { PartialObserver } from 'rxjs';
import { Response } from '@toco/entities/response';
import { JournalInformation, Journal } from '@toco/entities/journal.entity';

/**
 * Represents a form field type.
 */
export enum FormFieldType {

	/** A texarea control. */
	textarea = "textarea",

	/** An input control. */
	input = "input",

	/** A datapicker control. */
	datepicker = "datepicker",

	/** A checkbox control. */
	checkbox = "checkbox",

	/** A url control. */
	url= "url",
};

/**
 * Represents a form field interface.
 */
export interface FormField{

	/** A form field name. */
	name: string;

	/** A form field placeholder. */
	placeholder: string;

	/** A form field type. */
	type: FormFieldType;

	/** A form field value. */
	value?: string;

	/** If it is true the form field is required; otherwise, false. */
	required: boolean;
}

/**
 * Represents a panel interface.
 * @description Represents the information shown in the expansion control.
 */
export interface Panel{
	title: string;

	description: string;

	iconName: string;

	formField : FormField[];
}

/**
 * Represents a form container.
 * @description Creates a form to show the panels Array and sends that information to server.
 */
@Component({
	selector: 'toco-form-container',
	templateUrl: './form-container.component.html',
	styleUrls: ['./form-container.component.scss']
})
export class FormContainerComponent implements OnInit {

	// TODO: in the future validate the token with a module or something
	/** The autorization token. */
	@Input() 
	public token: string;
	
	public step = 0;

	@Input() 
	public panels: Panel[] = [];

	public constructor(
		private formContainerService: FormContainerService
	) { }

	public ngOnInit() {
	}

	/**
	 * Sets a new current panel to expand.
	 * @param index The new position
	 */	
	public setStep(index: number) {
		this.step = index;
	}

	/**
	 * Sets the next panel to expand.
	 */
	public nextStep() {
		this.step++;
	}

	/**
	 * Sets the previous panel to expand.
	 */
	public prevStep() {
		this.step--;
	}

	private sendDataObserver: PartialObserver<Response<any>> = {
			next: (response: Response<any>) => {
				/**
				 * TODO: make somthing with response
				 */
			},
			error: (err: Response<any>) => {
				 console.log('The observable got an error notification: ' + err.message + '.'); 
			},
			complete: () => { console.log('The observable got a complete notification.'); }
		};

	/**
	 * Sends data to the server. Collects all added information from the component.
	 */
	public addData() {
		/* Preparing all data */
		let data = [];
		this.panels.forEach(panel => {
			panel.formField.forEach( form => {
				let obj = {};
				Object.defineProperty(obj, form.name, {
					value: form.value
				  });
				data.push( obj);
			})
		});
		console.log(data);
		
		if(this.token)
			this.formContainerService.sendPostData('/inclusin', this.token, data)
				.subscribe(this.sendDataObserver);
	}

	
}
