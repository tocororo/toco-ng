
import { Component, OnInit, Input } from '@angular/core';

import { HitList, Organization } from '@toco/tools/entities';

@Component({
	selector: 'toco-org-list',
	templateUrl: './org-list.component.html',
	styleUrls: ['./org-list.component.scss']
})
export class OrgListComponent implements OnInit
{
	@Input()
	public hitList: HitList<Organization>;

	public constructor()
	{ }

	public ngOnInit(): void
	{
		console.log(this.hitList);
	}
}
