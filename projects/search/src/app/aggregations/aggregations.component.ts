/*
 *   Copyright (c) 2020 Universidad de Pinar del Río "Hermanos Saíz Montes de Oca"
 *   All rights reserved.
 */

import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';

import { EnvService } from '@tocoenv/tools/env.service';

import { TermNode, VocabulariesInmutableNames, Source } from '@toco/tools/entities';
import { PanelContent_Depr, FormFieldType, SelectOption } from '@toco/tools/forms';
import { TaxonomyService, SourceService } from '@toco/tools/backend';

@Component({
	selector: 'app-search-aggregations',
	templateUrl: './aggregations.component.html',
	styleUrls: ['./aggregations.component.scss']
})
export class AggregationsComponent implements OnInit {

	panels: PanelContent_Depr[] = null;
	formGroup: FormGroup;

	organismoUUID = '';

	constructor(
		private taxonomyService: TaxonomyService,
		private sourceService: SourceService,
		private envService: EnvService,
		private _formBuilder: FormBuilder,
	) {
		if (envService.extraArgs && envService.extraArgs['organismoUUID']) {
			this.organismoUUID = envService.extraArgs['organismoUUID'];
		}
	}

	ngOnInit() {
		this.formGroup = this._formBuilder.group({
			approved: new FormControl(true),
			asc: new FormControl(true),
		});

		this.formGroup.valueChanges.subscribe(
			(values) => {
				console.log(values);
			},
			(err: any) => {
				console.log('error: ' + err + '.');
			},
			() => {
				console.log('complete');
			}
		);

		this.panels = [
			{
				title: 'Colección:',
				description: '',
				iconName: '',
				formSection: this.formGroup,
				// open: false,
				formSectionContent: [
					{
						type: FormFieldType.checkbox,
						name: 'approved',
						label: 'Sólo mostrar datos de fuentes aprobadas',
						width: '100%',
						value: true,
						required: true
					},
					{
						name: 'organismo',
						label: 'Organismo',
						type: FormFieldType.select_expr,
						required: true,
						width: '100%',
						value: this.organismoUUID,
						extraContent: {
							observable: this.taxonomyService.getTermsTreeByVocab(VocabulariesInmutableNames.CUBAN_INTITUTIONS, 0),
							getOptions: (response: any) => {
								const opts: SelectOption[] = []
								response.data.tree.term_node.forEach((node: TermNode) => {
									opts.push({
										value: node.term.uuid,
										label: node.term.name,
									});
								});
								return opts;
							},
							selectionChange: (uuid) => {
								this.organismoUUID = uuid;
								this.initSourcesPanel();

							}
						}
					}
				]
			},
			{
				title: 'Ordenar por:',
				description: '',
				iconName: '',
				formSection: this.formGroup,
				// open: false,
				formSectionContent: [
					{
						type: FormFieldType.select_expr,
						name: 'sort',
						label: '',
						width: '100%',
						value: 'mostrecent',
						required: true,
						extraContent: {
							getOptions: () => {
								return [
									{
										value: 'mostrecent',
										label: 'Mas reciente',
									},
									{
										value: 'bestmatch',
										label: 'Mejor resultado',
									},
								];
							}
						}
					},
					{
						type: FormFieldType.checkbox,
						name: 'asc',
						label: 'Orden Ascendente',
						width: '100%',
						value: true,
						required: true
					},
				]
			},
			{
				formSection: this.formGroup,
				title: 'Tipos de Indizaciones:',
				iconName: '',
				description: '',
				// open: false,
				formSectionContent: [
					{
						name: 'grupo_mes',
						label: 'Grupo MES',
						type: FormFieldType.vocabulary,
						required: true,
						width: '100%',
						value: '',
						extraContent: {
							multiple: true,
							selectedTermsIds: null,
							vocab: VocabulariesInmutableNames.INDEXES_CLASIFICATION
						},
					},
					{
						name: 'miar_types',
						label: 'Tipos de MIAR',
						type: FormFieldType.vocabulary,
						required: true,
						width: '100%',
						value: '',
						extraContent: {
							multiple: true,
							selectedTermsIds: null,
							vocab: VocabulariesInmutableNames.INDEXES
						},
					},
				]
			}
		];
	}

	initSourcesPanel() {
		this.formGroup.removeControl('source');
		this.panels[0].formSectionContent[2] = {
			name: 'source',
			label: 'Fuentes',
			type: FormFieldType.select_filter,
			formSection: this.formGroup,
			width: '100%',
			extraContent: {
				multiple: true,
				observable: this.sourceService.getSourcesByTermUUID(this.organismoUUID),
				getOptions: (response: any) => {
					const opts: SelectOption[] = [];
					if (response.data.sources) {
						response.data.sources.forEach((source: Source) => {
							opts.push({
								value: source.uuid,
								label: source.name,
							});
						});
					}
					return opts;
				},
				selectionChange: (value) => {
					console.log(value);
				}
			}
		};
	}
}
