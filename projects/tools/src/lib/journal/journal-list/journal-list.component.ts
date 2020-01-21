
import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { MatTableDataSource, MatSort } from '@angular/material';

@Component({
    selector: 'toco-journal-list',
    templateUrl: './journal-list.component.html',
    styleUrls: ['./journal-list.component.scss']
})
export class JournalListComponent implements OnInit
{
    /**
     * The data source. This field must always be passed. 
     */
    @Input()
    public dataSource: MatTableDataSource<any>;

    /**
     * Returns an array of strings that indicates the object property name of the columns. 
     */
    @Input()
    public columnsObjectProperty: string[];

    /**
     * Returns an array of strings that indicates the header text of the columns. 
     */
    @Input()
    public columnsHeaderText: string[];

    @ViewChild(MatSort, { static: true })
    private sort: MatSort;

    public constructor()
    { }

    public ngOnInit()
    {
        /* The user of this component must always pass the `dataSource` input field. */

        this.dataSource.sort = this.sort;
    }
}
