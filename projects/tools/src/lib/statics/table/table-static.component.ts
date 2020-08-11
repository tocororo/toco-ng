
import { Component, Input } from '@angular/core';

/* For testing. */
export interface PeriodicElement
{
	name: string;
	position: number;
	weight: number;
	symbol: string;
}

/* For testing. */
const ELEMENT_DATA: PeriodicElement[] = [
	{position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H'},
	{position: 2, name: 'Helium', weight: 4.0026, symbol: 'He'},
	{position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li'},
	{position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be'},
	{position: 5, name: 'Boron', weight: 10.811, symbol: 'B'},
	{position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C'},
	{position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N'},
	{position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O'},
	{position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F'},
	{position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne'},
];


/**
 * Represents a static control that shows an array of objects using a table. 
 */
@Component({
	selector: 'static-table',
	templateUrl: './table-static.component.html',
	styleUrls: ['./table-static.component.scss']
})
export class StaticTableComponent
{
    /**
     * The control's appearance. 
     * By default, its value is `'outline'`. 
     */
	@Input()
	public appearance: string;

	/**
	 * The control's description. 
	 * By default, its value is `undefined` and it is not showed. 
	 */
	@Input()
	public desc: string;

	/**
	 * The array of data that should be rendered by the table, where each object represents one row. 
     * By default, its value is `[]`. 
	 */
	@Input()
	public value: any[];

    /**
     * The array of strings that indicates the object property name of the columns. 
     * By default, its value is `[]`. 
     */
	@Input()
	public columnsObjectProperty: string[];

    /**
     * The array of strings that indicates the header text of the columns. 
     * By default, its value is `[]`. 
     */
	@Input()
	public columnsHeaderText: string[];

	public constructor()
	{
		this.appearance = 'outline';
		this.desc = undefined;
		this.value = [];

		this.columnsObjectProperty = [];
		this.columnsHeaderText = [];
	}
}
