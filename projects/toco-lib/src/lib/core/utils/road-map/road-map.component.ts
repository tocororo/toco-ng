
import { Component, OnInit, Input } from '@angular/core';
import { isObject } from 'util';

const seriesName_English: string[] = ['achieved', 'unresolved'];
const seriesName_Spanish: string[] = ['realizado', 'pendiente'];

/**
 * An interface that represents the content of a feature object. 
 */
export interface Feature
{
	/**
	 * The feature's name. 
	 */
	name: string;

	/**
	 * The feature's achieved percentage. 
	 */
	achieved: number;
}

/**
 * An interface that represents the content of a product object. 
 * Its achieved percentage value is calculated from its `features` array field. 
 */
export interface Product
{
	/**
	 * The product's name. 
	 */
	name: string;

	/**
	 * The product's features array. 
	 */
	features: Feature[];
}

/**
 * An interface that represents the content of a result object. 
 */
export interface Result
{
	/**
	 * The result's name. 
	 */
	name: string;

	/**
	 * The result's value. 
	 */
	value: number;
}

/**
 * An interface that represents the content of a chart bar object. 
 * Its `series` field is an array of length 2 that contains 
 * the achieved/unresolved results; for example, 
	`'series': [
  		{
  			'name': 'achieved',
 			'value': 20
 		},
 		{
 			'name': 'unresolved',
 			'value': 80
 		}
 	]` 
 */
export interface ChartBar
{
	/**
	 * The chart's bar name. 
	 */
	name: string;

	/**
	 * The results array that makes up the chart's bar. 
	 */
	series: Result[];
}

/**
 * An interface that represents the content of an entry element object. 
 */
export interface EntryElement
{
	name: string;
	value?: number;
	label?: string;
	series?: string;
}

/**
 * Component for displaying a roadmap. It basically displays the products 
 * that we are currently working, and the products that we will work in the future. 
 * Besides, when a product is selected, its features are displayed. 
 * It always shows the achieved/unresolved work in percentage. 
 */
@Component({
	selector: 'toco-road-map',
	templateUrl: './road-map.component.html',
	styleUrls: ['./road-map.component.scss']
})
export class RoadMapComponent implements OnInit
{
	/**
	 * Returns the -1 value that is used to remove a chart. 
	 */
	public readonly removeChart_PosFlag = -1;

	/**************************************************************************
	 **************************************************************************
	 * Options for displaying the products list. 
	 **************************************************************************
	 *************************************************************************/

	/**
	 * Input field that contains the text that is displayed when there is not any product. 
	 * By default, its value is `'¡No hay ningún producto!'`. 
	 */
	@Input()
	public withoutProductText: string;

	/**
	 * Returns the chart's visualization direction. 
	 * It is true if the chart is visualized vertically; otherwise, false (horizontally). 
	 * By default, its value is `true`. 
	 */
	private _isChartVertical: boolean;

	/**
	 * Input field that contains the tab's label of current works. 
	 * By default, its value is `'Trabajos Actuales'`. 
	 */
	@Input()
	public tabLabel_CW: string;
	/**
	 * Input field that contains the tab's label of future works. 
	 * By default, its value is `'Trabajos Futuros o Pendientes'`. 
	 */
	@Input()
	public tabLabel_FW: string;

	/**
	 * Returns the selected tab position. Its value is set internally. 
	 */
	private _selectedTabPos: number;

	/**
	 * Returns the grid height. 
	 * Its value is set depending on the `legendPosition` value. 
	 */
	private _gridHeight: number;

	/**
	 * Input field that contains the chart's title of products. 
	 * By default, its value is `'Lista de productos'`. 
	 */
	@Input()
	public chartTitle_P: string;

	/**
	 * Returns true if it is using a trick to obligate repainting the chart; otherwise, false. 
	 */
	private _isUsingTrick_RepaintChart: boolean;
	/**
	 * Returns the working products array introduced by the user. 
	 * It references the `_currentProducts` or `_futureProducts` array. 
	 * By default, its value is `[]`. 
	 */
	private _products: Product[];
	/**
	 * Returns the current products array introduced by the user. 
	 * From this array is created the `_currentProducts_Internal` and `_currentFeatures_Internal` arrays. 
	 * By default, its value is `[]`. 
	 */
	private _currentProducts: Product[];
	/**
	 * Returns the future products array introduced by the user. 
	 * From this array is created the `_futureProducts_Internal` and `_futureFeatures_Internal` arrays. 
	 * By default, its value is `[]`. 
	 */
	private _futureProducts: Product[];

	/**
	 * Returns the working products array displayed in the chart. 
	 * It references the `_currentProducts_Internal` or `_futureProducts_Internal` array. 
	 * It is created from the `_products` array. 
	 * By default, its value is `[]`. 
	 */
	private _products_Internal: ChartBar[];
	/**
	 * Returns the current products array displayed in the chart. 
	 * It is created from the `_currentProducts` array. 
	 * By default, its value is `[]`. 
	 */
	private _currentProducts_Internal: ChartBar[];
	/**
	 * Returns the future products array displayed in the chart. 
	 * It is created from the `_futureProducts` array. 
	 * By default, its value is `[]`. 
	 */
	private _futureProducts_Internal: ChartBar[];

	/**
	 * Returns the array that contains all working features arrays that can be displayed in the chart. 
	 * This array contains the same length than `_products_Internal` array because 
	 * each position contains the working features array for a product. 
	 * It references the `_currentFeaturesTotal_Internal` or `_futureFeaturesTotal_Internal` array. 
	 * It is created from the `_products` array. 
	 * This array is for internal use only. 
	 * By default, its value is `[]`. 
	 */
	private _featuresTotal_Internal: ChartBar[][];
	/**
	 * Returns the array that contains all current features arrays that can be displayed in the chart. 
	 * This array contains the same length than `_currentProducts_Internal` array because 
	 * each position contains the current features array for a product. 
	 * It is created from the `_currentProducts` array. 
	 * This array is for internal use only. 
	 * By default, its value is `[]`. 
	 */
	private _currentFeaturesTotal_Internal: ChartBar[][];
	/**
	 * Returns the array that contains all future features arrays that can be displayed in the chart. 
	 * This array contains the same length than `_futureProducts_Internal` array because 
	 * each position contains the future features array for a product. 
	 * It is created from the `_futureProducts` array. 
	 * This array is for internal use only. 
	 * By default, its value is `[]`. 
	 */
	private _futureFeaturesTotal_Internal: ChartBar[][];

	/**
	 * Returns the working features array of a selected product displayed in the chart. 
	 * It references an element in the `_featuresTotal_Internal` array. This element 
	 * represents the features of a selected product in the `_products_Internal` array. 
	 * It references the `_currentFeatures_Internal` or `_futureFeatures_Internal` array. 
	 * By default, its value is `[]`. 
	 */
	private _features_Internal: ChartBar[];
	/**
	 * Returns the current features array of a selected product displayed in the chart. 
	 * It references an element in the `_currentFeaturesTotal_Internal` array. This element 
	 * represents the features of a selected product in the `_currentProducts_Internal` array. 
	 * By default, its value is `[]`. 
	 */
	private _currentFeatures_Internal: ChartBar[];
	/**
	 * Returns the future features array of a selected product displayed in the chart. 
	 * It references an element in the `_futureFeaturesTotal_Internal` array. This element 
	 * represents the features of a selected product in the `_futureProducts_Internal` array. 
	 * By default, its value is `[]`. 
	 */
	private _futureFeatures_Internal: ChartBar[];

	/**
	 * Returns the current product elements array to highlight displayed in the chart. 
	 * It is modified dynamically. 
	 * By default, its value is `[]`. 
	 */
	private _activeEntries_P_CW: EntryElement[];
	/**
	 * Returns the future product elements array to highlight displayed in the chart. 
	 * It is modified dynamically. 
	 * By default, its value is `[]`. 
	 */
	private _activeEntries_P_FW: EntryElement[];

	/**
	 * Input field that contains the chart's dimensions [width, height]. 
	 * By default, its value is `[900, 350]`. 
	 */
	@Input()
	public view: number[];

	/**
	 * Input field that contains the chart's color scheme of current works. 
	 * By default, its value is the following object: 
		`{
	 		domain: [ 
				'#6EE9B5',  // light green 
				'#E96E70'   // red
			] 
		}` 
	 */
	@Input()
	public colorScheme_CW: any;
	/**
	 * Input field that contains the chart's color scheme of future works. 
	 * By default, its value is the following object: 
		`{
	 		domain: [ 
				'#a6a6a6',
				'#555555'
			] 
		}` 
	 */
	@Input()
	public colorScheme_FW: any;

	/**
	 * Input field that indicates to fill chart's elements with a gradient or a solid color. 
	 * It is true if the chart's elements are filled with a gradient color; otherwise, false (filled with a solid color). 
	 * By default, its value is `false`. 
	 */
	@Input()
	public gradient: boolean;

	/**
	 * Input field that contains the chart's padding between bars in px. 
	 * By default, its value is `12`. 
	 */
	@Input()
	public barPadding: number;

	/**
	 * Shows the chart's x axis. 
	 */
	public readonly showXAxis: boolean;
	/**
	 * Shows the chart's x axis label. 
	 */
	public readonly showXAxisLabel: boolean;
	/**
	 * Input field that contains the chart's x axis label text of products. 
	 * By default, its value is `'Producto'`. 
	 */
	@Input()
	public xAxisLabel_P: string;

	/**
	 * Input field that contains the chart's max length of the ticks (ticks over this length will be trimmed). 
	 * By default, its value is `16`. 
	 */
	@Input()
	public maxAxisTickLength: number;

	/**
	 * Shows the chart's y axis. 
	 */
	public readonly showYAxis: boolean;
	/**
	 * Shows the chart's y axis label. 
	 */
	public readonly showYAxisLabel: boolean;
	/**
	 * Input field that contains the chart's y axis label text of products. 
	 * By default, its value is `'Realizado / Pendiente En Por Ciento'`. 
	 */
	@Input()
	public yAxisLabel_P: string;

	/**
	 * Shows the chart's legend. 
	 */
	public readonly showLegend: boolean;
	/**
	 * Input field that contains the chart's legend title. 
	 * By default, its value is `'Leyenda'`. 
	 */
	@Input()
	public legendTitle: string;
	/**
	 * Input field that contains the chart's legend position. Its value is `'right'` or `'below'`. 
	 * By default, its value is `'right'`. 
	 */
	private _legendPosition: string;

	/**************************************************************************
	 **************************************************************************
	 * Options for displaying the features list of a selected product. 
	 **************************************************************************
	 *************************************************************************/

	/**
	 * Returns the working product position. Contains the `removeChart_PosFlag` value when 
	 * there is not any selected working product position. 
	 * It has the `_selectedProductPos_CW` or `_selectedProductPos_FW` value. 
	 */
	private _selectedProductPos: number;
	/**
	 * Returns the selected current product position. Contains the `removeChart_PosFlag` value when 
	 * there is not any selected current product position. 
	 */
	private _selectedProductPos_CW: number;
	/**
	 * Returns the selected future product position. Contains the `removeChart_PosFlag` value when 
	 * there is not any selected future product position. 
	 */
	private _selectedProductPos_FW: number;

	/**
	 * Returns the chart's title of features. 
	 * This field is updated a little different. 
	 * By default, its value is `'Lista de características del producto seleccionado'`. 
	 */
	private _chartTitle_F: string;
	/**
	 * Returns the chart's title of working current features. 
	 * This field is updated a little different. 
	 * By default, its value is `'Lista de características del producto seleccionado'`. 
	 */
	private _chartTitle_F_CW: string;
	/**
	 * Returns the chart's title of working future features. 
	 * This field is updated a little different. 
	 * By default, its value is `'Lista de características del producto seleccionado'`. 
	 */
	private _chartTitle_F_FW: string;

	/**
	 * Input field that contains the chart's x axis label text of features. 
	 * By default, its value is `'Característica'`. 
	 */
	@Input()
	public xAxisLabel_F: string;

	/**
	 * Input field that contains the chart's y axis label text of features. 
	 * By default, its value is `'Realizado / Pendiente En Por Ciento'`. 
	 */
	@Input()
	public yAxisLabel_F: string;

	public constructor()
	{
		this.withoutProductText = '¡No hay ningún producto!';

		this._isChartVertical = true;

		this.tabLabel_CW = 'Trabajos Actuales';
		this.tabLabel_FW = 'Trabajos Futuros o Pendientes';
		this._selectedTabPos = 0;
		/* The `_gridHeight` value is set when the `legendPosition` value is set. */

		this.chartTitle_P = 'Lista de productos';

		this._isUsingTrick_RepaintChart = false;
		this._products = this._currentProducts = [ ];
		this._futureProducts = [ ];
		this._products_Internal = this._currentProducts_Internal = [ ];
		this._futureProducts_Internal = [ ];
		this._featuresTotal_Internal = this._currentFeaturesTotal_Internal = [ ];
		this._futureFeaturesTotal_Internal = [ ];
		this._features_Internal = this._currentFeatures_Internal = [ ];
		this._futureFeatures_Internal = [ ];

		this._activeEntries_P_CW = [ ];
		this._activeEntries_P_FW = [ ];

		this.view = [900, 350];
		this.colorScheme_CW = {
			domain: [  // all colors light
				// '#85E96E',  // green
				'#6EE9B5',  // light green
				'#E96E70',  // red
				// '#6F6EE9',  // blue
				// '#6EBBE9',  // light blue
	
				// '#A9A9A9',
				// '#85E96E',
				// '#E3E96E',
				// '#E9AC6E',
				// '#E96E70',
				// '#E96EB6',
				// '#AE6EE9',
				// '#6F6EE9',
				// '#6EBBE9',
				// '#6EE9B5'
			]
//			domain: [  // all colors dark
			//   '#2F6E6F',
//			  '#2F6F40',  // green
			//   '#6B6F2F',  // light green
//			  '#6F432F',  // red
			//   '#6F2F4F',
			//   '#562F6F',
			//   '#302F6F',
			//   '#2F466F'
//			]
		};
		this.colorScheme_FW = {
			domain: [  // all colors grey
				'#a6a6a6',
			//   '#828282',
			//   '#686868',
				'#555555',
			//   '#4d4d4d',
			//   '#464646',
			//   '#434343',
			//   '#3d3d3d',
			//   '#343434',
			//   '#262626',
			//   '#252525',
			//   '#000000'
			]
		};
		this.gradient = false;
		this.barPadding = 12;

		this.showXAxis = true;
		this.showXAxisLabel = true;	
		this.xAxisLabel_P = 'Producto';
		this.maxAxisTickLength = 16;

		this.showYAxis = true;
		this.showYAxisLabel = true;
		this.yAxisLabel_P = 'Realizado / Pendiente En Por Ciento';

		this.showLegend = true;
		this.legendTitle = 'Leyenda';
		this.legendPosition = 'right';


		this._selectedProductPos = this._selectedProductPos_CW = this._selectedProductPos_FW = this.removeChart_PosFlag;

		this._chartTitle_F = this._chartTitle_F_CW = this._chartTitle_F_FW = 'Lista de características del producto seleccionado';
		this.xAxisLabel_F = 'Característica';
		this.yAxisLabel_F = 'Realizado / Pendiente En Por Ciento';
	}

	public ngOnInit(): void
	{ }

	/**
	 * Returns the input field that contains the chart's visualization direction. 
	 * It is true if the chart is visualized vertically; otherwise, false (horizontally). 
	 * When this value is set, the `xAxisLabel_P`/`yAxisLabel_P` and `xAxisLabel_F`/`yAxisLabel_F` values are set accordingly. 
	 * By default, its value is `true`. 
	 */
	@Input()
	public get isChartVertical(): boolean
	{
		return this._isChartVertical;
	}

	/**
	 * Sets the input field that contains the chart's visualization direction. 
	 * It is true if the chart is visualized vertically; otherwise, false (horizontally). 
	 * When this value is set, the `xAxisLabel_P`/`yAxisLabel_P` and `xAxisLabel_F`/`yAxisLabel_F` values are set accordingly. 
	 * By default, its value is `true`. 
	 * @param value The new chart's visualization direction to set. 
	 */
	public set isChartVertical(value: boolean)
	{
		if (this._isChartVertical != value)
		{
			let temp: string = this.xAxisLabel_P;
			this.xAxisLabel_P = this.yAxisLabel_P;
			this.yAxisLabel_P = temp;

			temp = this.xAxisLabel_F;
			this.xAxisLabel_F = this.yAxisLabel_F;
			this.yAxisLabel_F = temp;

			this._isChartVertical = value
		}
	}

	/**
	 * Returns the grid height. 
	 * Its value is set depending on the `legendPosition` value. 
	 */
	public get gridHeight(): number
	{
		return this._gridHeight;
	}

	/**
	 * Returns the input field that contains the current products array introduced by the user. 
	 * From this array is created the `currentProducts_Internal` and `currentFeatures_Internal` arrays. 
	 * By default, its value is `[]`. 
	 */
	@Input()
	public get currentProducts(): Product[]
	{
		return this._currentProducts;
	}

	/**
	 * Sets the input field that contains the current products array. 
	 * By default, its value is `[]`. 
	 * @param value The new current products array to set. 
	 */
	public set currentProducts(value: Product[])
	{
		// console.log('currentProducts: ', value);

		/* Updates the current products/features arrays. */
		this._currentProducts = value || [ ];
		if (this._isUsingTrick_RepaintChart)
		{
			this._isUsingTrick_RepaintChart = false;

			this._currentProducts_Internal = this._currentProducts_Internal.map(value => value);
			this._currentFeaturesTotal_Internal = this._currentFeaturesTotal_Internal.map(value => value.map(value => value));
		}
		else
		{
			this._currentProducts_Internal = [ ];
			this._currentFeaturesTotal_Internal = [ ];

			/* Creates the internal arrays that are going to be passed in the template; 
			`_currentProducts_Internal` and `_currentFeaturesTotal_Internal` arrays. 
			The `_currentFeatures_Internal` array references an element in 
			the `_currentFeaturesTotal_Internal` array. This element represents the features 
			of a selected product in the `_currentProducts_Internal` array. */
			this._createsInternalArrays(this._currentProducts, this._currentProducts_Internal, this._currentFeaturesTotal_Internal);
		}
		this._currentFeatures_Internal = [ ];

		/* Updates the fields whether there is a selected current product. */
		if (this._selectedProductPos_CW != this.removeChart_PosFlag)
		{
			if (this._selectedProductPos_CW < this._currentProducts.length)
			{
				/* Updates the fields whether the new `_currentProducts` array has the enough length. */

				/* The `_selectedProductPos_CW` value is already correct. */
				this._currentFeatures_Internal = this._currentFeaturesTotal_Internal[this._selectedProductPos_CW];
				this._set_activeEntries_P_CW(false);
				this._chartTitle_F_CW = this._chartTitle_F 
					+ ((this._chartTitle_F.length == 0) ? '' : ' ') 
					+ `“${ this._currentProducts_Internal[this._selectedProductPos_CW].name }”`;
			}
			else
			{
				/* Removes the selected current product because the `_currentProducts` array has not the enough length. */

				this._selectedProductPos_CW = this.removeChart_PosFlag;
				/* The `_currentFeatures_Internal` array is already correct (an empty array). */
				this._set_activeEntries_P_CW(true);
				this._chartTitle_F_CW = this._chartTitle_F;
			}
		}

		/* Updates the fields whether the selected tab is the current works. */
		if (this._selectedTabPos == 0)
		{
			this._setData_CW();
		}
	}

	/**
	 * Returns the current products array displayed in the chart. 
	 * It is created from the `currentProducts` array. 
	 * By default, its value is `[]`. 
	 */
	public get currentProducts_Internal(): ChartBar[]
	{
		return this._currentProducts_Internal;
	}

	/**
	 * Returns the current features array of a selected product displayed in the chart. 
	 * It is created from the `currentProducts` array. 
	 * By default, its value is `[]`. 
	 */
	public get currentFeatures_Internal(): ChartBar[]
	{
		return this._currentFeatures_Internal;
	}

	/**
	 * Returns the input field that contains the future products array introduced by the user. 
	 * From this array is created the `futureProducts_Internal` and `futureFeatures_Internal` arrays. 
	 * By default, its value is `[]`. 
	 */
	@Input()
	public get futureProducts(): Product[]
	{
		return this._futureProducts;
	}

	/**
	 * Sets the input field that contains the future products array. 
	 * By default, its value is `[]`. 
	 * @param value The new future products array to set. 
	 */
	public set futureProducts(value: Product[])
	{
		// console.log('futureProducts: ', value);

		/* Updates the future products/features arrays. */
		this._futureProducts = value || [ ];
		if (this._isUsingTrick_RepaintChart)
		{
			this._isUsingTrick_RepaintChart = false;

			this._futureProducts_Internal = this._futureProducts_Internal.map(value => value);
			this._futureFeaturesTotal_Internal = this._futureFeaturesTotal_Internal.map(value => value.map(value => value));
		}
		else
		{
			this._futureProducts_Internal = [ ];
			this._futureFeaturesTotal_Internal = [ ];

			/* Creates the internal arrays that are going to be passed in the template; 
			`_futureProducts_Internal` and `_futureFeaturesTotal_Internal` arrays. 
			The `_futureFeatures_Internal` array references an element in 
			the `_futureFeaturesTotal_Internal` array. This element represents the features 
			of a selected product in the `_futureProducts_Internal` array. */
			this._createsInternalArrays(this._futureProducts, this._futureProducts_Internal, this._futureFeaturesTotal_Internal);
		}
		this._futureFeatures_Internal = [ ];

		/* Updates the fields whether there is a selected future product. */
		if (this._selectedProductPos_FW != this.removeChart_PosFlag)
		{
			if (this._selectedProductPos_FW < this._futureProducts.length)
			{
				/* Updates the fields whether the new `_futureProducts` array has the enough length. */

				/* The `_selectedProductPos_FW` value is already correct. */
				this._futureFeatures_Internal = this._futureFeaturesTotal_Internal[this._selectedProductPos_FW];
				this._set_activeEntries_P_FW(false);
				this._chartTitle_F_FW = this._chartTitle_F 
					+ ((this._chartTitle_F.length == 0) ? '' : ' ') 
					+ `“${ this._futureProducts_Internal[this._selectedProductPos_FW].name }”`;
			}
			else
			{
				/* Removes the selected future product because the `_futureProducts` array has not the enough length. */

				this._selectedProductPos_FW = this.removeChart_PosFlag;
				/* The `_futureFeatures_Internal` array is already correct (an empty array). */
				this._set_activeEntries_P_FW(true);
				this._chartTitle_F_FW = this._chartTitle_F;
			}
		}

		/* Updates the fields whether the selected tab is the future works. */
		if (this._selectedTabPos == 1)
		{
			this._setData_FW();
		}
	}

	/**
	 * Returns the future products array displayed in the chart. 
	 * It is created from the `futureProducts` array. 
	 * By default, its value is `[]`. 
	 */
	public get futureProducts_Internal(): ChartBar[]
	{
		return this._futureProducts_Internal;
	}

	/**
	 * Returns the future features array of a selected product displayed in the chart. 
	 * It is created from the `futureProducts` array. 
	 * By default, its value is `[]`. 
	 */
	public get futureFeatures_Internal(): ChartBar[]
	{
		return this._futureFeatures_Internal;
	}

	/**
	 * Returns the current product elements array to highlight displayed in the chart. 
	 * It is modified dynamically. 
	 * By default, its value is `[]`. 
	 */
	public get activeEntries_P_CW(): EntryElement[]
	{
		return this._activeEntries_P_CW;
	}

	/**
	 * Sets the current product elements array to highlight displayed in the chart. 
	 * @param setEmpty If it is true, then sets the `_activeEntries_P_CW` array to empty. 
	 */
	private _set_activeEntries_P_CW(setEmpty: boolean): void
	{
		// console.log('Called "_set_activeEntries_P_CW": setEmpty = ', setEmpty);

		if (setEmpty)
		{
			this._activeEntries_P_CW = [ ];
		}
		else
		{
			let selectedProduct: ChartBar = this._currentProducts_Internal[this._selectedProductPos_CW];

			this._activeEntries_P_CW = [
				{
					'name': selectedProduct.series[0].name,
					'value': selectedProduct.series[0].value,
					'label': selectedProduct.series[0].name,
					'series': selectedProduct.name
				},
				{
					'name': selectedProduct.series[1].name,
					'value': selectedProduct.series[1].value,
					'label': selectedProduct.series[1].name,
					'series': selectedProduct.name
				}
			];
		}
	}

	/**
	 * Returns the future product elements array to highlight displayed in the chart. 
	 * It is modified dynamically. 
	 * By default, its value is `[]`. 
	 */
	public get activeEntries_P_FW(): EntryElement[]
	{
		return this._activeEntries_P_FW;
	}

	/**
	 * Sets the future product elements array to highlight displayed in the chart. 
	 * @param setEmpty If it is true, then sets the `_activeEntries_P_FW` array to empty. 
	 */
	private _set_activeEntries_P_FW(setEmpty: boolean): void
	{
		// console.log('Called "_set_activeEntries_P_FW": setEmpty = ', setEmpty);

		if (setEmpty)
		{
			this._activeEntries_P_FW = [ ];
		}
		else
		{
			let selectedProduct: ChartBar = this._futureProducts_Internal[this._selectedProductPos_FW];

			this._activeEntries_P_FW = [
				{
					'name': selectedProduct.series[0].name,
					'value': selectedProduct.series[0].value,
					'label': selectedProduct.series[0].name,
					'series': selectedProduct.name
				},
				{
					'name': selectedProduct.series[1].name,
					'value': selectedProduct.series[1].value,
					'label': selectedProduct.series[1].name,
					'series': selectedProduct.name
				}
			];
		}
	}

	/**
	 * Returns the input field that contains the chart's legend position. Its value is `'right'` or `'below'`. 
	 * By default, its value is `'right'`. 
	 */
	@Input()
	public get legendPosition(): string
	{
		return this._legendPosition;
	}

	/**
	 * Sets the input field that contains the chart's legend position. Its value is `'right'` or `'below'`. 
	 * By default, its value is `'right'`. 
	 * @param value The new chart's legend position to set. 
	 */
	public set legendPosition(value: string)
	{
		if ((this._legendPosition = value) == 'below')
		{
			/* Sets the grid height. */
			this._gridHeight = this.view[1] + 60;  /* More 60 to include the legend in the grid. */
		}
		else
		{
			/* Sets the grid height. */
			this._gridHeight = this.view[1];
		}
	}

	/**
	 * Returns a boolean value that indicates the legend position. 
	 * It is true if the legend position is `'right'`; otherwise, false (`'below'`). 
	 * By default, its value is `true`. 
	 */
	public get isLegendRight(): boolean
	{
		return (this.legendPosition == 'right');
	}

	/**
	 * Sets a boolean value that indicates the legend position. 
	 * It is true if the legend position is `'right'`; otherwise, false (`'below'`). 
	 * By default, its value is `true`. 
	 * @param value The new boolean value to set. 
	 */
	public set isLegendRight(value: boolean)
	{
		this.legendPosition = (value) ? 'right' : 'below';
	}

	/**
	 * Returns the selected current product position. Contains the `removeChart_PosFlag` value when 
	 * there is not any selected current product position. 
	 */
	public get selectedProductPos_CW(): number
	{
		return this._selectedProductPos_CW;
	}

	/**
	 * Returns the selected future product position. Contains the `removeChart_PosFlag` value when 
	 * there is not any selected future product position. 
	 */
	public get selectedProductPos_FW(): number
	{
		return this._selectedProductPos_FW;
	}

	/**
	 * Returns the input field that contains the chart's title of features. 
	 * By default, its value is `'Lista de características del producto seleccionado'`. 
	 */
	@Input()
	public get chartTitle_F(): string
	{
		return this._chartTitle_F;
	}

	/**
	 * Sets the input field that contains the chart's title of features. 
	 * By default, its value is `'Lista de características del producto seleccionado'`. 
	 * @param value The new chart's title of features to set. 
	 */
	public set chartTitle_F(value: string)
	{
		this._chartTitle_F = value || 'Lista de características del producto seleccionado';

		/* Updates all chart's titles of features. */

		this._chartTitle_F_CW = (this._selectedProductPos_CW == this.removeChart_PosFlag) 
			? (this._chartTitle_F)
			: (this._chartTitle_F 
				+ ((this._chartTitle_F.length == 0) ? '' : ' ') 
				+ `“${ this._currentProducts_Internal[this._selectedProductPos_CW].name }”`);

		this._chartTitle_F_FW = (this._selectedProductPos_FW == this.removeChart_PosFlag) 
			? (this._chartTitle_F)
			: (this._chartTitle_F 
				+ ((this._chartTitle_F.length == 0) ? '' : ' ') 
				+ `“${ this._futureProducts_Internal[this._selectedProductPos_FW].name }”`);
	}

	/**
	 * Returns the chart's title of working current features. 
	 * By default, its value is `'Lista de características del producto seleccionado'`. 
	 */
	public get chartTitle_F_CW(): string
	{
		return this._chartTitle_F_CW;
	}

	/**
	 * Returns the chart's title of working future features. 
	 * By default, its value is `'Lista de características del producto seleccionado'`. 
	 */
	public get chartTitle_F_FW(): string
	{
		return this._chartTitle_F_FW;
	}

	public onSelectTab(newPos: number): void
	{
		// console.log('onSelectTab pos: ', newPos);

		/* Uses this trick to obligate repainting the chart. */
		this._isUsingTrick_RepaintChart = true;

		if ((this._selectedTabPos = newPos) == 0)
		{
			this.currentProducts = this.currentProducts.map(value => value);

			// this._setData_CW();  /* Better performance: Use this option if you do not use the dynamic legend position or not resize the navigator. */
		}
		else
		{
			this.futureProducts = this.futureProducts.map(value => value);

			// this._setData_FW();  /* Better performance: Use this option if you do not use the dynamic legend position or not resize the navigator. */
		}
	}

	public onSelect(eventInfo: any): void
	{
		// console.log('onSelect: ', eventInfo);

		if (isObject(eventInfo))  /* It has not clicked a legend item. */
		{
			let tempPos: number;
			const len: number = this._products_Internal.length;
			const posAsString: string = eventInfo.series;

			/* Gets the new selected position. */
			for(tempPos = 0; tempPos < len; tempPos++)
			{
				if (this._products_Internal[tempPos].name == posAsString) break;
			}

			/* Updates the `_selectedProductPos_CW`/`_selectedProductPos_FW`. If the new selected 
			 * position equals the current selected position, then the chart for displaying 
			 * the features list of the selected product will be removed. */
			this._updateProductPos(tempPos);
		}
	}

	public onActivate(eventInfo: any): void
	{
		// console.log('onActivate: ', eventInfo);
	}

	public onDeactivate(eventInfo: any): void
	{
		// console.log('onDeactivate: ', eventInfo, ', _activeEntries_P_CW = ', this._activeEntries_P_CW, ', _activeEntries_P_FW = ', this._activeEntries_P_FW);

		if (this._isFeaturesChartShowed)
		{
			if (this._selectedTabPos == 0)
			{
				this._activeEntries_P_CW = this._activeEntries_P_CW.map(value => value);
			}
			else
			{
				this._activeEntries_P_FW = this._activeEntries_P_FW.map(value => value);
			}
		}
	}

	/**
	 * Sets the data of current works. 
	 */
	private _setData_CW(): void
	{
		this._products = this._currentProducts;
		this._products_Internal = this._currentProducts_Internal;
		this._featuresTotal_Internal = this._currentFeaturesTotal_Internal;
		this._features_Internal = this._currentFeatures_Internal;

		this._selectedProductPos = this._selectedProductPos_CW;
	}

	/**
	 * Sets the data of future works. 
	 */
	private _setData_FW(): void
	{
		this._products = this._futureProducts;
		this._products_Internal = this._futureProducts_Internal;
		this._featuresTotal_Internal = this._futureFeaturesTotal_Internal;
		this._features_Internal = this._futureFeatures_Internal;

		this._selectedProductPos = this._selectedProductPos_FW;
	}

	/**
	 * Returns true if the features chart is showed; otherwise, false. 
	 */
	private get _isFeaturesChartShowed(): boolean
	{
		return (this._selectedProductPos != this.removeChart_PosFlag);
	}

	/**
	 * Updates the `selectedProductPos`. If the new selected position equals the current 
	 * selected position, then the chart for displaying the features list of the selected product 
	 * will be removed. 
	 * @param newSelectedPosition The new selected position. 
	 */
	private _updateProductPos(newSelectedPosition: number): void
	{
		/* Updates the `selectedProductPos`. If the new selected position equals the current 
		 * selected position, then the chart for displaying the features list of the selected product 
		 * will be removed. */
		if (newSelectedPosition == this._selectedProductPos)
		{
			if (this._selectedTabPos == 0)
			{
				this._selectedProductPos = this._selectedProductPos_CW = this.removeChart_PosFlag;
				this._features_Internal = this._currentFeatures_Internal = [ ];
				this._set_activeEntries_P_CW(true);
				this._chartTitle_F_CW = this._chartTitle_F;
			}
			else
			{
				this._selectedProductPos = this._selectedProductPos_FW = this.removeChart_PosFlag;
				this._features_Internal = this._futureFeatures_Internal = [ ];
				this._set_activeEntries_P_FW(true);
				this._chartTitle_F_FW = this._chartTitle_F;
			}
		}
		else
		{
			if (this._selectedTabPos == 0)
			{
				this._selectedProductPos = this._selectedProductPos_CW = newSelectedPosition;
				this._features_Internal = this._currentFeatures_Internal = this._featuresTotal_Internal[newSelectedPosition];
				this._set_activeEntries_P_CW(false);
				this._chartTitle_F_CW = this._chartTitle_F 
					+ ((this._chartTitle_F.length == 0) ? '' : ' ') 
					+ `“${ this._products_Internal[newSelectedPosition].name }”`;
			}
			else
			{
				this._selectedProductPos = this._selectedProductPos_FW = newSelectedPosition;
				this._features_Internal = this._futureFeatures_Internal = this._featuresTotal_Internal[newSelectedPosition];
				this._set_activeEntries_P_FW(false);
				this._chartTitle_F_FW = this._chartTitle_F 
					+ ((this._chartTitle_F.length == 0) ? '' : ' ') 
					+ `“${ this._products_Internal[newSelectedPosition].name }”`;
			}
		}
	}

	/**
	 * Creates the internal arrays that are going to be passed in the template 
	 * for the current/future products/features accordingly. 
	 * @param products The current/future products array introduced by the user. 
	 * @param products_Internal The current/future products array displayed in the chart. 
	 * @param featuresTotal_Internal The array that contains all current/future features arrays that can be displayed in the chart. 
	 */
	private _createsInternalArrays(products: Product[], products_Internal: ChartBar[], featuresTotal_Internal: ChartBar[][]): void
	{
		/* Creates the internal arrays that are going to be passed in the template; 
		`_currentProducts_Internal`/`_futureProducts_Internal` and `_currentFeaturesTotal_Internal`/`_futureFeaturesTotal_Internal` arrays. 
		The `_currentFeatures_Internal`/`_futureFeatures_Internal` array references an element in 
		the `_currentFeaturesTotal_Internal`/`_futureFeaturesTotal_Internal` array. This element represents the features 
		of a selected product in the `_currentProducts_Internal`/`_futureProducts_Internal` array. */

		let i: number, j: number;
		const len_i: number = products.length;
		let len_j: number;
		let tempCurrentFeatures_Internal: ChartBar[];
		let tempFeatures: Feature[];
		let tempAchieved: number;

		/* Calculates the achieved percentage of a product. */
		let achievedPercentage_P: number;
		let maxPercentage_F: number;
		let achievedPercentage_F: number;

		for(i = 0; i < len_i; i++)
		{
			tempCurrentFeatures_Internal = [ ];
			len_j = ((tempFeatures = products[i].features) ? tempFeatures.length : 0);
			maxPercentage_F = len_j * 100.00;
			achievedPercentage_F = 0;

			for(j = 0; j < len_j; j++)
			{
				/* Adds all `achieved` values of the `tempFeatures` array. */
				achievedPercentage_F += (tempAchieved = tempFeatures[j].achieved);

				/* Creates the current features array of this product displayed in the chart. */
				tempCurrentFeatures_Internal.push({
					'name': tempFeatures[j].name,
					'series': [
						{
							'name': 'realizado',  // TODO: Use the `seriesName_English` and `seriesName_Spanish` constants depending on the language selected. 
							'value': tempAchieved
						},
						{
							'name': 'pendiente',  // TODO: Use the `seriesName_English` and `seriesName_Spanish` constants depending on the language selected. 
							'value': 100.00 - tempAchieved
						}
					]
				});
			}

			/* Calculates the achieved percentage of this product. */
			achievedPercentage_P = (achievedPercentage_F * 100.00) / maxPercentage_F;
			// achievedPercentage_P = Math.round(((achievedPercentage_F * 100.00) / maxPercentage_F) * 100.00) / 100.00;

			/* Creates the current products array displayed in the chart. */
			products_Internal.push({
				'name': products[i].name,
				'series': [
					{
						'name': 'realizado',  // TODO: Use the `seriesName_English` and `seriesName_Spanish` constants depending on the language selected. 
						'value': achievedPercentage_P
					},
					{
						'name': 'pendiente',  // TODO: Use the `seriesName_English` and `seriesName_Spanish` constants depending on the language selected. 
						'value': 100.00 - achievedPercentage_P
					}
				]
			});

			/* Creates the array that contains all current features arrays that can be displayed in the chart. */
			featuresTotal_Internal.push(tempCurrentFeatures_Internal);
		}
	}

	/**
	 * Removes the chart for displaying the features list of the selected product. 
	 */
	public click_RemoveChart(): void
	{
		this._updateProductPos(this._selectedProductPos);
	}
}
