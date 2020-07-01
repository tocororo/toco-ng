
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder } from '@angular/forms';

import { Organization } from '@toco/tools/entities';
import { OperationAction } from '@toco/tools/forms';

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

	public formGroup: FormGroup;

	public constructor(private _router: Router, private _activatedRoute: ActivatedRoute, private _formBuilder: FormBuilder)
	{
		this.operationAction = OperationAction;
	}

	public ngOnInit()
	{
		/* Creates the controls. */
		this.formGroup = this._formBuilder.group({});

		//TODO: Create the controls that contains the `formGroup`. 
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
		return this.formGroup.invalid;
	}
}
