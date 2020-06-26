
import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';

import { Organization } from '@toco/tools/entities';
import { PanelContent, InputContent, ActionContent, FormFieldType, TextInputAppearance } from '@toco/tools/forms';
import { FormFieldContent_Experimental } from '@toco/tools/forms/experimental/form-field.control.experimental';

@Component({
	selector: 'toco-org-edit',
	templateUrl: './org-edit.component.html',
	styleUrls: ['./org-edit.component.scss']
})
export class OrgEditComponent implements OnInit
{
	/**
	 * Represents an organization. 
	 */
	@Input()
	public org: Organization;

	public panels: PanelContent[];
	public formGroup: FormGroup;
	// public action: FormContainerAction;
	// public actionLabel: string;

	public constructor(private _formBuilder: FormBuilder)
	{ }

	public ngOnInit(): void
	{
		this.formGroup = this._formBuilder.group({});

		this.panels = [
			{
				title: "Edita organización",
				description: "",
				iconName: "",
				formGroup: this.formGroup,
				content: this._getContent()
			}
		];

		// this.action = {
		// 	doit(data: any): void
		// 	{
		// 		if (this.formGroup.valid)
		// 		{
		// 			/* Gets the result from `formGroup`. */
		// 			// const result: Organization = new Organization();
		// 			// result.load_from_data(this.formGroup.value);
		// 		}
		// 	}
		// };

		//this.actionLabel = "Adicionar";
	}

    /**
     * Returns the panel's content.
     */
	private _getContent(): (InputContent | ActionContent | FormFieldContent_Experimental)[]
	{
		console.log('org...:', this.org);
		
		return [
			{
				name: "name",
				label: "Name typically used to refer to the institute",
				type: FormFieldType.text,
				required: true,
				value: this.org.name,
				width: "100%",
				appearance: TextInputAppearance.outline,
				ariaLabel: "Name typically used to refer to the institute"
			},
			{
				name: 'status',
				label: 'Institute status',
				type: FormFieldType.select,
				required: true,
				value: this.org.status,
				width: '100%',
				appearance: TextInputAppearance.outline,
				ariaLabel: "Institute status",
				extraContent: {
					multiple: false,
					getOptions: () => {
						return [
							{
								label: 'Active',
								value: 'active'
							},
							{
								label: 'Closed',
								value: 'closed'
							},
							{
								label: 'Unknown',
								value: 'unknown'
							}
						];
					}
				}
			},
			{
				name: "wikipedia_url",
				label: "URL of the wikipedia page for the institute",
				type: FormFieldType.url,
				required: false,
				value: this.org.wikipedia_url,
				width: "45%",
				appearance: TextInputAppearance.outline,
				ariaLabel: "URL of the wikipedia page for the institute"
			},
			{
				name: "email_address",
				label: "Contact email address for the institute",
				type: FormFieldType.email,
				required: true,
				value: this.org.email_address,
				width: "45%",
				appearance: TextInputAppearance.outline,
				ariaLabel: "Contact email address for the institute"
			},
			// {
			// 	name: "description",
			// 	label: "Descripción",
			// 	type: FormFieldType.textarea,
			// 	required: false,
			// 	value: this.data.term.description
			// 		? this.data.term.description
			// 		: null,
			// 	width: "100%"
			// }
		];

			// case VocabulariesInmutableNames.DATABASES:
			// 	return [
			// 		{
			// 			name: "name",
			// 			label: "Nombre",
			// 			type: FormFieldType.text,
			// 			required: true,
			// 			value: this.data.term.name ? this.data.term.name : null,
			// 			width: "100%"
			// 		},
			// 		{
			// 			name: "url",
			// 			label: "URL",
			// 			type: FormFieldType.url,
			// 			required: false,
			// 			value: this.data.term.data.url ? this.data.term.data.url : null,
			// 			width: "100%"
			// 		},
			// 		{
			// 			name: "abrev",
			// 			label: "Identificadores",
			// 			type: FormFieldType.text,
			// 			required: false,
			// 			value: this.data.term.data.abrev ? this.data.term.data.abrev : null,
			// 			width: "30%"
			// 		},
			// 		{
			// 			name: "initial_cover",
			// 			label: "Cobertura inicio",
			// 			type: FormFieldType.text,
			// 			required: false,
			// 			value: this.data.term.data.initial_cover
			// 				? this.data.term.data.initial_cover
			// 				: null,
			// 			width: "30%"
			// 		},
			// 		{
			// 			name: "end_cover",
			// 			label: "Cobertura",
			// 			type: FormFieldType.text,
			// 			required: false,
			// 			value: this.data.term.data.end_cover
			// 				? this.data.term.data.end_cover
			// 				: null,
			// 			width: "30%"
			// 		},
			// 		{
			// 			name: "description",
			// 			label: "Descripción",
			// 			type: FormFieldType.textarea,
			// 			required: false,
			// 			value: this.data.term.description
			// 				? this.data.term.description
			// 				: null,
			// 			width: "100%"
			// 		},
			// 		{
			// 			name: "miar_class",
			// 			label: "Tipología de sistemas de indización",
			// 			type: FormFieldType.vocabulary,
			// 			required: false,
			// 			extraContent: {
			// 				multiple: false,
			// 				selectedTermsIds: this.data.term.class_ids
			// 					? this.data.term.class_ids
			// 					: null,
			// 				vocab: VocabulariesInmutableNames.MIAR_TYPES
			// 			},
			// 			width: "48%"
			// 		},
			// 		{
			// 			name: "group_mes",
			// 			label:
			// 				"Grupos, Categorías según criterios de “calidad” de las publicaciones ",
			// 			type: FormFieldType.vocabulary,
			// 			startHint: new HintValue(HintPosition.start, ""),
			// 			required: false,
			// 			extraContent: {
			// 				multiple: false,
			// 				selectedTermsIds: this.data.term.class_ids
			// 					? this.data.term.class_ids
			// 					: null,
			// 				vocab: VocabulariesInmutableNames.MES_GROUPS
			// 			},
			// 			width: "48%"
			// 		}
			// 	];

			// default:
			// 	return [
			// 		{
			// 			name: "name",
			// 			label: "Nombre",
			// 			type: FormFieldType.text,
			// 			required: true,
			// 			width: "100%",
			// 			value: this.data.term.name ? this.data.term.name : null
			// 		},
			// 		{
			// 			name: "description",
			// 			label: "Descripción",
			// 			type: FormFieldType.textarea,
			// 			required: false,
			// 			width: "100%",
			// 			value: this.data.term.description
			// 				? this.data.term.description
			// 				: null
			// 		},
			// 		{
			// 			name: "parent_id",
			// 			label: "Término Padre",
			// 			type: FormFieldType.vocabulary,
			// 			startHint: new HintValue(HintPosition.start, ""),
			// 			required: false,
			// 			extraContent: {
			// 				multiple: false,
			// 				selectedTermsIds: this.data.term.parent_id
			// 					? [this.data.term.parent_id]
			// 					: null,
			// 				vocab: this.vocab.id
			// 			},
			// 			width: "50%"
			// 		}
			// 	];
	}

	// public doAction(): void
	// { }
}
