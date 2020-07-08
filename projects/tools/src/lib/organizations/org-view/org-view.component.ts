
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup } from '@angular/forms';

import { Organization } from '@toco/tools/entities';
import { OperationAction, FormFieldType, TextInputAppearance, PanelContent_Depr } from '@toco/tools/forms';

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

	public formGroup: FormGroup;
	public panelsContent: PanelContent_Depr[];

	public constructor(private _router: Router, private _activatedRoute: ActivatedRoute)
	{
		this.operationAction = OperationAction;
	}

	public ngOnInit(): void
	{
		/* Gets the `Organization` data. */
		this._activatedRoute.data.subscribe(
			(data: { 'org': Organization }) => {
				this.org = data.org;
			}
		);

		/* Creates the controls. */
		this.panelsContent = [
			{
				title: "Muestra la organización seleccionada",
				description: "",
				iconName: "",
				formSectionContent: this._getContent()
			}
		];
	}

    /**
     * Returns the panel's content. 
     */
	private _getContent(): any[]
	{
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
			}
		]
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
