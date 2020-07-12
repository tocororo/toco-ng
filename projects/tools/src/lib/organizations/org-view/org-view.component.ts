
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup } from '@angular/forms';

import { Organization } from '@toco/tools/entities';
import { OperationAction, FormFieldType, TextInputAppearance, FormSection, PanelContent } from '@toco/tools/forms';

@Component({
	selector: 'toco-org-view',
	templateUrl: './org-view.component.html',
	styleUrls: ['./org-view.component.scss']
})
export class OrgViewComponent implements OnInit
{
    /**
     * Represents the `OperationAction` enum for internal use. 
     */
	public readonly operationAction: typeof OperationAction;

	/**
	 * Represents the current organization. 
	 */
	public org: Organization;

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

				console.log('Data got for viewing: ', this.org);
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
			/* The 'label' and 'title' fields have the same values, but they are different fields with different functionalities. */
			'formSection' : this.panelFormSection,
			'name': 'panel',
			'label': 'Muestra la organización seleccionada',
			'type': FormFieldType.panel,
			'title': 'Muestra la organización seleccionada',
			'description': '',
			'iconName': undefined /*''*/,
			'formSectionContent': [
				//TODO: Poner los campos, todos son readonly.'
			]
		};
	}

	/**
	 * Does the tasks for the operation action. 
	 * @param op The operation action. 
	 */
	public doOperationAction(op: OperationAction): void
	{
		this._router.navigate(['../', { 'operation': op }]);
	}
}
