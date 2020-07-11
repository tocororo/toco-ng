
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup } from '@angular/forms';

import { Organization } from '@toco/tools/entities';
import { PanelContent_Depr, FormFieldType, TextInputAppearance, OperationAction, FormSection } from '@toco/tools/forms';

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
	 * Tracks the value and validity state of the internal child controls that contains the `toco-form-container` control. 
	 */
    private formSection: FormSection;

	/**
	 * Represents the current organization. 
	 */
	public org: Organization;

	public panelsContent: PanelContent_Depr[];
	// public action: FormContainerAction;
	// public actionLabel: string;

	public constructor(private _router: Router, private _activatedRoute: ActivatedRoute)
	{
		this.operationAction = OperationAction;
		this.formSection = new FormGroup({ }, [ ]);
	}

	public ngOnInit(): void
	{
		/* Gets the `Organization` data. */
		this._activatedRoute.data.subscribe(
			(data: { 'org': Organization }) => {
				this.org = data.org;

				console.log(this.org);
			}
		)

		/* Creates the controls. */
		this.panelsContent = [
			{
				'formSection' : this.formSection,
				'title': 'Edita la organización seleccionada',
				'description': '',
				'iconName': '',
				'formSectionContent': this._getContent()
			}
		];

		// this.action = {
		// 	doit(data: any): void
		// 	{
		// 		if (this.formSection.valid)
		// 		{
		// 			/* Gets the result from `formSection`. */
		// 			// const result: Organization = new Organization();
		// 			// result.load_from_data(this.formSection.value);
		// 		}
		// 	}
		// };

		//this.actionLabel = 'Adicionar';
	}

    /**
     * Returns the panel's content. 
     */
	private _getContent(): any[]
	{
		return [
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
				'extraContent': {
					'multiple': false,
					'getOptions': () => {
						return [
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
						];
					}
				}
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


			// {
			// 	name: 'identifiers',
			// 	label: 'Organization Identifiers, different from GRID mapping',
			// 	type: FormFieldType.identifiers,
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
			// },


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
		];

			// case VocabulariesInmutableNames.DATABASES:
			// 	return [
			// 		{
			// 			name: 'name',
			// 			label: 'Nombre',
			// 			type: FormFieldType.text,
			// 			required: true,
			// 			value: this.data.term.name ? this.data.term.name : null,
			// 			width: '100%'
			// 		},
			// 		{
			// 			name: 'url',
			// 			label: 'URL',
			// 			type: FormFieldType.url,
			// 			required: false,
			// 			value: this.data.term.data.url ? this.data.term.data.url : null,
			// 			width: '100%'
			// 		},
			// 		{
			// 			name: 'abrev',
			// 			label: 'Identificadores',
			// 			type: FormFieldType.text,
			// 			required: false,
			// 			value: this.data.term.data.abrev ? this.data.term.data.abrev : null,
			// 			width: '30%'
			// 		},
			// 		{
			// 			name: 'initial_cover',
			// 			label: 'Cobertura inicio',
			// 			type: FormFieldType.text,
			// 			required: false,
			// 			value: this.data.term.data.initial_cover
			// 				? this.data.term.data.initial_cover
			// 				: null,
			// 			width: '30%'
			// 		},
			// 		{
			// 			name: 'end_cover',
			// 			label: 'Cobertura',
			// 			type: FormFieldType.text,
			// 			required: false,
			// 			value: this.data.term.data.end_cover
			// 				? this.data.term.data.end_cover
			// 				: null,
			// 			width: '30%'
			// 		},
			// 		{
			// 			name: 'description',
			// 			label: 'Descripción',
			// 			type: FormFieldType.textarea,
			// 			required: false,
			// 			value: this.data.term.description
			// 				? this.data.term.description
			// 				: null,
			// 			width: '100%'
			// 		},
			// 		{
			// 			name: 'miar_class',
			// 			label: 'Tipología de sistemas de indización',
			// 			type: FormFieldType.vocabulary,
			// 			required: false,
			// 			extraContent: {
			// 				multiple: false,
			// 				selectedTermsIds: this.data.term.class_ids
			// 					? this.data.term.class_ids
			// 					: null,
			// 				vocab: VocabulariesInmutableNames.MIAR_TYPES
			// 			},
			// 			width: '48%'
			// 		},
			// 		{
			// 			name: 'group_mes',
			// 			label:
			// 				'Grupos, Categorías según criterios de “calidad” de las publicaciones ',
			// 			type: FormFieldType.vocabulary,
			// 			startHint: new HintValue(HintPosition.start, ''),
			// 			required: false,
			// 			extraContent: {
			// 				multiple: false,
			// 				selectedTermsIds: this.data.term.class_ids
			// 					? this.data.term.class_ids
			// 					: null,
			// 				vocab: VocabulariesInmutableNames.MES_GROUPS
			// 			},
			// 			width: '48%'
			// 		}
			// 	];

			// default:
			// 	return [
			// 		{
			// 			name: 'name',
			// 			label: 'Nombre',
			// 			type: FormFieldType.text,
			// 			required: true,
			// 			width: '100%',
			// 			value: this.data.term.name ? this.data.term.name : null
			// 		},
			// 		{
			// 			name: 'description',
			// 			label: 'Descripción',
			// 			type: FormFieldType.textarea,
			// 			required: false,
			// 			width: '100%',
			// 			value: this.data.term.description
			// 				? this.data.term.description
			// 				: null
			// 		},
			// 		{
			// 			name: 'parent_id',
			// 			label: 'Término Padre',
			// 			type: FormFieldType.vocabulary,
			// 			startHint: new HintValue(HintPosition.start, ''),
			// 			required: false,
			// 			extraContent: {
			// 				multiple: false,
			// 				selectedTermsIds: this.data.term.parent_id
			// 					? [this.data.term.parent_id]
			// 					: null,
			// 				vocab: this.vocab.id
			// 			},
			// 			width: '50%'
			// 		}
			// 	];
	}

	/**
	 * Does the tasks for the operation action. 
	 * @param op The operation action. 
	 */
	public doOperationAction(op: OperationAction): void
	{
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
		return this.formSection.invalid;
	}
}
