
import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup } from '@angular/forms';

import { Organization, Identifier } from '@toco/tools/entities';
import { TextInputAppearance, OperationAction, FormSection, PanelContent, 
	ContainerContent, HintValue, HintPosition, IconValue, IconSource, ContentPosition, 
	ActionControl, ActionContent, ContainerPanelComponent, 
	InputTextComponent, InputSelectComponent, ContainerSimpleComponent, 
	InputUrlComponent, InputEmailComponent, ActionButtonComponent } from '@toco/tools/forms';

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
	//@Input()
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
	}

    /**
     * Returns the panel's content.
     */
    private _initPanelContent(): PanelContent
    {
		return {
			'formSection': this.panelFormSection,
			'name': 'panel',
			'label': 'Edita la organización seleccionada',
			'controlType': ContainerPanelComponent,
			'description': '',
			'iconName': undefined /*''*/,
			'formSectionContent': [
				{
					'formControl': InputTextComponent.getFormControlByDefault(),
					'name': 'name',
					'label': 'Name typically used to refer to the institute',
					'controlType': InputTextComponent,
					'required': true,
					'value': this.org.name,
					'width': '100%',
					'appearance': TextInputAppearance.outline,
					'ariaLabel': 'Name typically used to refer to the institute'
				},
				{
					'formControl': InputSelectComponent.getFormControlByDefault(),
					'name': 'status',
					'label': 'Institute status',
					'controlType': InputSelectComponent,
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


				this._initIdentifiersContent('Organization Identifiers, different from GRID mapping', this.org.identifiers, false),

				{
					'formControl': InputSelectComponent.getFormControlByDefault(),
					'name': 'aliases',
					'label': 'The list of other names the institute is known as',
					'controlType': InputSelectComponent,
					'required': false,
					'value': this.org.aliases,
					'width': '100%',
					'appearance': TextInputAppearance.outline,
					'ariaLabel': 'The list of other names the institute is known as',
					/* The 'selectOptions' field is gotten from the 'value' field. */
					'multiple': true
				},
				{
					'formControl': InputSelectComponent.getFormControlByDefault(),
					'name': 'acronyms',
					'label': 'The of short acronyms the institute is known as (e.g. MRC for the Medical Research Council)',
					'controlType': InputSelectComponent,
					'required': false,
					'value': this.org.acronyms,
					'width': '100%',
					'appearance': TextInputAppearance.outline,
					'ariaLabel': 'The list of short acronyms the institute is known as (e.g. MRC for the Medical Research Council)',
					/* The 'selectOptions' field is gotten from the 'value' field. */
					'multiple': true
				},
				{
					'formControl': InputSelectComponent.getFormControlByDefault(),
					'name': 'types',
					'label': 'The list of types describing the institute',
					'controlType': InputSelectComponent,
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
					'formControl': InputUrlComponent.getFormControlByDefault(),
					'name': 'wikipedia_url',
					'label': 'URL of the wikipedia page for the institute',
					'controlType': InputUrlComponent,
					'required': false,
					'value': this.org.wikipedia_url,
					'width': '45%',
					'appearance': TextInputAppearance.outline,
					'ariaLabel': 'URL of the wikipedia page for the institute'
				},
				{
					'formControl': InputEmailComponent.getFormControlByDefault(),
					'name': 'email_address',
					'label': 'Contact email address for the institute',
					'controlType': InputEmailComponent,
					'required': true,
					'value': this.org.email_address,
					'width': '45%',
					'appearance': TextInputAppearance.outline,
					'ariaLabel': 'Contact email address for the institute'
				},
				{
					'formControl': InputSelectComponent.getFormControlByDefault(),
					'name': 'ip_addresses',
					'label': 'The list of IP addresses known to belong to the institute',
					'controlType': InputSelectComponent,
					'required': false,
					'value': this.org.ip_addresses,
					'width': '100%',
					'appearance': TextInputAppearance.outline,
					'ariaLabel': 'The list of IP addresses known to belong to the institute',
					/* The 'selectOptions' field is gotten from the 'value' field. */
					'multiple': true
				},
				{
					'formControl': InputTextComponent.getFormControlByDefault(),
					'name': 'established',
					'label': 'Year the institute opened, CE',
					'controlType': InputTextComponent,
					'required': true,
					'value': this.org.established,
					'width': '45%',
					'appearance': TextInputAppearance.outline,
					'ariaLabel': 'Year the institute opened, CE'
				},
				{
					'formControl': InputSelectComponent.getFormControlByDefault(),
					'name': 'links',
					'label': 'The list of URLs linking to things like the homepage for the institute',
					'controlType': InputSelectComponent,
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

    /**
     * Returns the identifiers' content. 
     */
    private _initIdentifiersContent(description: string, value: Identifier[], isDynamic: boolean): ContainerContent
    {
        let result: ContainerContent = {
			'formSection': ContainerSimpleComponent.getFormArrayByDefault(),
			'name': 'identifiers',
			'label': description,
			'controlType': ContainerSimpleComponent,
			'value': value,
			'width': '100%',
//            'appearance': TextInputAppearance.outline,
			'required': true,
			'ariaLabel': description,
			'isDynamic': isDynamic,
            'formSectionContent': [
				{
					'formSection': ContainerSimpleComponent.getFormGroupByDefault(),
					'name': '0',
					'label': 'Organization Identifier',
					'controlType': ContainerSimpleComponent,
					'width': '100%',
		//            'appearance': TextInputAppearance.outline,
					'ariaLabel': 'Organization Identifier',
					'formSectionContent': [
						{
							'formControl': InputTextComponent.getFormControlByDefault(),
							'name': 'idtype',
							'label': 'Identifier type',
							'controlType': InputTextComponent,
							'required': true,
							'width': '50%',
							'appearance': TextInputAppearance.outline,
							'ariaLabel': 'Identifier type',
						},
						{
							'formControl': InputTextComponent.getFormControlByDefault(),
							'name': 'value',
							'label': 'Identifier value',
							'controlType': InputTextComponent,
							'required': true,
							'width': '50%',
							'appearance': TextInputAppearance.outline,
							'ariaLabel': 'Identifier value',
							'startHint': new HintValue(HintPosition.start, 'Un identificador es una secuencia de letras')
						}
					]
				}
			]
		};

		if (isDynamic)
		{
			result.formSectionContent[0].formSectionContent.push(this._initRemoveButtonContent('Remove identifier'));
		}

		return result;
	}

    /**
     * Returns the labels' content. 
     */
    private _initLabelsSimpleContent(): ContainerContent
    {
		return {
			'formSection': ContainerSimpleComponent.getFormArrayByDefault(),
			'name': 'labels',
			'label': 'Name of the institute in different languages',
			'controlType': ContainerSimpleComponent,
			'value': this.org.labels,
			'width': '100%',
//            'appearance': TextInputAppearance.outline,
			'ariaLabel': 'Name of the institute in different languages',
			'formSectionContent': [
				{
					'formSection': ContainerSimpleComponent.getFormGroupByDefault(),
					'name': '0',
					'label': 'Label diff lang',
					'controlType': ContainerSimpleComponent,
					'width': '100%',
		//            'appearance': TextInputAppearance.outline,
					'ariaLabel': 'Label diff lang',
					'formSectionContent': [
						{
							'formControl': InputTextComponent.getFormControlByDefault(),
							'name': 'label',
							'label': 'Institute name in a language variant',
							'controlType': InputTextComponent,
							'required': true,
							/* 'value': undefined, this is the default behavior. */
							'width': '70%',
							'appearance': TextInputAppearance.outline,
							'ariaLabel': 'Institute name in a language variant'
						},
						{
							'formControl': InputTextComponent.getFormControlByDefault(),
							'name': 'iso639',
							'label': 'ISO-639-1 language code',
							'controlType': InputTextComponent,
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
			'formSection': ContainerSimpleComponent.getFormArrayByDefault(),
			'name': 'relationships',
			'label': 'Any relationships the institute has to others',
			'controlType': ContainerSimpleComponent,
			'value': this.org.relationships,
			'required': false,  /* The `relationships` can be empty by definition. */
			'width': '100%',
//            'appearance': TextInputAppearance.outline,
			'ariaLabel': 'Any relationships the institute has to others',
			'formSectionContent': [
				{
					'formSection': ContainerSimpleComponent.getFormGroupByDefault(),
					'name': '0',
					'label': 'Relationship',
					'controlType': ContainerSimpleComponent,
					'width': '100%',
		//            'appearance': TextInputAppearance.outline,
					'ariaLabel': 'Relationship',
					'formSectionContent': [

						/* This `identifiers` value is `undefined` because it is inside a `FormArray`. */
						this._initIdentifiersContent('Related Organization Identifiers', undefined, true),

						{
							'formControl': InputSelectComponent.getFormControlByDefault(),
							'name': 'type',
							'label': 'Relationship type',
							'controlType': InputSelectComponent,
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
							'formControl': InputTextComponent.getFormControlByDefault(),
							'name': 'label',
							'label': 'Name of the related institute',
							'controlType': InputTextComponent,
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
			'formSection': ContainerSimpleComponent.getFormArrayByDefault(),
			'name': 'addresses',
			'label': 'An array of addresses associated with the institute',
			'controlType': ContainerSimpleComponent,
			'value': this.org.addresses,
			'required': true,  /* The `addresses` can not be empty by definition. */
			'width': '100%',
//            'appearance': TextInputAppearance.outline,
			'ariaLabel': 'An array of addresses associated with the institute',
			'formSectionContent': [
				{
					'formSection': ContainerSimpleComponent.getFormGroupByDefault(),
					'name': '0',
					'label': 'Address',
					'controlType': ContainerSimpleComponent,
					'width': '100%',
		//            'appearance': TextInputAppearance.outline,
					'ariaLabel': 'Address',
					'formSectionContent': [
						{
							'formControl': InputTextComponent.getFormControlByDefault(),
							'name': 'city',
							'label': 'Name of the city',
							'controlType': InputTextComponent,
							'required': true,
							'width': '45%',
							'appearance': TextInputAppearance.outline,
							'ariaLabel': 'Name of the city'
						},
						{
							'formControl': InputTextComponent.getFormControlByDefault(),
							'name': 'country',
							'label': 'Name of the country',
							'controlType': InputTextComponent,
							'required': true,
							'width': '45%',
							'appearance': TextInputAppearance.outline,
							'ariaLabel': 'Name of the country'
						},
						{
							'formControl': InputTextComponent.getFormControlByDefault(),
							'name': 'country_code',
							'label': 'ISO 3166-1 alpha-2 code of the country',
							'controlType': InputTextComponent,
							'required': true,
							'width': '45%',
							'appearance': TextInputAppearance.outline,
							'ariaLabel': 'ISO 3166-1 alpha-2 code of the country'
						},
						{
							'formControl': InputTextComponent.getFormControlByDefault(),
							'name': 'lat',
							'label': 'Latitute of the institute',
							'controlType': InputTextComponent,
							'required': true,
							'width': '45%',
							'appearance': TextInputAppearance.outline,
							'ariaLabel': 'Latitute of the institute'
						},
						{
							'formControl': InputTextComponent.getFormControlByDefault(),
							'name': 'lng',
							'label': 'Longitude of the institute',
							'controlType': InputTextComponent,
							'required': true,
							'width': '45%',
							'appearance': TextInputAppearance.outline,
							'ariaLabel': 'Longitude of the institute'
						},
						{
							'formControl': InputTextComponent.getFormControlByDefault(),
							'name': 'line_1',
							'label': 'First line of the address',
							'controlType': InputTextComponent,
							'required': true,
							'width': '45%',
							'appearance': TextInputAppearance.outline,
							'ariaLabel': 'First line of the address'
						},
						{
							'formControl': InputTextComponent.getFormControlByDefault(),
							'name': 'line_2',
							'label': 'Second line of the address',
							'controlType': InputTextComponent,
							'required': false,
							'width': '45%',
							'appearance': TextInputAppearance.outline,
							'ariaLabel': 'Second line of the address'
						},
						{
							'formControl': InputTextComponent.getFormControlByDefault(),
							'name': 'line_3',
							'label': 'Third line of the address',
							'controlType': InputTextComponent,
							'required': false,
							'width': '45%',
							'appearance': TextInputAppearance.outline,
							'ariaLabel': 'Third line of the address'
						},
						{
							'formControl': InputTextComponent.getFormControlByDefault(),
							'name': 'postcode',
							'label': 'Postcode/zipcode',
							'controlType': InputTextComponent,
							'required': true,
							'width': '45%',
							'appearance': TextInputAppearance.outline,
							'ariaLabel': 'Postcode/zipcode'
						},

						//TODO: Poner aquí el campo 'primary' de tipo 'boolean' (checkbox).
						//This address identifies the main location

						{
							'formControl': InputTextComponent.getFormControlByDefault(),
							'name': 'state',
							'label': 'Name of the state/region',
							'controlType': InputTextComponent,
							'required': true,
							'width': '45%',
							'appearance': TextInputAppearance.outline,
							'ariaLabel': 'Name of the state/region'
						},
						{
							'formControl': InputTextComponent.getFormControlByDefault(),
							'name': 'state_code',
							'label': 'ISO 3166-2 region code',
							'controlType': InputTextComponent,
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
	 * Returns the remove button's content.
	 * @param tooltip The tooltip to show.
	 */
	private _initRemoveButtonContent(tooltip: string): ActionContent
	{
		return {
			'name': 'remove',
			'label': 'Remove',
			'controlType': ActionButtonComponent,
			'width': '30%',
			// 'appearance': TextInputAppearance.outline,
			'ariaLabel': 'Remove',
			'icon': new IconValue(IconSource.external, ContentPosition.prefix, 'remove_circle'),
			'tooltip': new HintValue(HintPosition.start, tooltip),
			'click': (sender: ActionControl): void => {
				sender.parentContainerControl.parentContainerControl.removeFromFormArray(+(sender.parentContainerControl.content.name));
			},
			'isDisabled': (sender: ActionControl): boolean => {
				return !(sender.parentContainerControl.parentContainerControl.canRemoveFromFormArray);
			}
		};
	}

	/**
	 * Does the tasks for the operation action.
	 * @param op The operation action.
	 */
	public doOperationAction(op: OperationAction): void
	{
		console.log('panelContent: ', this.panelContent);
		console.log('panelContent.parentFormSection: ', this.panelContent.parentFormSection);
		console.log('panelContent.formSection', this.panelContent.formSection);
		// console.log('addressesPanelFormSection', this.addressesPanelFormSection);
		// console.log('labelsSimpleFormSection', this.labelsSimpleFormSection);
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
