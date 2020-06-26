
import { Component, OnInit, Input } from '@angular/core';

import { Organization } from '@toco/tools/entities';
import { InputContent } from '@toco/tools/forms';

@Component({
	selector: 'toco-org-view',
	templateUrl: './org-view.component.html',
	styleUrls: ['./org-view.component.scss']
})
export class OrgViewComponent implements OnInit
{
	/**
	 * Represents an organization. 
	 */
	@Input()
	public org: Organization;

	@Input()
	public content: InputContent[];

	@Input()
	public fullView = false;

	public constructor()
	{ }

	public ngOnInit(): void
	{
	}

	public doAction(): void
	{ }
}
