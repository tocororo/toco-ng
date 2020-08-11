
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormArray } from '@angular/forms';

import { Organization } from '@toco/tools/entities';
import { FormFieldType, TextInputAppearance, OperationAction, FormSection, PanelContent, 
	ContainerContent, HintValue, HintPosition, IconValue, IconSource, ContentPosition, 
	ActionControl, ActionContent } from '@toco/tools/forms';

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

	public constructor(private _router: Router, private _activatedRoute: ActivatedRoute)
	{
		this.operationAction = OperationAction;
		this.panelFormSection = new FormGroup({ }, [ ]);
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

				this._initIdentifiersContent('Organization Identifiers, different from GRID mapping'),

				{
					'name': 'aliases',
					'label': 'The list of other names the institute is known as',
					'type': FormFieldType.select,
					'required': false,
					'value': this.org.aliases,
					'width': '100%',
					'appearance': TextInputAppearance.outline,
					'ariaLabel': 'The list of other names the institute is known as',
					/* The 'selectOptions' field is gotten from the 'value' field. */
					'multiple': true
				},
				{
					'name': 'acronyms',
					'label': 'The of short acronyms the institute is known as (e.g. MRC for the Medical Research Council)',
					'type': FormFieldType.select,
					'required': false,
					'value': this.org.acronyms,
					'width': '100%',
					'appearance': TextInputAppearance.outline,
					'ariaLabel': 'The list of short acronyms the institute is known as (e.g. MRC for the Medical Research Council)',
					/* The 'selectOptions' field is gotten from the 'value' field. */
					'multiple': true
				},
				{
					'name': 'types',
					'label': 'The list of types describing the institute',
					'type': FormFieldType.select,
					'required': true,
					'value': this.org.types,
					'width': '100%',
					'appearance': TextInputAppearance.outline,
					'ariaLabel': 'The list of types describing the institute',
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
					'label': 'The list of IP addresses known to belong to the institute',
					'type': FormFieldType.select,
					'required': false,
					'value': this.org.ip_addresses,
					'width': '100%',
					'appearance': TextInputAppearance.outline,
					'ariaLabel': 'The list of IP addresses known to belong to the institute',
					/* The 'selectOptions' field is gotten from the 'value' field. */
					'multiple': true
				},
				{
					'name': 'established',
					'label': 'Year the institute opened, CE',
					'type': FormFieldType.text,
					'required': true,
					'value': this.org.established,
					'width': '45%',
					'appearance': TextInputAppearance.outline,
					'ariaLabel': 'Year the institute opened, CE'
				},
				{
					'name': 'links',
					'label': 'The list of URLs linking to things like the homepage for the institute',
					'type': FormFieldType.select,
					'required': false,
					'value': this.org.links,
					'width': '100%',
					'appearance': TextInputAppearance.outline,
					'ariaLabel': 'The list of URLs linking to things like the homepage for the institute',
					/* The 'selectOptions' field is gotten from the 'value' field. */
					'multiple': true
				},

				this._initLabelsSimpleContent(),

				this._initRelationshipsSimpleContent(),

				this._initAddressesSimpleContent()
			]
		};
	}

    private _initLabelsSimpleContent(): ContainerContent
    {
		return {
			'formSection': new FormArray([ ], [ ]),
			'name': 'labelsSimple',
			'label': 'Name of the institute in different languages',
			'type': FormFieldType.container_simple,
			'value': this.org.labels,
			'width': '100%',
			'formSectionContent': [
				{
					'formSection': new FormGroup({ }, [ ]),
					'name': '0',
					'label': 'Label diff lang ',
					'type': FormFieldType.container_label_diff_lang,
					'required': true,
					'width': '100%',
		//            'appearance': TextInputAppearance.outline,
					'ariaLabel': 'Label diff lang ',
					'formSectionContent': [
						{
							'name': 'label',
							'label': 'Institute name in a language variant',
							'type': FormFieldType.text,
							'required': true,
							/* 'value': undefined, this is the default behavior. */
							'width': '70%',
							'appearance': TextInputAppearance.outline,
							'ariaLabel': 'Institute name in a language variant'
						},
						{
							'name': 'iso639',
							'label': 'ISO-639-1 language code',
							'type': FormFieldType.text,
							'required': true,
							/* 'value': undefined, this is the default behavior. */
							'width': '30%',
							'appearance': TextInputAppearance.outline,
							'ariaLabel': 'ISO-639-1 language code',
							//'startHint': new HintValue(HintPosition.start, 'ISO-639-1 language code')
						},

						this._initRemoveButtonContent('Remove label')
					]
				}
			]
		};
	}

    /**
     * Returns the relationships' content. 
     */
    private _initRelationshipsSimpleContent(): ContainerContent
    {
		return {
			'formSection': new FormArray([ ], [ ]),
			'name': 'relationshipsSimple',
			'label': 'Any relationships the institute has to others',
			'type': FormFieldType.container_simple,
			'value': this.org.relationships,
			'width': '100%',
			'formSectionContent': [
				{
					'formSection': new FormGroup({ }, [ ]),
					'name': '0',
					'label': 'Relationship',
					'type': FormFieldType.container_label_diff_lang,
					'required': true,
					'width': '100%',
		//            'appearance': TextInputAppearance.outline,
					'ariaLabel': 'Relationship',
					'formSectionContent': [

						this._initIdentifiersContent('Related Organization Identifiers'),

						{
							'name': 'type',
							'label': 'Relationship type',
							'type': FormFieldType.select,
							'required': true,
							'width': '45%',
							'appearance': TextInputAppearance.outline,
							'ariaLabel': 'Relationship type',
							'selectOptions': [
								{
									'label': 'Parent',
									'value': 'parent'
								},
								{
									'label': 'Related',
									'value': 'related'
								},
								{
									'label': 'Child',
									'value': 'child'
								}
							],
							'multiple': false
						},
						{
							'name': 'label',
							'label': 'Name of the related institute',
							'type': FormFieldType.text,
							'required': true,
							'width': '45%',
							'appearance': TextInputAppearance.outline,
							'ariaLabel': 'Name of the related institute'
						},

						this._initRemoveButtonContent('Remove relationship')
					]
				}
			]
		};
	}

    /**
     * Returns the addresses' content. 
     */
    private _initAddressesSimpleContent(): ContainerContent
    {
		return {
			'formSection': new FormArray([ ], [ ]),
			'name': 'addressesSimple',
			'label': 'An array of addresses associated with the institute',
			'type': FormFieldType.container_simple,
			'value': this.org.addresses,
			'width': '100%',
			'formSectionContent': [
				{
					'formSection': new FormGroup({ }, [ ]),
					'name': '0',
					'label': 'Address',
					'type': FormFieldType.container_label_diff_lang,
					'required': true,
					'width': '100%',
		//            'appearance': TextInputAppearance.outline,
					'ariaLabel': 'Address',
					'formSectionContent': [
						{
							'name': 'city',
							'label': 'Name of the city',
							'type': FormFieldType.text,
							'required': true,
							'width': '45%',
							'appearance': TextInputAppearance.outline,
							'ariaLabel': 'Name of the city'
						},
						{
							'name': 'country',
							'label': 'Name of the country',
							'type': FormFieldType.text,
							'required': true,
							'width': '45%',
							'appearance': TextInputAppearance.outline,
							'ariaLabel': 'Name of the country'
						},
						{
							'name': 'country_code',
							'label': 'ISO 3166-1 alpha-2 code of the country',
							'type': FormFieldType.text,
							'required': true,
							'width': '45%',
							'appearance': TextInputAppearance.outline,
							'ariaLabel': 'ISO 3166-1 alpha-2 code of the country'
						},
						{
							'name': 'lat',
							'label': 'Latitute of the institute',
							'type': FormFieldType.text,
							'required': true,
							'width': '45%',
							'appearance': TextInputAppearance.outline,
							'ariaLabel': 'Latitute of the institute'
						},
						{
							'name': 'lng',
							'label': 'Longitude of the institute',
							'type': FormFieldType.text,
							'required': true,
							'width': '45%',
							'appearance': TextInputAppearance.outline,
							'ariaLabel': 'Longitude of the institute'
						},
						{
							'name': 'line_1',
							'label': 'First line of the address',
							'type': FormFieldType.text,
							'required': true,
							'width': '45%',
							'appearance': TextInputAppearance.outline,
							'ariaLabel': 'First line of the address'
						},
						{
							'name': 'line_2',
							'label': 'Second line of the address',
							'type': FormFieldType.text,
							'required': false,
							'width': '45%',
							'appearance': TextInputAppearance.outline,
							'ariaLabel': 'Second line of the address'
						},
						{
							'name': 'line_3',
							'label': 'Third line of the address',
							'type': FormFieldType.text,
							'required': false,
							'width': '45%',
							'appearance': TextInputAppearance.outline,
							'ariaLabel': 'Third line of the address'
						},
						{
							'name': 'postcode',
							'label': 'Postcode/zipcode',
							'type': FormFieldType.text,
							'required': true,
							'width': '45%',
							'appearance': TextInputAppearance.outline,
							'ariaLabel': 'Postcode/zipcode'
						},

						//TODO: Poner aquí el campo 'primary' de tipo 'boolean' (checkbox). 
						//This address identifies the main location

						{
							'name': 'state',
							'label': 'Name of the state/region',
							'type': FormFieldType.text,
							'required': true,
							'width': '45%',
							'appearance': TextInputAppearance.outline,
							'ariaLabel': 'Name of the state/region'
						},
						{
							'name': 'state_code',
							'label': 'ISO 3166-2 region code',
							'type': FormFieldType.text,
							'required': true,
							'width': '45%',
							'appearance': TextInputAppearance.outline,
							'ariaLabel': 'ISO 3166-2 region code'
						},

						//TODO: Poner el resto de los campos. 

						this._initRemoveButtonContent('Remove address')
					]
				}
			]
		};
	}

    /**
     * Returns the identifiers' content. 
     */
    private _initIdentifiersContent(description: string): ContainerContent
    {
        return {
            'formSection': new FormGroup({ }, [ ]),
            'name': 'identifiers',
            'label': description,
            'type': FormFieldType.container_simple,
            'required': true,
            'width': '100%',
//            'appearance': TextInputAppearance.outline,
            'ariaLabel': description,
            'formSectionContent': [
                {
                    'name': 'isni',   //idtype
                    'label': 'isni',  //idtype
                    'type': FormFieldType.identifier,
                    'required': true,
                    'value': 'Un_id_isni',
                    'width': '50%',
                    'appearance': TextInputAppearance.outline,
                    'ariaLabel': 'Identificador isni',
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
                    'ariaLabel': 'Identificador grid',
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
	 * Returns the remove button's content. 
	 * @param tooltip The tooltip to show. 
	 */
	private _initRemoveButtonContent(tooltip: string): ActionContent
	{
		return {
			'label': 'Remove',
			'type': FormFieldType.action_button,
			'width': '30%',
			// 'appearance': TextInputAppearance.outline,
			'ariaLabel': 'Remove',
			'icon': new IconValue(IconSource.external, ContentPosition.prefix, 'remove_circle'),
			'tooltip': new HintValue(HintPosition.start, tooltip),
			'click': (sender: ActionControl): void => {
				sender.parentContainerControl.parentContainerControl.removeFromFormArray(+(sender.parentContainerControl.content.name));
			}
		};
	}

	/**
	 * Does the tasks for the operation action. 
	 * @param op The operation action. 
	 */
	public doOperationAction(op: OperationAction): void
	{
		// console.log('panelFormSection', this.panelFormSection);
		// console.log('addressesPanelFormSection', this.addressesPanelFormSection);
		// console.log('labelsSimpleFormSection', this.labelsSimpleFormSection);
		// return;

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
