
import { Component, OnInit } from '@angular/core';

/**
 * Represents a container control that is showed very simple using `FormArray`. 
 * It is similar to `ContainerSimpleComponent`, but using `FormArray`. 
 */
@Component({
	selector: 'container-simple-fa',
	templateUrl: './simple-container-fa.component.html',
	styleUrls: ['./simple-container-fa.component.scss'],
	host: {
		'[style.minWidth]': 'content.minWidth',
		'[style.width]': 'content.width'
	}
})
export class ContainerSimpleFaComponent implements OnInit
{
	public constructor()
	{ }

	ngOnInit() {
	}
}
