
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormArray } from '@angular/forms';

import { Organization } from '@toco/tools/entities';
import { FormFieldType, TextInputAppearance, OperationAction, FormSection, PanelContent, 
	ContainerContent, HintValue, HintPosition } from '@toco/tools/forms';

@Component({
	selector: 'toco-org-edit',
	templateUrl: './org-edit.component.html',
	styleUrls: ['./org-edit.component.scss']
})
export class OrgEditComponent implements OnInit
{
    /**
     * Represents the `OperationAction` enum for internal use. 
     */
	public readonly operationAction: typeof OperationAction;

	/**
	 * Represents the current organization. 
	 */
	private org: Organization;

	/**
	 * Tracks the value and validity state of the internal child controls that contains this component. 
	 */
    private panelFormSection: FormSection;

    /**
     * Contains the panel's content. 
     */
	public panelContent: PanelContent;

	/**
	 * Tracks the value and validity state of the internal child controls that contains this component. 
	 */
	private addressesPanelFormSection: FormSection;

    /**
     * Contains the addresses panel's content. 
     */
	public addressesPanelContent: PanelContent;


	private labelsSimpleFaFormSection: FormSection;
	public  labelsSimpleFaContent: ContainerContent;


	public constructor(private _router: Router, private _activatedRoute: ActivatedRoute)
	{
		this.operationAction = OperationAction;
		this.panelFormSection = new FormGroup({ }, [ ]);
		this.addressesPanelFormSection = new FormGroup({ }, [ ]);

		this.labelsSimpleFaFormSection = new FormArray([ ], [ ]);
	}

	public ngOnInit(): void
	{
		/* Gets the `Organization` data. */
		this._activatedRoute.data.subscribe(
			(data: { 'org': Organization }) => {
				this.org = data.org;

				console.log('Data got for editing: ', this.org);
			}
		)

		/* Creates the panel's content. */
		this.panelContent = this._initPanelContent();

		/* Creates the addresses panel's content. */
		this.addressesPanelContent = this._initAddressesPanelContent();

		this.labelsSimpleFaContent = this._initLabelsSimpleFaContent();

		// this.action = {
		// 	doit(data: any): void
		// 	{
		// 		if (this.panelFormSection.valid)
		// 		{
		// 			/* Gets the result from `panelFormSection`. */
		// 			// const result: Organization = new Organization();
		// 			// result.load_from_data(this.panelFormSection.value);
		// 		}
		// 	}
		// };

		//this.actionLabel = 'Adicionar';
	}

    /**
     * Returns the panel's content. 
     */
    private _initPanelContent(): PanelContent
    {
		return {
			/* The 'label' and 'title' fields have the same values, but they are different fields with different functionalities. */
			'formSection': this.panelFormSection,
			'name': 'panel',
			'label': 'Edita la organización seleccionada',
			'type': FormFieldType.container_panel,
			'title': 'Edita la organización seleccionada',
			'description': '',
			'iconName': undefined /*''*/,
			'formSectionContent': [
				{
					'name': 'name',
					'label': 'Name typically used to refer to the institute',
					'type': FormFieldType.text,
					'required': true,
					'value': this.org.name,
					'width': '100%',
					'appearance': TextInputAppearance.outline,
					'ariaLabel': 'Name typically used to refer to the institute'
				},
				{
					'name': 'status',
					'label': 'Institute status',
					'type': FormFieldType.select,
					'required': true,
					'value': this.org.status,
					'width': '45%',
					'appearance': TextInputAppearance.outline,
					'ariaLabel': 'Institute status',
					'selectOptions': [
						{
							'label': 'Active',
							'value': 'active'
						},
						{
							'label': 'Closed',
							'value': 'closed'
						},
						{
							'label': 'Unknown',
							'value': 'unknown'
						}
					],
					'multiple': false
				},

				this._initIdentifiersContent(),

				{
					'name': 'aliases',
					'label': 'A list of other names the institute is known as',
					'type': FormFieldType.select,
					'required': false,
					'value': this.org.aliases,
					'width': '100%',
					'appearance': TextInputAppearance.outline,
					'ariaLabel': 'A list of other names the institute is known as',
					/* The 'selectOptions' field is gotten from the 'value' field. */
					'multiple': true
				},
				{
					'name': 'acronyms',
					'label': 'A list of short acronyms the institute is known as (e.g. MRC for the Medical Research Council)',
					'type': FormFieldType.select,
					'required': false,
					'value': this.org.acronyms,
					'width': '100%',
					'appearance': TextInputAppearance.outline,
					'ariaLabel': 'A list of short acronyms the institute is known as (e.g. MRC for the Medical Research Council)',
					/* The 'selectOptions' field is gotten from the 'value' field. */
					'multiple': true
				},
				{
					'name': 'types',
					'label': 'A list of types describing the institute',
					'type': FormFieldType.select,
					'required': true,
					'value': this.org.types,
					'width': '100%',
					'appearance': TextInputAppearance.outline,
					'ariaLabel': 'A list of types describing the institute',
					'selectOptions': [
						{
							'label': 'Education',
							'value': 'Education'
						},
						{
							'label': 'Healthcare',
							'value': 'Healthcare'
						},
						{
							'label': 'Company',
							'value': 'Company'
						},
						{
							'label': 'Archive',
							'value': 'Archive'
						},
						{
							'label': 'Nonprofit',
							'value': 'Nonprofit'
						},
						{
							'label': 'Government',
							'value': 'Government'
						},
						{
							'label': 'Facility',
							'value': 'Facility'
						},
						{
							'label': 'Other',
							'value': 'Other'
						}
					],
					'multiple': true
				},
				{
					'name': 'wikipedia_url',
					'label': 'URL of the wikipedia page for the institute',
					'type': FormFieldType.url,
					'required': false,
					'value': this.org.wikipedia_url,
					'width': '45%',
					'appearance': TextInputAppearance.outline,
					'ariaLabel': 'URL of the wikipedia page for the institute'
				},
				{
					'name': 'email_address',
					'label': 'Contact email address for the institute',
					'type': FormFieldType.email,
					'required': true,
					'value': this.org.email_address,
					'width': '45%',
					'appearance': TextInputAppearance.outline,
					'ariaLabel': 'Contact email address for the institute'
				},
				{
					'name': 'ip_addresses',
					'label': 'IP addresses known to belong to the institute',
					'type': FormFieldType.select,
					'required': false,
					'value': this.org.ip_addresses,
					'width': '100%',
					'appearance': TextInputAppearance.outline,
					'ariaLabel': 'IP addresses known to belong to the institute',
					/* The 'selectOptions' field is gotten from the 'value' field. */
					'multiple': true
				},
				{
					'name': 'established',
					'label': 'The year the institute opened, CE',
					'type': FormFieldType.text,
					'required': true,
					'value': this.org.established,
					'width': '45%',
					'appearance': TextInputAppearance.outline,
					'ariaLabel': 'The year the institute opened, CE'
				},
				{
					'name': 'links',
					'label': 'An array of URLs linking to things like the homepage for the institute',
					'type': FormFieldType.select,
					'required': false,
					'value': this.org.links,
					'width': '100%',
					'appearance': TextInputAppearance.outline,
					'ariaLabel': 'An array of URLs linking to things like the homepage for the institute',
					/* The 'selectOptions' field is gotten from the 'value' field. */
					'multiple': true
				},

				//TODO: Poner el campo 'labels.'

				//TODO: Poner el campo 'relationships.'


				// {
				// 	name: 'description',
				// 	label: 'Descripción',
				// 	type: FormFieldType.textarea,
				// 	required: false,
				// 	value: this.data.term.description
				// 		? this.data.term.description
				// 		: null,
				// 	width: '100%'
				// }
			]
		};
	}

	/**
     * Returns the addresses panel's content. 
     */
    private _initAddressesPanelContent(): PanelContent
    {
		return {
			/* The 'label' and 'title' fields have the same values, but they are different fields with different functionalities. */
			'formSection': this.addressesPanelFormSection,
			'name': 'addressesPanel',
			'label': 'An array of addresses associated with the institute',
			'type': FormFieldType.container_panel,
			'title': 'An array of addresses associated with the institute',
			'description': '',
			'iconName': undefined /*''*/,
			'formSectionContent': [
				{
					'name': 'city',
					'label': 'The name of the city',
					'type': FormFieldType.text,
					'required': true,
					'value': this.org.addresses[0].city,
					'width': '45%',
					'appearance': TextInputAppearance.outline,
					'ariaLabel': 'The name of the city'
				},
				{
					'name': 'country',
					'label': 'The name of the country',
					'type': FormFieldType.text,
					'required': true,
					'value': this.org.addresses[0].country,
					'width': '45%',
					'appearance': TextInputAppearance.outline,
					'ariaLabel': 'The name of the country'
				},
				{
					'name': 'country_code',
					'label': 'The ISO 3166-1 alpha-2 code of the country',
					'type': FormFieldType.text,
					'required': true,
					'value': this.org.addresses[0].country_code,
					'width': '45%',
					'appearance': TextInputAppearance.outline,
					'ariaLabel': 'The ISO 3166-1 alpha-2 code of the country'
				},
				{
					'name': 'lat',
					'label': 'Latitute of the institute',
					'type': FormFieldType.text,
					'required': true,
					'value': this.org.addresses[0].lat,
					'width': '45%',
					'appearance': TextInputAppearance.outline,
					'ariaLabel': 'Latitute of the institute'
				},
				{
					'name': 'lng',
					'label': 'Longitude of the institute',
					'type': FormFieldType.text,
					'required': true,
					'value': this.org.addresses[0].lng,
					'width': '45%',
					'appearance': TextInputAppearance.outline,
					'ariaLabel': 'Longitude of the institute'
				},
				{
					'name': 'line_1',
					'label': 'First line of the address',
					'type': FormFieldType.text,
					'required': true,
					'value': this.org.addresses[0].line_1,
					'width': '45%',
					'appearance': TextInputAppearance.outline,
					'ariaLabel': 'First line of the address'
				},
				{
					'name': 'line_2',
					'label': 'Second line of the address',
					'type': FormFieldType.text,
					'required': false,
					'value': this.org.addresses[0].line_2,
					'width': '45%',
					'appearance': TextInputAppearance.outline,
					'ariaLabel': 'Second line of the address'
				},
				{
					'name': 'line_3',
					'label': 'Third line of the address',
					'type': FormFieldType.text,
					'required': false,
					'value': this.org.addresses[0].line_3,
					'width': '45%',
					'appearance': TextInputAppearance.outline,
					'ariaLabel': 'Third line of the address'
				},
				{
					'name': 'postcode',
					'label': 'The postcode/zipcode',
					'type': FormFieldType.text,
					'required': true,
					'value': this.org.addresses[0].postcode,
					'width': '45%',
					'appearance': TextInputAppearance.outline,
					'ariaLabel': 'The postcode/zipcode'
				},

				//TODO: Poner aquí el campo 'primary' de tipo 'boolean' (checkbox). 

				{
					'name': 'state',
					'label': 'The name of the state/region',
					'type': FormFieldType.text,
					'required': true,
					'value': this.org.addresses[0].state,
					'width': '45%',
					'appearance': TextInputAppearance.outline,
					'ariaLabel': 'The name of the state/region'
				},
				{
					'name': 'state_code',
					'label': 'The ISO 3166-2 region code',
					'type': FormFieldType.text,
					'required': true,
					'value': this.org.addresses[0].state_code,
					'width': '45%',
					'appearance': TextInputAppearance.outline,
					'ariaLabel': 'The ISO 3166-2 region code'
				},
				//TODO: Poner el resto de los campos. 
			]
		};
	}

    private _initLabelsSimpleFaContent(): ContainerContent
    {
		return {
			'formSection': this.labelsSimpleFaFormSection,
			'name': 'labelsSimpleFa',
			'label': 'The name of the institute in different languages',
			'type': FormFieldType.container_simple_fa,
			'value': this.org.labels,
			'formSectionContent': [
				{
					'formSection': new FormGroup({ }, [ ]),
					'name': "containerLabelDiffLang",
					'label': "0",
					'type': FormFieldType.container_label_diff_lang,
					'required': true,
					'width': "100%",
		//            'appearance': TextInputAppearance.outline,
					'ariaLabel': "0",
					'formSectionContent': [
						{
							'name': 'label',
							'label': 'The institute name in a language variant',
							'type': FormFieldType.text,
							'required': true,
							/* 'value': undefined, this is the default behavior. */
							'width': '70%',
							'appearance': TextInputAppearance.outline,
							'ariaLabel': "The institute name in a language variant"
						},
						{
							'name': 'iso639',
							'label': 'The ISO-639-1 language code',
							'type': FormFieldType.text,
							'required': true,
							/* 'value': undefined, this is the default behavior. */
							'width': '30%',
							'appearance': TextInputAppearance.outline,
							'ariaLabel': "The ISO-639-1 language code",
							//'startHint': new HintValue(HintPosition.start, 'ISO-639-1 language code')
						},
					]
				}
			]
		};
	}

    /**
     * Returns the identifiers' content. 
     */
    private _initIdentifiersContent(): ContainerContent
    {
        return {
            'formSection': new FormGroup({ }, [ ]),
            'name': "identifiers",
            'label': "Organization Identifiers, different from GRID mapping",
            'type': FormFieldType.container_simple,
            'required': true,
            'width': "100%",
//            'appearance': TextInputAppearance.outline,
            'ariaLabel': "Organization Identifiers, different from GRID mapping",
            'formSectionContent': [
                {
                    'name': 'isni',   //idtype
                    'label': 'isni',  //idtype
                    'type': FormFieldType.identifier,
                    'required': true,
                    'value': 'Un_id_isni',
                    'width': '50%',
                    'appearance': TextInputAppearance.outline,
                    'ariaLabel': "Identificador isni",
                    'startHint': new HintValue(HintPosition.start, 'Un identificador es una secuencia de letras')
                },
                {
                    'name': 'grid',   //grid
                    'label': 'grid',  //grid
                    'type': FormFieldType.identifier,
                    'required': true,
                    'value': 'Un_id_grid',
                    'width': '50%',
                    'appearance': TextInputAppearance.outline,
                    'ariaLabel': "Identificador grid",
                    'startHint': new HintValue(HintPosition.start, 'Un identificador es una secuencia de letras')
                },
            ]
		};
		
		// {
		// 	name: 'identifiers',
		// 	label: 'Organization Identifiers, different from GRID mapping',
		// 	type: FormFieldType.container_simple,
		// 	required: true,
		// 	value: undefined,
		// 	width: '100%',
		// 	appearance: TextInputAppearance.outline,
		// 	ariaLabel: 'Organization Identifiers, different from GRID mapping',
		// 	extraContent: [
		// 		{
		// 			name: 'name1',
		// 			label: 'Name typically used to refer to the institute',
		// 			type: FormFieldType.text,
		// 			required: true,
		// 			value: this.org.identifiers[0],
		// 			width: '100%',
		// 			appearance: TextInputAppearance.outline,
		// 			ariaLabel: 'Name typically used to refer to the institute'
		// 		},
		// 		{
		// 			name: 'name2',
		// 			label: 'Name typically used to refer to the institute',
		// 			type: FormFieldType.text,
		// 			required: true,
		// 			value: this.org.identifiers[1],
		// 			width: '100%',
		// 			appearance: TextInputAppearance.outline,
		// 			ariaLabel: 'Name typically used to refer to the institute'
		// 		},
		// 		{
		// 			name: 'name3',
		// 			label: 'Name typically used to refer to the institute',
		// 			type: FormFieldType.text,
		// 			required: true,
		// 			value: this.org.identifiers[2],
		// 			width: '100%',
		// 			appearance: TextInputAppearance.outline,
		// 			ariaLabel: 'Name typically used to refer to the institute'
		// 		}
		// 	]
		// };
	}
	
    /**
     * Returns the addresses' content. 
     */
    private _initAddressesContent(): ContainerContent
    {
		return {};
	}

	/**
	 * Does the tasks for the operation action. 
	 * @param op The operation action. 
	 */
	public doOperationAction(op: OperationAction): void
	{
		console.log('panelFormSection', this.panelFormSection);
		console.log('addressesPanelFormSection', this.addressesPanelFormSection);
		console.log('labelsSimpleFaFormSection', this.labelsSimpleFaFormSection);
		return;

		if(op == OperationAction.submit)
		{
			//TODO: Do the tasks for the submit action. 
		}

		/* Currently, it does not do any task for the cancel action. */

		if(op != OperationAction.reset)
		{
			this._router.navigate(['../', { 'operation': op }]);
		}
	}

	/**
	 * Returns true if the reset action is disabled; otherwise, false. 
	 */
	public get isResetActionDisabled(): boolean
	{
		//TODO: Implement this.
		return false;
	}

	/**
	 * Returns true if the submit action is disabled; otherwise, false. 
	 */
	public get isSubmitActionDisabled(): boolean
	{
		return this.panelFormSection.invalid;
	}
}
