
import { Component, OnInit } from '@angular/core';

import { Product } from '../road-map/road-map.component';

@Component({
	selector: 'toco-road-map-sceiba',
	templateUrl: './road-map-sceiba.component.html',
	styleUrls: ['./road-map-sceiba.component.scss']
})
export class RoadMapSceibaComponent implements OnInit
{
	/**
	 * Returns the road map's title. 
	 * By default, its value is `'Visualización del roadmap del proyecto Sceiba'`. 
	 */
	public title: string;

	/**
	 * Returns the current products array introduced by the user. 
	 * From this array is created the internal current products array, 
	 * and the internal current features array for each product. 
	 * By default, its value is `[]`. 
	 */
	public currentProducts: Product[];

	/**
	 * Returns the future products array introduced by the user. 
	 * From this array is created the internal future products array, 
	 * and the internal future features array for each product. 
	 * By default, its value is `[]`. 
	 */
	public futureProducts: Product[];

	public constructor()
	{
		this.title = 'Visualización del roadmap del proyecto Sceiba';
		this.currentProducts = [ ];
		this.futureProducts = [ ];
	}

	public ngOnInit(): void
	{
		// this.currentProducts = [ ];
		// this.currentProducts = undefined;
		this.currentProducts = [
			{
				'name': 'Producto-1',  /* 'achieved' = 33.33 */
				'features': [
					{
						'name': 'Característica-1',
						'achieved': 20
					},
					{
						'name': 'Característica-2',
						'achieved': 50
					},
					{
						'name': 'Característica-3',
						'achieved': 30
					}
				]
			},
			{
				'name': 'Producto-2',  /* 'achieved' = 51.00 */
				'features': [
					{
						'name': 'Característica-1',
						'achieved': 5
					},
					{
						'name': 'Característica-2',
						'achieved': 50
					},
					{
						'name': 'Característica-3',
						'achieved': 75
					},
					{
						'name': 'Característica-4',
						'achieved': 30
					},
					{
						'name': 'Característica-5',
						'achieved': 95
					}
				]
			},
			{
				'name': 'Producto-3',  /* 'achieved' = 100.00 */
				'features': [
					{
						'name': 'Característica-1',
						'achieved': 100
					}
				]
			},
			{
				'name': 'Producto-4',  /* 'achieved' = 0.00 */
				'features': [
					{
						'name': 'Característica-1',
						'achieved': 0
					}
				]
			},
			{
				'name': 'Producto-5',  /* 'achieved' = 47.50 */
				'features': [
					{
						'name': 'Característica-1',
						'achieved': 80
					},
					{
						'name': 'Característica-2',
						'achieved': 25
					},
					{
						'name': 'Característica-3',
						'achieved': 95
					},
					{
						'name': 'Característica-4',
						'achieved': 40
					},
					{
						'name': 'Característica-5',
						'achieved': 10
					},
					{
						'name': 'Característica-6',
						'achieved': 15
					},
					{
						'name': 'Característica-7',
						'achieved': 15
					},
					{
						'name': 'Característica-8',
						'achieved': 100
					}
				]
			},
			{
				'name': 'Producto-6',  /* 'achieved' = -- */
				'features': [
				]
				// 'features': undefined
			}
		];

		// this.futureProducts = [ ];
		// this.futureProducts = undefined;
		this.futureProducts = [
			{
				'name': 'Fut-Producto-1',  /* 'achieved' = 33.33 */
				'features': [
					{
						'name': 'Fut-Característica-1',
						'achieved': 80
					},
					{
						'name': 'Fut-Característica-2',
						'achieved': 50
					}
				]
			},
			{
				'name': 'Fut-Producto-2',  /* 'achieved' = 51.00 */
				'features': [
					{
						'name': 'Fut-Característica-1',
						'achieved': 0
					},
					{
						'name': 'Fut-Característica-2',
						'achieved': 5
					},
					{
						'name': 'Fut-Característica-3',
						'achieved': 0
					},
					{
						'name': 'Fut-Característica-4',
						'achieved': 0
					},
					{
						'name': 'Fut-Característica-5',
						'achieved': 0
					}
				]
			},
			{
				'name': 'Fut-Producto-3',  /* 'achieved' = 100.00 */
				'features': [
					{
						'name': 'Fut-Característica-1',
						'achieved': 100
					}
				]
			},
			{
				'name': 'Fut-Producto-4',  /* 'achieved' = 0.00 */
				'features': [
					{
						'name': 'Fut-Característica-1',
						'achieved': 0
					}
				]
			},
			{
				'name': 'Fut-Producto-5',  /* 'achieved' = 47.50 */
				'features': [
					{
						'name': 'Fut-Característica-1',
						'achieved': 0
					},
					{
						'name': 'Fut-Característica-2',
						'achieved': 100
					},
					{
						'name': 'Fut-Característica-3',
						'achieved': 50
					},
					{
						'name': 'Fut-Característica-4',
						'achieved': 20
					},
					{
						'name': 'Fut-Característica-5',
						'achieved': 80
					},
					{
						'name': 'Fut-Característica-6',
						'achieved': 0
					},
					{
						'name': 'Fut-Característica-7',
						'achieved': 0
					},
					{
						'name': 'Fut-Característica-8',
						'achieved': 0
					}
				]
			},
			{
				'name': 'Fut-Producto-6',  /* 'achieved' = -- */
				'features': [
				]
				// 'features': undefined
			}
		];
	}
}
