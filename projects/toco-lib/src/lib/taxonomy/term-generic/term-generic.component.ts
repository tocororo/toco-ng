/*
 *   Copyright (c) 2020 Universidad de Pinar del Río "Hermanos Saíz Montes de Oca"
 *   All rights reserved.
 */

import { Component, OnInit, Inject } from "@angular/core";
import { MAT_DIALOG_DATA } from "@angular/material/dialog";

import {
	PanelContent_Depr,
	FormFieldType,
	FormContainerAction,
	HintValue,
	HintPosition,
	InputContent,
	ActionContent
} from "../../forms/public-api";
import {
	Term,
	Vocabulary,
	TermInstitutionData,
	EntityBase,
	TermIndexData,
	VocabulariesInmutableNames
} from "../../entities/public-api";

import { FormBuilder, FormGroup } from "@angular/forms";
import { MatSnackBar } from "@angular/material/snack-bar";
import { FormFieldContent_Experimental } from '../../forms/experimental/form-field.control.experimental';

@Component({
	selector: "toco-term-generic",
	templateUrl: "./term-generic.component.html",
	styleUrls: ["./term-generic.component.scss"]
})
export class TermGenericComponent implements OnInit {
	public panels: PanelContent_Depr[] = [];
	public formGroup: FormGroup;
	public action: FormContainerAction;
	public actionLabel = "Adicionar";
	// term: Term;
	hasService = false;
	accept;
	vocab: Vocabulary;

	public constructor(
		private _formBuilder: FormBuilder,
		public _snackBar: MatSnackBar,
		@Inject(MAT_DIALOG_DATA) private data: any
	)
	{
		if (data.accept && data.currentVocab)
		{
			this.accept = data.accept;
			this.hasService = true;
			this.vocab = data.currentVocab;

			if (data.term)
			{
				this.actionLabel = "Actualizar";

				if (!this.data.term.data)
				{
					this.data.term.data = this._getTermDataObject();
				}
			}
			else
			{
				this.data.term = new Term();
				this.data.term.isNew = true;
				this.data.term.vocabulary_id = data.currentVocab.id;
			}
		}
	}

	public ngOnInit(): void
	{
		this.formGroup = this._formBuilder.group({});

		this.panels = [
			{
				title: "Término",
				description: "",
				iconName: "",
				formSection: this.formGroup,
				formSectionContent: this._getContent()
			}
		];

		this.action = {
			doit(data: any): void {
				if (this.formGroup.valid)
				{
					// get the result from formGroup
					const result = new Term();
					result.deepcopy(this.data.term);
					result.deepcopy(this.formGroup.value);
					result.data = this._getTermDataObject();
					result.data.deepcopy(this.formGroup.value);

					// Set the parent term, if any
					const parent = this.formGroup.value["parent_id"];
					if (parent && parent[0]) {
						result.parent_id = parent[0].id;
					} else {
						result.parent_id = null;
					}

					// if the term is an index, then set miar_class and group_mes
					// clasifications
					if (this.vocab.id == VocabulariesInmutableNames.INDEXES) {
						result.class_ids = [];

						const miar = this.formGroup.value["miar_class"];
						const mes = this.formGroup.value["group_mes"];

						if (miar && miar[0]) {
							result.class_ids.push(miar[0].id);
						}

						if (mes && mes[0]) {
							result.class_ids.push(mes[0].id);
						}
					}

					this.accept(result as Term);
				}
			}
		};
	}

    /**
     * Returns the panel's content.
     */
	private _getContent(): (InputContent | ActionContent | FormFieldContent_Experimental)[]
	{
		// TODO: use TermHelper
		switch (this.vocab.id) {
			case VocabulariesInmutableNames.CUBAN_INTITUTIONS:
				return [
					{
						name: "name",
						label: "Nombre",
						type: FormFieldType.text,
						required: true,
						value: this.data.term.name ? this.data.term.name : null,
						width: "100%"
					},
					{
						name: "grid",
						label: "Identificador GRID",
						type: FormFieldType.text,
						required: false,
						value: this.data.term.data.grid ? this.data.term.data.grid : null,
						width: "50%"
					},
					{
						name: "description",
						label: "Descripción",
						type: FormFieldType.textarea,
						required: false,
						value: this.data.term.description
							? this.data.term.description
							: null,
						width: "100%"
					},
					{
						name: "email",
						label: "Email",
						type: FormFieldType.email,
						required: true,
						value: this.data.term.data.email ? this.data.term.data.email : null,
						width: "45%"
					},
					{
						name: "website",
						label: "Sitio Web Oficial",
						type: FormFieldType.url,
						required: false,
						value: this.data.term.data.website
							? this.data.term.data.website
							: null,
						width: "45%"
					},
					{
						name: "address",
						label: "Dirección",
						type: FormFieldType.textarea,
						required: false,
						value: this.data.term.data.address
							? this.data.term.data.address
							: null,
						width: "100%"
					},
					{
						name: "parent_id",
						label: "Jerarquía Institucional (Institución Superior)",
						type: FormFieldType.vocabulary,
						required: false,
						extraContent: {
							multiple: false,
							selectedTermsIds: this.data.term.parent_id
								? [this.data.term.parent_id]
								: null,
							vocab: this.vocab.id
						},
						width: "100%"
					}
				];

			case VocabulariesInmutableNames.INDEXES:
				return [
					{
						name: "name",
						label: "Nombre",
						type: FormFieldType.text,
						required: true,
						value: this.data.term.name ? this.data.term.name : null,
						width: "100%"
					},
					{
						name: "url",
						label: "URL",
						type: FormFieldType.url,
						required: false,
						value: this.data.term.data.url ? this.data.term.data.url : null,
						width: "100%"
					},
					{
						name: "abrev",
						label: "Identificadores",
						type: FormFieldType.text,
						required: false,
						value: this.data.term.data.abrev ? this.data.term.data.abrev : null,
						width: "30%"
					},
					{
						name: "initial_cover",
						label: "Cobertura inicio",
						type: FormFieldType.text,
						required: false,
						value: this.data.term.data.initial_cover
							? this.data.term.data.initial_cover
							: null,
						width: "30%"
					},
					{
						name: "end_cover",
						label: "Cobertura",
						type: FormFieldType.text,
						required: false,
						value: this.data.term.data.end_cover
							? this.data.term.data.end_cover
							: null,
						width: "30%"
					},
					{
						name: "description",
						label: "Descripción",
						type: FormFieldType.textarea,
						required: false,
						value: this.data.term.description
							? this.data.term.description
							: null,
						width: "100%"
					},
					{
						name: "miar_class",
						label: "Tipología de sistemas de indización",
						type: FormFieldType.vocabulary,
						required: false,
						extraContent: {
							multiple: false,
							selectedTermsIds: this.data.term.class_ids
								? this.data.term.class_ids
								: null,
							vocab: VocabulariesInmutableNames.INDEXES_CLASIFICATION
						},
						width: "48%"
					},
					{
						name: "group_mes",
						label:
							"Grupos, Categorías según criterios de “calidad” de las publicaciones ",
						type: FormFieldType.vocabulary,
						startHint: new HintValue(HintPosition.start, ""),
						required: false,
						extraContent: {
							multiple: false,
							selectedTermsIds: this.data.term.class_ids
								? this.data.term.class_ids
								: null,
							vocab: VocabulariesInmutableNames.INDEXES_CLASIFICATION
						},
						width: "48%"
					}
				];

			default:
				return [
					{
						name: "name",
						label: "Nombre",
						type: FormFieldType.text,
						required: true,
						width: "100%",
						value: this.data.term.name ? this.data.term.name : null
					},
					{
						name: "description",
						label: "Descripción",
						type: FormFieldType.textarea,
						required: false,
						width: "100%",
						value: this.data.term.description
							? this.data.term.description
							: null
					},
					{
						name: "parent_id",
						label: "Término Padre",
						type: FormFieldType.vocabulary,
						startHint: new HintValue(HintPosition.start, ""),
						required: false,
						extraContent: {
							multiple: false,
							selectedTermsIds: this.data.term.parent_id
								? [this.data.term.parent_id]
								: null,
							vocab: this.vocab.id
						},
						width: "50%"
					}
				];
		}
	}

	private _getTermDataObject(): EntityBase
	{
		switch (this.vocab.id)
		{
			case VocabulariesInmutableNames.CUBAN_INTITUTIONS:
				return new TermInstitutionData();

			case VocabulariesInmutableNames.INDEXES:
				return new TermIndexData();

			default:
				return new EntityBase();
		}
	}
}
