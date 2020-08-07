
import { Component } from '@angular/core';
import { HttpParams } from '@angular/common/http';
import { PageEvent } from '@angular/material';

import { Organization, SearchResponse } from '@toco/tools/entities';
import { SearchService } from '@toco/tools/backend';

@Component({
	selector: 'toco-org-root',
	templateUrl: './org.component.html',
	styleUrls: ['./org.component.scss']
})
export class OrgRootComponent
{
	
	public constructor()
	{ }

}
