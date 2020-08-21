
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

import { Relationship, Identifier } from '@toco/tools/entities';

const relationshipsExample: any[] = [
	{
		"identifiers": [
			{
				"idtype": "isni",
				"value": "An id isni"
			}
		],
		"type": "parent"
	},
	{
		"identifiers": [
			{
				"idtype": "grid",
				"value": "An id grid"
			},
			{
				"idtype": "wkdata",
				"value": "An id wkdata"
			}
		],
		"type": "child",
		"label": "ulh"
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
	private relationships: Relationship[];

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
		this.relationships = relationshipsExample;
		console.log('Data got for editing: ', this.relationships);

		/* Creates the panel's content. */
		this.panelContent = this._initPanelContent_Test_TwoLevelsFormArray();
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
				this._initRelationshipsSimpleContent()
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
				//TODO: poner aquí otro nivel de `FormArray`. 
				this._initRelationshipsSimpleContent()
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
						this._initIdentifiersContent('Related Organization Identifiers', undefined, true),

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
