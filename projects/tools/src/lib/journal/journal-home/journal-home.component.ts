
import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatTableDataSource } from '@angular/material';
import { Subscription } from 'rxjs';

import { SourceService } from '@toco/tools/backend';
import { Common } from '@toco/tools/core';
import { Response } from '@toco/tools/entities';

export interface PeriodicElement
{
    titulo: string;
    issn: number;
}

const ELEMENT_DATA: PeriodicElement[] = [
    { titulo: 'Hydrogen', issn: 1 },
    { titulo: 'Helium', issn: 2 },
    { titulo: 'Lithium', issn: 3 },
    { titulo: 'Beryllium', issn: 4 },
    { titulo: 'Boron', issn: 5 },
    { titulo: 'Carbon', issn: 6 },
    { titulo: 'Nitrogen', issn: 7 },
    { titulo: 'Oxygen', issn: 8 },
    { titulo: 'Fluorine', issn: 9 },
    { titulo: 'Neon', issn: 10}
];

@Component({
    selector: 'toco-journal-home',
    templateUrl: './journal-home.component.html',
    styleUrls: ['./journal-home.component.scss']
})
export class JournalHomeComponent implements OnInit, OnDestroy
{
	private _journalsObserver = {
		next: (value: Response<any>) => {

            console.log(value);

            /* Initializes the `dataSource`. */
            this.dataSource = new MatTableDataSource(/*[ ]*/value.data.sources);
		},
        error: (err: any) => { Common.logError('initializing journals', JournalHomeComponent.name, err); },
        complete: () => { Common.logComplete('initializing journals', JournalHomeComponent.name); }
	};
	
    private _journalsSubscription: Subscription = null;

    /**
     * The journals list. 
     */
    public dataSource: MatTableDataSource<any>;

    public constructor(private _souceService: SourceService)
    {
        this.dataSource = new MatTableDataSource([ ]);
    }

    public ngOnInit(): void
    {
        /* Gets the journals list. */
        this._journalsSubscription = this._souceService.getMySources()
            .subscribe(this._journalsObserver);
    }

    public ngOnDestroy(): void
    {
		/* Disposes the resources held by the subscription. */
		if (this._journalsSubscription)
		{
			this._journalsSubscription.unsubscribe();
		}
    }

    /**
     * Returns true if the data source is empty; otherwise, false. 
     */
    public get isEmpty(): boolean
    {
        return (this.dataSource.data.length == 0);
    }
}
