
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormArray } from '@angular/forms';

import { FormFieldType, FormSection, HintValue, HintPosition, IconValue, IconSource, ContentPosition } from '../../../form-field.control';
import { TextInputAppearance } from '../../../input/input.control';
import { ContainerContent } from '../../../container/container.control';
import { ActionControl, ActionContent } from '../../../action/action.control';
import { PanelContent, ContainerPanelComponent } from '../../../container/panel/panel-container.component';
import { ContainerSimpleComponent } from '../../../container/simple/simple-container.component';
import { InputTextComponent } from '../../../input/text/text-input.component';
import { InputSelectComponent } from '../../../input/select/select-input.component';
import { ActionButtonComponent } from '../../../action/button/button-action.component';

import { Identifier } from '@toco/tools/entities';

const relationshipsExample_TwoLevelsFormArray: any[] = [
	{
		'identifiers': [
			{
				'idtype': 'isni',
				'value': 'An id isni'
			}
		],
		'type': 'parent'
	},
	{
		'identifiers': [
			{
				'idtype': 'grid',
				'value': 'An id grid'
			},
			{
				'idtype': 'wkdata',
				'value': 'An id wkdata'
			}
		],
		'type': 'child',
		'label': 'ulh'
	}
];

const relationshipsExample_ThreeLevelsFormArray: any[] = [
	{
		'firstIdentifiers': [
			{
				'secondIdentifiers': [
					{
						'nd_idtype': '1',
						'nd_value': '2'
					}
				],
				'st_idtype': 'isni',
				'st_value': 'An id isni'
			}
		],
		'type': 'parent'
	},
	{
		'firstIdentifiers': [
			{
				'secondIdentifiers': [
					{
						'nd_idtype': '3',
						'nd_value': '4'
					},
					{
						'nd_idtype': '5',
						'nd_value': '6'
					}
				],
				'st_idtype': 'grid',
				'st_value': 'An id grid'
			},
			{
				'secondIdentifiers': [
					{
						'nd_idtype': '7',
						'nd_value': '8'
					},
				],
				'st_idtype': 'wkdata',
				'st_value': 'An id wkdata'
			}
		],
		'type': 'child',
		'label': 'ulh'
	}
];

@Component({
	selector: 'test-container-control',
	templateUrl: './test-container-control.component.html',
	styleUrls: ['./test-container-control.component.scss']
})
export class TestContainerControlComponent implements OnInit
{
	/**
	 * Represents the current relationships. 
	 */
	private relationships: any[];

	/**
	 * Tracks the value and validity state of the internal child controls that contains this component. 
	 */
    private panelFormSection: FormSection;

    /**
     * Contains the panel's content. 
     */
	public panelContent: PanelContent;

	public constructor()
	{
		this.panelFormSection = new FormGroup({ }, [ ]);
	}

	public ngOnInit(): void
	{
		this._Test_00();

//		this._Test_01();
	}

	private _Test_00(): void
	{
		this.relationships = relationshipsExample_TwoLevelsFormArray;
		console.log("Data got for editing (two levels of 'FormArray'): ", this.relationships);

		/* Creates the panel's content. */
		this.panelContent = this._initPanelContent_Test_TwoLevelsFormArray();
	}

	private _Test_01(): void
	{
		this.relationships = relationshipsExample_ThreeLevelsFormArray;
		console.log("Data got for editing (three levels of 'FormArray'): ", this.relationships);

		/* Creates the panel's content. */
		this.panelContent = this._initPanelContent_Test_ThreeLevelsFormArray();
	}

    /**
     * Returns the panel's content for testing two levels of `FormArray`. 
     */
    private _initPanelContent_Test_TwoLevelsFormArray(): PanelContent
    {
		return {
			/* The 'label' and 'title' fields have the same values, but they are different fields with different functionalities. */
			'formSection': this.panelFormSection,
			'name': 'panel',
			'label': 'Edita la organización seleccionada',
			'type': FormFieldType.container_panel,
			'componentType': ContainerPanelComponent,
			'title': 'Edita la organización seleccionada',
			'description': '',
			'iconName': undefined /*''*/,
			'formSectionContent': [
				this._initRelationshipsSimpleContent(
					/* This `identifiers` value is `undefined` because it is inside a `FormArray`. */
					this._initIdentifiersContent('Related Organization Identifiers', undefined, true)
				)
			]
		};
	}

    /**
     * Returns the panel's content for testing three levels of `FormArray`. 
     */
    private _initPanelContent_Test_ThreeLevelsFormArray(): PanelContent
    {
		return {
			/* The 'label' and 'title' fields have the same values, but they are different fields with different functionalities. */
			'formSection': this.panelFormSection,
			'name': 'panel',
			'label': 'Edita la organización seleccionada',
			'type': FormFieldType.container_panel,
			'componentType': ContainerPanelComponent,
			'title': 'Edita la organización seleccionada',
			'description': '',
			'iconName': undefined /*''*/,
			'formSectionContent': [
				this._initRelationshipsSimpleContent(
					/* The `firstIdentifiers` and `secondIdentifiers` fields are `undefined` because they are inside a `FormArray`. */
					this._initFirstIdentifiersContent()
				)
			]
		};
	}

    /**
     * Returns the relationships' content. 
     */
    private _initRelationshipsSimpleContent(identifiersContent: ContainerContent): ContainerContent
    {
		return {
			'formSection': new FormArray([ ], [ ]),
			'name': 'relationships',
			'label': 'Any relationships the institute has to others',
			'type': FormFieldType.container_simple,
			'componentType': ContainerSimpleComponent,
			'value': this.relationships,
			'required': false,  /* The `relationships` can be empty by definition. */
			'width': '100%',
//            'appearance': TextInputAppearance.outline,
			'ariaLabel': 'Any relationships the institute has to others',
			'formSectionContent': [
				{
					'formSection': new FormGroup({ }, [ ]),
					'name': '0',
					'label': 'Relationship',
					'type': FormFieldType.container_simple,
					'componentType': ContainerSimpleComponent,
					'width': '100%',
		//            'appearance': TextInputAppearance.outline,
					'ariaLabel': 'Relationship',
					'formSectionContent': [

						/* This `identifiers` value is `undefined` because it is inside a `FormArray`. */
						identifiersContent,

						{
							'name': 'type',
							'label': 'Relationship type',
							'type': FormFieldType.select,
							'componentType': InputSelectComponent,
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
							'componentType': InputTextComponent,
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
     * Returns the identifiers' content. 
     */
    private _initIdentifiersContent(description: string, value: Identifier[], isDynamic: boolean): ContainerContent
    {
        let result: ContainerContent = {
			'formSection': new FormArray([ ], [ ]),
			'name': 'identifiers',
			'label': description,
			'type': FormFieldType.container_simple,
			'componentType': ContainerSimpleComponent,
			'value': value,
			'width': '100%',
//            'appearance': TextInputAppearance.outline,
			'required': true,
			'ariaLabel': description,
			'isDynamic': isDynamic,
            'formSectionContent': [
				{
					'formSection': new FormGroup({ }, [ ]),
					'name': '0',
					'label': 'Organization Identifier',
					'type': FormFieldType.container_simple,
					'componentType': ContainerSimpleComponent,
					'width': '100%',
		//            'appearance': TextInputAppearance.outline,
					'ariaLabel': 'Organization Identifier',
					'formSectionContent': [
						{
							'name': 'idtype',
							'label': 'Identifier type',
							'type': FormFieldType.text,
							'componentType': InputTextComponent,
							'required': true,
							'width': '50%',
							'appearance': TextInputAppearance.outline,
							'ariaLabel': 'Identifier type',
						},
						{
							'name': 'value',
							'label': 'Identifier value',
							'type': FormFieldType.text,
							'componentType': InputTextComponent,
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
     * Returns the first identifiers' content. 
     */
    private _initFirstIdentifiersContent(): ContainerContent
    {
        return {
			'formSection': new FormArray([ ], [ ]),
			'name': 'firstIdentifiers',
			'label': 'First Identifiers',
			'type': FormFieldType.container_simple,
			'componentType': ContainerSimpleComponent,
			'value': undefined,  /* It is `undefined` because it does not belong to a topmost `FormArray`. */
			'width': '100%',
//            'appearance': TextInputAppearance.outline,
			'required': true,
			'ariaLabel': 'First Identifiers',
            'formSectionContent': [
				{
					'formSection': new FormGroup({ }, [ ]),
					'name': '0',
					'label': 'Organization First Identifier',
					'type': FormFieldType.container_simple,
					'componentType': ContainerSimpleComponent,
					'width': '100%',
		//            'appearance': TextInputAppearance.outline,
					'ariaLabel': 'Organization First Identifier',
					'formSectionContent': [

						this._initSecondIdentifiersContent(),

						{
							'name': 'st_idtype',
							'label': 'First Identifier type',
							'type': FormFieldType.text,
							'componentType': InputTextComponent,
							'required': true,
							'width': '50%',
							'appearance': TextInputAppearance.outline,
							'ariaLabel': 'First Identifier type',
						},
						{
							'name': 'st_value',
							'label': 'First Identifier value',
							'type': FormFieldType.text,
							'componentType': InputTextComponent,
							'required': true,
							'width': '50%',
							'appearance': TextInputAppearance.outline,
							'ariaLabel': 'First Identifier value',
						},

						this._initRemoveButtonContent('Remove First Identifiers')
					]
				}
			]
		};
	}

    /**
     * Returns the second identifiers' content. 
     */
    private _initSecondIdentifiersContent(): ContainerContent
    {
        return {
			'formSection': new FormArray([ ], [ ]),
			'name': 'secondIdentifiers',
			'label': 'Second Identifiers',
			'type': FormFieldType.container_simple,
			'componentType': ContainerSimpleComponent,
			'value': undefined,  /* It is `undefined` because it does not belong to a topmost `FormArray`. */
			'width': '100%',
//            'appearance': TextInputAppearance.outline,
			'required': true,
			'ariaLabel': 'Second Identifiers',
            'formSectionContent': [
				{
					'formSection': new FormGroup({ }, [ ]),
					'name': '0',
					'label': 'Organization Second Identifier',
					'type': FormFieldType.container_simple,
					'componentType': ContainerSimpleComponent,
					'width': '100%',
		//            'appearance': TextInputAppearance.outline,
					'ariaLabel': 'Organization Second Identifier',
					'formSectionContent': [
						{
							'name': 'nd_idtype',
							'label': 'Second Identifier type',
							'type': FormFieldType.text,
							'componentType': InputTextComponent,
							'required': true,
							'width': '50%',
							'appearance': TextInputAppearance.outline,
							'ariaLabel': 'Second Identifier type',
						},
						{
							'name': 'nd_value',
							'label': 'Second Identifier value',
							'type': FormFieldType.text,
							'componentType': InputTextComponent,
							'required': true,
							'width': '50%',
							'appearance': TextInputAppearance.outline,
							'ariaLabel': 'Second Identifier value',
						},

						this._initRemoveButtonContent('Remove Second Identifiers')
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
			'label': 'Remove',
			'type': FormFieldType.action_button,
			'componentType': ActionButtonComponent,
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
	 * Does the tasks. 
	 */
	public doOperationAction(): void
	{
		console.log('panelContent: ', this.panelContent);
		console.log('panelContent.parentFormSection: ', this.panelContent.parentFormSection);
		console.log('panelContent.formSection', this.panelContent.formSection);
	}
}
