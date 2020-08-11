
import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { Organization } from '@toco/tools/entities';
import { OperationAction } from '@toco/tools/forms';

import { OrgViewAccordionType } from './org-view-accordion/org-view-accordion.component';

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
     * Represents the `OrgViewAccordionType` enum for internal use. 
     */
	public readonly orgViewAccordionType: typeof OrgViewAccordionType;

	/**
	 * Represents the current organization. 
	 */
	@Input()
	public org: Organization;

	public constructor(private _router: Router, private _activatedRoute: ActivatedRoute)
	{
		this.operationAction = OperationAction;
		this.orgViewAccordionType = OrgViewAccordionType;
	}

	public ngOnInit(): void
	{

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
