
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup } from '@angular/forms';

import { Organization } from '@toco/tools/entities';
import { OperationAction, FormSection, PanelContent, FormFieldType } from '@toco/tools/forms';

@Component({
	selector: 'toco-org-add',
	templateUrl: './org-add.component.html',
	styleUrls: ['./org-add.component.scss']
})
export class OrgAddComponent implements OnInit
{
    /**
     * Represents the `OperationAction` enum for internal use. 
     */
	public readonly operationAction: typeof OperationAction;

	/**
	 * Represents the organization for adding. 
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

	public ngOnInit()
	{
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
			'label': 'Adiciona una nueva organización',
			'type': FormFieldType.panel,
			'title': 'Adiciona una nueva organización',
			'description': '',
			'iconName': undefined /*''*/,
			'formSectionContent': [
				//TODO: Poner los campos.'
			]
		};
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

		this._router.navigate(['../', { 'operation': op }]);
	}

	/**
	 * Returns true if the submit action is disabled; otherwise, false. 
	 */
	public get isSubmitActionDisabled(): boolean
	{
		return this.panelFormSection.invalid;
	}
}
