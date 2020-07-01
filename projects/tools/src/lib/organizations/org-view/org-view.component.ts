
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';

import { Organization } from '@toco/tools/entities';
import { InputContent, OperationAction, PanelContent, ActionContent, FormFieldType, TextInputAppearance } from '@toco/tools/forms';
import { FormFieldContent_Experimental } from '@toco/tools/forms/experimental/form-field.control.experimental';

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
	public panels: PanelContent[];

	public constructor(private _router: Router, private _activatedRoute: ActivatedRoute, private _formBuilder: FormBuilder)
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
		this.formGroup = this._formBuilder.group({});
		this.panels = [
			{
				title: "Muestra la organización seleccionada",
				description: "",
				iconName: "",
				formGroup: this.formGroup,
				content: this._getContent()
			}
		];
	}

    /**
     * Returns the panel's content. 
     */
	private _getContent(): (InputContent | ActionContent | FormFieldContent_Experimental)[]
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
